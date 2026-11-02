"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { CheckList } from "@/components/marketing/blocks";
import { ButtonLink } from "@/components/ui/button";
import type { Audience } from "@/content/audiences";
import { cn } from "@/lib/cn";

type AudienceTabsProps = {
  audiences: Audience[];
  defaultId?: Audience["id"];
  className?: string;
};

/**
 * WAI-ARIA tabs for the "Who we serve" section. Every panel is server-rendered
 * (SEO) and hidden with `hidden`; arrow keys, Home, and End move the active tab.
 */
export function AudienceTabs({ audiences, defaultId, className }: AudienceTabsProps) {
  const baseId = useId();
  const [active, setActive] = useState<Audience["id"]>(defaultId ?? audiences[0].id);
  const activeIndex = audiences.findIndex((a) => a.id === active);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowRight: (activeIndex + 1) % audiences.length,
      ArrowLeft: (activeIndex - 1 + audiences.length) % audiences.length,
      Home: 0,
      End: audiences.length - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const id = audiences[next].id;
    setActive(id);
    document.getElementById(`${baseId}-tab-${id}`)?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Who we serve"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2 rounded-full border border-white/12 bg-white/5 p-1.5 sm:inline-flex"
      >
        {audiences.map((a) => {
          const selected = a.id === active;
          return (
            <button
              key={a.id}
              id={`${baseId}-tab-${a.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${a.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(a.id)}
              className={cn(
                "h-10 rounded-full px-4 text-sm font-medium transition-colors",
                selected ? "bg-brand-orange text-ink" : "text-white/70 hover:bg-white/8 hover:text-white",
              )}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      {audiences.map((a) => (
        <div
          key={a.id}
          id={`${baseId}-panel-${a.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${a.id}`}
          hidden={a.id !== active}
          className="glass glass-lg mt-5 grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 motion-safe:animate-fade-up"
        >
          <div>
            <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight tracking-[-0.01em] text-white">{a.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">{a.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={a.cta.href} size="sm">
                {a.cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              {a.secondary ? (
                <ButtonLink href={a.secondary.href} variant="glass" size="sm">
                  {a.secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
          <CheckList items={a.points} />
        </div>
      ))}
    </div>
  );
}
