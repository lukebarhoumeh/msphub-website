import type { JsonLdObject } from "@/lib/schema";

/**
 * Renders one or more schema.org objects as a JSON-LD script tag. `<` is
 * escaped so content can never close the script element.
 */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const graph = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
