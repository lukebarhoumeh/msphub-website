import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type CardTone = "dark" | "light";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & { tone?: CardTone };

/** Card surface: frosted glass on dark sections, white card on light canvas sections. */
export function GlassCard({ className, tone = "dark", ...rest }: GlassCardProps) {
  return (
    <div
      className={cn(
        "p-7 transition-[border-color,transform] duration-200",
        tone === "dark" ? "glass hover:border-white/20" : "card-light hover:border-black/15",
        className,
      )}
      {...rest}
    />
  );
}

export function IconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <div
      className={cn(
        "grid size-11 place-items-center rounded-[10px] border border-brand-orange/30 bg-brand-orange/12 text-brand-orange",
        className,
      )}
    >
      <Icon className="size-[22px]" strokeWidth={1.8} aria-hidden />
    </div>
  );
}

type FeatureCardProps = {
  icon?: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  tone?: CardTone;
};

export function FeatureCard({ icon, title, children, className, footer, tone = "dark" }: FeatureCardProps) {
  const dark = tone === "dark";
  return (
    <GlassCard tone={tone} className={cn("flex flex-col", className)}>
      {icon ? <IconTile icon={icon} className="mb-5" /> : null}
      <h3 className={cn("text-lg font-semibold tracking-tight", dark ? "text-white" : "text-charcoal")}>{title}</h3>
      <div className={cn("mt-2.5 text-[15px] leading-relaxed", dark ? "text-white/70" : "text-charcoal/80")}>{children}</div>
      {footer ? <div className="mt-auto pt-5">{footer}</div> : null}
    </GlassCard>
  );
}

type ChipProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "default" | "orange" | "light";
  /** Allow the label to wrap on narrow screens. */
  wrap?: boolean;
  /** Monospace, for SKUs and identifiers. */
  mono?: boolean;
};

export function Chip({ className, tone = "default", wrap = false, mono = false, ...rest }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 text-[13.5px] font-medium",
        wrap ? "h-auto min-h-9 max-w-full py-1.5 whitespace-normal" : "h-9 whitespace-nowrap",
        mono && "font-mono text-[12.5px]",
        tone === "orange" && "border-brand-orange/35 bg-brand-orange/8 text-brand-orange",
        tone === "default" && "border-white/12 bg-white/5 text-white/75",
        tone === "light" && "border-black/10 bg-white text-charcoal",
        className,
      )}
      {...rest}
    />
  );
}
