import { Faq, type FaqItem } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import type { ConfirmId } from "@/content/confirmations";
import { faqPageSchema } from "@/lib/schema";

export type ContentFaq = { q: string; a: string; confirm?: ConfirmId };

type FaqSectionProps = {
  items: ContentFaq[];
  tone?: "dark" | "light";
  /** Emit FAQPage JSON-LD from the production answers. */
  schema?: boolean;
  className?: string;
};

/**
 * FAQ from a content module: answers that are still a CONFIRM / DECISION item
 * render through `NeedsConfirm` with the production answer as fallback, and
 * the same production answers feed the FAQPage schema.
 */
export function FaqSection({ items, tone = "dark", schema = true, className }: FaqSectionProps) {
  const faq: FaqItem[] = items.map((item) => ({
    q: item.q,
    a: item.confirm ? <NeedsConfirm id={item.confirm} fallback={item.a} /> : item.a,
    schemaText: item.a,
  }));
  return (
    <>
      <Faq items={faq} tone={tone} className={className} />
      {schema ? <JsonLd data={faqPageSchema(items.map((item) => ({ question: item.q, answer: item.a })))} /> : null}
    </>
  );
}
