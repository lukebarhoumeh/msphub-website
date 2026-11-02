import { providerOptions } from "@/content/forms";
import { partnerRegionOptions, partnerSizeOptions, programOptions } from "@/content/partners";
import type { FieldDef } from "@/lib/lead";

/**
 * Field definitions for the lead kinds added with the licensing and partner
 * routes: `switch` (the invoice-comparison request on /licensing/switch) and
 * `partner` (the application on /partners/apply). The zod schemas sit next to
 * the other kinds in the registry in `src/lib/lead.ts`; the invoice upload on
 * the switch and quote forms is a page-supplied control (`InvoiceUpload`),
 * whose hidden `invoiceId` / `invoiceName` / `invoiceSize` inputs travel with
 * the submission.
 */

export const switchForm = {
  label: "Switch / invoice comparison request",
  submitLabel: "Send for comparison",
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
        { type: "select", name: "currentProvider", label: "Who do you buy from today?", options: [...providerOptions], placeholder: "Select…" },
        { type: "text", name: "seats", label: "Approx. users or seats", optional: true, placeholder: "e.g. 250" },
        { type: "month", name: "renewalDate", label: "Next renewal", optional: true },
      ],
    },
    {
      type: "checkbox",
      name: "servicesInterest",
      label: "Also talk to us about migration or managed services",
      description: "Licensing is the entry point; the same team can migrate and run it.",
    },
    {
      type: "textarea",
      name: "notes",
      label: "Anything we should know?",
      optional: true,
      placeholder: "Tenants involved, Azure consumption, Enterprise Agreement dates, what you want to change.",
    },
  ] satisfies FieldDef[],
};

export const partnerForm = {
  label: "Partner application",
  submitLabel: "Send application",
  fields: [
    {
      type: "row",
      fields: [
        { type: "text", name: "company", label: "Company", autoComplete: "organization" },
        { type: "text", name: "companyWebsite", label: "Company website", optional: true, autoComplete: "url", placeholder: "example.com" },
      ],
    },
    { type: "radio", name: "program", legend: "Which program?", options: [...programOptions], columns: 3 },
    {
      type: "row",
      columns: 3,
      fields: [
        { type: "text", name: "role", label: "Your role", optional: true, autoComplete: "organization-title", placeholder: "e.g. Owner, Sales lead" },
        { type: "select", name: "customers", label: "Customer tenants you manage today", options: [...partnerSizeOptions] },
        { type: "select", name: "region", label: "Where you operate", options: [...partnerRegionOptions] },
      ],
    },
    {
      type: "text",
      name: "workloads",
      label: "Microsoft workloads you sell today",
      optional: true,
      placeholder: "e.g. Microsoft 365, Azure, Teams Phone, Copilot",
    },
    {
      type: "textarea",
      name: "notes",
      label: "Tell us about your customers and how you want to work with MSP Hub",
      optional: true,
      placeholder: "Who you serve, what you sell, what you need from a partner.",
    },
  ] satisfies FieldDef[],
};
