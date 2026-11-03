import { Accordion } from "@/components/ink/interior";
import { JsonLd, type HubxTone } from "@/components/hubx/primitives";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import type { HubxFaqItem } from "@/content/hubx-faq";
import { cn } from "@/lib/cn";

type FaqSectionProps = {
  items: readonly HubxFaqItem[];
  tone?: HubxTone;
  /** `rule`: Ink & Glass disclosures separated by rules; `card`: the legacy card accordion. */
  variant?: "card" | "rule";
  /** Emit FAQPage structured data from the items marked `schema: true`. */
  schema?: boolean;
  className?: string;
};

function answerFor(item: HubxFaqItem) {
  return item.confirm ? (
    <NeedsConfirm id={item.confirm} fallback={item.answer}>
      {item.answer}
      {item.reviewNote ? ` ${item.reviewNote}` : ""}
    </NeedsConfirm>
  ) : (
    item.answer
  );
}

/**
 * Accordion built on <details>/<summary> plus FAQPage JSON-LD from the same
 * content. Production shows each item's safe answer; review builds add the
 * confirmation chip and note for items that still depend on a decision.
 */
export function FaqSection({ items, tone = "dark", variant = "card", schema = true, className }: FaqSectionProps) {
  const dark = tone === "dark";
  return (
    <>
      {variant === "rule" ? (
        <Accordion items={items.map((item) => ({ id: `faq-${item.id}`, q: item.question, a: answerFor(item) }))} tone={dark ? "ink" : "pearl"} className={className} />
      ) : (
        <div className={cn("mx-auto grid max-w-[860px] gap-2.5", className)}>
          {items.map((item, i) => (
            <details key={item.id} id={`faq-${item.id}`} className={cn("group px-6", dark ? "glass glass-soft" : "card-light")} open={i === 0}>
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
              <div className={cn("max-w-[70ch] pb-5 text-[15px] leading-relaxed", dark ? "text-white/70" : "text-charcoal/80")}>{answerFor(item)}</div>
            </details>
          ))}
        </div>
      )}
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
