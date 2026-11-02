import type { FieldDef } from "@/lib/lead";

/**
 * Copy for the shared lead form: field labels, options, hints, and status
 * messages for every lead kind. The zod schemas that validate these fields
 * live next to the kinds registry in `src/lib/lead.ts`; new kinds add their
 * fields in their own content module and register there.
 */

/** Shown under the submit button on every form. */
export const formFootnote = "No newsletters, no sharing your details.";

export const formMessages = {
  sending: "Sending your request.",
  notConfigured: "Email delivery isn't configured on this deployment yet, so your message wasn't sent.",
  rateLimited: "Too many submissions from this network in a short time.",
  captchaFailed: "The spam check didn't pass. Reload the page and try again.",
  failed: "We couldn't send your message just now.",
  keptBelow: "Your details are kept below. Email us directly and we'll pick it up from there.",
  emailUs: "Email",
  tryAgain: "Try again",
  /** Visible when the Turnstile site key is missing on this deployment. */
  turnstileMissing: "Spam protection (Cloudflare Turnstile) isn't configured on this deployment; submissions still go through.",
  turnstileError: "The spam check couldn't load. You can still submit; we may follow up to confirm.",
} as const;

/** Qualification types that exist in the HubX catalog (handoff §5.11). */
export const qualificationOptions = [
  { value: "commercial", label: "Commercial" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "education", label: "Education" },
  { value: "government", label: "Government" },
] as const;

/** Where the estate is bought today (handoff §5.11). */
export const providerOptions = [
  { value: "microsoft-direct", label: "Microsoft direct" },
  { value: "pax8", label: "Pax8" },
  { value: "td-synnex", label: "TD SYNNEX" },
  { value: "ingram-micro", label: "Ingram Micro" },
  { value: "sherweb", label: "Sherweb" },
  { value: "appdirect", label: "AppDirect" },
  { value: "dandh", label: "D&H" },
  { value: "godaddy", label: "GoDaddy" },
  { value: "techsoup", label: "TechSoup" },
  { value: "other-csp", label: "Another MSP or CSP" },
  { value: "ea-lsp", label: "Enterprise Agreement (LSP)" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const licenseOptions = [
  "Business Basic",
  "Business Standard",
  "Business Premium",
  "Microsoft 365 E3",
  "Microsoft 365 E5",
  "Microsoft 365 F3",
  "Copilot for Microsoft 365",
  "Teams Phone",
  "Defender",
  "Purview",
  "Intune & Entra ID",
  "Windows 365",
  "Azure",
  "Dynamics 365",
  "Power BI",
] as const;

export const audienceOptions = [
  { value: "msp", label: "An MSP or VAR", description: "Managing customer tenants" },
  { value: "business", label: "A business", description: "Managing our own licensing" },
  { value: "csp", label: "A direct-bill CSP", description: "Evaluating HubX for my own tenant" },
  { value: "other", label: "Other", description: "Advisor, press, partner" },
] as const;

export const branchOptions = [
  { value: "professional", label: "Professional services", description: "Migrations, Azure, security, data" },
  { value: "managed", label: "Managed services", description: "Monitoring, incident management, SLAs" },
  { value: "development", label: "Development & AI", description: "Apps, DevOps, AI development" },
] as const;

export const companySizeOptions = [
  { value: "1-50", label: "1–50 people" },
  { value: "51-250", label: "51–250 people" },
  { value: "251-1000", label: "251–1,000 people" },
  { value: "1000+", label: "1,000+ people" },
] as const;

export const timelineOptions = [
  { value: "now", label: "As soon as possible" },
  { value: "quarter", label: "This quarter" },
  { value: "6-months", label: "Within six months" },
  { value: "exploring", label: "Just exploring" },
] as const;

/** Contact topics (handoff §5.9 adds billing and partner-to-partner transfer). */
export const topicOptions = [
  { value: "general", label: "General question" },
  { value: "sales", label: "Sales" },
  { value: "billing", label: "Billing question" },
  { value: "transfer", label: "Partner-to-partner transfer" },
  { value: "support", label: "Support" },
  { value: "partnership", label: "Partnership" },
  { value: "press", label: "Press & media" },
] as const;

/** Fields every kind starts with. */
export const baseFields: FieldDef[] = [
  {
    type: "row",
    fields: [
      { type: "text", name: "name", label: "Full name", autoComplete: "name" },
      { type: "email", name: "email", label: "Work email", autoComplete: "email" },
    ],
  },
];

export const demoForm = {
  label: "HubX demo request",
  submitLabel: "Request a demo",
  fields: [
    {
      type: "row",
      fields: [
        { type: "text", name: "company", label: "Company", autoComplete: "organization" },
        { type: "text", name: "role", label: "Role", optional: true, autoComplete: "organization-title", placeholder: "e.g. IT Director, Owner" },
      ],
    },
    { type: "radio", name: "audience", legend: "I am", options: [...audienceOptions], columns: 2 },
    {
      type: "text",
      name: "preferredTime",
      label: "Preferred time",
      optional: true,
      hint: "Time zone and a couple of windows that work for you.",
      placeholder: "e.g. Tue/Thu mornings, Central Time",
    },
    { type: "textarea", name: "notes", label: "What should we focus on?", optional: true, placeholder: "Tenants, licensing questions, integrations, anything specific." },
  ] satisfies FieldDef[],
};

export const serviceForm = {
  label: "Service inquiry",
  submitLabel: "Send inquiry",
  fields: [
    { type: "text", name: "company", label: "Company", autoComplete: "organization" },
    { type: "checkboxes", name: "branches", legend: "Which practices?", options: [...branchOptions], variant: "tiles", columns: 3 },
    {
      type: "row",
      fields: [
        { type: "select", name: "companySize", label: "Company size", options: [...companySizeOptions] },
        { type: "select", name: "timeline", label: "Timeline", options: [...timelineOptions] },
      ],
    },
    {
      type: "textarea",
      name: "description",
      label: "What are you trying to get done?",
      placeholder: "Current environment, what's changing, and what success looks like.",
    },
  ] satisfies FieldDef[],
};

export const quoteForm = {
  label: "Microsoft licensing quote request",
  submitLabel: "Request my quote",
  fields: [
    {
      type: "row",
      fields: [
        { type: "text", name: "company", label: "Company", autoComplete: "organization" },
        { type: "tel", name: "phone", label: "Phone", optional: true, autoComplete: "tel" },
      ],
    },
    {
      type: "row",
      columns: 3,
      fields: [
        { type: "number", name: "seats", label: "Users / seats", min: 1 },
        { type: "month", name: "renewalDate", label: "Next renewal", optional: true },
        { type: "select", name: "qualification", label: "Qualification", options: [...qualificationOptions] },
      ],
    },
    {
      type: "select",
      name: "currentProvider",
      label: "Current provider",
      options: [...providerOptions],
      placeholder: "Where do you buy Microsoft today?",
    },
    {
      type: "checkboxes",
      name: "licenses",
      legend: "Current or planned licenses",
      hint: "select all that apply",
      options: licenseOptions.map((l) => ({ value: l, label: l })),
      variant: "chips",
    },
    {
      type: "checkbox",
      name: "servicesInterest",
      label: "Also talk to us about migration or managed services",
      description: "Licensing is the entry point; our services team can migrate and run it.",
    },
    { type: "textarea", name: "notes", label: "Notes", optional: true, placeholder: "Tenants, add-ons, Azure consumption, timing." },
  ] satisfies FieldDef[],
};

export const contactForm = {
  label: "General contact",
  submitLabel: "Send message",
  fields: [
    {
      type: "row",
      fields: [
        { type: "text", name: "company", label: "Company", optional: true, autoComplete: "organization" },
        { type: "select", name: "topic", label: "Topic", options: [...topicOptions] },
      ],
    },
    { type: "textarea", name: "message", label: "Message", placeholder: "How can we help?" },
  ] satisfies FieldDef[],
};
