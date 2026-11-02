"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "@/components/hubx/track";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import type { Screen, ScreenTheme } from "@/content/screens";
import { cn } from "@/lib/cn";

type ThemedScreen<T extends ScreenTheme> = Screen & { theme: T };

/** Light and dark captures never share a carousel (handoff §9); the union makes a mixed list a type error. */
export type ScreenSet = readonly ThemedScreen<"light">[] | readonly ThemedScreen<"dark">[];

type ScreenshotCarouselProps = {
  screens: ScreenSet;
  /** Accessible name of the carousel, e.g. "HubX product tour". */
  label: string;
  /** Short tab labels, one per screen; defaults to each capture's `short` label. */
  labels?: readonly string[];
  /** Give the first slide priority loading (only when the carousel is above the fold). */
  priorityFirst?: boolean;
  sizes?: string;
  className?: string;
};

const SWIPE_THRESHOLD_PX = 48;

/**
 * Tabbed carousel of real HubX captures inside BrowserFrames: thumbnail tabs,
 * previous/next buttons, arrow keys, swipe, no autoplay. Every slide is in the
 * DOM (hidden when inactive) so the captions index and the layout never
 * shifts; all captures share one aspect ratio.
 */
export function ScreenshotCarousel({
  screens,
  label,
  labels,
  priorityFirst = false,
  sizes = "(min-width: 1280px) 1100px, 100vw",
  className,
}: ScreenshotCarouselProps) {
  const baseId = useId();
  const [index, setIndex] = useState(0);
  const pointer = useRef<{ id: number; x: number } | null>(null);
  const dark = screens[0]?.theme === "dark";
  const count = screens.length;

  function go(next: number, focusTab = false) {
    const target = (next + count) % count;
    if (target === index) return;
    setIndex(target);
    const screen = screens[target];
    track("screenshot_view", { screen: screen.id, position: target + 1, carousel: label });
    if (focusTab) document.getElementById(`${baseId}-tab-${target}`)?.focus();
  }

  function onTabKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: count - 1 };
    const next = moves[e.key];
    if (next === undefined) return;
    e.preventDefault();
    go(next, true);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointer.current = { id: e.pointerId, x: e.clientX };
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const start = pointer.current;
    pointer.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    go(dx < 0 ? index + 1 : index - 1);
  }

  if (count === 0) return null;

  const navButton = cn(
    "grid size-11 shrink-0 place-items-center rounded-full border transition-colors disabled:opacity-40",
    dark ? "border-white/15 bg-white/6 text-white hover:bg-white/12" : "border-black/10 bg-white text-charcoal hover:bg-black/5",
  );

  return (
    <section aria-roledescription="carousel" aria-label={label} className={cn("w-full", className)}>
      <div
        className="touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointer.current = null;
        }}
      >
        <div aria-live="polite">
          {screens.map((screen, i) => (
            <div
              key={screen.id}
              id={`${baseId}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${i}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${screen.caption}`}
              hidden={i !== index}
              tabIndex={0}
              className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
            >
              <BrowserFrame screen={screen} sizes={sizes} priority={priorityFirst && i === 0} viewport="scroll" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 sm:gap-4">
        <button type="button" onClick={() => go(index - 1)} className={navButton} aria-label="Previous screenshot">
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        <div
          role="tablist"
          aria-label={`${label}: screens`}
          onKeyDown={onTabKeyDown}
          className="scrollbar-none flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 sm:justify-center"
        >
          {screens.map((screen, i) => {
            const selected = i === index;
            const text = labels?.[i] ?? screen.short;
            return (
              <button
                key={screen.id}
                id={`${baseId}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${i}`}
                aria-label={`${text}: ${screen.caption}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i)}
                className={cn(
                  "group flex shrink-0 flex-col items-center gap-1.5 rounded-xl border p-1.5 transition-colors",
                  selected
                    ? "border-brand-orange bg-brand-orange/10"
                    : dark
                      ? "border-white/12 bg-white/4 hover:border-white/30"
                      : "border-black/10 bg-white hover:border-black/25",
                )}
              >
                <Image
                  src={screen.image}
                  alt=""
                  sizes="96px"
                  className={cn("h-12 w-20 rounded-md object-cover object-top", !selected && "opacity-80 group-hover:opacity-100")}
                />
                <span
                  className={cn(
                    "max-w-[5.5rem] truncate font-mono text-[10.5px] tracking-[0.06em] uppercase",
                    selected ? (dark ? "text-white" : "text-charcoal") : dark ? "text-white/60" : "text-charcoal/80",
                  )}
                >
                  {text}
                </span>
              </button>
            );
          })}
        </div>

        <button type="button" onClick={() => go(index + 1)} className={navButton} aria-label="Next screenshot">
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
