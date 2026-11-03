"use client";

import { useEffect, useId, useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import { HubxPathChip, PointList, ToneLink } from "@/components/hubx/primitives";
import { EvidenceFigure } from "@/components/ink/evidence";
import { captures, moduleEvidence, type CaptureId } from "@/content/evidence";
import { hubxModules as modules, type ModuleSlug } from "@/content/hubx-modules";
import { cn } from "@/lib/cn";

type ModuleExplorerProps = {
  className?: string;
};

const HASH_PREFIX = "#module-";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/**
 * The nine HubX modules as WAI-ARIA tabs on a light canvas: a vertical list on
 * desktop (mirroring the product's sub-navigation) and a scrollable pill row
 * on small screens. Every panel is server-rendered for SEO and hidden with
 * `hidden`; only the visible capture is fetched. The URL hash is the source of
 * truth (`#module-<slug>`), so deep links and the back button both work. The
 * module list is imported here rather than passed in: Lucide icons are
 * components and cannot cross the server/client boundary as props.
 */
export function ModuleExplorer({ className }: ModuleExplorerProps) {
  const baseId = useId();
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );
  const requested = hash.startsWith(HASH_PREFIX) ? hash.slice(HASH_PREFIX.length) : "";
  const active: ModuleSlug = modules.find((m) => m.slug === requested)?.slug ?? modules[0].slug;
  const activeIndex = modules.findIndex((m) => m.slug === active);
  const root = useRef<HTMLDivElement>(null);

  // A deep link (`/hubx#module-catalog`) has no matching element id, so bring the explorer into view ourselves.
  useEffect(() => {
    if (!window.location.hash.startsWith(HASH_PREFIX)) return;
    root.current?.scrollIntoView({ block: "start" });
  }, []);

  function select(slug: ModuleSlug, focus = false) {
    window.history.replaceState(window.history.state, "", `${HASH_PREFIX}${slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    if (focus) document.getElementById(`${baseId}-tab-${slug}`)?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowDown: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      ArrowUp: activeIndex - 1,
      Home: 0,
      End: modules.length - 1,
    };
    const next = moves[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(modules[(next + modules.length) % modules.length].slug, true);
  }

  return (
    <div ref={root} className={cn("grid scroll-mt-28 gap-6 lg:grid-cols-[260px_1fr] lg:gap-8", className)}>
      <div
        role="tablist"
        aria-label="HubX modules"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="grid content-start gap-1 self-start"
      >
        {modules.map((m) => {
          const selected = m.slug === active;
          const Icon = m.icon;
          return (
            <button
              key={m.slug}
              id={`${baseId}-tab-${m.slug}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${m.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(m.slug)}
              className={cn(
                "relative flex min-h-11 items-center gap-2.5 rounded-[10px] px-3 text-left text-sm font-medium transition-colors",
                selected ? "bg-canvas text-charcoal" : "text-charcoal/80 hover:bg-canvas/70 hover:text-charcoal",
              )}
            >
              <span
                aria-hidden
                className={cn("hidden h-5 w-0.5 rounded-full lg:block", selected ? "bg-brand-orange" : "bg-transparent")}
              />
              <Icon className="size-4 shrink-0 text-[#0b1020]" strokeWidth={1.8} aria-hidden />
              {m.name}
            </button>
          );
        })}
      </div>

      {modules.map((m) => {
        const captureId: CaptureId | undefined = moduleEvidence[m.slug]?.[0];
        return (
          <div
            key={m.slug}
            id={`${baseId}-panel-${m.slug}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${m.slug}`}
            hidden={m.slug !== active}
            className="card-light min-w-0 p-5 motion-safe:animate-fade-up sm:p-7"
          >
            <div className="grid gap-7 lg:grid-cols-[1fr_1.15fr] lg:gap-9">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold tracking-tight text-charcoal">{m.name}</h3>
                  <HubxPathChip path={m.hubxPath} tone="light" />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal/80">{m.summary}</p>
                <PointList items={m.bullets.slice(0, 4)} tone="light" className="mt-5" dense />
                <ToneLink href={m.href} tone="light" className="mt-6">
                  {m.href.startsWith("/hubx/features/") ? `Explore ${m.name}` : "Security and administration"}
                </ToneLink>
              </div>
              {captureId ? <EvidenceFigure capture={captures[captureId]} tone="pearl" /> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
