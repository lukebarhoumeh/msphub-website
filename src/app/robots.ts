import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/site";

/**
 * Indexing is allowed only on the real production deployment (Vercel
 * `production` environment with `NEXT_PUBLIC_SITE_URL=https://msphub.com`);
 * previews and the team-review URL disallow everything. See `src/lib/site.ts`.
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
