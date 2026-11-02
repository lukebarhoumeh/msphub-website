import { z } from "zod";

export const leadFlows = ["demo", "service", "quote", "contact"] as const;
export type LeadFlow = (typeof leadFlows)[number];

export const flowLabels: Record<LeadFlow, string> = {
  demo: "HubX demo request",
  service: "Service inquiry",
  quote: "Microsoft 365 quote request",
  contact: "General contact",
};

const email = z.string().trim().email("Enter a valid work email.").max(200);
const shortText = z.string().trim().min(1, "Required.").max(200);
const longText = z.string().trim().max(4000).optional().or(z.literal(""));
const optionalText = z.string().trim().max(200).optional().or(z.literal(""));

const base = {
  name: shortText,
  email,
  company: optionalText,
  /** Honeypot: real users never fill this (checked before validation in the API). */
  website: z.string().max(0).optional(),
  /** Page the form was submitted from. */
  source: optionalText,
};

export const leadSchema = z.discriminatedUnion("flow", [
  z.object({
    ...base,
    flow: z.literal("demo"),
    company: shortText,
    role: optionalText,
    audience: z.enum(["msp", "business", "csp", "other"]),
    preferredTime: optionalText,
    notes: longText,
  }),
  z.object({
    ...base,
    flow: z.literal("service"),
    company: shortText,
    branches: z.array(z.enum(["professional", "managed", "development"])).min(1, "Pick at least one practice."),
    companySize: z.enum(["1-50", "51-250", "251-1000", "1000+"]),
    timeline: z.enum(["now", "quarter", "6-months", "exploring"]),
    description: z.string().trim().min(10, "Tell us a little about the work.").max(4000),
  }),
  z.object({
    ...base,
    flow: z.literal("quote"),
    company: shortText,
    phone: optionalText,
    seats: z.coerce.number().int().min(1, "Enter the number of users or seats.").max(1_000_000),
    licenses: z.array(z.string().max(60)).max(20),
    renewalDate: optionalText,
    currentProvider: optionalText,
    servicesInterest: z.boolean().optional(),
    notes: longText,
  }),
  z.object({
    ...base,
    flow: z.literal("contact"),
    topic: z.enum(["general", "sales", "billing", "transfer", "support", "partnership", "press"]),
    message: z.string().trim().min(10, "Tell us how we can help.").max(4000),
  }),
]);

export type LeadInput = z.infer<typeof leadSchema>;

/** Flattens a validated lead into label/value lines for email and mailto bodies. */
export function leadToLines(lead: LeadInput): [string, string][] {
  const lines: [string, string][] = [
    ["Flow", flowLabels[lead.flow]],
    ["Name", lead.name],
    ["Email", lead.email],
  ];
  if (lead.company) lines.push(["Company", lead.company]);
  switch (lead.flow) {
    case "demo":
      lines.push(
        ["Role", lead.role || "—"],
        ["I am", { msp: "An MSP / VAR", business: "A business (direct customer)", csp: "A direct-bill CSP evaluating HubX", other: "Other" }[lead.audience]],
        ["Preferred time", lead.preferredTime || "—"],
        ["Notes", lead.notes || "—"],
      );
      break;
    case "service":
      lines.push(
        ["Practices", lead.branches.join(", ")],
        ["Company size", lead.companySize],
        ["Timeline", lead.timeline],
        ["Description", lead.description],
      );
      break;
    case "quote":
      lines.push(
        ["Phone", lead.phone || "—"],
        ["Users / seats", String(lead.seats)],
        ["Current licenses", lead.licenses.length ? lead.licenses.join(", ") : "—"],
        ["Renewal date", lead.renewalDate || "—"],
        ["Current provider", lead.currentProvider || "—"],
        ["Also interested in services", lead.servicesInterest ? "Yes" : "No"],
        ["Notes", lead.notes || "—"],
      );
      break;
    case "contact":
      lines.push(["Topic", lead.topic], ["Message", lead.message]);
      break;
  }
  if (lead.source) lines.push(["Source page", lead.source]);
  return lines;
}

export function buildMailto(to: string, lead: LeadInput): string {
  const subject = `[Website] ${flowLabels[lead.flow]}${lead.company ? ` — ${lead.company}` : ""}`;
  const body = leadToLines(lead)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
