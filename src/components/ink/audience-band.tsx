import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { inkTone, monoLabel, type InkTone } from "@/components/ink/interior";
import { audienceLinks } from "@/content/nav";
import { cn } from "@/lib/cn";

type AudienceBandProps = {
  /** `band`: one panel with five segments (home). `rows`: rule-separated rows (services index, narrow layouts). */
  variant?: "band" | "rows";
  tone?: InkTone;
  /** Mono label above the band; pass `null` to omit. */
  eyebrow?: string | null;
  className?: string;
};

/**
 * The audience router (spec §2.5): five doors from one source
 * (`content/nav.ts` `audienceLinks`), each the person's own name, what they
 * do here, and one line. The arrow is neutral until hover so the band never
 * spends the orange budget; the whole segment is the link.
 */
export function AudienceBand({ variant = "band", tone = "ink", eyebrow = "Who we serve · start here", className }: AudienceBandProps) {
  const t = inkTone[tone];
  if (variant === "rows") {
    return (
      <div className={className}>
        {eyebrow ? <p className={cn(monoLabel, t.faint)}>{eyebrow}</p> : null}
        <ul className={cn("grid border-b", eyebrow && "mt-4", t.rule)}>
          {audienceLinks.map((a, index) => (
            <li key={a.id} data-reveal style={{ "--reveal-delay": `${index * 50}ms` } as React.CSSProperties} className={cn("rule-item border-t", t.rule)}>
              <Link href={a.href} className="band-link grid min-h-16 items-center gap-x-6 gap-y-1 py-4 sm:grid-cols-[180px_minmax(0,1fr)_auto]">
                <span className="font-display text-[20px] leading-[1.15] font-bold tracking-[-0.015em]">{a.label}</span>{" "}
                <span className={cn("text-[15px] leading-[1.5]", t.muted)}>
                  <span className={cn(monoLabel, "mr-2", t.faint)}>{a.meta}</span>{" "}
                  {a.description}
                </span>
                <span aria-hidden className="band-arrow hidden items-center sm:inline-flex">
                  <ArrowRight className="size-4 opacity-60 group-hover:opacity-100" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={className}>
      {eyebrow ? <p className={cn(monoLabel, t.faint)}>{eyebrow}</p> : null}
      <ul className={cn("grid overflow-hidden rounded-[18px] border lg:grid-cols-5", eyebrow && "mt-4", t.panel)}>
        {audienceLinks.map((a) => (
          <li key={a.id} className={cn("border-b last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0", t.ruleSoft)}>
            <Link
              href={a.href}
              className={cn("band-link flex h-full flex-col gap-1.5 p-5 focus-visible:outline-offset-[-3px]!", tone === "ink" ? "hover:bg-white/5" : "hover:bg-[#0b1020]/[.03]")}
            >
              <span className={cn(monoLabel, t.faint)}>{a.meta}</span>{" "}
              <span className="font-display text-[18px] leading-[1.15] font-bold tracking-[-0.015em]">{a.label}</span>{" "}
              <span className={cn("text-[14px] leading-[1.5]", t.muted)}>{a.description}</span>
              <span aria-hidden className="band-arrow mt-auto inline-flex pt-3 opacity-60">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
