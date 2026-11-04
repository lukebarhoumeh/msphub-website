import type { ConfirmId } from "@/content/confirmations";

/**
 * Licensing section copy (handoff §1.1, §1.2, §1.4, §4, §5.11, §5.12).
 * Every figure and claim traces to the private handoff; items it marks
 * CONFIRM / DECISION carry a `confirm` id so pages can wrap them in
 * `NeedsConfirm` with the production-safe fallback given here.
 */

export type LicensingFaq = {
  q: string;
  /** Production-safe answer (also used for FAQPage schema). */
  a: string;
  /** Review-build note shown next to the answer when a decision is still open. */
  confirm?: ConfirmId;
};

export type Citation = { label: string; href: string };

/** Microsoft Learn sources referenced on the licensing pages. */
export const microsoftLearn = {
  cspOverview: {
    label: "Cloud Solution Provider program overview (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/enroll/csp-overview",
  },
  partnerRelationships: {
    label: "Learn how CSP partners can work together (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/enroll/csp-supported-partner-relationships",
  },
  transfers: {
    label: "Transfer billing ownership from one partner to another (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/customers/transfer-subscriptions",
  },
  gdap: {
    label: "Granular delegated admin privileges introduction (Microsoft Learn)",
    href: "https://learn.microsoft.com/partner-center/customers/gdap-introduction",
  },
} as const satisfies Record<string, Citation>;

/* ------------------------------------------------------------------ */
/* Licensing hub                                                        */
/* ------------------------------------------------------------------ */

export const licensingHub = {
  eyebrow: "Microsoft licensing · CSP direct-bill partner",
  title: "Microsoft licensing, bought direct.",
  lead: "MSP Hub is a Microsoft Cloud Solution Provider (CSP) direct-bill partner, Tier-1 Direct in North America. The licensing desk quotes the full catalog, the deal desk runs transfers, and every subscription, renewal, and invoice lands in HubX.",
  catalogClaim: "7,600+ SKUs across Microsoft 365, Azure, Dynamics 365, Power Platform, Windows 365, Windows Server & SQL Server, and Copilot.",
  whyDirect: {
    title: "Why direct matters",
    body: "A CSP direct-bill partner buys from Microsoft and bills, supports, and provisions customers itself. There is no distributor layer in the price or in the escalation path. Microsoft requires direct-bill partners to run billing, support, and managed services and to integrate with Partner Center by API.",
    citation: microsoftLearn.partnerRelationships,
  },
  /** "On this page" links in the hero; each href is a chapter id on /licensing. */
  anchors: [
    { label: "Ways in", href: "#ways-in" },
    { label: "Catalog", href: "#catalog" },
    { label: "Why direct", href: "#why-direct" },
    { label: "In HubX", href: "#in-hubx" },
    { label: "Questions", href: "#faq" },
  ],
};

export type CatalogFamily = { name: string; items: string[] };

/** Catalog breadth (handoff §4 licensing row and §5.2 chips). */
export const catalogFamilies: CatalogFamily[] = [
  { name: "Microsoft 365", items: ["Business Basic, Standard, Premium", "Microsoft 365 E3, E5, F3", "Exchange, SharePoint, Teams"] },
  { name: "Copilot & Teams Phone", items: ["Copilot for Microsoft 365", "Teams Phone and calling plans", "Teams Rooms"] },
  { name: "Security & compliance", items: ["Defender", "Purview", "Intune & Entra ID"] },
  { name: "Azure", items: ["Azure plan (consumption)", "Reservations and savings plans", "Azure Virtual Desktop"] },
  { name: "Business applications", items: ["Dynamics 365", "Power Platform", "Power BI"] },
  { name: "Windows & servers", items: ["Windows 365", "Windows Server & SQL Server software subscriptions", "Perpetual licenses"] },
];

export type Qualification = { id: "commercial" | "nonprofit" | "education"; label: string; body: string };

/** Qualification types in the catalog (handoff §3 #13, §6.2). Government is on hold (decisions round 2, item 5) and is not listed. */
export const qualifications: Qualification[] = [
  { id: "commercial", label: "Commercial", body: "Standard commercial pricing for businesses of every size." },
  { id: "nonprofit", label: "Nonprofit", body: "Nonprofit offers for eligible organizations, quoted against your Microsoft nonprofit status." },
  { id: "education", label: "Education", body: "Academic offers for qualified institutions, faculty, and students." },
];

export const commitmentTerms = [
  { term: "Monthly", body: "Flexibility for seats that change; billed each calendar month." },
  { term: "Annual", body: "Lower unit price for a one-year commitment; pay monthly or up front." },
  { term: "Triennial", body: "Three-year terms where Microsoft offers them, for the most stable workloads." },
];

export type Motion = { title: string; body: string; href: string; linkLabel: string };

/** Today's deal flow (handoff §1.4). */
export const licensingMotions: Motion[] = [
  {
    title: "Switch your Microsoft estate to MSP Hub",
    body: "Move from a distributor-transacted MSP, another CSP partner, or direct from Microsoft by partner-to-partner transfer. Nothing is re-bought; terms carry over; the deal desk returns a line-by-line comparison from your current invoice.",
    href: "/licensing/switch",
    linkLabel: "Send us your invoice",
  },
  {
    title: "Enterprise Agreement to CSP",
    body: "For mid-market and enterprise organizations leaving an LSP-run Enterprise Agreement: flexibility, support, and services from one team.",
    href: "/licensing/ea-to-csp",
    linkLabel: "Read the EA to CSP guide",
  },
  {
    title: "License optimization",
    body: "E3 to E5 consolidation, Business Premium right-sizing, Copilot and Teams Phone planning, and add-on cleanup, with every change visible in HubX.",
    href: "/licensing/quote",
    linkLabel: "Request a licensing review",
  },
  {
    title: "Azure cost optimization",
    body: "Ongoing right-sizing of subscriptions, reservations, and savings plans by the cloud team on estates MSP Hub takes over.",
    href: "/services/managed",
    linkLabel: "Managed services",
  },
  {
    title: "Beyond Microsoft",
    body: "Google Workspace, Adobe, Cisco Meraki, Fortinet, Coro, Citrix, and Dell and Lenovo hardware through the same deal desk. One partner, one invoice.",
    href: "/licensing/beyond-microsoft",
    linkLabel: "See the ecosystem",
  },
  {
    title: "Resell through MSP Hub",
    body: "For MSPs and VARs: Tier-1 direct pricing on the full catalog, partner-branded customer invoices, and every customer tenant in HubX, with MSP Hub’s services bench behind you.",
    href: "/partners/reseller",
    linkLabel: "Reseller program",
  },
];

/** Billing convention (handoff §1.2). */
export const billingFacts = [
  { label: "Billing cycle", value: "Calendar month, billed one month in advance" },
  { label: "Mid-month changes", value: "Daily-rate proration for starts and changes" },
  { label: "Payment terms", value: "Net 30" },
  { label: "Where you see it", value: "Invoices and statements in HubX, with PDF download" },
];

export const licensingFaq: LicensingFaq[] = [
  {
    q: "What does \u201cCSP direct-bill partner\u201d mean for me?",
    a: "MSP Hub buys from Microsoft and bills, supports, and provisions your subscriptions itself. There is no distributor between you and the price, and no distributor between you and an escalation to Microsoft.",
  },
  {
    q: "Do my existing subscriptions transfer?",
    a: "For subscriptions bought through another CSP partner or from Microsoft directly, yes: they move by partner-to-partner transfer, terms and renewal dates carry over, and nothing is re-bought. You accept the reseller relationship from a link, then the transfer completes inside the open transfer window. Enterprise Agreement estates are different: we map them to CSP and provision around your agreement dates (see the EA to CSP guide).",
  },
  {
    q: "How does billing work?",
    a: "Calendar-month billing, one month in advance, with daily-rate proration for mid-month starts and changes, on Net 30 terms. Every invoice and statement is in HubX with a PDF download.",
  },
  {
    q: "Which commitment terms are available?",
    a: "Monthly, annual, and triennial terms where Microsoft offers them, under the New Commerce Experience (NCE) for license-based subscriptions. Azure consumption is billed through an Azure plan.",
  },
  {
    q: "Do you quote nonprofit and education pricing?",
    a: "Yes. Commercial, Nonprofit, and Education qualification types exist in the catalog, and HubX only shows a customer the offers they are qualified to buy.",
  },
  {
    q: "Is pricing direct outside North America?",
    a: "MSP Hub’s direct-bill status covers North America. MSP Hub UK Limited transacts Microsoft licensing as a CSP indirect reseller.",
  },
  {
    q: "How quickly will I hear back on a quote?",
    a: "The licensing desk replies during business hours, US Central and Eastern.",
    confirm: "quoteResponse",
  },
];

/* ------------------------------------------------------------------ */
/* Switch                                                               */
/* ------------------------------------------------------------------ */

/** Where an estate is bought today; a row links out when its path is a different page. */
export type SwitchOrigin = { title: string; body: string; link?: Citation };

export const switchPage = {
  eyebrow: "Switch to MSP Hub · partner-to-partner transfer",
  title: "Already buying Microsoft somewhere else? Send us your current invoice.",
  lead: "We return a line-by-line comparison and a transfer plan. Nothing gets re-bought: subscriptions, terms, and renewal dates move intact by partner-to-partner transfer, and everything is visible in HubX from the first billing cycle.",
  movingFrom: [
    { title: "A distributor-transacted MSP", body: "Your MSP buys through a distributor and resells to you. The same subscriptions move to MSP Hub\u2019s direct tenant." },
    { title: "Another CSP partner", body: "Partner-to-partner transfers move license-based subscriptions and Azure plans between CSP partners." },
    { title: "Microsoft direct", body: "Subscriptions bought from Microsoft move to CSP with the same tenant, users, and data in place." },
    {
      title: "An Enterprise Agreement via an LSP",
      body: "Enterprise Agreements are transacted by a Licensing Solution Provider, so the path is different: we map your estate to CSP subscriptions and plan the move around your agreement dates.",
      link: { label: "Read the EA to CSP guide", href: "/licensing/ea-to-csp" },
    },
  ] satisfies SwitchOrigin[],
  /** The MSP and VAR door on /licensing/switch: a whole book of customers, not one estate. */
  book: {
    eyebrow: "MSPs and VARs",
    title: "Moving a whole book of customers?",
    lead: "Customer subscriptions move to MSP Hub’s direct tenant customer by customer, in batches under Microsoft’s per-request limit, with your current partner approving each one. Nothing is re-bought and terms carry over.",
  },
  /** "On this page" links in the hero; each href is a section id on /licensing/switch. */
  anchors: [
    { label: "Where from", href: "#moving-from" },
    { label: "How it works", href: "#how-it-works" },
    { label: "What comes back", href: "#comparison" },
    { label: "Send your invoice", href: "#send-invoice" },
    { label: "Moving a book", href: "#moving-a-book" },
    { label: "Questions", href: "#faq" },
  ],
  comparison: {
    title: "What comes back",
    items: [
      "Every line on your current invoice matched to the equivalent SKU, quantity, and term",
      "Your current price next to MSP Hub\u2019s price, line by line",
      "A transfer plan with the renewal dates and the order the subscriptions move in",
      "Optimization notes where we see them: consolidation, right-sizing, add-on cleanup",
      "What you will see in HubX once the transfer completes",
    ],
  },
  privacyNote:
    "Your invoice is stored privately and shared with MSP Hub\u2019s deal desk only, through an expiring link. No public URLs, no newsletters, no sharing your details.",
};

export const switchSteps = [
  { title: "Send your invoice or license export", body: "Upload your current Microsoft invoice or a license export. A PDF, spreadsheet, or CSV is enough to start." },
  { title: "Get a line-by-line comparison", body: "The deal desk returns a comparison against your current invoice and a transfer plan." },
  { title: "Accept the reseller relationship", body: "You accept MSP Hub as reseller from a link. Nothing changes in your tenant until you do." },
  { title: "We request the transfer", body: "We request the partner-to-partner transfer from your current partner. Subscriptions, terms, and renewal dates move intact." },
  { title: "Billing starts with the next cycle", body: "Everything is visible in HubX: every subscription, renewal, invoice, and statement." },
];

export const switchFaq: LicensingFaq[] = [
  {
    q: "Will my licenses go down during the switch?",
    a: "No. Partner-to-partner transfers move billing ownership without interrupting the service. Users keep working throughout.",
  },
  {
    q: "Do I re-buy anything?",
    a: "No. Existing subscriptions transfer with their terms and renewal dates. New purchases, if you want any, go through the HubX catalog.",
  },
  {
    q: "How long does it take?",
    a: "The timeline is bounded by your acceptance of the reseller relationship and the open transfer window, typically within one billing cycle.",
    confirm: "onboardingWording",
  },
  {
    q: "What happens with my current partner?",
    a: "We send the partner-to-partner transfer request to them, and they approve it in Partner Center. If they decline or do not respond, the request expires after 30 days and we work the next step with you.",
  },
  {
    q: "What if I am on an Enterprise Agreement?",
    a: "Enterprise Agreements are transacted by a Licensing Solution Provider rather than a CSP partner, so the path is different: we map your estate to CSP subscriptions and plan the move around your agreement dates. See the EA to CSP guide.",
  },
  {
    q: "Is my invoice kept private?",
    a: "Yes. Uploads are stored privately and shared with the deal desk through an expiring link. Nothing is published and nothing is shared outside MSP Hub.",
  },
];

/* ------------------------------------------------------------------ */
/* EA → CSP                                                             */
/* ------------------------------------------------------------------ */

export const eaToCsp = {
  eyebrow: "Enterprise Agreement to CSP",
  title: "From an Enterprise Agreement to CSP, without a reset.",
  lead: "Mid-market and enterprise organizations move Enterprise Agreements transacted by a Licensing Solution Provider to Microsoft\u2019s Cloud Solution Provider program for flexibility, support, and services from one team. MSP Hub runs the transition as a CSP direct-bill partner.",
  reasons: [
    {
      title: "Flexibility per workload",
      body: "Mix monthly, annual, and triennial terms where Microsoft offers them, workload by workload, instead of one enterprise-wide agreement on one anniversary.",
    },
    {
      title: "A direct support path",
      body: "MSP Hub bills, supports, and provisions directly and escalates to Microsoft Premier support itself. No distributor layer between you and a fix.",
    },
    {
      title: "Services from the same team",
      body: "Migrations, security, Azure, and managed operations from the team that holds the licensing, with every project starting from a licensing review in HubX.",
    },
    {
      title: "Visibility you did not have",
      body: "Every subscription, term, renewal date, and invoice in HubX, with scheduled reports and HubAI for questions about your own estate.",
    },
  ],
  steps: [
    { title: "Licensing review", body: "We map every Enterprise Agreement SKU and quantity to its CSP equivalent in HubX and show the two side by side." },
    { title: "Plan the timing", body: "The cutover is planned around your agreement dates so coverage never lapses and nothing is paid twice." },
    { title: "Accept the reseller relationship", body: "You accept MSP Hub as reseller from a link. Your tenant, users, and data stay where they are." },
    { title: "Provision in CSP", body: "Subscriptions are purchased through the HubX catalog at the terms you chose and assigned in your existing tenant." },
    { title: "Run it in HubX", body: "Renewals, invoices, statements, and the Service Desk from one portal, with MSP Hub\u2019s services bench behind it." },
  ],
  compare: {
    title: "What to put side by side",
    items: [
      "Per-SKU pricing with no distributor layer, against your current agreement",
      "The term mix: which workloads want monthly flexibility and which want annual or triennial pricing",
      "The support path: who you call, and how an issue reaches Microsoft",
      "Services bundled with the licensing: migrations, security, managed operations",
      "Renewal visibility: what renews when, and who sees it",
    ],
  },
  citations: [microsoftLearn.cspOverview, microsoftLearn.partnerRelationships, microsoftLearn.transfers],
  /** "On this page" links in the hero; each href is a section id on /licensing/ea-to-csp. */
  anchors: [
    { label: "What changes", href: "#reasons" },
    { label: "Steps", href: "#steps" },
    { label: "Comparison", href: "#comparison" },
    { label: "Send your estate", href: "#send-estate" },
  ],
  /** The Microsoft Learn–cited customer guide is a pending asset; this page carries interim copy until it arrives. */
  confirm: "eaCspGuide" as const satisfies ConfirmId,
};

/* ------------------------------------------------------------------ */
/* Beyond Microsoft                                                     */
/* ------------------------------------------------------------------ */

export type EcosystemCategory = { title: string; vendors: string[]; body: string };

/** Non-Microsoft procurement (handoff §4 row, §1.2 distribution & vendors). Vendor names render as text, never logos, until permission exists. */
export const beyondMicrosoft = {
  eyebrow: "Beyond Microsoft",
  title: "One partner, one invoice.",
  lead: "Beyond Microsoft, MSP Hub procures and supports productivity, security, networking, and hardware from the vendors you already run, quoted by the same deal desk and delivered by the same team.",
  categories: [
    {
      title: "Productivity & collaboration",
      vendors: ["Google Workspace"],
      body: "For organizations that stay on Google Workspace or run both, with Google Workspace to Microsoft 365 migrations from professional services when the time comes.",
    },
    {
      title: "Creative & documents",
      vendors: ["Adobe"],
      body: "Adobe subscriptions and renewals alongside your Microsoft licensing, so creative teams and finance see one renewal calendar.",
    },
    {
      title: "Networking & security",
      vendors: ["Cisco Meraki", "Fortinet"],
      body: "Firewalls, switching, and wireless quoted and renewed with the rest of the estate.",
    },
    {
      title: "Endpoint & email security",
      vendors: ["Coro"],
      body: "Coro is a publisher in the HubX catalog, so Coro subscriptions can be ordered and billed next to Microsoft.",
    },
    {
      title: "Virtualization & app delivery",
      vendors: ["Citrix"],
      body: "Citrix licensing and renewals for environments that still depend on them, with Azure Virtual Desktop and Windows 365 as the path forward.",
    },
    {
      title: "Hardware & asset lifecycle",
      vendors: ["Dell", "Lenovo"],
      body: "Laptops, desktops, and servers procured through our distribution relationships, with Intune and Autopilot provisioning from the services team.",
    },
  ] satisfies EcosystemCategory[],
  howItWorks: [
    { title: "Tell the deal desk what you run", body: "A renewal, a refresh, or a new project. Vendor, quantities, and dates are enough." },
    { title: "One quote, one partner", body: "The deal desk prices it through MSP Hub\u2019s distribution relationships and returns one quote." },
    { title: "Delivered and supported", body: "Hardware ships; subscriptions are provisioned; the services team configures what needs configuring." },
  ],
};

/* ------------------------------------------------------------------ */
/* Quote and switch forms                                               */
/* ------------------------------------------------------------------ */

/** Accepted invoice uploads (handoff §8): PDF, spreadsheet, or CSV, 10 MB max. */
export const invoiceUpload = {
  maxBytes: 10 * 1024 * 1024,
  accept: ".pdf,.xlsx,.xls,.csv",
  mimeTypes: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv",
  ],
  extensions: ["pdf", "xlsx", "xls", "csv"],
  hint: "PDF, XLSX, XLS, or CSV up to 10 MB.",
};

export const quotePage = {
  eyebrow: "Microsoft licensing quote",
  title: "Tier-1 direct pricing on Microsoft 365, Azure, and Copilot.",
  lead: "Tell us what you run, who you buy from today, and what renews when. A licensing specialist replies with pricing, the right plan mix, and any savings we can see.",
  why: [
    "Microsoft CSP direct-bill partner: no distributor layer in the price",
    "Existing subscriptions transfer; nothing is re-bought",
    "Every license managed, renewed, and optimized in HubX",
    "Migration and managed services from the same team",
  ],
};
