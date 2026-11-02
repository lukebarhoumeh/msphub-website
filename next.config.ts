import type { NextConfig } from "next";
import { allowIndexing } from "./src/lib/site";

/**
 * Permanent redirects from the old WordPress msphub.com (architecture note
 * §4). They answer 308 and take effect for real traffic once msphub.com
 * points at this deployment. Route moves inside this site (`/microsoft-365-quote`
 * → `/licensing/quote`, `/privacy|/terms|/cookies` → `/legal/*`,
 * `/thank-you?flow=` → `/thank-you/[form]`) are added with the routes that
 * replace them; the legal and `/support` entries below move with them.
 */
const legacyRedirects: { source: string; destination: string }[] = [
  // Company and contact
  { source: "/about-us-managed-service-provider", destination: "/about" },
  { source: "/brand-resource-center", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/contact-us-2", destination: "/contact" },
  { source: "/support", destination: "/contact" },
  // Services
  { source: "/professional-and-managed-services", destination: "/services" },
  { source: "/solutions/:path*", destination: "/services" },
  { source: "/managed-services/:path*", destination: "/services/managed" },
  { source: "/data-and-analytics", destination: "/services/professional" },
  { source: "/ai-copilot", destination: "/services/development" },
  // Platform (the Marketplace became HubX)
  { source: "/marketplace", destination: "/hubx" },
  { source: "/help-center", destination: "/hubx" },
  { source: "/ready-is-now-msp-hub", destination: "/hubx" },
  // Partners
  { source: "/partner", destination: "/partners" },
  // News & Insights blog (the archive migrates to /insights; migrated posts keep their slugs there)
  { source: "/news", destination: "/insights" },
  { source: "/news/page/:n", destination: "/insights" },
  { source: "/blog", destination: "/insights" },
  // Legal
  { source: "/privacy-policy", destination: "/privacy" },
  { source: "/terms-and-conditions", destination: "/terms" },
  { source: "/cookie-policy", destination: "/cookies" },
];

/** Old theme-demo content: answered with 410 Gone via `app/gone/route.ts`. */
const gonePaths = [
  "/team/:path*",
  "/case-studies/:path*",
  "/projects/:path*",
  "/careers/:path*",
  "/services/quality-control-and-assurance",
  "/always-ready-professional-managed-services",
  "/opportunity-submission-form",
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      {
        source: "/:path*",
        headers: allowIndexing ? security : [...security, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  async rewrites() {
    return gonePaths.map((source) => ({ source, destination: "/gone" }));
  },
};

export default nextConfig;
