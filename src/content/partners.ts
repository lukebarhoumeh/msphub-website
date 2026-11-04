import type { ConfirmId } from "@/content/confirmations";

/**
 * Partner programs (handoff §1.3, §5.7, §6). No tiers are published; economics
 * copy carries no numbers; no reseller, MSP partner, or customer names appear
 * anywhere (decisions round 2, item 2).
 */
export type PartnerProgramId = "reseller" | "agent" | "platform";

export type PartnerProgram = {
  id: PartnerProgramId;
  name: string;
  who: string;
  gets: string[];
  href: string;
};

export const partnerPrograms: PartnerProgram[] = [
  {
    id: "reseller",
    name: "Reseller partner",
    who: "MSPs and VARs, with or without Microsoft revenue today",
    gets: [
      "Tier-1 direct pricing on the full catalog",
      "Every customer in HubX",
      "Partner-branded customer invoices with your own remittance details",
      "Margin per customer, and what changed since last period",
      "Partner-to-partner transfers run by MSP Hub's deal desk",
      "MSP Hub's services bench behind you",
    ],
    href: "/partners/reseller",
  },
  {
    id: "agent",
    name: "Agent / referral partner",
    who: "Advisors, technology-advisor agents, consultants",
    gets: [
      "Bring opportunities; MSP Hub sells and delivers",
      "Evergreen commission on licensing and services",
      "Weekly pipeline visibility",
    ],
    href: "/partners/agents",
  },
  {
    id: "platform",
    name: "Platform partner",
    who: "Direct-bill CSPs",
    gets: [
      "HubX on your own Partner Center tenant",
      "Quoting, provisioning, and billing reconciliation",
      "Dashboards, scheduled reports, and HubAI",
    ],
    href: "/partners/platform",
  },
];

export const partnerSteps = [
  { title: "Apply", body: "Tell us about your business, your customers, and the Microsoft workloads you sell today." },
  { title: "Onboard", body: "Tenants, pricing, billing, and training are set up in HubX with the partner team." },
  { title: "Transact or submit opportunities", body: "Sell and provision through HubX, or register opportunities for MSP Hub to sell and deliver." },
];

export const partnerEnablement = [
  "Product training on HubX",
  "Quoting support from the deal desk",
  "Co-selling with MSP Hub engineers on scoping calls",
  "Marketing collateral: company deck, services deck, “Why MSP Hub” brief",
];

/** Safe economics statement: no percentages, no pass-through rates, no margins. */
export const partnerEconomics =
  "Pricing is set as a pass-through off Microsoft list. You see partner price and MSRP side by side in HubX for every SKU.";

/* ------------------------------------------------------------------ */
/* Program pages                                                        */
/* ------------------------------------------------------------------ */

export type ProgramDetail = {
  id: PartnerProgramId;
  eyebrow: string;
  title: string;
  lead: string;
  /** The program's own voice: chapter titles, the secondary call to action, and the closing lead. */
  voice: {
    forWhomTitle: string;
    stepsTitle: string;
    secondary: { label: string; href: string };
    nextLead: string;
  };
  /** Who the program is for, in the partner's own terms. An `id` makes the row a deep link (`/partners/reseller#vars`). */
  forWhom: { id?: string; title: string; body: string }[];
  /** What the program includes, grouped for the detail page. */
  includes: { title: string; body: string; link?: { label: string; href: string } }[];
  /** Agent program only: the work an agent can bring, each linked to the page that explains it. */
  bring?: { title: string; body: string; href: string; linkLabel: string }[];
  /** Program-specific onboarding or working steps. */
  steps: { title: string; body: string }[];
  /** Commercial statement; never a number. */
  economics: { body: string; confirm?: ConfirmId };
  faq: { q: string; a: string; confirm?: ConfirmId }[];
  cta: { label: string; href: string };
  /** "On this page" links in the hero; each href is a chapter id on the program page. */
  anchors?: readonly { label: string; href: string }[];
};

export const programDetails: Record<PartnerProgramId, ProgramDetail> = {
  reseller: {
    id: "reseller",
    eyebrow: "Reseller partner · MSPs and VARs",
    title: "Resell Microsoft at Tier-1 direct pricing without building a licensing desk.",
    lead: "MSP Hub is a Microsoft CSP direct-bill partner. You sell through MSP Hub's direct tenant, MSP Hub bills you, you bill your customers, and HubX runs the rest: every customer tenant, order, renewal, invoice, and margin in one console, with a services bench behind you.",
    voice: {
      forWhomTitle: "Built for the way you already sell.",
      stepsTitle: "From application to the first billing run.",
      secondary: { label: "Schedule a HubX demo", href: "/demo" },
      nextLead: "Tell us about your business and your customers. The partner team replies with next steps and a call.",
    },
    forWhom: [
      { id: "msps", title: "MSPs with Microsoft customers", body: "You manage tenants today and want direct pricing, one console, and a bench for the projects you do not staff." },
      { id: "vars", title: "VARs adding recurring revenue", body: "You sell hardware and projects and want licensing margin without a licensing operation." },
      { id: "leaving-a-distributor", title: "MSPs leaving a distributor", body: "Your customers' subscriptions move to MSP Hub by partner-to-partner transfer; nothing is re-bought and terms carry over." },
    ],
    includes: [
      { title: "Tier-1 direct pricing on 7,600+ SKUs", body: "The full catalog at direct pricing, filtered per customer to what they are qualified to buy: commercial, nonprofit, or education." },
      { title: "Customer-facing invoices generated by HubX", body: "Invoices carry your brand and your own wire, ACH, or check details per billing subscription, with separate numbering from MSP Hub's invoice to you." },
      { title: "Margin on every invoice", body: "Partner cost, customer price, and gross margin per customer on the statement, plus what changed since last period." },
      { title: "Transfers and GDAP run in HubX", body: "Partner-to-partner transfers are run by MSP Hub's deal desk and tracked in-app alongside Granular Delegated Admin Privileges coverage and expiries." },
      { title: "Customer types and named discounts", body: "Group customers by type, apply named discount groups, and give customers their own portal access." },
      {
        title: "A services bench behind you",
        body: "Migrations, Azure projects, security work, and managed operations delivered under your relationship by MSP Hub's engineers.",
        link: { label: "See the services bench", href: "/services" },
      },
    ],
    steps: [
      { title: "Set up your organization", body: "Partner organization, users and roles, and single sign-on with your own identity provider." },
      { title: "Import or register customer tenants", body: "Register new customers or import existing tenants. Each customer accepts MSP Hub as reseller from a link." },
      { title: "Move or buy subscriptions", body: "Existing subscriptions move by partner-to-partner transfer; new purchases go through the catalog." },
      { title: "Configure billing and go live", body: "Billing subscriptions and remittance details are set, and margin reporting starts with the first billing run." },
    ],
    economics: { body: partnerEconomics },
    faq: [
      {
        q: "Who bills whom?",
        a: "MSP Hub bills you as the partner. HubX generates the invoices your customers receive, with your remittance details, and you collect from them.",
      },
      {
        q: "Do my customers see MSP Hub?",
        a: "Customers accept MSP Hub as the Microsoft reseller of record, which is how the CSP program works. Their invoices carry your brand and your remittance details, and they can have their own portal access.",
        confirm: "whiteLabel",
      },
      {
        q: "Are there partner tiers?",
        a: "One program, with pricing by volume. No tiers to climb.",
        confirm: "partnerTiers",
      },
      {
        q: "Can MSP Hub's services team work under my brand?",
        a: "Yes. Projects and managed operations are delivered under your customer relationship, with MSP Hub engineers on the scoping calls.",
      },
    ],
    cta: { label: "Apply as a reseller partner", href: "/partners/apply?program=reseller" },
    anchors: [
      { label: "For whom", href: "#for-whom" },
      { label: "What you get", href: "#includes" },
      { label: "In HubX", href: "#in-hubx" },
      { label: "Steps", href: "#steps" },
      { label: "Questions", href: "#faq" },
    ],
  },
  agent: {
    id: "agent",
    eyebrow: "Agent and referral partner · advisors and consultants",
    title: "Bring the opportunity. MSP Hub sells and delivers.",
    lead: "For technology advisors, agents sourced through technology services distributors, and consultants: register the opportunity, MSP Hub sells and delivers licensing and services, and you earn an evergreen commission with weekly visibility into the pipeline you brought in.",
    voice: {
      forWhomTitle: "Built for the way you already advise.",
      stepsTitle: "From application to your first registered opportunity.",
      secondary: { label: "Talk to the partner team", href: "/contact?topic=partnership#contact-form" },
      nextLead: "Tell us about your practice and the clients you advise.",
    },
    forWhom: [
      { id: "advisors", title: "Technology advisors and agents", body: "You advise clients on telecom, cloud, and IT and want a Microsoft licensing and services partner that will not compete with you." },
      { id: "consultants", title: "Consultants and fractional IT leaders", body: "You see the licensing and migration needs first and want a single team to hand them to." },
      { id: "referrals", title: "Referral relationships", body: "You introduce; MSP Hub scopes, sells, and delivers, and reports back weekly." },
    ],
    includes: [
      {
        title: "Deal registration with the partner team",
        body: "Register an opportunity through the contact form (topic: Partnership); it goes straight into MSP Hub's CRM against your partner record.",
      },
      { title: "MSP Hub sells and delivers", body: "Licensing, migrations, security, Azure, and managed operations from one team, with MSP Hub engineers on the scoping calls." },
      { title: "Evergreen commission", body: "Evergreen commission on the licensing and services you bring in." },
      { title: "Weekly pipeline visibility", body: "A weekly view of every opportunity you registered and where it stands." },
      { title: "Collateral from the partner team", body: "Company deck, services deck, and the “Why MSP Hub” brief, sent by the partner team after onboarding." },
    ],
    /** One sentence each, lifted from the licensing and services pages they link to; nothing here is new. */
    bring: [
      {
        title: "Switches from another CSP partner",
        body: "Subscriptions move to MSP Hub by partner-to-partner transfer: nothing is re-bought, terms carry over, and the deal desk returns a line-by-line comparison from the current invoice.",
        href: "/licensing/switch",
        linkLabel: "Switch to MSP Hub",
      },
      {
        title: "Enterprise Agreement transitions",
        body: "For mid-market and enterprise organizations leaving an LSP-run Enterprise Agreement: flexibility, support, and services from one team.",
        href: "/licensing/ea-to-csp",
        linkLabel: "Read the EA to CSP guide",
      },
      {
        title: "Migrations, security, and Azure",
        body: "Microsoft 365, Azure, security and identity, and the data platform, delivered under a fixed-fee statement of work with a named project manager accountable end to end.",
        href: "/services/professional",
        linkLabel: "Professional services",
      },
      {
        title: "Managed operations",
        body: "Monitoring, alerting, and incident management around the clock for the environments MSP Hub manages, run to agreed SLAs with direct Microsoft escalation.",
        href: "/services/managed",
        linkLabel: "Managed services",
      },
      {
        title: "Applications and AI",
        body: "Application development, DevOps, and AI development as a managed engagement, from Copilot rollouts to purpose-built agents and automation.",
        href: "/services/development",
        linkLabel: "Development & AI",
      },
    ],
    steps: [
      { title: "Apply", body: "Tell us about your practice and the clients you advise." },
      { title: "Register opportunities", body: "Send each opportunity to the partner team through the contact form (topic: Partnership); MSP Hub scopes it with the client." },
      { title: "MSP Hub delivers, you see the pipeline", body: "Licensing and services are sold and delivered by MSP Hub; you receive weekly pipeline updates and your commission." },
    ],
    economics: {
      body: "Commission terms are agreed in the partner agreement.",
      confirm: "partnerTiers",
    },
    faq: [
      {
        q: "How do I register a deal?",
        a: "Through the contact form with the topic “Partnership” once you are onboarded. Each registration goes into MSP Hub's CRM against your partner record.",
      },
      {
        q: "What can I bring?",
        a: "Microsoft licensing of any size, including switches from another CSP partner and Enterprise Agreement transitions, plus migrations, security, Azure, and managed-services projects.",
      },
      {
        q: "How do I see what happened to an opportunity?",
        a: "Weekly pipeline visibility: every registered opportunity and where it stands.",
      },
    ],
    cta: { label: "Apply as an agent", href: "/partners/apply?program=agent" },
    anchors: [
      { label: "For whom", href: "#for-whom" },
      { label: "What you get", href: "#includes" },
      { label: "What you can bring", href: "#bring" },
      { label: "Steps", href: "#steps" },
      { label: "Questions", href: "#faq" },
    ],
  },
  platform: {
    id: "platform",
    eyebrow: "Platform partner · direct-bill CSPs",
    title: "Run HubX on your own Partner Center tenant.",
    lead: "Direct-bill CSPs license HubX as a platform: quoting, provisioning, billing reconciliation, dashboards, and HubAI on top of your own Microsoft Partner Center, with partner-branded customer invoicing and margin reporting per customer.",
    voice: {
      forWhomTitle: "Built for the tenant you already run.",
      stepsTitle: "From Partner Center connection to the first billing run.",
      secondary: { label: "Schedule a platform demo", href: "/demo" },
      nextLead: "Tell us about your tenant and your billing books.",
    },
    forWhom: [
      { id: "direct-bill-csps", title: "Direct-bill CSPs", body: "You hold your own Partner Center tenant and want the portal without building it." },
      { id: "billing-books", title: "CSPs with many billing books", body: "Billing subscriptions in HubX act as separate books with their own remittance details and reporting." },
      { id: "spreadsheets", title: "CSPs replacing spreadsheets", body: "Reconcile Microsoft's invoice to customer invoices and margin inside the platform, not in a workbook." },
    ],
    includes: [
      { title: "Native Partner Center integration", body: "Provisioning, Granular Delegated Admin Privileges, partner-to-partner transfers, and Microsoft Customer Agreement status through Partner Center APIs." },
      { title: "Quote → approve → cart → order", body: "Build quotes from the catalog, send them for customer approval, and convert approved quotes to orders with terms and conditions attached." },
      { title: "Billing and invoice reconciliation", body: "Invoice statements with partner amount, customer amount, and gross margin per customer billing subscription, with changes since last period." },
      { title: "Dashboards, eleven reports, HubAI", body: "Custom dashboards per billing subscription, eleven scheduled reports delivered by email, and HubAI answering questions about your own data." },
      { title: "Service Desk with SLA states", body: "Tickets shared across customer, partner, and your team, with priority and SLA state." },
      { title: "SSO, roles, and audit logs", body: "Single sign-on with Microsoft Entra ID, Google, or Okta; roles; audit logs on every organization and customer; multi-organization switching." },
    ],
    steps: [
      { title: "Connect your Partner Center", body: "HubX is set up against your own Partner Center tenant, with your organization, users, roles, and single sign-on." },
      { title: "Import your customers", body: "Existing customer tenants and subscriptions are imported; billing subscriptions become your books." },
      { title: "Configure billing", body: "Remittance details, customer types, named discounts, and invoice settings per billing subscription." },
      { title: "Go live", body: "Quoting, provisioning, invoicing, and reporting run in HubX; margin reporting starts with the first billing run." },
    ],
    economics: {
      body: "For direct-bill CSPs running their own Partner Center tenant, HubX is licensed separately. Talk to sales for terms.",
      confirm: "pricingWording",
    },
    faq: [
      {
        q: "Does HubX require buying licensing through MSP Hub?",
        a: "No. Platform partners run HubX against their own Partner Center tenant and their own Microsoft relationship.",
      },
      {
        q: "How is HubX for direct-bill CSPs priced?",
        a: "HubX is licensed separately for direct-bill CSPs on their own tenant. Talk to sales for terms.",
        confirm: "pricingWording",
      },
      {
        q: "Which identity providers does HubX support?",
        a: "Microsoft Entra ID, Google, and Okta through OpenID Connect, with managed domains to route users to the right identity provider.",
      },
      {
        q: "Can I see it before committing?",
        a: "Yes. Start with a 30-minute platform demo on demo data, then talk to sales about running HubX against your own tenant.",
      },
    ],
    cta: { label: "Apply as a platform partner", href: "/partners/apply?program=platform" },
    anchors: [
      { label: "For whom", href: "#for-whom" },
      { label: "What you get", href: "#includes" },
      { label: "In HubX", href: "#in-hubx" },
      { label: "Steps", href: "#steps" },
      { label: "Questions", href: "#faq" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Apply form options                                                   */
/* ------------------------------------------------------------------ */

export const programOptions = partnerPrograms.map((p) => ({ value: p.id, label: p.name, description: p.who }));

export const partnerSizeOptions = [
  { value: "none", label: "None yet" },
  { value: "1-10", label: "1–10 customer tenants" },
  { value: "11-50", label: "11–50 customer tenants" },
  { value: "51-200", label: "51–200 customer tenants" },
  { value: "200+", label: "200+ customer tenants" },
] as const;

export const partnerRegionOptions = [
  { value: "us", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "other", label: "Elsewhere" },
] as const;

export const programIds = partnerPrograms.map((p) => p.id) as [PartnerProgramId, ...PartnerProgramId[]];

export const applyPage = {
  eyebrow: "Partner application",
  title: "Apply to partner with MSP Hub.",
  lead: "Tell us about your business, your customers, and how you want to work with MSP Hub. The partner team replies with next steps and a call.",
  nextSteps: partnerSteps,
};
