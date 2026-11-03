import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-[min(1280px,calc(100%-2*var(--page-pad)))]", className)}
      {...rest}
    />
  );
}

type GlowTone = "orange" | "navy" | "blue";

const glowTones: Record<GlowTone, string> = {
  orange: "bg-[radial-gradient(circle,rgba(249,115,22,.34),rgba(249,115,22,0)_65%)]",
  navy: "bg-[radial-gradient(circle,rgba(19,33,66,1),rgba(19,33,66,0)_65%)]",
  blue: "bg-[radial-gradient(circle,rgba(37,64,128,.55),rgba(37,64,128,0)_65%)]",
};

type GlowProps = {
  tone: GlowTone;
  className?: string;
  drift?: boolean;
};

/** A soft radial light source placed absolutely inside a relative parent (dark sections only). */
export function Glow({ tone, className, drift }: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[60px]",
        glowTones[tone],
        drift && "motion-safe:opacity-100",
        className,
      )}
    />
  );
}

export type SectionTone = "dark" | "light";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tight?: boolean;
  /** Light sections use the HubX canvas so light-theme screenshots sit naturally (handoff §7.2). */
  tone?: SectionTone;
  /** Background decoration (glows, hex pattern) rendered behind the content. */
  decor?: React.ReactNode;
};

export function Section({ className, tight, tone = "dark", decor, children, ...rest }: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        tight ? "py-10 sm:py-12" : "py-[clamp(64px,7vw,104px)]",
        tone === "light" && "bg-pearl text-ink",
        className,
      )}
      data-surface={tone === "light" ? "pearl" : "ink"}
      {...rest}
    >
      {decor ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {decor}
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}
