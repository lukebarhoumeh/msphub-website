/**
 * Real HubX captures. Crops are lossless WebP extracts of the declared pixel
 * boxes (no upscale, no second JPEG pass) and are served with a plain <img>,
 * never through the Next.js image optimizer. Full-screen viewers use the
 * original 800×1216 JPEG at natural width.
 *
 * Homepage boxes are the approved ones: Product List, Product Listing, Hub AI.
 * Module crops that have no approved box are the top 900px of the source,
 * declared here, and only used on HubX routes.
 */

export const capturedLabel = "Captured November 2026";
export const truthLabel = "Actual HubX UI · demo data";

export type Capture = {
  id: string;
  screenName: string;
  alt: string;
  takeaway: string;
  crop: { src: string; width: number; height: number };
  full: { src: string; width: number; height: number };
};

const full = (src: string): Capture["full"] => ({ src, width: 800, height: 1216 });

export const captures = {
  customerProductsHome: {
    id: "customerProductsHome",
    screenName: "Customer products",
    alt: "Actual HubX customer products view showing subscription status, quantity, term, expiration, and renewal.",
    takeaway: "Terms, quantities, expiration, and renewal status for the products a customer already has.",
    crop: { src: "/ink-glass/crops/customer-products-home.webp", width: 800, height: 524 },
    full: full("/hubx/05-customer-products.jpg"),
  },
  customerProductsHubx: {
    id: "customerProductsHubx",
    screenName: "Customer products",
    alt: "Actual HubX customer products view showing subscription status, quantity, term, expiration, and renewal.",
    takeaway: "The customer’s products, including the product list, terms, quantities, expiration, and renewal status.",
    crop: { src: "/ink-glass/crops/customer-products-hubx.webp", width: 800, height: 900 },
    full: full("/hubx/05-customer-products.jpg"),
  },
  catalogHome: {
    id: "catalogHome",
    screenName: "Product catalog",
    alt: "Actual HubX catalog listing showing product families, offers, qualification, and 7,675 available SKUs.",
    takeaway: "Product families and the offers a customer is eligible to buy. Marketing copy stays at 7,600+ SKUs.",
    crop: { src: "/ink-glass/crops/catalog-home.webp", width: 800, height: 692 },
    full: full("/hubx/07-catalog-listing.jpg"),
  },
  hubaiHome: {
    id: "hubaiHome",
    screenName: "HubAI answer",
    alt: "Actual HubAI answer showing a ranked table returned from a question about products sold.",
    takeaway: "A factual, read-only answer returned as a table. HubAI does not place orders.",
    crop: { src: "/ink-glass/crops/hubai-home.webp", width: 800, height: 714 },
    full: full("/hubx/12-hubai-answer.jpg"),
  },
  homeOverview: {
    id: "homeOverview",
    screenName: "Home overview",
    alt: "Actual HubX home overview with customer, subscription, license, and revenue summary tiles.",
    takeaway: "The billing subscription’s performance overview: customers, subscriptions, licenses, and revenue.",
    crop: { src: "/ink-glass/crops/home-overview.webp", width: 800, height: 900 },
    full: full("/hubx/01-home-overview-top.jpg"),
  },
  customersList: {
    id: "customersList",
    screenName: "Customer list",
    alt: "Actual HubX customer list with revenue insights, GDAP status, and transfer tools.",
    takeaway: "Every customer tenant in one list, with GDAP status and partner-to-partner transfers.",
    crop: { src: "/ink-glass/crops/customers-list.webp", width: 800, height: 900 },
    full: full("/hubx/04-customers-list.jpg"),
  },
  quotations: {
    id: "quotations",
    screenName: "Quotations",
    alt: "Actual HubX quotations list and pipeline.",
    takeaway: "Quotations waiting on approval, and the quotation list a partner sends to a customer.",
    crop: { src: "/ink-glass/crops/quotations.webp", width: 800, height: 900 },
    full: full("/hubx/08-quotations.jpg"),
  },
  dashboards: {
    id: "dashboards",
    screenName: "Dashboards",
    alt: "Actual HubX dashboard with revenue, subscription, license, order, and expiration widgets.",
    takeaway: "A real dashboard: revenue, subscriptions, licenses, recent orders, and upcoming expirations. The summary is in the text beside the image.",
    crop: { src: "/ink-glass/crops/dashboards.webp", width: 800, height: 900 },
    full: full("/hubx/10-dashboards.jpg"),
  },
  reports: {
    id: "reports",
    screenName: "Reports",
    alt: "Actual HubX reports library.",
    takeaway: "The reports library, with scheduled email delivery.",
    crop: { src: "/ink-glass/crops/reports.webp", width: 800, height: 900 },
    full: full("/hubx/09-reports.jpg"),
  },
  homeWidgets: {
    id: "homeWidgets",
    screenName: "Home widgets",
    alt: "Actual HubX home widgets showing the latest invoice, expirations, Service Desk, and audit log.",
    takeaway: "Latest invoice, upcoming expirations, Service Desk tickets, and the audit feed on the home page.",
    crop: { src: "/ink-glass/crops/home-widgets.webp", width: 800, height: 900 },
    full: full("/hubx/03-home-invoice-expirations-servicedesk-audit.jpg"),
  },
  hubaiPrompt: {
    id: "hubaiPrompt",
    screenName: "HubAI",
    alt: "Actual HubAI panel where a question is asked against the selected billing subscription.",
    takeaway: "Questions are asked against the billing subscription you select. Answers stay read-only.",
    crop: { src: "/ink-glass/crops/hubai-prompt.webp", width: 800, height: 900 },
    full: full("/hubx/11-hubai.jpg"),
  },
  forecast: {
    id: "forecast",
    screenName: "Forecast and orders",
    alt: "Actual HubX forecast performance and recent customer orders.",
    takeaway: "Forecast performance for the selected basis, and recent orders by type.",
    crop: { src: "/ink-glass/crops/forecast-orders.webp", width: 800, height: 900 },
    full: full("/hubx/02-home-overview-forecast-orders.jpg"),
  },
} as const satisfies Record<string, Capture>;

export type CaptureId = keyof typeof captures;

/** Homepage evidence, in story order. Crops open on Product List, Product Listing, and Hub AI. */
export const homeEvidence: CaptureId[] = ["customerProductsHome", "catalogHome", "hubaiHome"];

/** /hubx evidence. The wider customer-products crop is only used on HubX routes. */
export const hubxEvidence: CaptureId[] = [
  "customerProductsHubx",
  "catalogHome",
  "quotations",
  "dashboards",
  "hubaiHome",
];

export const moduleEvidence: Record<string, CaptureId[]> = {
  home: ["homeOverview", "forecast"],
  customers: ["customersList", "customerProductsHubx"],
  catalog: ["catalogHome"],
  quotations: ["quotations"],
  billing: ["homeWidgets"],
  "dashboards-reports": ["dashboards", "reports"],
  "service-desk": ["homeWidgets"],
  hubai: ["hubaiHome", "hubaiPrompt"],
  administration: ["homeWidgets"],
};
