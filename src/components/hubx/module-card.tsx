import { HubxPathChip, type HubxTone } from "@/components/hubx/primitives";
import { InkLink, inkTone, itemTitle, monoLabel } from "@/components/ink/interior";
import type { HubxModule } from "@/content/hubx-modules";
import { cn } from "@/lib/cn";

type ModuleCardProps = {
  module: HubxModule;
  tone?: HubxTone;
  /** Mono label above the title, e.g. "Previous" / "Next". */
  label?: string;
  className?: string;
};

/** Module summary as a rule-separated item, for the related-module footers. */
export function ModuleCard({ module: m, tone = "light", label, className }: ModuleCardProps) {
  const t = inkTone[tone === "dark" ? "ink" : "pearl"];
  const isFeaturePage = m.href.startsWith("/hubx/features/");
  return (
    <article className={cn("flex h-full flex-col border-t pt-5", t.rule, className)}>
      {label ? <p className={cn(monoLabel, t.faint)}>{label}</p> : null}
      <h3 className={cn(itemTitle, label && "mt-3")}>{m.name}</h3>
      <HubxPathChip path={m.hubxPath} tone={tone} className="mt-3 self-start" />
      <p className={cn("mt-4 max-w-[44ch] text-[16px] leading-[1.6]", t.muted)}>{m.summary}</p>
      <InkLink href={m.href} tone={tone === "dark" ? "ink" : "pearl"} className="mt-auto pt-4">
        {isFeaturePage ? `Explore ${m.name}` : "Security and administration"}
      </InkLink>
    </article>
  );
}
