import { Grain } from "@/components/ink/atmosphere";
import { cn } from "@/lib/cn";

/**
 * The page is one continuous ink canvas. `PageCanvas` sits fixed behind
 * `<main>`: ink base, a 28 px dot grid, the aurora lights (drifting on their
 * own clock and easing up the page on a scroll timeline, see globals.css),
 * and a whisper of grain. Dark sections are transparent so the canvas shows
 * through; pearl sections fade in and out over it (`[data-surface="pearl"]`
 * bleed rules in globals.css). Everything here is decorative and inert.
 */
export function PageCanvas() {
  return (
    <div aria-hidden className="page-canvas pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0b1020]">
      <div className="canvas-dots absolute inset-0" />
      <div className="canvas-aurora absolute inset-0">
        <span className="canvas-drift canvas-drift-a">
          <span className="aurora-blob aurora-a" />
        </span>
        <span className="canvas-drift canvas-drift-b">
          <span className="aurora-blob aurora-b" />
        </span>
        <span className="canvas-drift canvas-drift-c">
          <span className="aurora-blob aurora-c" />
        </span>
      </div>
      <Grain className="canvas-grain" />
    </div>
  );
}

/**
 * A chapter numeral that hangs on the spine at a section's top edge (lg+).
 * The parent section must be `relative`. Numerals are decorative; the
 * section's own heading carries the meaning.
 */
export function SpineMark({ n, className }: { n: string; className?: string }) {
  return (
    <span aria-hidden className={cn("spine-mark pointer-events-none absolute hidden font-display font-extrabold tracking-[-0.06em] select-none lg:block", className)}>
      {n}
    </span>
  );
}
