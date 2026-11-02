import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8", className)}
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

/** A soft radial light source placed absolutely inside a relative parent. */
export function Glow({ tone, className, drift }: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[60px]",
        glowTones[tone],
        drift && "motion-safe:animate-glow-drift",
        className,
      )}
    />
  );
}

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tight?: boolean;
  /** Background decoration (glows, hex pattern) rendered behind the content. */
  decor?: React.ReactNode;
};

export function Section({ className, tight, decor, children, ...rest }: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        tight ? "py-12 sm:py-16" : "py-16 sm:py-20 lg:py-28",
        className,
      )}
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
