import type { ConfirmId } from "@/content/confirmations";
import type { ModuleSlug } from "@/content/hubx-modules";

/**
 * /hubx/whats-new: the early-access changelog. Entries are dated only when the
 * date is on record (private handoff §2 #14, §3 #10). Everything else on the
 * page is drawn from the verified module inventory and presented as "in the
 * product today", never as a release date we do not have.
 */
export const earlyAccess = {
  badge: "Early Access",
  title: "HubX is in early access.",
  body: "New capabilities ship continuously while HubX is in early access. The Early Access badge in the product header opens a feedback form; everything we hear there shapes what ships next. Release notes are published on this page.",
  feedback: {
    inProduct: "Open the Early Access badge in the HubX header to share feedback from inside the product.",
    cta: { label: "Share feedback", href: "/contact?topic=support#contact-form" },
  },
} as const;

export const whatsNewPage = {
  hero: {
    eyebrow: "What's new · HubX, powered by MSP Hub",
    title: "What's new in HubX.",
    lead: "Release notes for the portal, plus what is in the product today. HubX is in early access: tell us what to build next from the badge in the product header or the form below.",
  },
  releases: { eyebrow: "Release notes", title: "Shipped." },
  now: {
    eyebrow: "In the product today",
    title: "Verified from the live product, November 2026.",
    lead: "Not a roadmap. Every item below was observed in HubX during the November 2026 walk-through and is documented on the features pages.",
  },
  feedback: {
    eyebrow: "Early access",
    title: "Shape what ships next.",
  },
  cta: {
    eyebrow: "See it live",
    title: "See HubX in 30 minutes.",
    lead: "A live walkthrough of the modules above with your tenant scenario and your licensing questions. No obligation.",
  },
} as const;

export type Release = {
  id: string;
  /** Month-level date as published, e.g. "October 2026". */
  date: string;
  /** Machine-readable month for <time>. */
  dateTime: string;
  title: string;
  summary: string;
  items: readonly string[];
  confirm?: ConfirmId;
  reviewNote?: string;
};

export const releases: readonly Release[] = [
  {
    id: "2026-10-hubx-launch",
    date: "October 2026",
    dateTime: "2026-10",
    title: "HubX launches",
    summary:
      "The MSP Hub platform is redesigned and renamed HubX, powered by MSP Hub. Existing accounts and data carried over from the MSP Hub Marketplace.",
    items: [
      "New name and a full portal redesign: light theme by default, dark theme on the toggle.",
      "Top navigation (Home · Dashboards · Customers · Catalog · Quotations · Reports · Service Desk) with HubAI and global customer search in the header.",
      "Early Access badge with a feedback form, plus per-page help.",
    ],
    confirm: "loginContinuity",
    reviewNote: "Confirm that Marketplace users sign in to HubX with their existing accounts before this entry says so.",
  },
];

/** Verified in the product on Nov 2, 2026; grouped by module for the "in the product today" list. */
export const inProductNow: readonly { module: ModuleSlug; label: string; items: readonly string[] }[] = [
  {
    module: "home",
    label: "Home & performance",
    items: ["Forecast performance with a selectable basis (contracted run-rate or trailing 12 months)", "Upcoming expirations alert with revenue at risk", "Typed order badges: RO, CH, SO, SDO, IM"],
  },
  {
    module: "customers",
    label: "Customers",
    items: ["GDAP Management tab: coverage, expiring soon, not established, pending approval", "P2P Transfers tab: create and track partner-to-partner transfers", "Import existing Microsoft tenants"],
  },
  {
    module: "catalog",
    label: "Catalog",
    items: ["7,675 SKUs (November 2026)", "Customer-context filtering by qualification, term, and billing frequency", "Recommended, Favorites, and Recently purchased"],
  },
  {
    module: "quotations",
    label: "Quotations",
    items: ["Customer approval flow; approved quotes convert to a cart", "Prospect and budgetary quotes with prospect contacts", "Terms & conditions management and pipeline KPIs"],
  },
  {
    module: "billing",
    label: "Billing & invoices",
    items: ["Invoice statement with margin per customer billing subscription", "“Changes since last period” variance view", "Partner-branded customer invoices with your own remittance details"],
  },
  {
    module: "dashboards-reports",
    label: "Dashboards & reports",
    items: ["Dashboard builder with shared and duplicated dashboards", "Eleven reports", "Scheduled report delivery by email"],
  },
  {
    module: "service-desk",
    label: "Service Desk",
    items: ["Tickets with status, priority, and SLA state", "Transfer or queue customer tickets to the partner, or share read-only"],
  },
  {
    module: "hubai",
    label: "HubAI",
    items: ["Natural-language Q&A over customers, products, orders, and subscriptions", "Answers in about five seconds with feedback controls", "Read-only"],
  },
  {
    module: "administration",
    label: "Administration",
    items: ["SSO with Microsoft Entra ID, Google, or Okta, with managed domains", "Customer types and named discounts", "Multi-organization switching; organization-wide audit logs"],
  },
];
