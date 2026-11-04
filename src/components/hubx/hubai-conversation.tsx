import { Copy, Pencil, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { HubXMark, type HubxTone } from "@/components/hubx/primitives";
import { hubAiDemo, hubAiFooter, hubAiScopeLabel, hubAiSuggestedPrompts } from "@/content/hubai-demo";
import { cn } from "@/lib/cn";

type HubAiConversationProps = {
  tone?: HubxTone;
  className?: string;
  /** Show only the first N question/answer pairs (the services hero teaser shows one). */
  turns?: number;
  /** Tighter padding and gaps for a hero aside. */
  compact?: boolean;
};

/**
 * Read-only HubAI demo conversation (handoff §5.2): two questions, two
 * tabular answers, the product's suggested prompts and feedback controls, and
 * the scope line. Static markup, fictional data; nothing is interactive.
 */
export function HubAiConversation({ tone = "light", className, turns, compact = false }: HubAiConversationProps) {
  const dark = tone === "dark";
  const shown = turns ? hubAiDemo.slice(0, turns * 2) : hubAiDemo;
  const muted = dark ? "text-white/60" : "text-charcoal/80";
  const strong = dark ? "text-white" : "text-charcoal";
  return (
    <div
      className={cn("flex min-w-0 flex-col overflow-hidden", compact ? "gap-3" : "gap-4", dark ? "glass glass-lg" : "card-light", compact ? "p-4 sm:p-5" : "p-5 sm:p-6", className)}
      role="group"
      aria-label="Example HubAI conversation with demo data"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={cn("flex items-center gap-2 text-sm font-semibold", strong)}>
          {/* White in the compact hero teaser, where the question bubble is the panel's one orange. */}
          <HubXMark className="size-4" variant={compact ? "white" : "orange"} />
          HubAI
        </p>
        <p className={cn("font-mono text-[11px] tracking-[0.08em] uppercase", muted)}>{hubAiScopeLabel}</p>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label="Suggested prompts">
        {hubAiSuggestedPrompts.map((prompt) => (
          <li
            key={prompt}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium",
              dark ? "border-white/12 bg-white/5 text-white/75" : "border-black/10 bg-canvas text-charcoal/85",
            )}
          >
            {prompt}
          </li>
        ))}
      </ul>

      <ol className="flex min-w-0 flex-col gap-3">
        {shown.map((turn, i) =>
          turn.role === "user" ? (
            <li
              key={i}
              className={cn(
                "ml-auto max-w-[88%] min-w-0 rounded-2xl rounded-br-sm border px-3.5 py-2.5 text-sm",
                dark ? "border-brand-orange/30 bg-brand-orange/16 text-white" : "border-brand-orange/30 bg-brand-orange/10 text-charcoal",
              )}
            >
              <span className="sr-only">You: </span>
              {turn.text}
            </li>
          ) : (
            <li
              key={i}
              className={cn(
                "min-w-0 max-w-full rounded-2xl rounded-bl-sm border px-3.5 py-3 text-sm",
                dark ? "border-white/12 bg-white/6" : "border-black/8 bg-canvas",
              )}
            >
              <p className={cn("font-medium", strong)}>
                <span className="sr-only">HubAI: </span>
                {turn.intro}
              </p>
              <div
                className="mt-2.5 overflow-x-auto rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                tabIndex={0}
                role="group"
                aria-label={`${turn.intro} Table, scrollable on small screens.`}
              >
                <table className="w-full border-collapse text-[12.5px]">
                  <thead>
                    <tr>
                      {turn.columns.map((c) => (
                        <th
                          key={c}
                          scope="col"
                          className={cn("border-b px-2 pb-1.5 text-left font-mono text-[11px] font-medium tracking-[0.04em] whitespace-nowrap uppercase", dark ? "border-white/10 text-white/60" : "border-black/10 text-charcoal/85")}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {turn.rows.map((r) => (
                      <tr key={r.join("|")}>
                        {r.map((cell, j) => (
                          <td
                            key={j}
                            className={cn(
                              "border-b px-2 py-1.5 tabular-nums last:border-b-0",
                              j === 0 ? "min-w-[8rem]" : "whitespace-nowrap",
                              dark ? "border-white/6 text-white/85" : "border-black/6 text-charcoal",
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {turn.note ? <p className={cn("mt-2 text-xs", muted)}>{turn.note}</p> : null}
              <div className={cn("mt-2.5 flex items-center gap-3", muted)} aria-label="Answer controls (edit, retry, like, dislike, copy)">
                <Pencil className="size-3.5" aria-hidden />
                <RotateCcw className="size-3.5" aria-hidden />
                <ThumbsUp className="size-3.5" aria-hidden />
                <ThumbsDown className="size-3.5" aria-hidden />
                <Copy className="size-3.5" aria-hidden />
                <span className="ml-auto font-mono text-[10.5px] tracking-[0.06em] uppercase">~5 s</span>
              </div>
            </li>
          ),
        )}
      </ol>

      <p className={cn("text-xs", muted)}>{hubAiFooter}</p>
    </div>
  );
}
