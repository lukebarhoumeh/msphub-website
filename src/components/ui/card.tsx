import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function GlassCard({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "glass p-7 transition-[border-color,transform] duration-200 hover:border-white/20",
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
        "grid size-11 place-items-center rounded-xl border border-brand-orange/30 bg-brand-orange/12 text-brand-orange",
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
};

export function FeatureCard({ icon, title, children, className, footer }: FeatureCardProps) {
  return (
    <GlassCard className={cn("flex flex-col", className)}>
      {icon ? <IconTile icon={icon} className="mb-5" /> : null}
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <div className="mt-2.5 text-[15px] leading-relaxed text-white/70">{children}</div>
      {footer ? <div className="mt-auto pt-5">{footer}</div> : null}
    </GlassCard>
  );
}

type ChipProps = ComponentPropsWithoutRef<"span"> & { tone?: "default" | "orange"; /** Allow the label to wrap on narrow screens. */ wrap?: boolean };

export function Chip({ className, tone = "default", wrap = false, ...rest }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 text-[13.5px] font-medium",
        wrap ? "h-auto min-h-9 max-w-full py-1.5 whitespace-normal" : "h-9 whitespace-nowrap",
        tone === "orange"
          ? "border-brand-orange/35 bg-brand-orange/8 text-brand-orange"
          : "border-white/12 bg-white/5 text-white/75",
        className,
      )}
      {...rest}
    />
  );
}
