import {
  Bot,
  FileSignature,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { LightScreenId } from "@/content/screens";

/**
 * HubX module inventory, feature-accurate to the product walk-through of
 * Nov 2, 2026 (private handoff §6.1–6.2). Every bullet below was observed in
 * the live product; nothing here is roadmap. Feeds the /hubx modules section
 * and one page per module under /hubx/features; Administration is documented
 * on /hubx/security instead of a feature page.
 */
export type ModuleSlug =
  | "home"
  | "customers"
  | "catalog"
  | "quotations"
  | "billing"
  | "dashboards-reports"
  | "service-desk"
  | "hubai"
  | "administration";

export type HubxModule = {
  slug: ModuleSlug;
  /** Full module name, e.g. "Billing & invoices". */
  name: string;
  /** Short label for tabs and breadcrumbs. */
  short: string;
  icon: LucideIcon;
  /** Feature-page headline (H1). */
  headline: string;
  /** One-paragraph lede used on cards and the feature page. */
  summary: string;
  /** Capabilities, in product order. */
  bullets: readonly string[];
  /** Captures that show this module; light theme only (the dark capture lives on dark bands). */
  screens: readonly LightScreenId[];
  /** Route inside hubx.msphub.com (handoff Appendix B), shown as the frame's URL chip. */
  hubxPath: string;
  /** Where the website documents the module. */
  href: string;
  /** SEO description for the feature page. */
  description: string;
  /** Context that is about MSP Hub's operating model rather than a product feature. */
  aside?: { title: string; body: string };
};

export const hubxModules: readonly HubxModule[] = [
  {
    slug: "home",
    name: "Home & performance",
    short: "Home",
    icon: Gauge,
    headline: "Your whole book at a glance: performance, forecast, orders, and what is about to expire.",
    summary:
      "The HubX home page is a performance overview for the billing subscription you select: customers, subscriptions, licenses, revenue, and margin for the timeframe you choose, a forecast whose basis you pick, and the orders, invoice, expirations, tickets, and audit events that need attention.",
    bullets: [
      "Performance overview with a timeframe selector: customers, subscriptions, licenses (net change and total, with sparklines), revenue, and margin, plus top customers and top products.",
      "Forecast performance for the next 3, 6, or 12 months, revenue and gross margin, on a basis you choose: existing subscriptions and licenses (every subscription projected forward by term and billing) or prior 12-month performance (adds trailing growth).",
      "Recent customer orders with typed badges: Renewal Order (RO), Change Order (CH), Sales Order (SO), Scheduled Order (SDO), CSP Import (IM).",
      "Latest invoice card with PDF download.",
      "Upcoming expirations alert: non-auto-renew subscriptions, revenue at risk, and customers affected.",
      "Service Desk widget and audit log feed on the same page.",
      "Sub-navigation: Overview · My Products · My Orders · Billing & Invoices · Users & Roles · Audit Logs · Settings.",
    ],
    screens: ["homeOverview", "forecastOrders", "homeWidgets"],
    hubxPath: "/",
    href: "/hubx/features/home",
    description:
      "The HubX home page: performance overview with KPI tiles and sparklines, a forecast with a selectable basis, typed recent orders, the latest invoice, upcoming expirations, Service Desk, and audit log.",
  },
  {
    slug: "customers",
    name: "Customers",
    short: "Customers",
    icon: Users,
    headline: "Every customer tenant, with revenue, margin, GDAP, and transfers in one list.",
    summary:
      "The customer list carries revenue, margin, GDAP status, industry, qualification type, and customer-since dates, with an insights strip for average monthly, year-to-date, and 12-month forecast revenue and margin. Register new customers, import existing tenants, and run partner-to-partner transfers without leaving HubX.",
    bullets: [
      "Customer list with revenue, margin, GDAP status, industry, qualification type, and customer since; insights strip with average monthly, year-to-date, and 12-month forecast revenue and margin.",
      "Register-customer wizard with the reseller-relationship link; import existing Microsoft tenants.",
      "Expiring Subscriptions, GDAP Management (coverage, expiring soon, not established, pending approval), and P2P Transfers (create and track partner-to-partner transfers: outstanding, expiring, completed) as tabs on the list.",
      "Per customer: overview with licenses, margin, forecast, recent orders, audit, latest invoice, portal access, and partner information.",
      "Products per customer at SKU level: status, quantity, category, term and billing, purchased and expiration dates, renewal and auto-renew, with per-line management of licenses, renewals, and costs.",
      "Microsoft tab per customer: tenant list, create or import a tenant, qualification, GDAP relationships, partner-to-partner transfers, Microsoft Customer Agreement acceptance date, and the reseller link.",
      "Orders, Billing & Invoices, Users & Roles, Audit Logs, and Settings (customer type, billing subscription) per customer; CSV export, column chooser, show inactive.",
    ],
    screens: ["customers", "customerProducts"],
    hubxPath: "/customers",
    href: "/hubx/features/customers",
    description:
      "HubX Customers: the customer list with revenue, margin, GDAP status and forecast insights, tenant registration and import, GDAP management, partner-to-partner transfers, and SKU-level products per customer.",
  },
  {
    slug: "catalog",
    name: "Catalog",
    short: "Catalog",
    icon: ShoppingCart,
    headline: "7,600+ SKUs, filtered to what each customer may buy.",
    summary:
      "The catalog held 7,675 SKUs in November 2026 from Microsoft, Coro, and MSP Hub's own services. Pick a customer and HubX shows only what that customer is qualified to buy, by product type, category, commitment term, and billing frequency.",
    bullets: [
      "7,675 SKUs (November 2026) across the Online Services (NCE), Azure, Software, and SaaS product types.",
      "Filters for category (Productivity & Collaboration, Security & Identity, Devices & Endpoint Management, Cloud & Infrastructure, Data, Reporting & Insights, Business Applications, Automation & Integration, Support & Services), qualification (Commercial, Education, Non-profit), commitment term (3-year, 1-year, 1-month, perpetual, ongoing), billing frequency (triennial, annual, monthly, one-time), and MSRP range.",
      "Customer context: select a customer and see only what that customer is qualified to buy.",
      "Family → offer → SKU drill-down with descriptions and add-on badges.",
      "Recommended, Favorites, and Recently purchased views.",
      "Add to cart or to a quotation; export the listing.",
      "Publishers: Microsoft, Coro, and MSP Hub's own services, which are orderable in-platform.",
    ],
    screens: ["catalog", "catalogFilters"],
    hubxPath: "/marketplace/catalog",
    href: "/hubx/features/catalog",
    description:
      "HubX Catalog: 7,600+ SKUs across Microsoft 365, Azure, Dynamics 365, Windows 365, Windows Server and SQL Server, and Copilot, filtered by what each customer is qualified to buy, by term and billing frequency.",
  },
  {
    slug: "quotations",
    name: "Quotations",
    short: "Quotations",
    icon: FileSignature,
    headline: "Quote, approve, convert to cart, order. One flow.",
    summary:
      "Build quotations from the catalog, send them for customer approval, and convert approved quotes to a cart and an order. Prospect and budgetary quotes, prospect contacts, and terms and conditions live in the same module, with pipeline KPIs on top.",
    bullets: [
      "Quote builder from the catalog, in the selected customer's context.",
      "Send for customer approval; approved quotes convert to a cart and an order.",
      "Prospect and budgetary quotes, with prospect contacts.",
      "Terms & conditions management attached to quotes.",
      "Statuses from draft to sent to approved or expired, with a readiness percentage.",
      "Pipeline KPIs: awaiting approval, open pipeline, won in the last 30 days, potential annual revenue and gross margin, won over time.",
    ],
    screens: ["quotations"],
    hubxPath: "/quotations",
    href: "/hubx/features/quotations",
    description:
      "HubX Quotations: build quotes from the catalog, send them for customer approval, convert approved quotes to orders, manage prospects and terms and conditions, and track the pipeline.",
  },
  {
    slug: "billing",
    name: "Billing & invoices",
    short: "Billing",
    icon: Receipt,
    headline: "Margin on every invoice, and what changed since last period.",
    summary:
      "Partner invoices come with KPIs and a statement that shows, per customer billing subscription, the partner amount, the customer amount, gross margin in dollars and percent, and sales tax, plus a variance view of what changed since the previous period. HubX also generates your customer-facing invoices with your own remittance details.",
    bullets: [
      "Partner invoice list with KPIs: average monthly cost, last 12 months, all-time, average gross margin, latest invoice.",
      "Invoice statement: financial summary, a customer overview with one row per customer billing subscription (partner amount, customer amount, gross margin in dollars and percent, sales tax), line items, payment information, and PDF download.",
      "“Changes since last period”: a variance view of what moved between statements.",
      "Customer-facing invoices generated by HubX for the partner, with separate numbering and the partner's own wire, ACH, or check details per billing subscription.",
      "Billing subscriptions are separate books; switch between them from the header.",
      "Latest invoice card with PDF download on the home page.",
    ],
    screens: ["homeWidgets", "homeOverview"],
    hubxPath: "/billing",
    href: "/hubx/features/billing",
    description:
      "HubX Billing & invoices: partner invoice statements with margin per customer and a changes-since-last-period view, plus partner-branded customer invoices with your own remittance details.",
    aside: {
      title: "How MSP Hub bills",
      body: "Calendar-month billing, one month in advance, with daily-rate proration for mid-month starts and changes, on Net 30 terms. Margin reporting starts with the first billing run.",
    },
  },
  {
    slug: "dashboards-reports",
    name: "Dashboards & reports",
    short: "Dashboards",
    icon: LayoutDashboard,
    headline: "Custom dashboards and eleven reports that email themselves.",
    summary:
      "Build dashboards from chart and data widgets per billing subscription, share them, and duplicate them across subscriptions. Eleven reports cover revenue, profit, discounts, forecasts, savings, and license snapshots, and any of them can be scheduled for email delivery.",
    bullets: [
      "Dashboard builder with chart and data widgets: revenue, cost of goods sold, gross margin, subscriptions, licenses, top customers, recent orders, upcoming expirations.",
      "Dashboards per billing subscription; shared dashboards; duplicate a dashboard across subscriptions.",
      "Eleven reports: Revenue by Customer, Revenue by Product, Revenue by Order, Invoice Report, Discount by Product (vs MSRP), Revenue Forecast by Customer, Profit by Customer, Profit by Product, Savings by Customer, License Snapshot, Invoice Product Category.",
      "Schedule any report for email delivery.",
      "CSV export on every table; light and dark theme.",
    ],
    screens: ["dashboards", "reports"],
    hubxPath: "/dashboards",
    href: "/hubx/features/dashboards-reports",
    description:
      "HubX Dashboards & reports: build dashboards from revenue, margin, subscription, and license widgets, and schedule any of eleven reports for email delivery.",
  },
  {
    slug: "service-desk",
    name: "Service Desk",
    short: "Service Desk",
    icon: LifeBuoy,
    headline: "Tickets with priority and SLA state, shared by customer, partner, and MSP Hub.",
    summary:
      "The Service Desk tracks tickets with status, priority, and SLA state. Customer tickets can be transferred or queued to the partner, or made visible read-only, so everyone works from the same ticket.",
    bullets: [
      "Tickets with status, priority, and SLA state.",
      "Customer tickets can be transferred or queued to the partner, or made visible read-only.",
      "Service Desk widget on the HubX home page.",
      "Service Desk settings per organization, in Administration.",
      "Export the ticket list.",
      "Licensing and billing support runs business hours through the Service Desk, with Microsoft Premier escalation; managed services add 24/7 monitoring and incident management for managed environments.",
    ],
    screens: ["homeWidgets"],
    hubxPath: "/service-desk",
    href: "/hubx/features/service-desk",
    description:
      "HubX Service Desk: tickets with status, priority, and SLA state, shared across customer, partner, and MSP Hub, with business-hours licensing and billing support and Microsoft Premier escalation.",
    aside: {
      title: "Who answers",
      body: "MSP Hub's licensing and billing desk works business hours (US Central and Eastern) and escalates to Microsoft Premier support directly. 24/7 monitoring and incident management apply to environments under MSP Hub managed services.",
    },
  },
  {
    slug: "hubai",
    name: "HubAI",
    short: "HubAI",
    icon: Bot,
    headline: "Ask your estate a question. Get a table in about five seconds.",
    summary:
      "HubAI answers natural-language questions about customers, products, orders, subscriptions, and HubX workflows from your own HubX data, scoped to the billing subscription you select. Answers come back as tables or text with edit, retry, like, dislike, and copy controls. HubAI is read-only today.",
    bullets: [
      "Natural-language Q&A over customers, products, orders, subscriptions, and HubX workflows.",
      "Scoped to the billing subscription you select.",
      "Answers in about five seconds, as tables or text.",
      "Edit, retry, like, dislike, and copy on every answer.",
      "Suggested prompts: “List all my active customers”, “Licenses expiring in the next 30 days”, “Top products sold last month”.",
      "Read-only: HubAI does not place orders or change subscriptions.",
    ],
    screens: ["hubai", "hubaiAnswer"],
    hubxPath: "/",
    href: "/hubx/features/hubai",
    description:
      "HubAI in HubX: ask questions about customers, products, orders, and subscriptions in plain language and get a table back in about five seconds, scoped to the billing subscription you select. Read-only today.",
  },
  {
    slug: "administration",
    name: "Administration",
    short: "Admin",
    icon: Settings,
    headline: "Identity, roles, books, and audit, organization-wide.",
    summary:
      "Administration holds the organization profile and contacts, billing subscriptions, customer types and named discounts, Service Desk settings, invoice payment details, authentication with your own identity provider, users and roles, and organization-wide audit logs.",
    bullets: [
      "Organization profile and contacts; billing subscriptions.",
      "Customer types and named discount groups.",
      "Invoice payment details (wire, ACH, check) per billing subscription.",
      "Authentication: identity providers (Microsoft Entra ID, Google, Okta via OIDC) and managed domains for SSO routing.",
      "Users and roles; organization-wide audit logs.",
      "Multi-organization switching, light and dark theme, CSV export on every table, per-page help, early-access feedback.",
    ],
    screens: ["homeWidgets"],
    hubxPath: "/settings",
    href: "/hubx/security",
    description:
      "HubX Administration: organization profile, billing subscriptions, customer types and discounts, SSO with Microsoft Entra ID, Google, or Okta, users and roles, and organization-wide audit logs.",
  },
] as const;

/** Modules with a page under /hubx/features (Administration lives on /hubx/security). */
export const featureModules = hubxModules.filter((m) => m.href.startsWith("/hubx/features/"));

export const featureSlugs = featureModules.map((m) => m.slug);

export function getModule(slug: string): HubxModule | undefined {
  return hubxModules.find((m) => m.slug === slug);
}

/** Previous/next module among the feature pages, for the footer navigation on each page. */
export function adjacentModules(slug: ModuleSlug): { prev?: HubxModule; next?: HubxModule } {
  const i = featureModules.findIndex((m) => m.slug === slug);
  if (i === -1) return {};
  return { prev: featureModules[i - 1], next: featureModules[i + 1] };
}
