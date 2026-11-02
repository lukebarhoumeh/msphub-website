import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { allowIndexing } from "./src/lib/site";

/**
 * Permanent redirects from the old WordPress msphub.com (architecture note
 * §4). They answer 308 and take effect for real traffic once msphub.com
 * points at this deployment.
 */
const legacyRedirects: { source: string; destination: string }[] = [
  // Company and contact
  { source: "/about-us-managed-service-provider", destination: "/about" },
  { source: "/brand-resource-center", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/contact-us-2", destination: "/contact" },
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
  { source: "/privacy-policy", destination: "/legal/privacy" },
  { source: "/terms-and-conditions", destination: "/legal/terms" },
  { source: "/cookie-policy", destination: "/legal/cookies" },
];

/**
 * Route moves inside this site: the quote form moved under /licensing, the
 * legal pages under /legal, and the thank-you page became /thank-you/[form].
 * Order matters: the `?flow=` match runs before the bare /thank-you fallback.
 */
const routeMoves: Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>> = [
  { source: "/microsoft-365-quote", destination: "/licensing/quote", permanent: true },
  { source: "/privacy", destination: "/legal/privacy", permanent: true },
  { source: "/terms", destination: "/legal/terms", permanent: true },
  { source: "/cookies", destination: "/legal/cookies", permanent: true },
  {
    source: "/thank-you",
    has: [{ type: "query", key: "flow", value: "(?<flow>demo|service|quote|contact|switch|partner)" }],
    destination: "/thank-you/:flow",
    permanent: true,
  },
  { source: "/thank-you", destination: "/thank-you/contact", permanent: true },
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
    return [...legacyRedirects.map((r) => ({ ...r, permanent: true })), ...routeMoves];
  },
  async rewrites() {
    return gonePaths.map((source) => ({ source, destination: "/gone" }));
  },
};

/**
 * MDX for long-form content (`src/content/insights/*.mdx`, `src/content/legal/*.mdx`).
 * Files are imported into pages, never routed directly, so `pageExtensions`
 * stays default. YAML frontmatter becomes the module's `frontmatter` export
 * (validated in the content registries). Plugins are named as strings for Turbopack.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"],
  },
});

export default withMDX(nextConfig);
