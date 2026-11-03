"use client";

import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { homeEngines, type EngineId } from "@/content/home";
import { cn } from "@/lib/cn";
import { EngineSymbol } from "./engine-symbol";

export function EngineMatrix() {
  const baseId = useId();
  const [active, setActive] = useState<EngineId>("hubx");
  const selected = homeEngines.find((engine) => engine.id === active) ?? homeEngines[0];

  return (
    <div>
      <div className="hidden min-[600px]:block">
        <div role="tablist" aria-label="What MSP Hub does" className="grid grid-cols-2 gap-px bg-[#0b1020]/10 min-[1024px]:grid-cols-4">
          {homeEngines.map((engine, index) => {
            const selectedTab = engine.id === active;
            return (
              <button
                key={engine.id}
                id={`${baseId}-tab-${engine.id}`}
                type="button"
                role="tab"
                aria-selected={selectedTab}
                aria-controls={`${baseId}-panel`}
                tabIndex={selectedTab ? 0 : -1}
                onClick={() => setActive(engine.id)}
                onKeyDown={(e) => {
                  const next =
                    e.key === "ArrowRight" || e.key === "ArrowDown"
                      ? index + 1
                      : e.key === "ArrowLeft" || e.key === "ArrowUp"
                        ? index - 1
                        : e.key === "Home"
                          ? 0
                          : e.key === "End"
                            ? homeEngines.length - 1
                            : null;
                  if (next === null) return;
                  e.preventDefault();
                  const target = homeEngines[(next + homeEngines.length) % homeEngines.length];
                  setActive(target.id);
                  document.getElementById(`${baseId}-tab-${target.id}`)?.focus();
                }}
                className={cn(
                  "flex min-h-44 flex-col items-start gap-4 bg-[#f4f6fb] p-5 text-left",
                  selectedTab && "bg-white",
                )}
              >
                <EngineSymbol engine={engine.id} />
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-2xl font-bold tracking-[-0.015em] text-[#0b1020]">{engine.name}</span>
                  {engine.meta ? (
                    <span className="font-mono text-[11px] tracking-[0.12em] text-[#4b5569] uppercase">{engine.meta}</span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${selected.id}`} className="border-t border-[#0b1020]/10 bg-white px-6 py-8 motion-safe:transition-opacity motion-safe:duration-200">
          <p className="max-w-[62ch] text-[17px] leading-[1.65] text-[#0b1020]">{selected.summary}</p>
          <ButtonLink href={selected.href} variant="outline" className="mt-6">
            {selected.name}
          </ButtonLink>
        </div>
      </div>

      <div className="grid gap-3 min-[600px]:hidden">
        {homeEngines.map((engine) => (
          <details key={engine.id} className="border-b border-[#0b1020]/10 bg-white open:bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
              <EngineSymbol engine={engine.id} />
              <span className="flex flex-1 flex-wrap items-baseline gap-x-3">
                <span className="font-display text-[22px] font-bold tracking-[-0.015em]">{engine.name}</span>
                {engine.meta ? <span className="font-mono text-[11px] tracking-[0.12em] text-[#4b5569] uppercase">{engine.meta}</span> : null}
              </span>
            </summary>
            <div className="px-4 pb-5">
              <p className="text-[16px] leading-[1.65] text-[#0b1020]">{engine.summary}</p>
              <ButtonLink href={engine.href} variant="outline" size="sm" className="mt-4">
                {engine.name}
              </ButtonLink>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
