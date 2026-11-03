import Link from "next/link";
import type { HubxTone } from "@/components/hubx/primitives";
import { inkTone, itemTitle, monoLabel } from "@/components/ink/interior";
import { featureHref, hubxFeatures, type HubxFeature } from "@/content/hubx-features";
import { getModule } from "@/content/hubx-modules";
import { cn } from "@/lib/cn";

type FeatureGridProps = {
  features?: readonly HubxFeature[];
  tone?: HubxTone;
  columns?: 2 | 3 | 4;
  /** Tighter tiles for the home page. */
  compact?: boolean;
  /** Render the tiles as section anchors (on the module page) instead of links to it. */
  anchors?: boolean;
  /** "all" hides partner-economics tiles (margin, forecast, partner invoicing) for mixed-audience pages. */
  audience?: "partner" | "all";
  className?: string;
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * The twelve capabilities (handoff §6.3) as rule-separated tiles in the Ink &
 * Glass voice: mono rank, display title, one line of body, and the module the
 * capability lives in. Each tile links to its module page.
 */
export function FeatureGrid({ features = hubxFeatures, tone = "dark", columns = 3, compact = false, anchors = false, audience, className }: FeatureGridProps) {
  const t = inkTone[tone === "dark" ? "ink" : "pearl"];
  const visible = audience === "all" ? features.filter((f) => f.audience !== "partner") : features;
  return (
    <ul className={cn("grid gap-x-8", compact ? "gap-y-8" : "gap-y-10", columnClasses[columns], className)}>
      {visible.map((f, index) => {
        const mod = getModule(f.module);
        const rank = String(audience === "all" ? index + 1 : f.rank).padStart(2, "0");
        const moduleName = mod ? (mod.short === "Admin" ? "Security" : mod.name) : null;
        const body = (
          <>
            <p className={cn(monoLabel, "flex items-center justify-between gap-3", t.faint)}>
              <span>{rank}</span>
              {moduleName ? <span className="truncate text-right normal-case tracking-[0.04em]">{moduleName}</span> : null}
            </p>
            <h3 className={cn("mt-3", compact ? "font-display text-xl font-bold tracking-[-0.01em]" : itemTitle, !anchors && "underline decoration-2 underline-offset-[5px]", !anchors && t.underline)}>
              {f.title}
            </h3>
            <p className={cn("mt-3 max-w-[40ch] leading-[1.6]", compact ? "text-[15px]" : "text-[16px]", t.muted)}>{f.body}</p>
          </>
        );
        return (
          <li key={f.id} id={anchors ? f.id : undefined} className={cn("border-t pt-5", t.rule, anchors && "scroll-mt-28")}>
            {anchors ? (
              <article>{body}</article>
            ) : (
              <Link href={featureHref(f)} className="block focus-visible:outline-offset-4">
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
