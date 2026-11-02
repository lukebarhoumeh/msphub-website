import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/content/site";
import { flowLabels, leadSchema, leadToLines } from "@/lib/lead";

/**
 * Single endpoint for all four conversion flows. Validates with zod, drops
 * honeypot hits, rate-limits per IP, then emails sales via Resend.
 *
 * Env:
 *   RESEND_API_KEY   required for delivery; without it the handler returns
 *                    503 `not_configured` and the UI falls back to mailto.
 *   LEAD_TO_EMAIL    recipient override (default sales@msphub.com)
 *   LEAD_FROM_EMAIL  verified sender (default Resend's onboarding address,
 *                    which only delivers to the Resend account owner)
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled in: pretend it worked so bots stop trying.
  const honeypot = (json as { website?: unknown } | null)?.website;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, error: "invalid", fieldErrors }, { status: 400 });
  }
  const lead = parsed.data;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY not set; lead not delivered", { flow: lead.flow, company: lead.company });
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const to = process.env.LEAD_TO_EMAIL || site.salesEmail;
  const from = process.env.LEAD_FROM_EMAIL || "MSP Hub Website <onboarding@resend.dev>";
  const isProduction = process.env.VERCEL_ENV === "production";
  const subject = `${isProduction ? "" : "[PREVIEW] "}${flowLabels[lead.flow]}${lead.company ? ` — ${lead.company}` : ""}`;
  const lines = leadToLines(lead);
  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">${lines
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject, text, html }),
    });
    if (!res.ok) {
      console.error("[lead] Resend error", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] Resend request failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  console.info("[lead] delivered", { flow: lead.flow, company: lead.company, to });
  return NextResponse.json({ ok: true });
}
