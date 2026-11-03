/** Homepage copy for the Ink & Glass sequence. Facts follow the approved spec and the private handoff. */

export const homeHero = {
  eyebrow: "Microsoft CSP direct-bill partner · Services · Development",
  title: ["Your single", "technology", "partner for", "everything", "Microsoft."],
  lead: "Licensing, cloud, security, AI, and managed operations — bought and run through one partner and one team. MSP Hub delivers the services; HubX, our portal, puts your Microsoft estate in one place.",
  primary: { label: "Talk to MSP Hub", href: "#talk-to-msphub" },
  secondary: { label: "Explore what MSP Hub does", href: "#engines" },
  platforms: "Microsoft 365 · Azure · Copilot · Dynamics",
} as const;

export const homeProof = [
  { id: "since", value: "1999", label: "Since 1999" },
  { id: "csp", value: "Direct-bill", label: "Microsoft CSP direct-bill partner — North America" },
  { id: "companies", value: "478+", label: "Companies served" },
  { id: "licenses", value: "600K+", label: "Microsoft licenses managed" },
] as const;

export const homeOutcomes = [
  {
    n: "01",
    title: "Consolidate licensing.",
    body: "Move an existing Microsoft estate by partner-to-partner transfer. Subscriptions are not re-bought, and terms carry over.",
    href: "/licensing/switch",
  },
  {
    n: "02",
    title: "Improve visibility.",
    body: "See subscriptions, renewals, invoices, and service activity in one portal.",
    href: "/hubx",
  },
  {
    n: "03",
    title: "Reduce waste.",
    body: "Right-size Microsoft 365, Copilot, Teams Phone, and add-ons with the team that runs the estate.",
    href: "/services",
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
  },
  {
    id: "business",
    label: "Businesses",
    body: "Buy and run Microsoft licensing directly, with migration and managed services from the same team.",
    href: "/licensing",
  },
  {
    id: "csp",
    label: "Direct-bill CSPs",
    body: "Run HubX on your own Partner Center tenant.",
    href: "/partners/platform",
  },
  {
    id: "advisor",
    label: "Advisors & agents",
    body: "Bring the opportunity. MSP Hub sells and delivers.",
    href: "/partners/agents",
  },
] as const;

export const homeHubx = {
  title: "The operating view into your Microsoft estate.",
  lead: "HubX, powered by MSP Hub, brings customer products, purchasing, and read-only AI answers into one portal.",
} as const;

export const homeProfessional = {
  title: "Plan and deliver the change.",
  process: ["Align", "Plan", "Deliver", "Validate & Transition"],
  scope: [
    "Microsoft 365 and Exchange migrations",
    "Tenant-to-tenant merges",
    "Google Workspace to Microsoft 365",
    "Intune and Autopilot",
    "Teams Phone",
    "Windows 365 and Azure Virtual Desktop",
    "Defender",
    "Purview",
    "Conditional Access with Entra ID governance",
    "Power Platform / Power BI",
    "Fabric architecture",
  ],
  href: "/services/professional",
} as const;

export const homeManaged = {
  title: "Operate what comes next.",
  process: ["Monitor", "Respond", "Report", "Optimize"],
  points: [
    "24/7 monitoring and incident management for managed environments.",
    "Licensing and billing support during business hours.",
    "Service Desk in HubX: tickets with priority and SLA state, visible to the customer and the partner.",
    "Direct escalation to Microsoft Premier support.",
  ],
  href: "/services/managed",
} as const;

export const homeDevelopment = {
  title: "Build the capability the estate still needs.",
  process: ["Discover", "Build", "Ship", "Improve"],
  scope: [
    "Custom .NET and cloud-native applications",
    "CI/CD and infrastructure as code",
    "Copilot work",
    "Purpose-built agents and automation",
    "Claude and Anthropic implementations",
  ],
  href: "/services/development",
} as const;

export const homeTrust = [
  "Founded in 1999 as ReadyNetworks.",
  "Microsoft CSP direct-bill partner — North America.",
  "478+ companies served.",
  "600K+ Microsoft licenses managed.",
  "One team across licensing, projects, managed operations, and development.",
] as const;

export const routeD = {
  title: "Talk to MSP Hub.",
  lead: "Start with who you are. We’ll route you to the right licensing, platform, services, or partner conversation.",
  routes: [
    { label: "I run an MSP or VAR", href: "/partners/reseller" },
    { label: "I buy for a business", href: "/licensing" },
    { label: "I operate a direct-bill CSP", href: "/partners/platform" },
    { label: "I advise clients", href: "/partners/agents" },
    { label: "I’m not sure yet", href: "/contact" },
  ],
} as const;
