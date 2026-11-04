import type { Citation } from "@/content/licensing";

/**
 * Microsoft programme facts the site states, each tied to the Microsoft Learn
 * page it comes from (verified Nov 3 2026). Rule from the redesign brief:
 * no sentence about a Microsoft programme rule ships without one of these
 * links beside it. Nothing here is MSP Hub's own claim; it is what Microsoft
 * publishes about the CSP programme.
 */

export const learn = {
  directBillRequirements: {
    label: "Requirements for CSP direct-bill partners (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/enroll/direct-partner-new-requirements",
  },
  directBillEligibility: {
    label: "Direct-bill eligibility requirements (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/enroll/direct-bill-eligibility-requirements",
  },
  partnerRelationships: {
    label: "How CSP partners can work together (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/enroll/csp-supported-partner-relationships",
  },
  transfers: {
    label: "Transfer billing ownership from one partner to another (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/customers/transfer-subscriptions",
  },
  transfersLicenseBased: {
    label: "Transfer new commerce license-based subscriptions (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/customers/transfer-new-commerce-license-based-subscriptions",
  },
  transfersAzure: {
    label: "Transfer Azure subscriptions, reservations, and savings plans (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/customers/transfer-azure-subscriptions-under-azure-plan",
  },
  cancellation: {
    label: "New Commerce Experience cancellation policy (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/customers/new-commerce-cancellation-policy",
  },
  subscriptions: {
    label: "Create and manage customer subscriptions (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/customers/create-a-new-subscription",
  },
  termChanges: {
    label: "Manage term duration and billing frequency (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/customers/billing-frequency-changes",
  },
} as const satisfies Record<string, Citation>;

/** The annual direct-bill bar, as Microsoft publishes it. */
export const directBillBar = {
  eyebrow: "Why direct · what Microsoft requires of MSP Hub, every year",
  title: "Direct-bill is not a label. It’s an annual bar.",
  lead: "Microsoft reassesses every direct-bill partner each year, in the month the partner first onboarded. Miss the bar and the partner must transition to indirect reseller status, buying through a distributor like everyone else.",
  requirements: [
    { title: "USD $1 million a year", body: "At least USD $1 million in trailing-twelve-month direct-bill CSP revenue, counted at the partner’s global account." },
    { title: "A premium Microsoft support plan", body: "An active Premier Support for Partners or Advanced Support for Partners contract, renewed each year." },
    { title: "A Solutions Partner designation", body: "At least one Solutions Partner designation in the Microsoft AI Cloud Partner Program, held, not just enrolled." },
    { title: "Mandatory security requirements", body: "Multifactor authentication for every admin, a named security contact, and alert response within 24 hours, validated annually across every production tenant." },
  ],
  consequence: "Partners who do not meet one or more of the requirements are required to transition to indirect reseller status, and must wait a year to reapply.",
  citations: [learn.directBillRequirements, learn.directBillEligibility],
} as const;

/** Where the money and the ticket go, side by side. */
export const pathDiagram = {
  title: "Where your money and your ticket go",
  rows: [
    { label: "Distributor-transacted MSP", nodes: ["You", "Your MSP", "Distributor", "Microsoft"] },
    { label: "MSP Hub", nodes: ["You", "MSP Hub", "Microsoft"], highlight: true },
  ],
  note: "An indirect reseller buys through an indirect provider (a distributor) and needs that provider to send or approve a partner-to-partner transfer. A direct-bill partner owns billing, support, and the transfer itself.",
  citation: learn.transfers,
} as const;

/** Partner-to-partner transfer facts for the Switch page and FAQ. */
export const transferFacts = [
  {
    q: "Who can run a partner-to-partner transfer?",
    a: "Transfers are created by the new partner and approved by the current one. Only direct-bill partners and indirect providers can send or accept them; an MSP buying through a distributor has to ask its provider to do it. MSP Hub runs the transfer itself.",
    citation: learn.transfers,
  },
  {
    q: "Does my current partner have to agree?",
    a: "Yes. Both the current partner and the new partner must approve, and Microsoft does not override a transfer without the current partner’s approval. If the current partner declines or does not respond, the request expires after 30 days.",
    citation: learn.transfers,
  },
  {
    q: "Does the price change when a subscription moves?",
    a: "A transferred subscription is created under the new partner at the original subscription’s price. Promotions applied to the original subscription carry over, and so do scheduled changes such as renewal instructions.",
    citation: learn.transfersLicenseBased,
  },
  {
    q: "Is there a limit on how much moves at once?",
    a: "License-based transfers are capped at 25 line items per billing plan per request, so larger estates move in batches that the deal desk sequences. There is no limit on Azure items.",
    citation: learn.transfersLicenseBased,
  },
  {
    q: "What about Azure?",
    a: "Azure subscriptions, reservations, and savings plans under an Azure plan transfer too. Only partners with a direct-billing relationship with Microsoft can access that transfer tool; indirect resellers work through their provider.",
    citation: learn.transfersAzure,
  },
  {
    q: "How long does the transfer itself take?",
    a: "Once accepted, most transfers complete in under an hour; Microsoft allows up to 72 hours while any failed line items are retried.",
    citation: learn.transfers,
  },
] as const;

/** New Commerce Experience rules buyers ask about on every quote. */
export const nceFacts = [
  {
    q: "Can I cancel a subscription after I buy it?",
    a: "License-based subscriptions can be cancelled with a prorated refund within the first seven days (168 hours) of a term. After that, the subscription is billed for the full term. Perpetual software is refundable in full within 30 days of purchase.",
    citation: learn.cancellation,
  },
  {
    q: "Can I reduce seats mid-term?",
    a: "Seats can only be reduced within the first seven days of being added, whether they were added at purchase, at renewal, or mid-term. After that, reductions wait for the next renewal.",
    citation: learn.subscriptions,
  },
  {
    q: "Which terms are available?",
    a: "Monthly, annual, and three-year terms where Microsoft offers them for the product, each with its own billing frequency options.",
    citation: learn.subscriptions,
  },
  {
    q: "Can I change the term mid-way through?",
    a: "Only to a longer term. A monthly subscription can move to annual or three-year mid-term, and an annual one to three-year; moving to a shorter term waits for renewal. Changing the term mid-way does not reopen the seven-day cancellation window.",
    citation: learn.termChanges,
  },
] as const;
