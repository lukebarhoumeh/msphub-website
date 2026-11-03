import {
  ArrowLeftRight,
  Banknote,
  Bot,
  Building2,
  FileSignature,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  Radar,
  Receipt,
  ShoppingCart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { getModule, type ModuleSlug } from "@/content/hubx-modules";
import type { LightScreenId } from "@/content/screens";

/**
 * The twelve HubX capabilities worth spotlighting, in the handoff's ranked
 * order (§6.3). Each tile links to the module page that documents it; the
 * `id` doubles as the anchor on that page.
 */
export type HubxFeature = {
  rank: number;
  id: string;
  title: string;
  /** "partner" tiles carry partner economics and stay off mixed-audience pages such as the home page. */
  audience?: "partner" | "all";
  body: string;
  icon: LucideIcon;
  module: ModuleSlug;
  /** Light capture that shows the capability, when one exists. */
  screen?: LightScreenId;
};

export const hubxFeatures: readonly HubxFeature[] = [
  {
    rank: 1,
    id: "margin-on-every-invoice",
    audience: "partner",
    title: "Margin on every invoice",
    body: "Partner cost, customer price, and gross margin per customer on the invoice statement itself, with what changed since last period.",
    icon: Receipt,
    module: "billing",
  },
  {
    rank: 2,
    id: "forecast-you-choose",
    audience: "partner",
    title: "Forecast you choose the basis of",
    body: "Contracted run-rate or trailing twelve-month growth, for the next 3, 6, or 12 months. Revenue and gross margin.",
    icon: TrendingUp,
    module: "home",
    screen: "forecastOrders",
  },
  {
    rank: 3,
    id: "quote-to-order",
    title: "Quote → approve → cart → order",
    body: "One flow from the catalog to an approved quote to a cart and an order, with terms and conditions and prospect handling.",
    icon: FileSignature,
    module: "quotations",
    screen: "quotations",
  },
  {
    rank: 4,
    id: "customer-context-catalog",
    title: "Customer-context catalog",
    body: "7,600+ SKUs filtered to what that customer may buy, commercial, nonprofit, or education, by term and billing frequency.",
    icon: ShoppingCart,
    module: "catalog",
    screen: "catalog",
  },
  {
    rank: 5,
    id: "transfers-and-gdap",
    title: "Transfers and GDAP, in-app",
    body: "Partner-to-partner transfers and Granular Delegated Admin Privileges tracked in HubX: coverage, expiries, pending approvals, transfer status. No Partner Center spelunking.",
    icon: ArrowLeftRight,
    module: "customers",
    screen: "customers",
  },
  {
    rank: 6,
    id: "expiration-radar",
    title: "Expiration radar",
    body: "Non-auto-renew subscriptions, revenue at risk, and who is affected, on a 30-day lens.",
    icon: Radar,
    module: "home",
    screen: "homeWidgets",
  },
  {
    rank: 7,
    id: "partner-branded-invoicing",
    audience: "partner",
    title: "Partner-branded customer invoicing",
    body: "HubX generates your customers' invoices with your own wire, ACH, or check details per billing book.",
    icon: Banknote,
    module: "billing",
  },
  {
    rank: 8,
    id: "hubai",
    title: "HubAI",
    body: "Ask the estate a question in plain language and get a table back in seconds, scoped to the billing subscription you select.",
    icon: Bot,
    module: "hubai",
    screen: "hubaiAnswer",
  },
  {
    rank: 9,
    id: "dashboards-and-reports",
    title: "Custom dashboards + 11 scheduled reports",
    body: "Build dashboards from chart and data widgets; schedule any of eleven reports to email itself.",
    icon: LayoutDashboard,
    module: "dashboards-reports",
    screen: "dashboards",
  },
  {
    rank: 10,
    id: "service-desk-sla",
    title: "Service Desk with SLA states",
    body: "Tickets with priority and SLA state, shared across customer, partner, and MSP Hub.",
    icon: LifeBuoy,
    module: "service-desk",
  },
  {
    rank: 11,
    id: "sso-roles-audit",
    title: "SSO with your own IdP",
    body: "Microsoft Entra ID, Google, or Okta, plus roles and audit logs everywhere.",
    icon: KeyRound,
    module: "administration",
  },
  {
    rank: 12,
    id: "multi-organization",
    title: "Multi-organization, multi-book",
    body: "Switch organizations and billing subscriptions from the header. Dark mode. Export everything.",
    icon: Building2,
    module: "administration",
  },
] as const;

/** Link target for a tile: the module page plus the feature anchor. */
export function featureHref(feature: HubxFeature): string {
  const mod = getModule(feature.module);
  return `${mod?.href ?? "/hubx"}#${feature.id}`;
}

export function featuresForModule(slug: ModuleSlug): HubxFeature[] {
  return hubxFeatures.filter((f) => f.module === slug);
}
