import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EngineSymbol } from "@/components/ink/engine-symbol";
import { inkTone, monoLabel, type InkTone } from "@/components/ink/interior";
import type { CaseStudy } from "@/content/cases";
import type { EngineId } from "@/content/home";
import { formatPostDate, isoPostDate, type Post } from "@/content/insights";
import { cn } from "@/lib/cn";

/**
 * Cards for the canvas (DESIGN.md §2): glass on ink, white on pearl, 20 px
 * radius, lift and glow on hover, the whole card one link where it routes.
 */

const glass = "glow-card relative rounded-[20px] border border-white/10 bg-white/[.04] shadow-[inset_0_1px_0_rgba(255,255,255,.08)]";
const paper = "glow-card relative rounded-[20px] border border-[#0b1020]/10 bg-white shadow-[0_1px_2px_rgba(11,16,32,.06),0_12px_40px_-24px_rgba(11,16,32,.25)]";

export function surface(tone: InkTone) {
  return tone === "ink" ? glass : paper;
}

/** Audience router card: who, one line, one route. The card is the link. */
export function AudienceCard({ label, body, href, cta, tone = "ink", className }: { label: string; body: string; href: string; cta: string; tone?: InkTone; className?: string }) {
  const t = inkTone[tone];
  return (
    <article className={cn(surface(tone), "flex min-h-[220px] flex-col p-6", className)}>
      <h3 className="font-display text-[22px] leading-[1.15] font-bold tracking-[-0.015em]">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
          {label}
        </Link>
      </h3>
      <p className={cn("mt-3 text-[15.5px] leading-[1.6]", t.muted)}>{body}</p>
      <span aria-hidden className={cn("mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold", t.text)}>
        {cta}
        <ArrowRight className="size-3.5 text-[#f97316]" />
      </span>
    </article>
  );
}

/** Anonymised deal-desk case: industry, scale, starting point, what moved. Never a name. */
export function CaseCard({ item, tone = "pearl", className }: { item: CaseStudy; tone?: InkTone; className?: string }) {
  const t = inkTone[tone];
  return (
    <article className={cn(surface(tone), "flex flex-col p-6 sm:p-7", className)}>
      <p className={cn(monoLabel, "flex flex-wrap items-center gap-x-3 gap-y-1", t.faint)}>
        <span>{item.industry}</span>
        {item.size ? (
          <>
            <span aria-hidden>·</span>
            <span>{item.size}</span>
          </>
        ) : null}
      </p>
      <dl className="mt-5 grid gap-4">
        <div>
          <dt className={cn("text-[13px] font-semibold", t.faint)}>Starting point</dt>
          <dd className={cn("mt-1 text-[15px] leading-[1.6]", t.muted)}>{item.startingPoint}</dd>
        </div>
        <div>
          <dt className={cn("text-[13px] font-semibold", t.faint)}>What the deal desk did</dt>
          <dd className={cn("mt-1 text-[15px] leading-[1.6]", t.muted)}>{item.work}</dd>
        </div>
      </dl>
      <p className={cn("mt-5 border-t pt-4 font-display text-[18px] leading-[1.3] font-bold tracking-[-0.01em]", t.ruleSoft)}>{item.outcome}</p>
      {item.number ? (
        <p className="mt-4">
          <span className="font-display text-[32px] leading-none font-extrabold tracking-[-0.02em] tabular-nums">{item.number.value}</span>
          <span className={cn("ml-2 text-sm", t.muted)}>{item.number.label}</span>
        </p>
      ) : null}
    </article>
  );
}

/** Insight card on ink: date, title, summary. The card is the link. */
export function InsightCard({ post, tone = "ink", className }: { post: Post; tone?: InkTone; className?: string }) {
  const t = inkTone[tone];
  return (
    <article className={cn(surface(tone), "flex flex-col p-6", className)}>
      <p className={cn(monoLabel, t.faint)}>
        <time dateTime={isoPostDate(post.date)}>{formatPostDate(post.date)}</time>
      </p>
      <h3 className="mt-4 font-display text-[21px] leading-[1.2] font-bold tracking-[-0.015em] text-balance">
        <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
          {post.title}
        </Link>
      </h3>
      <p className={cn("mt-3 line-clamp-4 text-[15px] leading-[1.6]", t.muted)}>{post.summary}</p>
      <span aria-hidden className={cn("mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold", t.text)}>
        Read
        <ArrowRight className="size-3.5 text-[#f97316]" />
      </span>
    </article>
  );
}

/** A small engine tile for the bento. The tile is the link. */
export function EngineTile({ id, name, meta, summary, href, className, wide = false }: { id: EngineId; name: string; meta?: string; summary: string; href: string; className?: string; wide?: boolean }) {
  return (
    <article className={cn(paper, "flex flex-col p-6", wide && "lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-6", className)}>
      <EngineSymbol engine={id} />
      <div className={cn(wide && "lg:contents")}>
        <h3 className={cn("mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[22px] leading-[1.15] font-bold tracking-[-0.015em]", wide && "lg:mt-0 lg:col-start-2")}>
          <Link href={href} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
            {name}
          </Link>
          {meta ? <span className={cn(monoLabel, inkTone.pearl.faint)}>{meta}</span> : null}
        </h3>
        <p className={cn("mt-3 text-[15px] leading-[1.6]", inkTone.pearl.muted, wide && "lg:col-start-2 lg:mt-1 lg:max-w-[70ch]")}>{summary}</p>
      </div>
      <span aria-hidden className={cn("mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#0b1020]", wide && "lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:pt-0")}>
        {name}
        <ArrowRight className="size-3.5 text-[#f97316]" />
      </span>
    </article>
  );
}
