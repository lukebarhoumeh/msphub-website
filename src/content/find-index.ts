/**
 * Quick Find index (spec §2.3): routes only, grouped the way the header is.
 * Kept as plain strings so the palette's lazy chunk carries no content
 * modules; add a line when a page ships. Descriptions and keywords are what
 * the scorer matches after the label, so put the words people actually type
 * there ("transfer", "NCE", "margin").
 */
export type FindGroup = "Audiences" | "What we do" | "HubX" | "Licensing" | "Partners" | "Company" | "Actions" | "Insights";

export type FindEntry = {
  label: string;
  href: string;
  group: FindGroup;
  description?: string;
  keywords?: string[];
};

export const findGroups: readonly FindGroup[] = ["Audiences", "Actions", "What we do", "Licensing", "HubX", "Partners", "Company", "Insights"];

export const findIndex: readonly FindEntry[] = [
  // Audiences
  { group: "Audiences", label: "MSPs", href: "/partners/reseller", description: "Resell at Tier-1 direct pricing; every customer tenant in one console", keywords: ["MSP", "managed service provider", "reseller", "margin", "multi-tenant"] },
  { group: "Audiences", label: "VARs", href: "/partners/reseller#vars", description: "Licensing margin on hardware and projects, without a licensing desk", keywords: ["VAR", "value-added reseller", "hardware", "recurring revenue"] },
  { group: "Audiences", label: "Businesses", href: "/for/businesses", description: "Buy direct: licensing, migration, and managed services from one team", keywords: ["business", "end customer", "IT director", "finance", "buy direct"] },
  { group: "Audiences", label: "Direct-bill CSPs", href: "/partners/platform", description: "Run HubX on your own Partner Center tenant", keywords: ["CSP", "Partner Center", "platform", "own tenant", "direct-bill"] },
  { group: "Audiences", label: "Advisors & agents", href: "/partners/agents", description: "Bring the opportunity; MSP Hub sells and delivers", keywords: ["advisor", "agent", "TSD", "referral", "commission", "consultant"] },

  // Actions
  { group: "Actions", label: "Get a licensing quote", href: "/licensing/quote#quote-form", description: "Tier-1 direct pricing from the licensing desk", keywords: ["quote", "pricing", "price"] },
  { group: "Actions", label: "Send your invoice", href: "/licensing/switch#send-invoice", description: "A line-by-line comparison and a transfer plan", keywords: ["invoice", "compare", "comparison", "switch", "upload"] },
  { group: "Actions", label: "Schedule a HubX demo", href: "/demo", description: "Thirty minutes, your tenant scenario", keywords: ["demo", "book", "walkthrough", "meeting"] },
  { group: "Actions", label: "Apply to partner", href: "/partners/apply", description: "Reseller, agent, or platform program", keywords: ["apply", "application", "partner program"] },
  { group: "Actions", label: "Start a service inquiry", href: "/services#inquiry", description: "Scoping call with a solutions engineer", keywords: ["inquiry", "scoping", "project", "engineer"] },
  { group: "Actions", label: "Log in to HubX", href: "https://hubx.msphub.com", description: "hubx.msphub.com", keywords: ["login", "log in", "sign in", "portal"] },

  // What we do
  { group: "What we do", label: "HubX", href: "/hubx", description: "The Microsoft portal for licensing, procurement, and spend", keywords: ["platform", "portal", "product"] },
  { group: "What we do", label: "Services overview", href: "/services", description: "Three practices, plus licensing", keywords: ["services"] },
  { group: "What we do", label: "Professional Services", href: "/services/professional", description: "Microsoft 365, Azure, security and identity, data platform", keywords: ["migration", "tenant-to-tenant", "Intune", "Autopilot", "Azure Virtual Desktop", "Defender", "Purview", "Power BI", "Fabric", "project"] },
  { group: "What we do", label: "Managed Services", href: "/services/managed", description: "Monitoring and incident management, run to agreed SLAs", keywords: ["managed", "monitoring", "SLA", "24/7", "incident", "operations", "NOC"] },
  { group: "What we do", label: "Development & AI", href: "/services/development", description: "Applications, DevOps, and AI development", keywords: ["development", "software", ".NET", "DevOps", "CI/CD", "Copilot", "agents", "AI", "Claude"] },

  // Licensing
  { group: "Licensing", label: "Licensing overview", href: "/licensing", description: "7,600+ SKUs at Tier-1 direct pricing", keywords: ["Microsoft 365", "Azure", "Copilot", "Dynamics", "catalog", "nonprofit", "education", "CSP"] },
  { group: "Licensing", label: "Switch to MSP Hub", href: "/licensing/switch", description: "Send your invoice; nothing is re-bought", keywords: ["switch", "transfer", "partner-to-partner", "P2P", "move", "distributor"] },
  { group: "Licensing", label: "EA to CSP", href: "/licensing/ea-to-csp", description: "Leave an LSP-run Enterprise Agreement", keywords: ["EA", "Enterprise Agreement", "LSP", "enterprise"] },
  { group: "Licensing", label: "Beyond Microsoft", href: "/licensing/beyond-microsoft", description: "One partner, one invoice", keywords: ["Google Workspace", "Adobe", "Cisco Meraki", "Fortinet", "Coro", "Citrix", "Dell", "Lenovo", "hardware"] },
  { group: "Licensing", label: "Get a quote", href: "/licensing/quote", description: "Pricing from the licensing desk", keywords: ["quote", "pricing"] },

  // HubX
  { group: "HubX", label: "HubX features", href: "/hubx/features", description: "Everything HubX does, module by module", keywords: ["modules", "features"] },
  { group: "HubX", label: "Home & performance", href: "/hubx/features/home", description: "Customers, subscriptions, licenses, revenue, forecast", keywords: ["dashboard", "overview", "forecast", "KPI"] },
  { group: "HubX", label: "Customers", href: "/hubx/features/customers", description: "Every customer tenant, GDAP, partner-to-partner transfers", keywords: ["tenants", "GDAP", "transfer", "P2P", "customer products"] },
  { group: "HubX", label: "Catalog", href: "/hubx/features/catalog", description: "Product families and the offers a customer may buy", keywords: ["SKU", "catalog", "offers", "qualification"] },
  { group: "HubX", label: "Quotations", href: "/hubx/features/quotations", description: "Quote, approve, cart, order", keywords: ["quote", "approval", "order"] },
  { group: "HubX", label: "Billing & invoices", href: "/hubx/features/billing", description: "Partner-branded invoices, statements, margin", keywords: ["invoice", "billing", "statement", "margin", "remittance", "PDF"] },
  { group: "HubX", label: "Dashboards & reports", href: "/hubx/features/dashboards-reports", description: "Custom dashboards and scheduled reports", keywords: ["reports", "dashboards", "scheduled", "CSV"] },
  { group: "HubX", label: "Service Desk", href: "/hubx/features/service-desk", description: "Tickets with priority and SLA state", keywords: ["tickets", "support", "SLA", "service desk"] },
  { group: "HubX", label: "HubAI", href: "/hubx/features/hubai", description: "Ask your estate a question; get a table", keywords: ["AI", "assistant", "questions", "HubAI"] },
  { group: "HubX", label: "Security & administration", href: "/hubx/security", description: "SSO, roles, audit logs, ISO/IEC 27001:2022", keywords: ["SSO", "Entra", "Okta", "audit", "security", "roles", "admin", "ISO 27001", "certification", "compliance"] },
  { group: "HubX", label: "What's new in HubX", href: "/hubx/whats-new", description: "Release notes", keywords: ["release", "changelog", "updates"] },

  // Partners
  { group: "Partners", label: "Partner programs", href: "/partners", description: "Resell, refer, or run the platform", keywords: ["partner", "program", "channel"] },
  { group: "Partners", label: "Reseller partner", href: "/partners/reseller", description: "MSPs and VARs, with or without Microsoft revenue today", keywords: ["reseller", "MSP", "VAR"] },
  { group: "Partners", label: "Agent / referral partner", href: "/partners/agents", description: "Advisors and consultants", keywords: ["agent", "referral", "advisor"] },
  { group: "Partners", label: "Platform partner", href: "/partners/platform", description: "HubX on your own Partner Center tenant", keywords: ["platform", "CSP", "Partner Center"] },
  { group: "Partners", label: "Apply to partner", href: "/partners/apply", description: "Reseller, agent, or platform application", keywords: ["apply", "application", "onboarding"] },
  { group: "Partners", label: "Register an opportunity", href: "/contact?topic=partnership#contact-form", description: "Onboarded partners: contact form, topic Partnership", keywords: ["register", "deal registration", "deal", "opportunity", "referral"] },

  // Company
  { group: "Company", label: "About MSP Hub", href: "/about", description: "Since 1999. Built by an MSP, for the people who run Microsoft.", keywords: ["about", "company", "history", "leadership", "ReadyNetworks"] },
  { group: "Company", label: "Insights", href: "/insights", description: "Licensing rules, transfers, and company news", keywords: ["blog", "news", "articles"] },
  { group: "Company", label: "Support", href: "/support", description: "Service Desk, the licensing and billing desk, Microsoft escalation", keywords: ["support", "help", "hours", "escalation", "Premier"] },
  { group: "Company", label: "Contact", href: "/contact", description: "Sales, billing, transfers, partnership", keywords: ["contact", "email", "phone", "sales"] },
  { group: "Company", label: "Schedule a demo", href: "/demo", description: "See HubX in 30 minutes", keywords: ["demo"] },

  // Insights (registry: src/content/insights/index.ts)
  { group: "Insights", label: "NCE explained: the seven-day window, seat reductions, and terms", href: "/insights/nce-explained", keywords: ["NCE", "New Commerce", "cancellation", "seat reduction", "terms"] },
  { group: "Insights", label: "Partner-to-partner transfers: what moves, what doesn't, and how long it takes", href: "/insights/partner-to-partner-transfers", keywords: ["transfer", "P2P", "partner-to-partner"] },
  { group: "Insights", label: "Unlocking business productivity with Microsoft 365", href: "/insights/unlocking-business-productivity-with-microsoft-365", keywords: ["Microsoft 365", "productivity"] },
  { group: "Insights", label: "Introducing MSP Hub: READY is now known as MSP Hub", href: "/insights/introducing-msp-hub", keywords: ["rebrand", "READY", "ReadyNetworks"] },
];
