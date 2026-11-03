import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubxPathChip } from "@/components/hubx/primitives";
import { inkTone, monoLabel } from "@/components/ink/interior";
import { hubxModules } from "@/content/hubx-modules";
import { cn } from "@/lib/cn";

/**
 * The nine HubX modules, all visible (brief §5: no tabs hiding primary
 * content). A sticky list of anchors on the left from lg up; each module is
 * a rule-separated entry with its route, summary, three capabilities, and the
 * link to its feature page, which carries the full detail and screens.
 */
export function ModuleList({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12", className)}>
      <nav aria-label="HubX modules" className="lg:sticky lg:top-32 lg:self-start">
        <p className={cn(monoLabel, inkTone.pearl.faint)}>Nine modules</p>
        <ol className="mt-3 grid">
          {hubxModules.map((m, index) => (
            <li key={m.slug}>
              <a href={`#module-${m.slug}`} className="flex min-h-10 items-center gap-3 text-[15px] font-medium text-[#0b1020]/75 hover:text-[#0b1020]">
                <span className={cn(monoLabel, "w-6", inkTone.pearl.faint)}>{String(index + 1).padStart(2, "0")}</span>
                {m.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <ol className="grid">
        {hubxModules.map((m, index) => {
          const Icon = m.icon;
          return (
            <li key={m.slug} id={`module-${m.slug}`} data-reveal style={{ "--reveal-delay": `${Math.min(index, 5) * 50}ms` } as React.CSSProperties} className="rule-item grid scroll-mt-32 gap-5 border-t border-[#0b1020]/15 py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10">
              <div>
                <p className={cn(monoLabel, "flex items-center gap-2", inkTone.pearl.faint)}>
                  <Icon className="size-4 text-[#0b1020]" strokeWidth={1.8} aria-hidden />
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-[24px] leading-[1.15] font-bold tracking-[-0.015em]">
                  <Link href={m.href} className="link-draw [--ul:#f97316]">
                    {m.name}
                  </Link>
                </h3>
                <div className="mt-3">
                  <HubxPathChip path={m.hubxPath} tone="light" />
                </div>
              </div>
              <div>
                <p className={cn("text-[15.5px] leading-[1.65]", inkTone.pearl.muted)}>{m.summary}</p>
                <ul className="mt-4 grid gap-2">
                  {m.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[14.5px] leading-snug text-[#0b1020]">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f97316]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link href={m.href} className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#0b1020]">
                  {m.href.startsWith("/hubx/features/") ? `Explore ${m.name}` : "Security and administration"}
                  <ArrowRight className="size-3.5 text-[#f97316]" aria-hidden />
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
