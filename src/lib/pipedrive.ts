import { env } from "@/lib/env";
import { leadKinds, leadToLines, type LeadInput } from "@/lib/lead";

/**
 * Pipedrive Leads integration (REST API v1, authenticated with the
 * `x-api-token` header so the token never appears in URLs or logs).
 *
 * Each submission becomes Organization (deduplicated by exact name) +
 * Person (deduplicated by email) + Lead (labelled per kind, optionally
 * owned) + a Note with the full field table and the signed invoice link.
 */

type PipedriveConfig = NonNullable<ReturnType<typeof env.pipedrive>>;

export type PipedriveOutcome =
  | { status: "skipped"; reason: "not_configured" }
  | { status: "created"; leadId: string; url: string | null }
  | { status: "failed"; error: string };

class PipedriveError extends Error {
  constructor(
    public readonly endpoint: string,
    public readonly status: number,
    detail: string,
  ) {
    super(`Pipedrive ${endpoint} → ${status}: ${detail}`);
  }
}

async function call<T>(cfg: PipedriveConfig, method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${cfg.apiBase}${path}`, {
    method,
    headers: {
      "x-api-token": cfg.token,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(10_000),
  });
  const json = (await res.json().catch(() => null)) as { success?: boolean; data?: T; error?: string } | null;
  if (!res.ok || !json?.success) {
    throw new PipedriveError(path.split("?")[0]!, res.status, json?.error ?? res.statusText);
  }
  return json.data as T;
}

type SearchResult<T> = { items: { item: T }[] };

async function findOrganization(cfg: PipedriveConfig, name: string): Promise<number | null> {
  const q = new URLSearchParams({ term: name, fields: "name", exact_match: "true", limit: "1" });
  const data = await call<SearchResult<{ id: number }>>(cfg, "GET", `/organizations/search?${q}`);
  return data?.items?.[0]?.item.id ?? null;
}

async function findPerson(cfg: PipedriveConfig, email: string): Promise<number | null> {
  const q = new URLSearchParams({ term: email, fields: "email", exact_match: "true", limit: "1" });
  const data = await call<SearchResult<{ id: number }>>(cfg, "GET", `/persons/search?${q}`);
  return data?.items?.[0]?.item.id ?? null;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Note body: the field table, plus the signed invoice link when there is one. */
export function leadNoteHtml(lead: LeadInput, invoiceUrl?: string | null, invoiceTtlHours?: number): string {
  const rows = leadToLines(lead)
    .map(([k, v]) => `<li><b>${escapeHtml(k)}:</b> ${escapeHtml(v).replace(/\n/g, "<br>")}</li>`)
    .join("");
  const invoice = invoiceUrl
    ? `<p><b>Invoice download</b> (link expires in ${invoiceTtlHours ?? 72} hours): <a href="${escapeHtml(invoiceUrl)}">${escapeHtml(invoiceUrl)}</a></p>`
    : "";
  return `<p>Website lead — ${escapeHtml(leadKinds[lead.kind].label)}</p><ul>${rows}</ul>${invoice}`;
}

export async function createPipedriveLead(
  lead: LeadInput,
  options: { invoiceUrl?: string | null; invoiceTtlHours?: number; isProduction: boolean },
): Promise<PipedriveOutcome> {
  const cfg = env.pipedrive();
  if (!cfg) return { status: "skipped", reason: "not_configured" };

  const company = (lead as { company?: string }).company?.trim();
  const phone = (lead as { phone?: string }).phone?.trim();
  const kindLabel = leadKinds[lead.kind].label;

  try {
    let organizationId: number | undefined;
    if (company) {
      organizationId = (await findOrganization(cfg, company)) ?? (await call<{ id: number }>(cfg, "POST", "/organizations", { name: company })).id;
    }

    const personId =
      (await findPerson(cfg, lead.email)) ??
      (
        await call<{ id: number }>(cfg, "POST", "/persons", {
          name: lead.name,
          email: [{ value: lead.email, primary: true, label: "work" }],
          ...(phone ? { phone: [{ value: phone, primary: true, label: "work" }] } : {}),
          ...(organizationId ? { org_id: organizationId } : {}),
        })
      ).id;

    const labelId = cfg.labelFor(lead.kind);
    const created = await call<{ id: string }>(cfg, "POST", "/leads", {
      title: `${options.isProduction ? "" : "[PREVIEW] "}${kindLabel}${company ? ` — ${company}` : ` — ${lead.name}`}`,
      person_id: personId,
      ...(organizationId ? { organization_id: organizationId } : {}),
      ...(labelId ? { label_ids: [labelId] } : {}),
      ...(cfg.ownerId ? { owner_id: cfg.ownerId } : {}),
    });

    await call(cfg, "POST", "/notes", {
      lead_id: created.id,
      content: leadNoteHtml(lead, options.invoiceUrl, options.invoiceTtlHours),
    });

    if (!labelId) {
      console.warn(`[pipedrive] no PIPEDRIVE_LEAD_LABEL_${lead.kind.toUpperCase()} set; lead ${created.id} created without a label`);
    }

    return {
      status: "created",
      leadId: created.id,
      url: cfg.webBase ? `${cfg.webBase}/leads/inbox/${created.id}` : null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[pipedrive] lead creation failed", message);
    return { status: "failed", error: message };
  }
}
