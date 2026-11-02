import type { ConfirmId } from "@/content/confirmations";

/**
 * FAQ entries for the HubX pages. `answer` is plain text so the same string
 * feeds the accordion and the FAQPage schema. Items that depend on an open
 * confirmation carry `confirm`; production shows `answer` (the safe wording)
 * and review builds add the chip plus `reviewNote`. Items with `schema: false`
 * stay out of the structured data until the fact is confirmed.
 */
export type HubxFaqItem = {
  id: string;
  question: string;
  answer: string;
  confirm?: ConfirmId;
  reviewNote?: string;
  schema: boolean;
};

/** /hubx FAQ, answers per the private handoff §5.2 and §3 #10. */
export const hubxFaq: readonly HubxFaqItem[] = [
  {
    id: "who-for",
    question: "Is HubX for MSPs or for end customers?",
    answer:
      "Both, plus direct-bill CSPs. MSPs and VARs use HubX to manage every customer tenant from one console at Tier-1 direct pricing. Businesses use it to buy, see, and optimize their own Microsoft licensing. Direct-bill CSPs license HubX to run on their own Partner Center tenant.",
    schema: true,
  },
  {
    id: "marketplace",
    question: "Does HubX replace the MSP Hub Marketplace?",
    answer: "Yes. HubX is the redesigned and renamed MSP Hub platform (October 2026). Existing accounts and data carried over.",
    confirm: "loginContinuity",
    reviewNote: "Confirm that legacy Marketplace users sign in to HubX with their existing accounts.",
    schema: true,
  },
  {
    id: "pricing",
    question: "How is HubX priced?",
    answer:
      "For MSP Hub reseller partners, HubX is included with licensing bought through MSP Hub. For direct-bill CSPs running their own Partner Center tenant, HubX is licensed separately. Talk to sales for details.",
    confirm: "pricingWording",
    schema: true,
  },
  {
    id: "transfer",
    question: "Can I move an existing CSP agreement to HubX?",
    answer:
      "Yes. Existing subscriptions transfer partner-to-partner; terms and renewal dates carry over and nothing is re-bought. The customer accepts the reseller relationship from a link, then the transfer completes inside the open transfer window.",
    schema: true,
  },
  {
    id: "support",
    question: "What support is included?",
    answer:
      "HubX Service Desk tickets with priority and SLA state, business-hours licensing and billing support, and Microsoft Premier escalation. Managed services add 24/7 monitoring and incident management for the environments MSP Hub runs.",
    schema: true,
  },
  {
    id: "hosting",
    question: "Where is my data hosted?",
    answer: "Hosting region and data-residency details are available from sales on request.",
    confirm: "dataHosting",
    reviewNote: "Publish the Azure region once engineering confirms it; do not guess.",
    schema: false,
  },
];

/** /hubx/security FAQ. */
export const hubxSecurityFaq: readonly HubxFaqItem[] = [
  {
    id: "idp",
    question: "Which identity providers does HubX support for single sign-on?",
    answer:
      "Microsoft Entra ID, Google, and Okta, through OpenID Connect. Managed domains route each user's sign-in to the right identity provider, and you can run more than one organization from the same account.",
    schema: true,
  },
  {
    id: "tenant-access",
    question: "How does HubX access our Microsoft tenant?",
    answer:
      "Through Microsoft's own mechanisms. The customer accepts the reseller relationship from a link, admin access is granted through Granular Delegated Admin Privileges (GDAP) relationships you can see and manage in HubX, and Microsoft Customer Agreement acceptance is tracked per tenant. HubX runs on MSP Hub's own Microsoft Partner Center integration.",
    schema: true,
  },
  {
    id: "audit",
    question: "Is there an audit trail?",
    answer:
      "Yes. Audit logs are kept organization-wide and per customer, and the most recent events appear in a feed on the HubX home page. Every table exports to CSV.",
    schema: true,
  },
  {
    id: "certification",
    question: "Is MSP Hub certified?",
    answer:
      "HubX is delivered by an ISO/IEC 27001:2022-certified organization. A HIPAA Business Associate Agreement and a Data Processing Agreement are available for healthcare clients.",
    confirm: "isoEntity",
    reviewNote: "Confirm which entity holds the ISO/IEC 27001:2022 certificate before naming it.",
    schema: true,
  },
  {
    id: "hosting",
    question: "Where is my data hosted?",
    answer: "Hosting region and data-residency details are available from sales on request.",
    confirm: "dataHosting",
    reviewNote: "Publish the Azure region once engineering confirms it; do not guess.",
    schema: false,
  },
];
