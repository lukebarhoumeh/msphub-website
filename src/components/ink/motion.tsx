"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Motion for the Ink & Glass system. Everything here is transform/opacity
 * only, runs once per element, and switches itself off under
 * prefers-reduced-motion (the CSS in globals.css does the same for the
 * keyframe effects). Nothing blocks interaction and nothing animates layout.
 */

/* ------------------------------------------------------------------ */
/* Scroll reveals                                                       */
/* ------------------------------------------------------------------ */

/**
 * Observes every `[data-reveal]` element on the page and adds `is-in` when it
 * enters the viewport. Mounted once in the root layout; elements added later
 * (route changes, tab panels) are picked up by a MutationObserver.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    // Anything already on screen stays exactly as it painted; only content below the fold is staged.
    const viewport = window.innerHeight;
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < viewport) el.classList.add("is-in");
    });
    root.classList.add("js");
    const all = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const observe = () => all().forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("js");
    };
  }, []);
  return null;
}

/* ------------------------------------------------------------------ */
/* Count-up figures                                                     */
/* ------------------------------------------------------------------ */

type TickerProps = {
  /** The figure as written in content, e.g. "478+", "600K+", "7,600+", "1999". */
  value: string;
  className?: string;
  /** Milliseconds for the count. */
  duration?: number;
};

/** Splits "7,600+" into { number: 7600, prefix: "", suffix: "+", grouped: true }. Years and words are left alone. */
function parseFigure(value: string) {
  const match = value.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const number = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(number)) return null;
  const isYear = /^(19|20)\d{2}$/.test(digits) && suffix === "";
  if (isYear) return null;
  return { prefix, number, suffix, grouped: digits.includes(",") };
}

/** Counts a figure up once when it scrolls into view. Renders the final figure immediately for reduced motion and before hydration. */
export function Ticker({ value, className, duration = 1100 }: TickerProps) {
  const parsed = parseFigure(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const from = 0;
        const to = parsed.number;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(from + (to - from) * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // The parsed figure is derived from `value`; re-run only when the text changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  if (!parsed) return <span className={className}>{value}</span>;
  const n = shown ?? parsed.number;
  const text = parsed.grouped ? n.toLocaleString("en-US") : String(n);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>
        {parsed.prefix}
        {text}
        {parsed.suffix}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Pointer-tracked glow                                                 */
/* ------------------------------------------------------------------ */

/**
 * Sets `--mx` / `--my` on the wrapped element so a radial highlight can follow
 * the pointer (used on glass panels and the evidence bezel). Touch devices and
 * reduced motion simply never update the variables.
 */
export function Spotlight({ className, children, as: Tag = "div" }: { className?: string; children: ReactNode; as?: "div" | "figure" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, []);
  const Component = Tag as "div";
  return (
    <Component ref={ref as React.RefObject<HTMLDivElement>} className={cn("spotlight", className)}>
      {children}
    </Component>
  );
}
