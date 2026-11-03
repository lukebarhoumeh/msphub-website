import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "glass" | "ghost" | "outline" | "ink" | "frost";
type Size = "md" | "sm" | "lg";

const base =
  "btn-primary inline-flex items-center justify-center gap-2 rounded-full px-5 font-bold whitespace-nowrap transition-[transform,background-color,box-shadow] duration-100 active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#ffb05c_0%,#f97316_56%,#e8600f_100%)] text-[#0b1020] shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_10px_28px_rgba(249,115,22,.34)] active:shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_6px_16px_rgba(249,115,22,.2)]",
  glass: "btn-glass btn-beam border border-white/18 bg-white/8 text-white shadow-none hover:bg-white/12 active:translate-y-0",
  ghost: "btn-ghost bg-transparent text-white/80 shadow-none hover:text-white active:translate-y-0",
  outline: "btn-beam border border-[#0b1020]/15 bg-white text-[#0b1020] shadow-none hover:bg-[#f4f6fb] active:translate-y-0",
  ink: "bg-[#0b1020] text-white shadow-none active:translate-y-0",
  frost: "btn-beam border border-white/70 bg-white/80 text-[#0b1020] shadow-none backdrop-blur-md active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-5 text-base",
  lg: "h-[52px] px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonLinkProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

type ButtonButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function ButtonLink({ variant = "primary", size = "md", className, children, href, ...rest }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href) || href.startsWith("mailto:");
  const classes = cn(base, variants[variant], sizes[size], variant !== "primary" && "after:hidden", className);
  if (external) {
    return (
      <a href={href} className={classes} {...(href.startsWith("http") ? { rel: "noopener" } : {})} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant = "primary", size = "md", className, children, type = "button", ...rest }: ButtonButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], variant !== "primary" && "after:hidden", className)} {...rest}>
      {children}
    </button>
  );
}
