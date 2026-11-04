export type NavLink = { label: string; href: string; description?: string; meta?: string };

/**
 * One row in the "Who we serve" header panel, the home router band, the
 * services router, and the footer: who, what they do here, where their page
 * is, and the first action on that page. One source for every router on the
 * site (spec §2.5): add an audience here and it appears everywhere.
 */
export type AudienceLink = NavLink & {
  id: "msp" | "var" | "business" | "csp" | "advisor";
  meta: string;
  description: string;
  action: { label: string; href: string };
};

export const audienceLinks: AudienceLink[] = [
  {
    id: "msp",
    label: "MSPs",
    meta: "Resell",
    href: "/partners/reseller",
    description: "Tier-1 direct pricing; every customer tenant in one console.",
    action: { label: "Apply as a reseller partner", href: "/partners/apply?program=reseller" },
  },
  {
    id: "var",
    label: "VARs",
    meta: "Resell",
    href: "/partners/reseller#vars",
    description: "Licensing margin on hardware and projects, without a licensing desk.",
    action: { label: "Apply as a reseller partner", href: "/partners/apply?program=reseller" },
  },
  {
    id: "business",
    label: "Businesses",
    meta: "Buy direct",
    href: "/for/businesses",
    description: "Licensing, migration, and managed services from one team.",
    action: { label: "Get a licensing quote", href: "/licensing/quote#quote-form" },
  },
  {
    id: "csp",
    label: "Direct-bill CSPs",
    meta: "Run HubX",
    href: "/partners/platform",
    description: "HubX on your own Partner Center tenant.",
    action: { label: "Schedule a platform demo", href: "/demo" },
  },
  {
    id: "advisor",
    label: "Advisors & agents",
    meta: "Refer",
    href: "/partners/agents",
    description: "Bring the opportunity. MSP Hub sells and delivers.",
    action: { label: "Talk to the partner team", href: "/contact?topic=partnership#contact-form" },
  },
];

export const whatWeDoLinks: NavLink[] = [
  { label: "HubX", href: "/hubx", meta: "Flagship platform", description: "Every license, cost, renewal, and invoice in one portal." },
  {
    label: "Professional Services",
    href: "/services/professional",
    meta: "Plan and deliver",
    description: "Microsoft 365, Azure, security and identity, and data platform projects under a fixed-fee statement of work.",
  },
  { label: "Managed Services", href: "/services/managed", meta: "Operate", description: "Monitoring and incident management, run to agreed SLAs." },
  { label: "Development & AI", href: "/services/development", meta: "Build", description: "Applications, DevOps, and AI development." },
];

export const companyLinks: NavLink[] = [
  { label: "About", href: "/about", description: "Since 1999. Built by an MSP, for the people who run Microsoft." },
  { label: "Insights", href: "/insights", description: "Licensing rules, transfers, and company news." },
  { label: "Support", href: "/support", description: "Service Desk, the licensing and billing desk, Microsoft escalation." },
  { label: "Contact", href: "/contact", description: "Sales, billing, transfers, partnership." },
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

/**
 * A top-level header item. Parents are buttons that open a panel; they never
 * navigate. `matches` lights the parent when the pathname starts with any
 * entry (so `/partners/reseller` lights "Who we serve"). `footer` rows sit
 * under a rule at the bottom of the panel.
 */
export type PrimaryNavItem = {
  id: string;
  label: string;
  matches: string[];
  children: NavLink[];
  footer?: NavLink[];
};

export const primaryNav: PrimaryNavItem[] = [
  {
    id: "what-we-do",
    label: "What we do",
    matches: ["/hubx", "/services"],
    children: whatWeDoLinks,
    footer: [{ label: "All services", href: "/services", description: "Three practices, plus licensing" }],
  },
  {
    id: "licensing",
    label: "Licensing",
    matches: ["/licensing"],
    children: licensingLinks,
    footer: [{ label: "Reselling Microsoft?", href: "/partners/reseller", description: "Partner pricing lives in the reseller program" }],
  },
  {
    id: "who-we-serve",
    label: "Who we serve",
    matches: ["/partners", "/for"],
    children: audienceLinks,
    footer: [
      { label: "Partner programs", href: "/partners", description: "Resell, refer, or run the platform" },
      { label: "Apply to partner", href: "/partners/apply" },
    ],
  },
  {
    id: "company",
    label: "Company",
    matches: ["/about", "/insights", "/support", "/contact"],
    children: companyLinks,
  },
];

/**
 * The header's one call to action follows the section (spec §2.1): the most
 * specific prefix wins, so list deeper routes first. The destination is
 * always a real page or an anchor on the current page, never the company
 * close at the foot of the page.
 */
/** `short` is the label on phones, where the pill shares a 375 px bar with the logo and the menu button. */
export type HeaderCta = { prefix: string; label: string; short: string; href: string };

export const headerCtas: HeaderCta[] = [
  { prefix: "/licensing/quote", label: "Send your invoice", short: "Send invoice", href: "/licensing/switch#send-invoice" },
  { prefix: "/licensing", label: "Get a quote", short: "Get a quote", href: "/licensing/quote#quote-form" },
  { prefix: "/partners/reseller", label: "Apply to partner", short: "Apply", href: "/partners/apply?program=reseller" },
  { prefix: "/partners/agents", label: "Apply to partner", short: "Apply", href: "/partners/apply?program=agent" },
  { prefix: "/partners/platform", label: "Apply to partner", short: "Apply", href: "/partners/apply?program=platform" },
  { prefix: "/partners/apply", label: "Talk to MSP Hub", short: "Contact us", href: "/contact#contact-form" },
  { prefix: "/partners", label: "Apply to partner", short: "Apply", href: "/partners/apply" },
  { prefix: "/services", label: "Start an inquiry", short: "Start inquiry", href: "#inquiry" },
  { prefix: "/hubx", label: "Schedule a demo", short: "Book a demo", href: "/demo" },
  { prefix: "/for/businesses", label: "Get a quote", short: "Get a quote", href: "/licensing/quote#quote-form" },
  { prefix: "/contact", label: "Schedule a demo", short: "Book a demo", href: "/demo" },
  { prefix: "/demo", label: "Talk to MSP Hub", short: "Contact us", href: "/contact#contact-form" },
];

export type SectionCta = Omit<HeaderCta, "prefix">;

export const defaultHeaderCta: SectionCta = { label: "Talk to MSP Hub", short: "Contact us", href: "/contact#contact-form" };

export function headerCtaFor(pathname: string): SectionCta {
  const match = headerCtas.find((cta) => pathname === cta.prefix || pathname.startsWith(`${cta.prefix}/`));
  return match ? { label: match.label, short: match.short, href: match.href } : defaultHeaderCta;
}

/** Secondary navigation across the services section (mounted by `app/services/layout.tsx`). */
export type SectionNavItem = { label: string; href: string; exact?: boolean };

export const servicesNav: readonly SectionNavItem[] = [
  { label: "Overview", href: "/services", exact: true },
  { label: "Professional", href: "/services/professional" },
  { label: "Managed", href: "/services/managed" },
  { label: "Development & AI", href: "/services/development" },
  { label: "Licensing", href: "/licensing" },
];

/** Footer per the handoff §4 plus the audience column (spec §2.6): Company · Services · HubX · Licensing · Who we serve. */
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
      { label: "Licensing overview", href: "/licensing" },
      { label: "Switch to MSP Hub", href: "/licensing/switch" },
      { label: "EA to CSP", href: "/licensing/ea-to-csp" },
      { label: "Beyond Microsoft", href: "/licensing/beyond-microsoft" },
      { label: "Get a quote", href: "/licensing/quote" },
    ],
  },
  {
    heading: "Who we serve",
    links: [...audienceLinks.map(({ label, href }) => ({ label, href })), { label: "Apply to partner", href: "/partners/apply" }],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
];
