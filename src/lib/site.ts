/** Canonical origin for metadata, sitemap, and structured data. */
export const siteUrl: string = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://msphub-website.vercel.app";
})();

/** The public hostnames that may be indexed. */
const canonicalHosts = new Set(["msphub.com", "www.msphub.com"]);

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Search engines may index the site only on the real production deployment:
 * the Vercel environment must be `production` AND the canonical origin must be
 * msphub.com (`NEXT_PUBLIC_SITE_URL`, set at cutover). Keying on `VERCEL_ENV`
 * alone would open the team-review URL (`msphub-website.vercel.app`) to
 * indexing today. `robots.txt`, the `robots` meta tag, and the `X-Robots-Tag`
 * header all follow this one switch.
 */
export const allowIndexing: boolean = process.env.VERCEL_ENV === "production" && canonicalHosts.has(hostOf(siteUrl) ?? "");
