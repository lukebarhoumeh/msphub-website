import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/hubx/primitives";
import { siteUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb trail plus BreadcrumbList structured data for nested HubX pages. */
export function Breadcrumbs({ items, className }: { items: readonly Crumb[]; className?: string }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("font-mono text-[12px] tracking-[0.04em] text-white/60", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-white/85">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                )}
                {last ? null : <ChevronRight className="size-3 text-white/40" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            item: `${siteUrl}${item.href}`,
          })),
        }}
      />
    </>
  );
}
