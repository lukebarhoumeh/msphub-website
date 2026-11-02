import type { StaticImageData } from "next/image";
import s01 from "../../public/hubx/01-home-overview-top.jpg";
import s02 from "../../public/hubx/02-home-overview-forecast-orders.jpg";
import s03 from "../../public/hubx/03-home-invoice-expirations-servicedesk-audit.jpg";
import s04 from "../../public/hubx/04-customers-list.jpg";
import s05 from "../../public/hubx/05-customer-products.jpg";
import s06 from "../../public/hubx/06-catalog-filters.jpg";
import s07 from "../../public/hubx/07-catalog-listing.jpg";
import s08 from "../../public/hubx/08-quotations.jpg";
import s09 from "../../public/hubx/09-reports.jpg";
import s10 from "../../public/hubx/10-dashboards.jpg";
import s11 from "../../public/hubx/11-hubai.jpg";
import s12 from "../../public/hubx/12-hubai-answer.jpg";
import s13 from "../../public/hubx/13-dashboards-dark.jpg";

/**
 * Real HubX captures (anonymized, demo data; 800×1216). Static imports give
 * next/image intrinsic sizes and build-time blur placeholders. Light and dark
 * captures are never mixed in one carousel.
 */
export type ScreenTheme = "light" | "dark";

export type Screen = {
  id: string;
  image: StaticImageData;
  theme: ScreenTheme;
  alt: string;
  caption: string;
  /** HubX route the capture shows, for the frame's URL chip. */
  path: string;
};

export const screens = {
  homeOverview: {
    id: "homeOverview",
    image: s01,
    theme: "light",
    alt: "HubX home: performance overview with customers, subscriptions, licenses, revenue and margin tiles",
    caption: "Home: performance overview with KPI tiles, top customers, and top products",
    path: "/",
  },
  forecastOrders: {
    id: "forecastOrders",
    image: s02,
    theme: "light",
    alt: "HubX forecast performance and recent customer orders",
    caption: "Forecast performance with a selectable basis, and recent orders by type",
    path: "/",
  },
  homeWidgets: {
    id: "homeWidgets",
    image: s03,
    theme: "light",
    alt: "HubX home widgets: latest invoice, upcoming expirations, service desk, audit logs",
    caption: "Latest invoice, upcoming expirations, Service Desk, and audit log",
    path: "/",
  },
  customers: {
    id: "customers",
    image: s04,
    theme: "light",
    alt: "HubX customer list with revenue, margin and forecast insights",
    caption: "Customers: revenue, margin, and forecast insights with GDAP and transfer tabs",
    path: "/customers",
  },
  customerProducts: {
    id: "customerProducts",
    image: s05,
    theme: "light",
    alt: "HubX customer products: subscription details per SKU",
    caption: "Customer products: term, billing, expiration, and renewal per SKU",
    path: "/customers/products",
  },
  catalogFilters: {
    id: "catalogFilters",
    image: s06,
    theme: "light",
    alt: "HubX product catalog filters",
    caption: "Catalog filters: publisher, product type, category, qualification, term",
    path: "/marketplace/catalog",
  },
  catalog: {
    id: "catalog",
    image: s07,
    theme: "light",
    alt: "HubX catalog listing with product families and offers",
    caption: "Catalog: 7,600+ SKUs with family → offer drill-down",
    path: "/marketplace/catalog",
  },
  quotations: {
    id: "quotations",
    image: s08,
    theme: "light",
    alt: "HubX quotations pipeline and quotation list",
    caption: "Quotations: pipeline KPIs and the quotation list",
    path: "/quotations",
  },
  reports: {
    id: "reports",
    image: s09,
    theme: "light",
    alt: "HubX reports library",
    caption: "Reports: eleven reports with scheduled email delivery",
    path: "/reports",
  },
  dashboards: {
    id: "dashboards",
    image: s10,
    theme: "light",
    alt: "HubX custom dashboard with revenue, margin and license charts",
    caption: "Dashboards: revenue, margin, subscriptions, and license charts",
    path: "/dashboards",
  },
  hubai: {
    id: "hubai",
    image: s11,
    theme: "light",
    alt: "HubAI assistant with suggested questions",
    caption: "HubAI with suggested prompts",
    path: "/",
  },
  hubaiAnswer: {
    id: "hubaiAnswer",
    image: s12,
    theme: "light",
    alt: "HubAI answering a question with a table of top products",
    caption: "HubAI answering with a ranked table in about five seconds",
    path: "/",
  },
  dashboardsDark: {
    id: "dashboardsDark",
    image: s13,
    theme: "dark",
    alt: "HubX dashboards in dark mode",
    caption: "Dashboards in dark mode",
    path: "/dashboards",
  },
} as const satisfies Record<string, Screen>;

export type ScreenId = keyof typeof screens;
