export type NavLink = { label: string; href: string; description?: string };

export const serviceLinks: NavLink[] = [
  {
    label: "Services overview",
    href: "/services",
    description: "Four branches, one delivery team",
  },
  {
    label: "Professional services",
    href: "/services/professional",
    description: "Microsoft 365, Azure, security, data",
  },
  {
    label: "Managed services",
    href: "/services/managed",
    description: "24/7 operations run to agreed SLAs",
  },
  {
    label: "Development as a service",
    href: "/services/development",
    description: "Apps, DevOps, and AI development",
  },
];

export const primaryNav: NavLink[] = [
  { label: "HubX", href: "/hubx" },
  { label: "Services", href: "/services" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "HubX",
    links: [
      { label: "Overview", href: "/hubx" },
      { label: "Schedule a demo", href: "/demo" },
      { label: "Microsoft 365 quote", href: "/microsoft-365-quote" },
      { label: "Log in to HubX", href: "https://hubx.msphub.com" },
    ],
  },
  {
    heading: "Services",
    links: serviceLinks,
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];
