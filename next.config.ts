import type { NextConfig } from "next";
import { allowIndexing } from "./src/lib/site";

/** 301s from the old WordPress URLs (website plan, section 3). Active once msphub.com points here. */
const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/about-us-managed-service-provider", destination: "/about" },
  { source: "/professional-and-managed-services", destination: "/services" },
  { source: "/partner", destination: "/partners" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/contact-us-2", destination: "/contact" },
  { source: "/support", destination: "/contact" },
  { source: "/marketplace", destination: "/hubx" },
  { source: "/help-center", destination: "/hubx" },
  { source: "/ready-is-now-msp-hub", destination: "/hubx" },
  { source: "/brand-resource-center", destination: "/about" },
  { source: "/privacy-policy", destination: "/privacy" },
  { source: "/terms-and-conditions", destination: "/terms" },
  { source: "/cookie-policy", destination: "/cookies" },
  { source: "/ai-copilot", destination: "/services/development" },
  { source: "/data-and-analytics", destination: "/services/professional" },
  { source: "/managed-services/:path*", destination: "/services/managed" },
  { source: "/solutions/:path*", destination: "/services" },
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
