import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";

/**
 * JSON-LD builders (schema.org). Rendered with `<JsonLd />` from
 * `src/components/seo/json-ld.tsx`. Only facts from `content/*` appear here;
 * nothing is invented for the sake of markup.
 */

export type JsonLdObject = Record<string, unknown> & { "@type": string };

const ORGANIZATION_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

export function organizationSchema(): JsonLdObject {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.formerly,
    url: siteUrl,
    logo: `${siteUrl}/favicon/icon-512.png`,
    foundingDate: String(site.founded),
    email: site.salesEmail,
    telephone: site.salesPhone,
    address: { "@type": "PostalAddress", streetAddress: site.hq.address, addressCountry: "US" },
    sameAs: Object.values(site.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.salesEmail,
        telephone: site.salesPhone,
        availableLanguage: "English",
      },
    ],
  };
}

export function webSiteSchema(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: siteUrl,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };
}

export type ServiceSchemaInput = {
  name: string;
  description: string;
  /** Route path of the service page. */
  path: string;
  /** schema.org `serviceType`, e.g. "Microsoft 365 professional services". */
  serviceType?: string;
  /** Served regions, e.g. ["US", "CA", "GB"]. */
  areaServed?: string[];
};

export function serviceSchema({ name, description, path, serviceType, areaServed }: ServiceSchemaInput): JsonLdObject {
  return {
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    ...(serviceType ? { serviceType } : {}),
    ...(areaServed ? { areaServed } : {}),
    provider: { "@id": ORGANIZATION_ID },
  };
}

export function softwareApplicationSchema({ description }: { description: string }): JsonLdObject {
  return {
    "@type": "SoftwareApplication",
    name: "HubX",
    alternateName: "HubX, powered by MSP Hub",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/hubx"),
    installUrl: site.hubxLoginUrl,
    description,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export type FaqSchemaItem = { question: string; answer: string };

export function faqPageSchema(items: FaqSchemaItem[]): JsonLdObject {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function contactPageSchema({ path, name }: { path: string; name: string }): JsonLdObject {
  return {
    "@type": "ContactPage",
    name,
    url: absoluteUrl(path),
    about: { "@id": ORGANIZATION_ID },
  };
}
