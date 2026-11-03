/** Who MSP Hub serves: three audiences plus the channel (handoff §1.3, §5.1 #4). */
export type Audience = {
  id: "msp" | "business" | "direct-bill-csp" | "agent";
  label: string;
  title: string;
  body: string;
  points: string[];
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export const audiences: Audience[] = [
  {
    id: "msp",
    label: "MSPs & VARs",
    title: "Resell Microsoft at Tier-1 direct pricing without building a licensing desk.",
    body: "Every customer tenant, order, renewal, and invoice in one console, with MSP Hub's services bench behind you.",
    points: [
      "Tier-1 direct pricing on the full Microsoft catalog",
      "Partner-branded customer invoices with your own remittance details",
      "Renewals, orders, and invoices per customer, with what changed since last period",
      "Partner-to-partner transfers run by MSP Hub's deal desk",
    ],
    cta: { label: "Schedule a HubX demo", href: "/demo" },
    secondary: { label: "Partner programs", href: "/partners" },
  },
  {
    id: "business",
    label: "Businesses",
    title: "Buy, see, and optimize your Microsoft licensing directly.",
    body: "IT, finance, and purchasing on the same page, with migration and managed services from the same team.",
    points: [
      "Subscriptions, terms, and renewals per SKU in one portal",
      "Self-service purchasing through a catalog filtered to what you may buy",
      "Invoices and statements with PDF download",
      "Migrations, Azure, security, and managed operations from one team",
    ],
    cta: { label: "Get a licensing quote", href: "/licensing/quote" },
    secondary: { label: "Explore services", href: "/services" },
  },
  {
    id: "direct-bill-csp",
    label: "Direct-bill CSPs",
    title: "Run HubX on your own Partner Center tenant.",
    body: "Platform as a product: quoting, provisioning, billing reconciliation, dashboards, and HubAI on top of your Microsoft Partner Center.",
    points: [
      "Native Partner Center integration: provisioning, GDAP, P2P transfers, MCA status",
      "Billing subscriptions as separate books with their own remittance details",
      "SSO with Microsoft Entra ID, Google, or Okta",
      "Custom dashboards, scheduled reports, audit logs everywhere",
    ],
    cta: { label: "Schedule a platform demo", href: "/demo" },
    secondary: { label: "Explore HubX", href: "/hubx" },
  },
  {
    id: "agent",
    label: "Advisors & agents",
    title: "Bring the opportunity. MSP Hub sells and delivers.",
    body: "For technology advisors, agents, and consultants: evergreen commission on licensing and services, with weekly pipeline visibility.",
    points: [
      "Register opportunities with the partner team",
      "MSP Hub engineers join scoping calls",
      "Licensing, migrations, and managed services under one partner",
      "Weekly pipeline visibility on what you brought in",
    ],
    cta: { label: "Talk to the partner team", href: "/contact?topic=partnership#contact-form" },
    secondary: { label: "Partner programs", href: "/partners" },
  },
];
