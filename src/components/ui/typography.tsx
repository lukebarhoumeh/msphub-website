import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Dark sections (default) use white type; light `canvas` sections use charcoal. */
export type Tone = "dark" | "light";

type EyebrowProps = ComponentPropsWithoutRef<"span"> & { tone?: Tone };

/** Mono, tracked, uppercase label with a short orange rule (handoff §7.2). Orange text only on dark grounds. */
export function Eyebrow({ className, children, tone = "dark", ...rest }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.14em] uppercase before:h-0.5 before:w-5 before:rounded before:bg-brand-orange",
        tone === "dark" ? "text-[#b8c0d4]" : "text-[#4b5569]",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

type HeadingLevel = "h1" | "h2" | "h3";

type DisplayProps = ComponentPropsWithoutRef<"h1"> & {
  as?: HeadingLevel;
  size?: "xl" | "lg" | "md";
  tone?: Tone;
};

const displaySizes = {
  xl: "text-[clamp(2.375rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.03em] font-extrabold",
  lg: "text-[clamp(2.125rem,3.2vw,3.25rem)] leading-[1.06] tracking-[-0.025em] font-bold",
  md: "text-[clamp(1.875rem,2.4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] font-bold",
} as const;

/** Serif display heading. */
export function Display({ as: Tag = "h2", size = "lg", tone = "dark", className, ...rest }: DisplayProps) {
  return (
    <Tag
      className={cn(
        "font-display text-balance",
        tone === "dark" ? "text-white" : "text-[#0b1020]",
        displaySizes[size],
        className,
      )}
      {...rest}
    />
  );
}

type LeadProps = ComponentPropsWithoutRef<"p"> & { tone?: Tone };

export function Lead({ className, tone = "dark", ...rest }: LeadProps) {
  return (
    <p
      className={cn(
        "max-w-[60ch] text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-relaxed",
        tone === "dark" ? "text-white/70" : "text-brand-charcoal/80",
        className,
      )}
      {...rest}
    />
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  as?: HeadingLevel;
  tone?: Tone;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as = "h2",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-[760px] sm:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} className={cn(align === "center" && "before:hidden")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Display as={as} tone={tone} className="mt-3.5">
        {title}
      </Display>
      {lead ? (
        <Lead tone={tone} className={cn("mt-4", align === "center" && "mx-auto")}>
          {lead}
        </Lead>
      ) : null}
    </div>
  );
}
