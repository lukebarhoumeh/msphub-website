import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type HubxTone = "dark" | "light";

/** Orange-dot bullet list that follows the section tone (the home page's scope lists). */
export function PointList({ items, tone = "dark", className, dense = false }: { items: readonly string[]; tone?: HubxTone; className?: string; dense?: boolean }) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid", dense ? "gap-2" : "gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex items-start gap-3 leading-snug", dense ? "text-[14.5px]" : "text-[15px] lg:text-[16px]", dark ? "text-white" : "text-[#0b1020]")}>
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f97316]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Mono chip with the HubX route a module lives at, e.g. hubx.msphub.com/customers. */
export function HubxPathChip({ path, tone = "dark", className }: { path: string; tone?: HubxTone; className?: string }) {
  const dark = tone === "dark";
  return (
    <span
      className={cn(
        "inline-flex h-7 max-w-full items-center gap-2 truncate rounded-full border px-2.5 font-mono text-[11.5px]",
        dark ? "border-white/12 bg-white/5 text-white/70" : "border-black/10 bg-white text-charcoal/80",
        className,
      )}
    >
      <span aria-hidden className="size-2 shrink-0 rounded-[2px] border-[1.5px] border-current" />
      <span className="truncate">hubx.msphub.com{path === "/" ? "" : path}</span>
    </span>
  );
}

/** Arrow text link that follows the section tone (orange text only on dark grounds). */
export function ToneLink({ href, children, tone = "dark", className }: { href: string; children: React.ReactNode; tone?: HubxTone; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline",
        tone === "dark" ? "text-brand-orange hover:text-orange-hover" : "text-charcoal",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );
}

/** The HubX X mark at small sizes (brand kit: below 24 px use the mark, never the full logo). */
export function HubXMark({ className = "size-4" }: { className?: string }) {
  return <Image src="/brand/svg/hubx-mark-orange.svg" alt="" width={244} height={244} className={className} aria-hidden />;
}

/** The product's "Early Access" affordance, mirrored on the website. */
export function EarlyAccessBadge({ tone = "dark", className }: { tone?: HubxTone; className?: string }) {
  const dark = tone === "dark";
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-2 rounded-full border px-3 font-mono text-[11px] font-semibold tracking-[0.1em] uppercase",
        dark ? "border-brand-orange/40 bg-brand-orange/10 text-white" : "border-brand-orange/40 bg-brand-orange/10 text-charcoal",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-brand-orange" />
      Early Access
    </span>
  );
}

/** Structured data script; `<` is escaped so the payload can never close the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
