import { z } from "zod";
import {
  audienceOptions,
  baseFields,
  branchOptions,
  companySizeOptions,
  contactForm,
  demoForm,
  licenseOptions,
  providerOptions,
  qualificationOptions,
  quoteForm,
  serviceForm,
  timelineOptions,
  topicOptions,
} from "@/content/forms";
import { partnerForm, switchForm } from "@/content/lead-kinds";
import { partnerRegionOptions, partnerSizeOptions, programOptions } from "@/content/partners";

/*
 * Lead kinds registry.
 *
 * Every form on the site is a "kind": a label, a zod schema, and the field
 * definitions the shared `LeadForm` renders. `POST /api/lead` validates the
 * body against the schema of the posted `kind`, so adding a form is one
 * entry in `leadKinds` below (copy in its own content module) plus a
 * `PIPEDRIVE_LEAD_LABEL_<KIND>` variable. Schemas are shared between the
 * client (react-hook-form resolver) and the server.
 */

export type Option = { value: string; label: string; description?: string };

export type FieldDef =
  | {
      type: "text" | "email" | "tel" | "number" | "month";
      name: string;
      label: string;
      optional?: boolean;
      hint?: string;
      placeholder?: string;
      autoComplete?: string;
      min?: number;
    }
  | { type: "textarea"; name: string; label: string; optional?: boolean; hint?: string; placeholder?: string }
  | { type: "select"; name: string; label: string; options: Option[]; optional?: boolean; hint?: string; placeholder?: string }
  | { type: "radio"; name: string; legend: string; options: Option[]; columns?: 2 | 3 }
  | { type: "checkboxes"; name: string; legend: string; options: Option[]; variant: "tiles" | "chips"; hint?: string; columns?: 2 | 3 }
  | { type: "checkbox"; name: string; label: string; description?: string }
  | { type: "row"; fields: FieldDef[]; columns?: 2 | 3 };

/** Flattens layout rows into the fields they contain. */
export function flattenFields(fields: FieldDef[]): Exclude<FieldDef, { type: "row" }>[] {
  return fields.flatMap((f) => (f.type === "row" ? flattenFields(f.fields) : [f]));
}

const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const text = (max = 200) => z.string().trim().max(max);
const required = (message = "Required.") => z.string().trim().min(1, message).max(200);
const optionalText = (max = 200) => text(max).optional().or(z.literal(""));
const email = z.preprocess(
  (v) => (typeof v === "string" ? v.trim() : v),
  z.email({ error: "Enter a valid work email." }).max(200),
);

/** Fields shared by every kind. Honeypot and Turnstile are handled before validation. */
const base = {
  name: required(),
  email,
  /** Page the form was submitted from. */
  source: optionalText(300),
  /** Cloudflare Turnstile response token (verified server-side when the secret is set). */
  turnstileToken: optionalText(4000),
};

/**
 * Reference to an invoice uploaded through `POST /api/upload`. `invoiceId` is
 * the opaque server-issued id (never a URL); the handler turns it into a
 * signed deal-desk link. Spread into any kind that accepts an upload.
 */
export const invoiceFields = {
  invoiceId: optionalText(600),
  invoiceName: optionalText(255),
  invoiceSize: z.coerce.number().int().nonnegative().max(50_000_000).optional(),
};

export type LeadKindDef = {
  /** Human label: email subject, Pipedrive lead title, thank-you page. */
  label: string;
  submitLabel: string;
  /** GA4 / Clarity event fired on success. */
  analyticsEvent: string;
  schema: z.ZodObject<z.ZodRawShape>;
  fields: FieldDef[];
};

export const leadKinds = {
  demo: {
    ...demoForm,
    analyticsEvent: "demo_request",
    schema: z.object({
      ...base,
      company: required(),
      role: optionalText(),
      audience: z.enum(values(audienceOptions), { error: "Pick the option that fits best." }),
      preferredTime: optionalText(),
      notes: optionalText(4000),
    }),
    fields: [...baseFields, ...demoForm.fields],
  },
  service: {
    ...serviceForm,
    analyticsEvent: "service_inquiry",
    schema: z.object({
      ...base,
      company: required(),
      branches: z.array(z.enum(values(branchOptions))).min(1, "Pick at least one practice."),
      companySize: z.enum(values(companySizeOptions), { error: "Pick a company size." }),
      timeline: z.enum(values(timelineOptions), { error: "Pick a timeline." }),
      description: z.string().trim().min(10, "Tell us a little about the work.").max(4000),
    }),
    fields: [...baseFields, ...serviceForm.fields],
  },
  quote: {
    ...quoteForm,
    analyticsEvent: "quote_request",
    schema: z.object({
      ...base,
      ...invoiceFields,
      company: required(),
      phone: optionalText(40),
      seats: z.coerce.number({ error: "Enter the number of users or seats." }).int().min(1, "Enter the number of users or seats.").max(1_000_000),
      renewalDate: optionalText(10),
      qualification: z.enum(values(qualificationOptions), { error: "Pick a qualification type." }),
      currentProvider: z.enum(values(providerOptions), { error: "Tell us where you buy Microsoft today." }),
      licenses: z.array(z.enum(licenseOptions)).max(licenseOptions.length),
      servicesInterest: z.boolean().optional(),
      notes: optionalText(4000),
    }),
    fields: [...baseFields, ...quoteForm.fields],
  },
  contact: {
    ...contactForm,
    analyticsEvent: "contact_message",
    schema: z.object({
      ...base,
      company: optionalText(),
      topic: z.enum(values(topicOptions), { error: "Pick a topic." }),
      message: z.string().trim().min(10, "Tell us how we can help.").max(4000),
    }),
    fields: [...baseFields, ...contactForm.fields],
  },
  switch: {
    ...switchForm,
    analyticsEvent: "invoice_upload",
    schema: z.object({
      ...base,
      ...invoiceFields,
      company: required(),
      phone: optionalText(40),
      currentProvider: z.enum(values(providerOptions), { error: "Tell us who you buy from today." }),
      seats: optionalText(40),
      renewalDate: optionalText(10),
      servicesInterest: z.boolean().optional(),
      notes: optionalText(4000),
    }),
    fields: [...baseFields, ...switchForm.fields],
  },
  partner: {
    ...partnerForm,
    analyticsEvent: "partner_apply",
    schema: z.object({
      ...base,
      company: required(),
      companyWebsite: optionalText(),
      program: z.enum(values(programOptions), { error: "Pick the program that fits." }),
      role: optionalText(),
      customers: z.enum(values(partnerSizeOptions), { error: "Pick a range." }),
      region: z.enum(values(partnerRegionOptions), { error: "Pick a region." }),
      workloads: optionalText(),
      notes: optionalText(4000),
    }),
    fields: [...baseFields, ...partnerForm.fields],
  },
} satisfies Record<string, LeadKindDef>;

export type LeadKind = keyof typeof leadKinds;

export const leadKindIds = Object.keys(leadKinds) as LeadKind[];

export function isLeadKind(value: unknown): value is LeadKind {
  return typeof value === "string" && Object.hasOwn(leadKinds, value);
}

/** A validated lead: the kind plus that kind's fields. */
export type LeadInput = {
  [K in LeadKind]: { kind: K } & z.infer<(typeof leadKinds)[K]["schema"]>;
}[LeadKind];

export type LeadParseResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; fieldErrors: Record<string, string> };

/** Validates a raw submission against the schema of its `kind`. */
export function parseLead(input: unknown): LeadParseResult {
  const body = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  if (!isLeadKind(body.kind)) {
    return { ok: false, fieldErrors: { kind: "Unknown form." } };
  }
  const parsed = leadKinds[body.kind].schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }
  return { ok: true, lead: { kind: body.kind, ...parsed.data } as LeadInput };
}

/** Where a successful submission lands: the per-kind confirmation page. */
export function thankYouPath(kind: LeadKind): string {
  return `/thank-you/${kind}`;
}

function formatValue(field: Exclude<FieldDef, { type: "row" }>, raw: unknown): string {
  const labelOf = (v: unknown) =>
    "options" in field ? (field.options.find((o) => o.value === v)?.label ?? String(v)) : String(v);
  switch (field.type) {
    case "checkbox":
      return raw ? "Yes" : "No";
    case "checkboxes":
      return Array.isArray(raw) && raw.length ? raw.map(labelOf).join(", ") : "—";
    case "select":
    case "radio":
      return raw ? labelOf(raw) : "—";
    default:
      return raw === undefined || raw === null || raw === "" ? "—" : String(raw);
  }
}

/** Flattens a validated lead into label/value lines for email, CRM notes, and mailto bodies. */
export function leadToLines(lead: LeadInput): [string, string][] {
  const def = leadKinds[lead.kind] as LeadKindDef;
  const record = lead as unknown as Record<string, unknown>;
  const lines: [string, string][] = [["Form", def.label]];
  for (const field of flattenFields(def.fields)) {
    const label = field.type === "radio" || field.type === "checkboxes" ? field.legend : field.label;
    lines.push([label, formatValue(field, record[field.name])]);
  }
  if (typeof record.invoiceName === "string" && record.invoiceName) {
    const size = typeof record.invoiceSize === "number" ? ` (${formatBytes(record.invoiceSize)})` : "";
    lines.push(["Invoice uploaded", `${record.invoiceName}${size}`]);
  }
  if (typeof record.source === "string" && record.source) lines.push(["Source page", record.source]);
  return lines;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function buildMailto(to: string, lead: LeadInput): string {
  const company = (lead as { company?: string }).company;
  const subject = `[Website] ${leadKinds[lead.kind].label}${company ? ` — ${company}` : ""}`;
  const body = leadToLines(lead)
    .filter(([k]) => k !== "Invoice uploaded")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
