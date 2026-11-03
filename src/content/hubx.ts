/** HubX positioning (handoff §1.1). */
export const hubxTagline = "The command center for MSP scale.";
export const hubxLockup = "HubX, powered by MSP Hub";

/** Secondary navigation across the HubX pages. */
export const hubxNav = [
  { label: "Overview", href: "/hubx" },
  { label: "Features", href: "/hubx/features" },
  { label: "Security", href: "/hubx/security" },
  { label: "What's new", href: "/hubx/whats-new" },
] as const;

/** /hubx page copy (handoff §5.2). Section order follows the spec. */
export const hubxPage = {
  hero: {
    eyebrow: `The Microsoft portal · ${hubxLockup}`,
    title: "The Microsoft portal for licensing, procurement, and spend.",
    lead: "See every license, cost, renewal, and invoice in one place. Buy, provision, and manage directly at Tier-1 pricing. Ask HubAI instead of digging through portals. Built for MSPs managing many customers, and for businesses managing their own.",
    primary: { label: "Schedule a demo", href: "/demo" },
    secondary: { label: "Log in to HubX" },
    chips: ["Microsoft 365 · Azure · Copilot · Dynamics", "Tier-1 direct pricing", "For MSPs, businesses, and direct-bill CSPs"],
  },
  audiences: { eyebrow: "Who it's for", title: "One portal. Three ways to run Microsoft." },
  tour: {
    eyebrow: "Inside HubX",
    title: "The live product, with demo data.",
    lead: "Real HubX screens with demo data: customers, catalog, quotations, dashboards, reports, and HubAI.",
    screens: ["homeOverview", "customers", "customerProducts", "catalog", "quotations", "dashboards", "reports"],
    labels: ["Home", "Customers", "Products", "Catalog", "Quotations", "Dashboards", "Reports"],
  },
  modules: {
    eyebrow: "Modules",
    title: "Nine modules. One estate.",
    lead: "Every module below is in the product today, with its route, what it does, and where to read more.",
  },
  features: {
    eyebrow: "Capabilities",
    title: "Twelve things HubX does that the rest of the stack doesn't.",
    lead: "Ranked by how often partners ask for them. Each one links to the module that does it.",
  },
  steps: {
    eyebrow: "How it works",
    lead: "Existing subscriptions move by partner-to-partner transfer and the customer accepts the reseller relationship from a link, so timing depends on acceptance and the open transfer window.",
  },
  hubai: {
    eyebrow: "HubAI",
    title: "Ask your estate a question. Get a table in seconds.",
    lead: "HubAI answers questions about customers, products, orders, subscriptions, and HubX workflows from your own data, scoped to the billing subscription you select. Read-only today.",
    screens: ["hubai", "hubaiAnswer"],
    labels: ["Prompts", "Answer"],
  },
  trust: { eyebrow: "Integrations & trust", title: "API-first, built on Microsoft Partner Center." },
  licensing: { eyebrow: "Microsoft licensing", title: "Tier-1 direct pricing on 7,600+ SKUs." },
  faq: { eyebrow: "Questions", title: "Frequently asked" },
  cta: {
    eyebrow: "See it live",
    title: "See HubX in 30 minutes.",
    lead: "A live walkthrough of the portal with your tenant scenario, your licensing questions, and clear next steps. No obligation.",
  },
} as const;

/** /hubx/features index copy. */
export const hubxFeaturesPage = {
  hero: {
    eyebrow: `Features · ${hubxLockup}`,
    title: "Everything HubX does, module by module.",
    lead: "Nine modules. Each page shows real HubX screens with demo data, what you can do there, and the capabilities partners ask about most.",
  },
  modules: {
    eyebrow: "Modules",
    title: "Nine modules. One estate.",
    lead: "Pick a module to see the screens, the capabilities, and where it lives in hubx.msphub.com.",
  },
  features: hubxPage.features,
  cta: {
    eyebrow: "See it live",
    title: "See HubX in 30 minutes.",
    lead: "A live walkthrough of the modules above with your tenant scenario and your licensing questions. No obligation.",
  },
} as const;

/** Shared copy for the per-module pages under /hubx/features. */
export const hubxFeatureTemplate = {
  screens: { eyebrow: "In the product", title: "Real screens, demo data." },
  capabilities: { eyebrow: "What you can do", title: "Everything this module does today." },
  spotlight: { eyebrow: "Why it matters", title: "The capabilities partners ask about." },
  related: { eyebrow: "Keep exploring", title: "Next module" },
  cta: {
    eyebrow: "See it live",
    title: "See it in your own scenario.",
    lead: "A 30-minute walkthrough of HubX with your tenants, your customers, and your questions. No obligation.",
  },
} as const;

/** Home page HubX sections (handoff §5.1 items 2 and 6). */
export const hubxHome = {
  proof: {
    eyebrow: hubxLockup,
    title: "The live product, not a mock-up.",
    lead: "Every customer, subscription, license, and invoice in one portal. These are real HubX screens with demo data.",
    screens: ["homeOverview", "customers", "catalog", "quotations", "dashboards"],
    labels: ["Home", "Customers", "Catalog", "Quotations", "Dashboards"],
    links: [
      { label: "Explore HubX", href: "/hubx" },
      { label: "All features", href: "/hubx/features" },
    ],
  },
  spotlight: {
    eyebrow: "The Microsoft portal",
    title: "Consolidate licensing. See everything. Reduce waste.",
    lead: "HubX puts procurement, visibility, and optimization in one place, so IT, finance, and purchasing stop reconciling spreadsheets and start making data-driven decisions.",
    body: "For MSPs and VARs, every customer tenant in one console at Tier-1 direct pricing. Your customers see your brand on invoices and get their own portal access.",
    primary: { label: "Schedule a demo", href: "/demo" },
    secondary: { label: "Explore HubX", href: "/hubx" },
  },
} as const;

/** Three audiences plus the channel (handoff §1.3, §2 #3). */
export const hubxAudiences = [
  {
    id: "msp",
    who: "For MSPs & VARs",
    title: "Every customer tenant in one console.",
    body: "Resell Microsoft at Tier-1 direct pricing without building a licensing desk. Every customer tenant, order, renewal, invoice, and margin in one place, with MSP Hub's services bench behind you.",
    points: [
      "Tier-1 direct pricing on the full Microsoft catalog",
      "Multi-tenant management: licenses, orders, renewals per customer",
      "Customer-facing invoices generated by HubX with your own remittance details",
      "Margin per customer, and what changed since last period",
      "Partner-to-partner transfers run by MSP Hub's deal desk",
    ],
  },
  {
    id: "business",
    who: "For your business",
    title: "IT, finance, and procurement on the same page.",
    body: "Buy, see, and optimize your Microsoft licensing directly, and see exactly what you pay for, what renews when, and what it costs.",
    points: [
      "Self-service purchasing and provisioning through the catalog",
      "Subscription, term, and renewal visibility per SKU",
      "Invoices and statements with PDF download",
      "Service Desk tickets with priority and SLA state",
      "Migration and managed services from the same team",
    ],
  },
  {
    id: "direct-bill-csp",
    who: "For direct-bill CSPs",
    title: "Run HubX on your own Partner Center tenant.",
    body: "Direct-bill CSPs license HubX as a platform: quoting, provisioning, billing reconciliation, dashboards, and HubAI on top of your own Microsoft Partner Center.",
    points: [
      "Native Partner Center integration: provisioning, GDAP, P2P transfers, MCA status",
      "Billing subscriptions as separate books with their own remittance details",
      "SSO with your own identity provider: Microsoft Entra ID, Google, Okta",
      "Custom dashboards and eleven scheduled reports",
      "Multi-organization switching and audit logs everywhere",
    ],
  },
] as const;

/** Real onboarding sequence observed in the product (handoff §2 #4). */
export const hubxSteps = [
  {
    title: "Set up your organization",
    body: "Partner organization, users and roles, and single sign-on with your own identity provider.",
  },
  {
    title: "Register or import tenants",
    body: "Register new customers or import existing Microsoft tenants. The customer accepts MSP Hub as reseller from a link.",
  },
  {
    title: "Move or buy subscriptions",
    body: "Existing subscriptions move by partner-to-partner transfer (open transfers last about 30 days); new purchases go through the catalog.",
  },
  {
    title: "Configure billing and go live",
    body: "Billing subscription and remittance details are set; margin reporting starts with the first billing run.",
  },
];

/** Observed integrations and trust facts (handoff §2 #6). */
export const hubxIntegrations = [
  "Native Microsoft Partner Center integration: provisioning, GDAP, partner-to-partner transfers, Microsoft Customer Agreement status",
  "Single sign-on with Microsoft Entra ID, Google, or Okta (OIDC), with managed domains",
  "CSV export on every table; scheduled report delivery by email; invoice PDF download",
  "Service Desk ticketing shared across customer, partner, and MSP Hub",
];

/** Microsoft licensing families sold through HubX (handoff §5.2 chips + additions). */
export const licensingCatalog = [
  "Microsoft 365 E3",
  "Microsoft 365 E5",
  "Business Premium",
  "Microsoft 365 Copilot",
  "Defender",
  "Purview",
  "Intune & Entra ID",
  "Teams Phone",
  "Windows 365",
  "Windows Server & SQL Server",
  "Dynamics 365",
  "Power BI",
  "Azure plan",
];
