"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Scroll-bound flow for the Ink & Glass canvas, built on `motion`. Three
 * things live here: the spine that draws down the left gutter as the page is
 * read, parallax for renders and device frames, and the header theme switch.
 * All of it is transform-only, none of it gates content, and every piece
 * falls back to a static layout under prefers-reduced-motion.
 */

/* ------------------------------------------------------------------ */
/* Spine                                                                */
/* ------------------------------------------------------------------ */

/** A 1 px orange line in the left gutter (lg+) whose length is the page's scroll progress, eased with a spring. */
export function Spine() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      style={{ scaleY }}
      className="spine pointer-events-none fixed top-0 z-30 hidden h-screen w-px origin-top bg-[linear-gradient(180deg,#f97316_0%,rgba(249,115,22,.55)_55%,rgba(249,115,22,0)_100%)] lg:block"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Parallax                                                             */
/* ------------------------------------------------------------------ */

type ParallaxProps = {
  children: ReactNode;
  /** Total travel in pixels as the element crosses the viewport (±range/2). */
  range?: number;
  className?: string;
};

/** Moves its children a little slower than the page. Used on renders (±40) and device frames (±24). */
export function Parallax({ children, range = 40, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range / 2, -range / 2]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Header theme                                                         */
/* ------------------------------------------------------------------ */

type HeaderTheme = "dark" | "light";

function themeOf(el: Element): HeaderTheme {
  const surface = el.getAttribute("data-surface");
  return surface === "pearl" || surface === "orange" ? "light" : "dark";
}

/**
 * Watches the strip of page directly under the sticky header and sets
 * `data-header-theme` on `<header>` to the surface beneath it, so the header
 * flips to ink type and the positive wordmark over pearl sections. Sections
 * are the direct children of `<main>`; pearl and orange read as light,
 * everything else as dark. Re-observes on navigation.
 */
export function HeaderThemeObserver() {
  useEffect(() => {
    const header = document.querySelector("header");
    const main = document.getElementById("main");
    if (!header || !main) return;
    const headerHeight = () => header.getBoundingClientRect().height || 72;
    const intersecting = new Set<Element>();
    let io: IntersectionObserver | null = null;

    const apply = () => {
      let best: Element | null = null;
      let bestTop = -Infinity;
      for (const el of intersecting) {
        const top = el.getBoundingClientRect().top;
        if (top > bestTop) {
          bestTop = top;
          best = el;
        }
      }
      const next: HeaderTheme = best ? themeOf(best) : "dark";
      if (header.dataset.headerTheme !== next) header.dataset.headerTheme = next;
    };

    const build = () => {
      io?.disconnect();
      intersecting.clear();
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          apply();
        },
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - headerHeight())}px 0px`, threshold: 0 },
      );
      for (const el of main.children) io.observe(el);
    };

    build();
    const mo = new MutationObserver(build);
    mo.observe(main, { childList: true });
    window.addEventListener("resize", build);
    return () => {
      io?.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", build);
    };
  }, []);
  return null;
}
