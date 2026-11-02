import { JsonLd, type HubxTone } from "@/components/hubx/primitives";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import type { HubxFaqItem } from "@/content/hubx-faq";
import { cn } from "@/lib/cn";

type FaqSectionProps = {
  items: readonly HubxFaqItem[];
  tone?: HubxTone;
  /** Emit FAQPage structured data from the items marked `schema: true`. */
  schema?: boolean;
  className?: string;
};

/**
 * Accordion built on <details>/<summary> plus FAQPage JSON-LD from the same
 * content. Production shows each item's safe answer; review builds add the
 * confirmation chip and note for items that still depend on a decision.
 */
export function FaqSection({ items, tone = "dark", schema = true, className }: FaqSectionProps) {
  const dark = tone === "dark";
  return (
    <>
      <div className={cn("mx-auto grid max-w-[860px] gap-2.5", className)}>
        {items.map((item, i) => (
          <details
            key={item.id}
            id={`faq-${item.id}`}
            className={cn("group px-6", dark ? "glass glass-soft" : "card-light")}
            open={i === 0}
          >
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden",
                dark ? "text-white" : "text-charcoal",
              )}
            >
              {item.question}
              <span aria-hidden className="text-2xl leading-none text-brand-orange group-open:hidden">
                +
              </span>
              <span aria-hidden className="hidden text-2xl leading-none text-brand-orange group-open:inline">
                –
              </span>
            </summary>
            <div className={cn("max-w-[70ch] pb-5 text-[15px] leading-relaxed", dark ? "text-white/70" : "text-charcoal/80")}>
              {item.confirm ? (
                <NeedsConfirm id={item.confirm} fallback={item.answer}>
                  {item.answer}
                  {item.reviewNote ? ` ${item.reviewNote}` : ""}
                </NeedsConfirm>
              ) : (
                item.answer
              )}
            </div>
          </details>
        ))}
      </div>
      {schema ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items
              .filter((item) => item.schema)
              .map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
          }}
        />
      ) : null}
    </>
  );
}
