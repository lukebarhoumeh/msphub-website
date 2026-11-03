import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Atmosphere for the Ink & Glass system: CSS-only light, grain, dots, and
 * beams. All decorative (`aria-hidden`), all behind content, all transform or
 * opacity animations that reduced motion turns off in globals.css.
 */

/** Slow aurora of orange and navy light behind an ink hero. */
export function Aurora({ className, intensity = "normal" }: { className?: string; intensity?: "normal" | "soft" }) {
  return (
    <div aria-hidden className={cn("aurora pointer-events-none absolute inset-0 overflow-hidden", intensity === "soft" && "aurora-soft", className)}>
      <span className="aurora-blob aurora-a" />
      <span className="aurora-blob aurora-b" />
      <span className="aurora-blob aurora-c" />
    </div>
  );
}

/**
 * Film grain over an ink surface, so dark areas read as material rather than
 * flat colour. Inline SVG rather than a CSS background image: an inline
 * pattern is not a Largest Contentful Paint candidate, a background image
 * stretched over the hero is.
 */
export function Grain({ className }: { className?: string }) {
  const id = `grain${useId().replace(/:/g, "")}`;
  return (
    <svg aria-hidden className={cn("grain pointer-events-none absolute inset-0 h-full w-full", className)}>
      <defs>
        <filter id={`${id}-f`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0" />
        </filter>
        <pattern id={id} width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" filter={`url(#${id}-f)`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Dot field that fades toward the edges. */
export function DotField({ className, tone = "ink" }: { className?: string; tone?: "ink" | "pearl" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_10%,transparent_80%)]",
        tone === "ink" ? "dots-ink" : "dots-pearl",
        className,
      )}
    />
  );
}

/** A light that travels the border of a rounded panel. Parent needs `relative` and `overflow-hidden`. */
export function BorderBeam({ className, duration = 9, delay = 0 }: { className?: string; duration?: number; delay?: number }) {
  return (
    <span
      aria-hidden
      className={cn("border-beam pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={{ "--beam-duration": `${duration}s`, "--beam-delay": `${delay}s` } as React.CSSProperties}
    />
  );
}

/** Hairline horizon between two grounds: a soft orange light along the seam. */
export function Horizon({ className }: { className?: string }) {
  return <div aria-hidden className={cn("horizon pointer-events-none relative h-px w-full", className)} />;
}

/** Infinite horizontal strip. Content is duplicated for the loop; the copy is hidden from assistive tech. */
export function Marquee({ children, className, duration = 60, reverse = false, pauseOnHover = true }: { children: ReactNode; className?: string; duration?: number; reverse?: boolean; pauseOnHover?: boolean }) {
  return (
    <div
      className={cn("marquee group/marquee flex overflow-hidden [--gap:12px]", pauseOnHover && "marquee-pause", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className={cn("marquee-track flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]", reverse && "marquee-reverse")}>{children}</div>
      <div aria-hidden className={cn("marquee-track flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]", reverse && "marquee-reverse")}>
        {children}
      </div>
    </div>
  );
}

/** Reads page scroll as a thin orange line under the header (CSS scroll timeline; browsers without it show nothing). */
export function ScrollProgress() {
  return <div aria-hidden className="scroll-progress pointer-events-none fixed inset-x-0 top-16 z-[45] h-0.5 origin-left bg-[linear-gradient(90deg,#ffb05c,#f97316,#e8600f)] lg:top-[72px]" />;
}

/** Oversized ghost numeral behind a list item. */
export function GhostNumeral({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span aria-hidden className={cn("ghost-numeral pointer-events-none absolute -top-3 right-0 font-display text-[112px] leading-none font-extrabold tracking-[-0.06em] select-none", className)}>
      {children}
    </span>
  );
}
