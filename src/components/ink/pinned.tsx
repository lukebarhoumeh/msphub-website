"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { DeviceFrame } from "@/components/ink/device-frame";
import { GhostNumeral } from "@/components/ink/atmosphere";
import { captures, type CaptureId } from "@/content/evidence";
import { cn } from "@/lib/cn";

export type PinnedStep = {
  n: string;
  title: string;
  body: string;
  href: string;
  capture: CaptureId;
  /** HubX route shown in the frame's chrome. */
  path: string;
};

/**
 * Pinned scrollytelling: the steps scroll on the left while one device frame
 * stays put on the right and its HubX screen crossfades per step. The step
 * index follows the scroll position of the step list (motion `useScroll`),
 * so the page never hijacks scrolling. Under lg, and under reduced motion,
 * every step renders with its own screen, static.
 */
export function Pinned({ steps, label }: { steps: readonly PinnedStep[]; label: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive((current) => (current === next ? current : next));
  });
  const pinned = !reduce;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <ol ref={ref} aria-label={label} className="grid gap-16 lg:col-span-5 lg:gap-0">
        {steps.map((step, i) => {
          const current = i === active;
          return (
            <li key={step.n} className={cn("relative flex flex-col justify-center", pinned && "lg:min-h-[70vh]")} aria-current={pinned && current ? "step" : undefined}>
              <GhostNumeral className="lg:hidden">{step.n}</GhostNumeral>
              <p className="font-mono text-[11px] tracking-[0.12em] text-[#4b5569] uppercase">{step.n}</p>
              <h3 className={cn("mt-3 font-display text-[28px] leading-[1.06] font-bold tracking-[-0.02em] transition-colors duration-300 lg:text-[40px]", pinned && !current && "lg:text-[#0b1020]/45")}>
                <Link href={step.href} className="link-draw [--ul:#f97316]">
                  {step.title}
                </Link>
              </h3>
              <p className={cn("mt-4 max-w-[44ch] text-[17px] leading-[1.6] text-[#4b5569] transition-opacity duration-300", pinned && !current && "lg:opacity-50")}>{step.body}</p>
              {/* Each step carries its own screen where the frame cannot pin. */}
              <div className={cn("mt-8", pinned ? "lg:hidden" : "")}>
                <DeviceFrame capture={captures[step.capture]} path={step.path} />
              </div>
            </li>
          );
        })}
      </ol>
      {pinned ? (
        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[8/9] max-h-[calc(100vh-9rem)] w-full">
              {steps.map((step, i) => (
                <div
                  key={step.n}
                  aria-hidden={i !== active}
                  className={cn("absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]", i === active ? "opacity-100 scale-100" : "opacity-0 scale-[.985]")}
                >
                  <DeviceFrame capture={captures[step.capture]} path={step.path} className="mx-auto max-w-[640px]" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-center font-mono text-[11px] tracking-[0.12em] text-[#4b5569] uppercase">Actual HubX UI · demo data</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
