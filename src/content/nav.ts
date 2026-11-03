export type NavLink = { label: string; href: string; description?: string; meta?: string };

export const whatWeDoLinks: NavLink[] = [
  { label: "HubX", href: "/hubx", meta: "Flagship platform" },
  { label: "Professional Services", href: "/services/professional" },
  { label: "Managed Services", href: "/services/managed" },
  { label: "Development & AI", href: "/services/development" },
];

export const companyLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

export const serviceLinks: NavLink[] = [
  {
    label: "Services overview",
    href: "/services",
    description: "Three practices, plus licensing",
  },
  {
    label: "Professional Services",
    href: "/services/professional",
    description: "Microsoft 365, Azure, security, data",
  },
  {
    label: "Managed Services",
    href: "/services/managed",
    description: "Monitoring and incident management",
  },
  {
    label: "Development & AI",
    href: "/services/development",
    description: "Apps, DevOps, and AI development",
  },
];

export const licensingLinks: NavLink[] = [
  { label: "Licensing overview", href: "/licensing", description: "7,600+ SKUs at Tier-1 direct pricing" },
  { label: "Switch to MSP Hub", href: "/licensing/switch", description: "Send your invoice; nothing is re-bought" },
  { label: "EA to CSP", href: "/licensing/ea-to-csp", description: "Leave an LSP-run Enterprise Agreement" },
  { label: "Beyond Microsoft", href: "/licensing/beyond-microsoft", description: "One partner, one invoice" },
  { label: "Get a quote", href: "/licensing/quote", description: "Pricing from the licensing desk" },
];

export const partnerLinks: NavLink[] = [
  { label: "Partner programs", href: "/partners", description: "Resell, refer, or run the platform" },
  { label: "Reseller partner", href: "/partners/reseller", description: "MSPs and VARs selling Microsoft" },
  { label: "Agent / referral partner", href: "/partners/agents", description: "Advisors and consultants" },
  { label: "Platform partner", href: "/partners/platform", description: "HubX on your own Partner Center tenant" },
  { label: "Apply", href: "/partners/apply", description: "Deal registration and onboarding" },
];

export const audienceLinks: NavLink[] = [
  { label: "MSPs & VARs", href: "/partners/reseller", meta: "Resell" },
  { label: "Businesses", href: "/for/businesses", meta: "Buy direct" },
  { label: "Direct-bill CSPs", href: "/partners/platform", meta: "Run HubX" },
  { label: "Advisors & agents", href: "/partners/agents", meta: "Refer" },
];

export type PrimaryNavItem = NavLink & { children?: NavLink[] };

export const primaryNav: PrimaryNavItem[] = [
  { label: "What we do", href: "/services", children: whatWeDoLinks },
  { label: "Licensing", href: "/licensing" },
  { label: "Who we serve", href: "/#who-we-serve", children: audienceLinks },
  { label: "Partners", href: "/partners" },
  { label: "Company", href: "/about", children: companyLinks },
];

/** Footer per the handoff §4: Company · Services · HubX · Licensing. */
export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Insights", href: "/insights" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: serviceLinks,
  },
  {
    heading: "HubX",
    links: [
      { label: "Log in to HubX", href: "https://hubx.msphub.com" },
      { label: "Overview", href: "/hubx" },
      { label: "Features", href: "/hubx/features" },
      { label: "Security", href: "/hubx/security" },
      { label: "What's new", href: "/hubx/whats-new" },
      { label: "Schedule a demo", href: "/demo" },
    ],
  },
  {
    heading: "Licensing",
    links: [
      { label: "For businesses", href: "/for/businesses" },
      { label: "Switch to MSP Hub", href: "/licensing/switch" },
      { label: "EA to CSP", href: "/licensing/ea-to-csp" },
      { label: "Beyond Microsoft", href: "/licensing/beyond-microsoft" },
      { label: "Get a quote", href: "/licensing/quote" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
];
