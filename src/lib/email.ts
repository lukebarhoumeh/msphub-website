import { site } from "@/content/site";
import { env } from "@/lib/env";
import { leadKinds, leadToLines, type LeadInput } from "@/lib/lead";

/** Resend transactional email (HTTP API, no SDK). */

export type EmailOutcome =
  | { status: "skipped"; reason: "not_configured" }
  | { status: "sent"; id: string | null }
  | { status: "failed"; error: string };

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export type LeadEmailOptions = {
  isProduction: boolean;
  invoiceUrl?: string | null;
  invoiceTtlHours?: number;
  crmUrl?: string | null;
  crmSkipped?: boolean;
};

export function renderLeadEmail(lead: LeadInput, options: LeadEmailOptions): { subject: string; text: string; html: string } {
  const company = (lead as { company?: string }).company;
  const subject = `${options.isProduction ? "" : "[PREVIEW] "}${leadKinds[lead.kind].label}${company ? ` — ${company}` : ""}`;
  const lines = leadToLines(lead);
  const extras: [string, string][] = [];
  if (options.invoiceUrl) extras.push([`Invoice download (expires in ${options.invoiceTtlHours ?? 72} h)`, options.invoiceUrl]);
  if (options.crmUrl) extras.push(["Pipedrive lead", options.crmUrl]);
  if (options.crmSkipped) extras.push(["CRM", "Not created: Pipedrive is not configured on this deployment."]);

  const text = [...lines, ...extras].map(([k, v]) => `${k}: ${v}`).join("\n");
  const row = ([k, v]: [string, string], link = false) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${
      link && /^https?:\/\//.test(v) ? `<a href="${escapeHtml(v)}">${escapeHtml(v)}</a>` : escapeHtml(v)
    }</td></tr>`;
  const html = `<table style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">${lines.map((l) => row(l)).join("")}${extras
    .map((l) => row(l, true))
    .join("")}</table>`;
  return { subject, text, html };
}

export async function sendLeadEmail(lead: LeadInput, options: LeadEmailOptions): Promise<EmailOutcome> {
  const cfg = env.email();
  if (!cfg) return { status: "skipped", reason: "not_configured" };
  const to = cfg.to ?? site.salesEmail;
  const { subject, text, html } = renderLeadEmail(lead, options);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: cfg.from, to: [to], reply_to: lead.email, subject, text, html }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("[email] Resend error", res.status, detail);
      return { status: "failed", error: `Resend ${res.status}` };
    }
    const data = (await res.json().catch(() => null)) as { id?: string } | null;
    return { status: "sent", id: data?.id ?? null };
  } catch (err) {
    console.error("[email] Resend request failed", err);
    return { status: "failed", error: err instanceof Error ? err.message : String(err) };
  }
}
