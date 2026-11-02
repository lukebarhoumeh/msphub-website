import type { MetadataRoute } from "next";
import { featureModules } from "@/content/hubx-modules";
import { siteUrl } from "@/lib/site";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
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
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/demo", priority: 0.8, changeFrequency: "yearly" },
  { path: "/microsoft-365-quote", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
