import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HubxTone } from "@/components/hubx/primitives";
import { IconTile } from "@/components/ui/card";
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
  className?: string;
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/** The twelve "cool things" (handoff §6.3) as tiles with Lucide icons, each linking to its module page. */
export function FeatureGrid({ features = hubxFeatures, tone = "dark", columns = 3, compact = false, anchors = false, className }: FeatureGridProps) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-4", columnClasses[columns], className)}>
      {features.map((f) => {
        const mod = getModule(f.module);
        const surface = cn(
          "group relative flex h-full flex-col transition-[border-color,transform] duration-200",
          dark ? "glass hover:border-white/25" : "card-light hover:border-black/20",
          compact ? "p-5" : "p-6 sm:p-7",
        );
        const body = (
          <>
            <div className="flex items-start justify-between gap-3">
              <IconTile icon={f.icon} />
              <span className={cn("font-mono text-xs tracking-[0.08em]", dark ? "text-white/60" : "text-charcoal/80")}>
                {String(f.rank).padStart(2, "0")}
              </span>
            </div>
            <h3 className={cn("mt-4 font-semibold tracking-tight", compact ? "text-[15px]" : "text-lg", dark ? "text-white" : "text-charcoal")}>
              {f.title}
            </h3>
            <p className={cn("mt-1.5 leading-relaxed", compact ? "text-sm" : "text-[15px]", dark ? "text-white/70" : "text-charcoal/80")}>{f.body}</p>
            {!anchors && mod ? (
              <span className={cn("mt-auto flex items-center gap-1.5 pt-4 text-xs font-semibold", dark ? "text-white/70 group-hover:text-white" : "text-charcoal/80 group-hover:text-charcoal")}>
                {mod.short === "Admin" ? "Security" : mod.name}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden />
              </span>
            ) : null}
          </>
        );
        return (
          <li key={f.id} id={anchors ? f.id : undefined} className={cn(anchors && "scroll-mt-28")}>
            {anchors ? (
              <article className={surface}>{body}</article>
            ) : (
              <Link href={featureHref(f)} className={cn(surface, "rounded-[var(--radius-card)] focus-visible:outline-offset-4")}>
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
