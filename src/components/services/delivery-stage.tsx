"use client";

import { DotList, Panel, inkTone, monoLabel } from "@/components/ink/interior";
import { EngagementRail } from "@/components/services/engagement-rail";
import { cn } from "@/lib/cn";

/** The delivery model and what each stage hands over (`professional.engagement`, `professional.deliverables`), passed in by the page. */
export type DeliveryStageData = {
  stages: readonly { title: string; body: string }[];
  deliverables: readonly (readonly string[])[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The pinned figure for "How we deliver" (spec §3, chapter 03): the vertical
 * stage rail beside four stacked stage cards that crossfade in one grid cell,
 * so the panel keeps the height of its tallest card and nothing reflows as
 * the active stage changes. Inactive cards are hidden from assistive tech and
 * the pointer. Each card names its stage and lists what that stage hands
 * over.
 *
 * Where `Pinned` cannot pin (below lg, reduced motion) it renders one figure
 * per step right under that step's own title and body, so the card drops its
 * repeat of them there and keeps the stage label and the deliverables.
 */
export function DeliveryStage({ active, stages, deliverables, className }: DeliveryStageData & { active: number; className?: string }) {
  const total = pad(stages.length);
  return (
    <Panel tone="pearl" className={cn("mx-auto grid w-full max-w-[600px] grid-cols-[24px_minmax(0,1fr)] gap-x-5 sm:gap-x-8", className)}>
      <EngagementRail variant="stage" stages={stages} active={active} tone="pearl" />
      <div className="grid">
        {stages.map((stage, i) => {
          const current = i === active;
          return (
            <div
              key={stage.title}
              aria-hidden={current ? undefined : true}
              className={cn(
                "[grid-area:1/1] motion-safe:transition-[opacity,visibility] motion-safe:duration-300",
                current ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
              )}
            >
              <p className={cn(monoLabel, inkTone.pearl.faint)}>
                Stage {pad(i + 1)} of {total}
              </p>
              <div className="max-lg:hidden motion-reduce:hidden">
                <p className="mt-3 font-display text-[28px] leading-[1.1] font-bold tracking-[-0.02em] text-balance">{stage.title}</p>
                <p className={cn("mt-3 max-w-[52ch] text-[16px] leading-[1.6]", inkTone.pearl.muted)}>{stage.body}</p>
              </div>
              <DotList tone="pearl" marker="neutral" items={deliverables[i] ?? []} className="mt-5" />
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
