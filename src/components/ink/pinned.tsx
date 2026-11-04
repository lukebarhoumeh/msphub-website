"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { DeviceFrame } from "@/components/ink/device-frame";
import { GhostNumeral } from "@/components/ink/atmosphere";
import { captures, truthLabel, type CaptureId } from "@/content/evidence";
import { cn } from "@/lib/cn";

export type PinnedStep = {
  n: string;
  title: string;
  body: string;
  /** Where the title links; a plain heading when omitted. */
  href?: string;
  /** A real HubX screen for the sticky frame (the home outcomes). */
  capture?: CaptureId;
  /** HubX route shown in the frame's chrome. */
  path?: string;
};

type PinnedProps = {
  steps: readonly PinnedStep[];
  label: string;
  /** Renders the sticky figure for a step instead of a device frame (the services delivery figures). */
  figure?: (index: number) => ReactNode;
  tone?: "pearl" | "ink";
  /** Minimum height of each step from lg up while pinned (a CSS length). */
  stepMinH?: string;
  /** Gives each step an id `${idPrefix}-${n}` so hero anchors can target it. */
  idPrefix?: string;
  /** Caption under the sticky figure; `null` hides it. Defaults to the truth label when captures are shown. */
  caption?: string | null;
};

/** Steps pin (and one is "current") only from lg and when motion is allowed; the CSS uses the same conditions. */
const pinsQuery = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";
const subscribePins = (onChange: () => void) => {
  const media = window.matchMedia(pinsQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const pinsNow = () => window.matchMedia(pinsQuery).matches;
const pinsOnServer = () => false;

const tones = {
  pearl: { faint: "text-[#4b5569]", body: "text-[#4b5569]", dim: "motion-safe:lg:text-[#0b1020]/45", ul: "[--ul:#f97316]" },
  ink: { faint: "text-[#8e98ae]", body: "text-[#b8c0d4]", dim: "motion-safe:lg:text-white/45", ul: "[--ul:#ffb05c]" },
} as const;

/**
 * Pinned scrollytelling: the steps scroll on the left while one figure stays
 * put on the right and changes per step. The step index follows the scroll
 * position of the step list (motion `useScroll`), so the page never hijacks
 * scrolling. Under lg, and under reduced motion, every step renders with its
 * own figure, static. The figure is a real HubX screen in a device frame
 * (`capture`) or anything the caller renders (`figure`).
 *
 * Pinned versus stacked is decided in CSS (`motion-safe:` / `motion-reduce:`),
 * never by `useReducedMotion`: that hook is `null` on the server, so a branch
 * on it sends the server's markup to a client that renders different markup.
 */
export function Pinned({ steps, label, figure, tone = "pearl", stepMinH = "70vh", idPrefix, caption }: PinnedProps) {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const pins = useSyncExternalStore(subscribePins, pinsNow, pinsOnServer);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive((current) => (current === next ? current : next));
  });
  const t = tones[tone];
  const usesCaptures = !figure;
  const captionText = caption === undefined ? (usesCaptures ? truthLabel : null) : caption;

  const stepFigure = (step: PinnedStep, i: number) =>
    figure ? figure(i) : step.capture ? <DeviceFrame capture={captures[step.capture]} path={step.path ?? "/"} /> : null;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <ol ref={ref} aria-label={label} className="grid gap-16 lg:col-span-5 lg:gap-0" style={{ "--step-min-h": stepMinH } as React.CSSProperties}>
        {steps.map((step, i) => {
          const current = i === active;
          return (
            <li
              key={step.n}
              id={idPrefix ? `${idPrefix}-${step.n}` : undefined}
              className="relative flex scroll-mt-28 flex-col justify-center motion-safe:lg:min-h-[var(--step-min-h)]"
              aria-current={pins && current ? "step" : undefined}
            >
              <GhostNumeral className="lg:hidden">{step.n}</GhostNumeral>
              <p className={cn("font-mono text-[11px] tracking-[0.12em] uppercase", t.faint)}>{step.n}</p>
              <h3 className={cn("mt-3 font-display text-[28px] leading-[1.06] font-bold tracking-[-0.02em] transition-colors duration-300 lg:text-[40px]", !current && t.dim)}>
                {step.href ? (
                  <Link href={step.href} className={cn("link-draw", t.ul)}>
                    {step.title}
                  </Link>
                ) : (
                  step.title
                )}
              </h3>
              <p className={cn("mt-4 max-w-[44ch] text-[17px] leading-[1.6] transition-opacity duration-300", t.body, !current && "motion-safe:lg:opacity-85")}>{step.body}</p>
              {/* Each step carries its own figure where the pane cannot pin. */}
              <div className="mt-8 motion-safe:lg:hidden">{stepFigure(step, i)}</div>
            </li>
          );
        })}
      </ol>
      {/* The pane: from lg, and only when motion is allowed. */}
      {figure || steps.some((step) => step.capture) ? (
        <div className="hidden lg:col-span-7 motion-safe:lg:block">
          {/* Pins below the header, or below the header and a section sub-nav (`--pinned-top`, globals.css). */}
          <div className="sticky top-[var(--pinned-top,7rem)]">
            {usesCaptures ? (
              <div className="relative aspect-[8/9] max-h-[calc(100vh-9rem)] w-full">
                {steps.map((step, i) => (
                  <div
                    key={step.n}
                    aria-hidden={i !== active}
                    className={cn("absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]", i === active ? "scale-100 opacity-100" : "scale-[.985] opacity-0")}
                  >
                    {step.capture ? <DeviceFrame capture={captures[step.capture]} path={step.path ?? "/"} className="mx-auto max-w-[640px]" /> : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative w-full">{figure?.(active)}</div>
            )}
            {captionText ? <p className={cn("mt-4 text-center font-mono text-[11px] tracking-[0.12em] uppercase", t.faint)}>{captionText}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
