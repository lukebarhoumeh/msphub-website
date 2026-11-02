import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Small orange uppercase label with a short rule, the deck motif. */
export function Eyebrow({ className, children, ...rest }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[12.5px] font-medium tracking-[0.14em] text-brand-orange uppercase before:h-0.5 before:w-5 before:rounded before:bg-brand-orange",
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
};

const displaySizes = {
  xl: "text-[clamp(2.5rem,5.2vw,4.125rem)] leading-[1.04]",
  lg: "text-[clamp(2rem,3.6vw,3rem)] leading-[1.08]",
  md: "text-[clamp(1.5rem,2.2vw,1.875rem)] leading-[1.15]",
} as const;

/** Serif display heading. */
export function Display({ as: Tag = "h2", size = "lg", className, ...rest }: DisplayProps) {
  return (
    <Tag
      className={cn(
        "font-display font-semibold tracking-[-0.02em] text-balance text-white",
        displaySizes[size],
        className,
      )}
      {...rest}
    />
  );
}

export function Lead({ className, ...rest }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("max-w-[60ch] text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-relaxed text-white/70", className)}
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
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as = "h2",
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
      {eyebrow ? <Eyebrow className={cn(align === "center" && "before:hidden")}>{eyebrow}</Eyebrow> : null}
      <Display as={as} className="mt-3.5">
        {title}
      </Display>
      {lead ? <Lead className={cn("mt-4", align === "center" && "mx-auto")}>{lead}</Lead> : null}
    </div>
  );
}
