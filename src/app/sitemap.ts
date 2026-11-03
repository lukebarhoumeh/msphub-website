import type { MetadataRoute } from "next";
import { featureModules } from "@/content/hubx-modules";
import { posts } from "@/content/insights";
import { legalSlugs } from "@/content/legal";
import { siteUrl } from "@/lib/site";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type SitemapRoute = { path: string; priority: number; changeFrequency: ChangeFrequency };

/**
 * Indexable routes. Add a line when a page ships; keep noindex pages
 * (`/thank-you/*`, `/api/*`) out. `lastModified` is omitted on purpose: a
 * build timestamp would claim every page changed on every deploy.
 */
export const sitemapRoutes: SitemapRoute[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/hubx", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hubx/features", priority: 0.8, changeFrequency: "monthly" },
  ...featureModules.map((m) => ({ path: m.href, priority: 0.7, changeFrequency: "monthly" as const })),
  { path: "/hubx/security", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hubx/whats-new", priority: 0.7, changeFrequency: "weekly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/professional", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/managed", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/development", priority: 0.7, changeFrequency: "monthly" },
  { path: "/for/businesses", priority: 0.8, changeFrequency: "monthly" },
  { path: "/licensing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/licensing/switch", priority: 0.9, changeFrequency: "monthly" },
  { path: "/licensing/ea-to-csp", priority: 0.8, changeFrequency: "monthly" },
  { path: "/licensing/beyond-microsoft", priority: 0.6, changeFrequency: "monthly" },
  { path: "/licensing/quote", priority: 0.8, changeFrequency: "yearly" },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/partners/reseller", priority: 0.6, changeFrequency: "monthly" },
  { path: "/partners/agents", priority: 0.5, changeFrequency: "monthly" },
  { path: "/partners/platform", priority: 0.6, changeFrequency: "monthly" },
  { path: "/partners/apply", priority: 0.5, changeFrequency: "yearly" },
  { path: "/support", priority: 0.6, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.6, changeFrequency: "weekly" },
  ...posts.map((p) => ({ path: `/insights/${p.slug}`, priority: 0.5, changeFrequency: "monthly" as const })),
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/demo", priority: 0.8, changeFrequency: "yearly" },
  ...legalSlugs.map((slug) => ({ path: `/legal/${slug}`, priority: 0.2, changeFrequency: "yearly" as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((r) => ({
    url: `${siteUrl}${r.path === "/" ? "" : r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
