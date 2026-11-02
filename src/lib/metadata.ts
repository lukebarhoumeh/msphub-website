import type { Metadata } from "next";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. `/licensing/switch`; becomes the canonical and og:url. */
  path: string;
  /** Keep the page out of search results (thank-you pages, previews of gated content). */
  noIndex?: boolean;
  /** Override the social title when the SEO title is long. */
  socialTitle?: string;
};

/**
 * Per-route metadata in one call: title, description, canonical, Open Graph
 * and Twitter card fields. The root layout supplies `metadataBase`, the site
 * name, locale, and the default OG image; a route's own `opengraph-image.tsx`
 * (see `src/lib/og.tsx`) overrides the image.
 */
export function pageMetadata({ title, description, path, noIndex, socialTitle }: PageMetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  const social = socialTitle ?? title;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: social,
      description,
      url: canonical,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: social, description },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Absolute URL for a route path. */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}`;
}
