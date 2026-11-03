/** Homepage copy for the continuous-canvas sequence. Facts follow the approved spec and the private handoff. */

export const homeHero = {
  eyebrow: "Microsoft CSP direct-bill partner · Services · Development",
  title: ["Your single", "technology", "partner for", "everything", "Microsoft."],
  lead: "Licensing, cloud, security, AI, and managed operations, bought and run through one partner and one team. MSP Hub delivers the services; HubX, our portal, puts your Microsoft estate in one place.",
  primary: { label: "Talk to MSP Hub", href: "#talk-to-msphub" },
  secondary: { label: "Send us your invoice", href: "/licensing/switch" },
  platforms: "Microsoft 365 · Azure · Copilot · Dynamics",
} as const;

export const homeProof = [
  { id: "since", value: "1999", label: "Since 1999" },
  { id: "csp", value: "Direct-bill", label: "Microsoft CSP direct-bill partner — North America" },
  { id: "companies", value: "478+", label: "Companies served" },
  { id: "licenses", value: "600K+", label: "Microsoft licenses managed" },
] as const;

/** The three outcomes, each paired with the HubX screen that shows it (the pinned sequence). */
export const homeOutcomes = [
  {
    n: "01",
    title: "Consolidate licensing.",
    body: "Move an existing Microsoft estate by partner-to-partner transfer. Subscriptions are not re-bought, and terms carry over.",
    href: "/licensing/switch",
    capture: "customerProductsHubx",
  },
  {
    n: "02",
    title: "Improve visibility.",
    body: "See subscriptions, renewals, invoices, and service activity in one portal.",
    href: "/hubx",
    capture: "homeWidgets",
  },
  {
    n: "03",
    title: "Reduce waste.",
    body: "Right-size Microsoft 365, Copilot, Teams Phone, and add-ons with the team that runs the estate.",
    href: "/services",
    capture: "dashboards",
  },
] as const;

export type EngineId = "hubx" | "professional" | "managed" | "development";

export const homeEngines: {
  id: EngineId;
  name: string;
  meta?: string;
  summary: string;
  href: string;
}[] = [
  {
    id: "hubx",
    name: "HubX",
    meta: "Flagship platform",
    summary: "Customer products, catalog purchasing, renewals, invoices, reports, and service activity in one portal. HubX, powered by MSP Hub.",
    href: "/hubx",
  },
  {
    id: "professional",
    name: "Professional Services",
    summary: "Microsoft 365 and Exchange migrations, tenant-to-tenant work, Intune and Autopilot, Azure and Windows 365, Defender, and Purview.",
    href: "/services/professional",
  },
  {
    id: "managed",
    name: "Managed Services",
    summary: "Monitoring and incident management for managed environments, with business-hours licensing and billing support and direct Microsoft escalation.",
    href: "/services/managed",
  },
  {
    id: "development",
    name: "Development & AI",
    summary: "Custom .NET and cloud-native applications, CI/CD, infrastructure as code, Copilot work, agents, and automation.",
    href: "/services/development",
  },
];

export const homeAudiences = [
  {
    id: "msp",
    label: "MSPs & VARs",
    body: "Resell Microsoft through MSP Hub’s direct tenant, with the services bench behind the portal.",
    href: "/partners/reseller",
    cta: "Reseller program",
  },
  {
    id: "business",
    label: "Businesses",
    body: "Buy and run Microsoft licensing directly, with migration and managed services from the same team.",
    href: "/for/businesses",
    cta: "For businesses",
  },
  {
    id: "csp",
    label: "Direct-bill CSPs",
    body: "Run HubX on your own Partner Center tenant.",
    href: "/partners/platform",
    cta: "Platform program",
  },
  {
    id: "advisor",
    label: "Advisors & agents",
    body: "Bring the opportunity. MSP Hub sells and delivers.",
    href: "/partners/agents",
    cta: "Agent program",
  },
] as const;

/** The switch offer, the sharpest offer on the site. */
export const homeSwitch = {
  eyebrow: "Switch to MSP Hub",
  title: "Already buying Microsoft somewhere else? Send us your invoice.",
  lead: "The deal desk returns a line-by-line comparison and a transfer plan. Nothing is re-bought: subscriptions, terms, and renewal dates move intact by partner-to-partner transfer.",
  /** Where people buy today, as text. Never a third-party logo. */
  providers: ["Pax8", "Ingram Micro", "TD SYNNEX", "Sherweb", "AppDirect", "D&H", "GoDaddy", "TechSoup", "Microsoft direct", "EA via an LSP"],
  cta: { label: "Send your invoice", href: "/licensing/switch#send-invoice" },
  secondary: { label: "How the transfer works", href: "/licensing/switch#how-it-works" },
  /** The shape of what comes back. Figures are the customer’s own, so the sample shows the columns, not numbers. */
  sample: {
    title: "Line-by-line comparison",
    columns: ["SKU", "Qty", "Term", "Current", "MSP Hub"],
    rows: [
      ["Microsoft 365 E3", "120", "Annual"],
      ["Microsoft 365 E5", "40", "Annual"],
      ["Business Premium", "85", "Monthly"],
      ["Teams Phone Standard", "60", "Annual"],
      ["Defender for Endpoint P2", "160", "Annual"],
      ["Copilot for Microsoft 365", "25", "Annual"],
    ],
    footer: "Your prices, side by side, with a transfer plan and optimization notes. Demo rows; your invoice sets the lines.",
  },
} as const;

/** Things a buyer can check without taking MSP Hub’s word for it. */
export const homeChecks = {
  title: "Things you can check.",
  lead: "The deal desk works from Microsoft’s own documentation, and the credentials are the ones Microsoft and the certification body issue.",
} as const;

/** The company close that follows every page. One line, one button, one email. */
export const routeD = {
  title: "Talk to MSP Hub.",
  lead: "Licensing, platform, services, or partnership: one inbox, a real reply, during business hours.",
  primary: { label: "Talk to MSP Hub", href: "/contact#contact-form" },
} as const;
