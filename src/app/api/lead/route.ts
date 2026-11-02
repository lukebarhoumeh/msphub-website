import { NextResponse, type NextRequest } from "next/server";
import { sendLeadEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { parseLead } from "@/lib/lead";
import { createPipedriveLead } from "@/lib/pipedrive";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";
import { getStorage, storageCredential } from "@/lib/storage";
import { resolveUploadRef } from "@/lib/storage/refs";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * The one endpoint behind every form. Order of operations:
 *
 *   JSON body → honeypot (pretend success) → per-IP rate limit → zod
 *   validation for the posted `kind` → Cloudflare Turnstile (fails closed
 *   when the secret is set, passes through when it is not) → optional
 *   invoice reference → signed deal-desk link → Pipedrive lead → email to
 *   sales via Resend.
 *
 * Pipedrive and email degrade independently. Neither configured → 503
 * `not_configured`; both configured but both failing → 502
 * `delivery_failed`. In both cases the form keeps the visitor's input on
 * screen and offers a prefilled mailto to sales.
 */

const limiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 10 });

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const raw = json && typeof json === "object" ? (json as Record<string, unknown>) : {};

  // Honeypot filled in: answer like a success so bots stop retrying.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req.headers);
  const limit = limiter.hit(ip);
  if (limit.limited) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const parsed = parseLead(raw);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: "invalid", fieldErrors: parsed.fieldErrors }, { status: 400 });
  }
  const lead = parsed.lead;

  const captcha = await verifyTurnstile(lead.turnstileToken || undefined, ip);
  if (captcha.status === "failed") {
    console.warn("[lead] turnstile rejected", { kind: lead.kind, codes: captcha.codes });
    return NextResponse.json({ ok: false, error: "captcha_failed" }, { status: 400 });
  }

  // Uploaded invoice: the opaque id becomes a signed, expiring link for the deal desk.
  const invoiceTtlHours = env.uploadLinkTtlHours();
  let invoiceUrl: string | null = null;
  const invoiceId = "invoiceId" in lead && typeof lead.invoiceId === "string" ? lead.invoiceId : "";
  if (invoiceId) {
    if (!storageCredential()) {
      console.warn("[lead] invoice reference received but storage is not configured; continuing without a link");
    } else {
      const key = resolveUploadRef(invoiceId);
      if (!key) {
        return NextResponse.json(
          { ok: false, error: "invalid", fieldErrors: { invoiceId: "The uploaded file reference is not valid. Remove the file and try again." } },
          { status: 400 },
        );
      }
      try {
        const storage = await getStorage();
        invoiceUrl = storage ? await storage.createDownloadUrl(key, invoiceTtlHours * 3600) : null;
      } catch (err) {
        console.error("[lead] could not sign the invoice link", err);
      }
    }
  }

  const isProduction = env.isProduction();
  if (!env.pipedrive() && !env.email()) {
    console.warn("[lead] neither PIPEDRIVE_API_TOKEN nor RESEND_API_KEY is set; lead not delivered", { kind: lead.kind });
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const crm = await createPipedriveLead(lead, { invoiceUrl, invoiceTtlHours, isProduction });
  const mail = await sendLeadEmail(lead, {
    isProduction,
    invoiceUrl,
    invoiceTtlHours,
    crmUrl: crm.status === "created" ? crm.url : null,
    crmSkipped: crm.status === "skipped",
  });

  const delivered = { crm: crm.status === "created", email: mail.status === "sent" };
  if (!delivered.crm && !delivered.email) {
    console.error("[lead] delivery failed on every channel", { kind: lead.kind, crm, mail });
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  console.info("[lead] delivered", { kind: lead.kind, ...delivered, invoice: Boolean(invoiceUrl) });
  return NextResponse.json({ ok: true, delivered });
}
