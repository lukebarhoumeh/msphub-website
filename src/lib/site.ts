/**
 * Search engines are told not to index the site until launch. Set
 * `NEXT_PUBLIC_ALLOW_INDEXING=true` only on the production msphub.com
 * deployment; previews and the pre-launch site stay out of search results.
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/** Canonical origin for metadata, sitemap, and structured data. */
export const siteUrl: string = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://msphub-website.vercel.app";
})();
