"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export type RailStage = { title: string; body: string };

type EngagementRailProps = {
  stages: readonly RailStage[];
  /** `hero`: the station strip docked under the hero frame. `stage`: the vertical progress rail inside the pinned figure. */
  variant: "hero" | "stage";
  /** Stage variant: the current stage (0-based). */
  active?: number;
  tone?: "ink" | "pearl";
  /** Hero variant: one mono line under the stations (from md). */
  caption?: string;
  /** Hero variant: stations link to `#${idPrefix}-01`…, the pinned steps' ids. */
  idPrefix?: string;
  /** Hero variant: accessible name of the station list. */
  label?: string;
  className?: string;
};

/** Node radius in px. Nodes stay round at every width: coordinates are percentages of the box, not a stretched viewBox. */
const R = 5;
const LIT = "fill-[#f97316] stroke-[#f97316]";
const EASE = [0.22, 1, 0.36, 1] as const;

const tones = {
  ink: {
    line: "rgba(255,255,255,.18)",
    track: "stroke-[rgba(255,255,255,.18)]",
    progress: "stroke-[rgba(255,255,255,.6)]",
    done: "fill-[rgba(255,255,255,.6)] stroke-[rgba(255,255,255,.6)]",
    // The fill is the ground colour, so the line reads as passing behind a hollow node.
    hollow: "fill-[#0b1020] stroke-[rgba(255,255,255,.4)]",
    number: "text-[#8e98ae]",
    title: "text-[#b8c0d4]",
    lit: "text-white",
    pill: "border-white/13 bg-white/5",
    caption: "text-[#b8c0d4]",
  },
  pearl: {
    line: "rgba(11,16,32,.18)",
    track: "stroke-[rgba(11,16,32,.18)]",
    progress: "stroke-[rgba(11,16,32,.6)]",
    done: "fill-[rgba(11,16,32,.6)] stroke-[rgba(11,16,32,.6)]",
    hollow: "fill-white stroke-[rgba(11,16,32,.4)]",
    number: "text-[#4b5569]",
    title: "text-[#4b5569]",
    lit: "text-[#0b1020]",
    pill: "border-[#0b1020]/12 bg-white",
    caption: "text-[#4b5569]",
  },
} as const;

type Tone = (typeof tones)[keyof typeof tones];

const nn = (index: number) => String(index + 1).padStart(2, "0");
/** Position of node `index` along the rail, as a percentage of the box. */
const at = (index: number, count: number) => `${(index * 100) / count}%`;

/**
 * MSP Hub's delivery model as a rail (spec §3). Two variants share the data:
 *
 * - `hero`: four station links over one SVG line. The lit station (hovered or
 *   focused, 01 by default) fills its node orange, the only orange on the
 *   rail, and whitens its label; ArrowLeft/ArrowRight move focus between
 *   stations. The wrapper is a `[data-reveal]`, so `.rail-line` in
 *   globals.css draws the line once when it scrolls in, and leaves it drawn
 *   without JavaScript and under reduced motion. Below md the strip is a
 *   horizontally scrolling row of numbered pills, with no SVG.
 * - `stage`: a vertical rail whose progress line runs to the active node
 *   over 300 ms. Earlier nodes sit at .6 alpha, the active node is orange,
 *   later nodes are hollow. Under reduced motion the line is drawn in full
 *   and nothing transitions.
 *
 * No images and no loops.
 */
export function EngagementRail({ stages, variant, active, tone = "ink", caption, idPrefix = "delivery", label = "Delivery model", className }: EngagementRailProps) {
  if (!stages.length) return null;
  const t = tones[tone];
  return variant === "hero" ? (
    <HeroRail stages={stages} t={t} caption={caption} idPrefix={idPrefix} label={label} className={className} />
  ) : (
    <StageRail stages={stages} t={t} active={active} className={className} />
  );
}

type HeroRailProps = Pick<EngagementRailProps, "stages" | "caption" | "className"> & { t: Tone; idPrefix: string; label: string };

function HeroRail({ stages, t, caption, idPrefix, label, className }: HeroRailProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const lit = hovered ?? focused ?? 0;
  const count = stages.length;

  const onKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    // Alt+Arrow is browser history; leave modified keys alone.
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    links.current[(index + delta + count) % count]?.focus();
  };

  return (
    <div data-reveal className={cn("relative", className)}>
      <div className="relative">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden h-6 w-full overflow-visible md:block">
          {/* Shifted by the node radius and stroke so each node sits over the start of its station label. */}
          <g transform={`translate(${R + 1} 0)`}>
            <line className="rail-line rail-draw-once" pathLength={1} x1="0" y1="12" x2={at(count - 1, count)} y2="12" stroke={t.line} strokeWidth={2} />
            {stages.map((stage, i) => (
              <circle key={stage.title} cx={at(i, count)} cy="12" r={R} strokeWidth={1.5} className={cn("transition-[fill,stroke] duration-150", i === lit ? LIT : t.hollow)} />
            ))}
          </g>
        </svg>
        <ol
          aria-label={label}
          style={{ "--stations": count } as CSSProperties}
          className={cn(
            // Phones: one scrolling row that bleeds to the screen edges.
            "-mx-[var(--page-pad)] flex gap-2 overflow-x-auto px-[var(--page-pad)] py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "md:mx-0 md:grid md:grid-cols-[repeat(var(--stations),minmax(0,1fr))] md:gap-0 md:overflow-visible md:p-0",
          )}
        >
          {stages.map((stage, i) => {
            const isLit = i === lit;
            return (
              <li key={stage.title} className="shrink-0">
                <a
                  ref={(el) => {
                    links.current[i] = el;
                  }}
                  href={`#${idPrefix}-${nn(i)}`}
                  onKeyDown={(event) => onKeyDown(event, i)}
                  onPointerEnter={() => setHovered(i)}
                  onPointerLeave={() => setHovered((current) => (current === i ? null : current))}
                  onFocus={() => setFocused(i)}
                  onBlur={() => setFocused((current) => (current === i ? null : current))}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 whitespace-nowrap",
                    t.pill,
                    "md:flex md:min-h-0 md:flex-col md:items-start md:gap-1 md:rounded-[10px] md:border-0 md:bg-transparent md:px-0 md:pt-7 md:pr-3 md:whitespace-normal",
                  )}
                >
                  <span className={cn("font-mono text-[11px] leading-[1.4] tracking-[0.12em] transition-colors duration-150", isLit ? t.lit : t.number)}>{nn(i)}</span>
                  <span className={cn("text-[14px] leading-[1.35] font-semibold transition-colors duration-150", isLit ? t.lit : t.title)}>{stage.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
      {caption ? <p className={cn("mt-3 hidden font-mono text-[12px] leading-[1.5] md:block", t.caption)}>{caption}</p> : null}
    </div>
  );
}

type StageRailProps = Pick<EngagementRailProps, "stages" | "active" | "className"> & { t: Tone };

function StageRail({ stages, active = 0, t, className }: StageRailProps) {
  const reduce = useReducedMotion();
  const count = stages.length;
  const current = Math.min(Math.max(active, 0), count - 1);
  return (
    // Decorative: the stage card beside it names the stage ("Stage 02 of 04").
    <div aria-hidden="true" className={cn("relative w-6 shrink-0", className)}>
      <svg className="absolute inset-x-0 top-1.5 h-[calc(100%_-_12px)] w-full overflow-visible">
        <line x1="50%" y1="0" x2="50%" y2="100%" strokeWidth={2} className={t.track} />
        {/* Nodes sit at the end of each quarter, so (active + 1) / count lands on the active node.
            Reduced motion: CSS drops the dash so the line shows in full (no render-time branch, so hydration matches). */}
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          strokeWidth={2}
          className={cn(t.progress, "motion-reduce:[stroke-dasharray:none]")}
          initial={false}
          animate={{ pathLength: (current + 1) / count }}
          transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
        />
        {stages.map((stage, i) => (
          <circle
            key={stage.title}
            cx="50%"
            cy={at(i + 1, count)}
            r={R}
            strokeWidth={1.5}
            className={cn("motion-safe:transition-[fill,stroke] motion-safe:duration-300", i < current ? t.done : i === current ? LIT : t.hollow)}
          />
        ))}
      </svg>
    </div>
  );
}
