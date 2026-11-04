import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { BorderBeam } from "@/components/ink/atmosphere";
import { SpineMark } from "@/components/ink/canvas";
import { Ticker } from "@/components/ink/motion";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/**
 * Ink & Glass interior primitives. Ink is the page ground, pearl is the
 * explanatory canvas. Type sets the hierarchy; rules, not cards, separate
 * items; orange activates (dots, underlines, the one accent) and is never
 * small text on pearl. Every primitive takes a `tone` so the same markup
 * sits on either ground.
 */
export type InkTone = "ink" | "pearl";

export const inkTone = {
  ink: {
    /** Ink sections are transparent: the fixed PageCanvas is the ground. */
    ground: "text-white",
    text: "text-white",
    muted: "text-[#b8c0d4]",
    faint: "text-[#8e98ae]",
    rule: "border-white/15",
    ruleSoft: "border-white/10",
    chip: "border-white/13 bg-white/5 text-white",
    panel: "border-white/13 bg-[linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.04))] shadow-[inset_0_1px_0_rgba(255,255,255,.16)]",
    underline: "decoration-[#ffb05c]",
  },
  pearl: {
    ground: "bg-[#f4f6fb] text-[#0b1020]",
    text: "text-[#0b1020]",
    muted: "text-[#4b5569]",
    faint: "text-[#4b5569]",
    rule: "border-[#0b1020]/15",
    ruleSoft: "border-[#0b1020]/10",
    chip: "border-[#0b1020]/12 bg-white text-[#0b1020]",
    panel: "border-[#0b1020]/8 bg-white shadow-[inset_0_1px_0_#fff,0_20px_48px_rgba(11,16,32,.08)]",
    underline: "decoration-[#f97316]",
  },
} as const;

export const monoLabel = "font-mono text-[11px] tracking-[0.12em] uppercase";
export const chapterTitle = "font-display text-[34px] leading-[1.08] font-bold tracking-[-0.025em] lg:text-[52px]";
export const chapterTitleSm = "font-display text-[30px] leading-[1.1] font-bold tracking-[-0.02em] lg:text-[40px]";
export const itemTitle = "font-display text-2xl font-bold tracking-[-0.015em]";

/** Reveal delay helper: `style={reveal(120)}` on a `data-reveal` element. */
export const reveal = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

type ChapterProps = Omit<ComponentPropsWithoutRef<"section">, "title"> & {
  tone?: InkTone;
  /** Mono wayfinding label above the title; no orange rule. */
  eyebrow?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  /** Smaller title scale for secondary chapters. */
  size?: "lg" | "md";
  /** Vertical rhythm: `normal` is the home chapter pad; `tight` for follow-on chapters on the same ground. */
  pad?: "normal" | "tight" | "flush-top";
  /** Width of the heading block. */
  headingWidth?: string;
  /** Optional element placed to the right of the heading from lg up (a button, a link). */
  aside?: ReactNode;
  containerClassName?: string;
  /** Chapter numeral on the page spine (lg+), e.g. "01". Decorative; the heading carries the meaning. */
  spine?: string;
};

/** A page chapter: ground, container, display heading, lede, then content. */
export function Chapter({
  tone = "pearl",
  eyebrow,
  title,
  lead,
  size = "lg",
  pad = "normal",
  headingWidth = "max-w-[22ch]",
  aside,
  className,
  containerClassName,
  spine,
  children,
  ...rest
}: ChapterProps) {
  const t = inkTone[tone];
  const padding =
    pad === "normal" ? "py-[clamp(64px,7vw,104px)]" : pad === "tight" ? "pt-0 pb-[clamp(64px,7vw,104px)]" : "pt-0 pb-[clamp(48px,5vw,72px)]";
  return (
    <section data-surface={tone} className={cn("relative scroll-mt-24 overflow-x-clip", t.ground, padding, className)} {...rest}>
      {spine ? <SpineMark n={spine} /> : null}
      <Container className={cn("relative", containerClassName)}>
        {title || eyebrow || lead ? (
          <div className={cn(!!aside && "lg:flex lg:items-end lg:justify-between lg:gap-10")}>
            <div>
              {eyebrow ? (
                <p data-reveal className={cn(monoLabel, t.muted)}>
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 data-reveal style={reveal(60)} className={cn(size === "lg" ? chapterTitle : chapterTitleSm, headingWidth, !!eyebrow && "mt-4", "text-balance")}>
                  {title}
                </h2>
              ) : null}
              {lead ? (
                <p data-reveal style={reveal(140)} className={cn("mt-5 max-w-[58ch] text-[17px] leading-[1.6] lg:text-[19px]", t.muted)}>
                  {lead}
                </p>
              ) : null}
            </div>
            {aside ? <div className="mt-6 shrink-0 lg:mt-0">{aside}</div> : null}
          </div>
        ) : null}
        {children ? <div className={cn(title || eyebrow || lead ? "mt-10 lg:mt-12" : undefined)}>{children}</div> : null}
      </Container>
    </section>
  );
}

/** Underlined text link in the chapter voice. */
export function InkLink({
  href,
  tone = "pearl",
  underline = "accent",
  className,
  children,
  ...rest
}: {
  href: string;
  tone?: InkTone;
  /** `neutral` where the viewport's orange is already spent: the underline stays as the link cue, without the accent. */
  underline?: "accent" | "neutral";
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">) {
  const ul = underline === "neutral" ? (tone === "ink" ? "[--ul:rgba(255,255,255,.28)]" : "[--ul:rgba(11,16,32,.22)]") : tone === "ink" ? "[--ul:#ffb05c]" : "[--ul:#f97316]";
  const classes = cn("link-draw inline-flex min-h-11 items-center font-semibold", ul, className);
  // Same-page anchors stay native so focus follows the jump.
  if (/^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a href={href} className={classes} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
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

export type RuleItem = {
  id?: string;
  /** Mono label at the top of the item; numbered automatically when `numbered` is set. */
  label?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  /** Further content under the body: a list, a chip row. */
  children?: ReactNode;
  link?: { label: string; href: string };
};

type RuleListProps = {
  items: readonly RuleItem[];
  tone?: InkTone;
  columns?: 1 | 2 | 3 | 4 | 5;
  numbered?: boolean;
  /** `ol` for ordered steps, `ul` otherwise. */
  as?: "ol" | "ul";
  /** Title scale. */
  titleSize?: "lg" | "md";
  /** Underline of the items' links (see `InkLink`). */
  linkUnderline?: "accent" | "neutral";
  className?: string;
};

const ruleColumns = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
} as const;

/** Items separated by a top rule: the home page's outcome, process, and trust lists. */
export function RuleList({ items, tone = "pearl", columns = 3, numbered = false, as, titleSize = "lg", linkUnderline = "accent", className }: RuleListProps) {
  const t = inkTone[tone];
  const Tag = as ?? (numbered ? "ol" : "ul");
  return (
    <Tag className={cn("grid gap-x-8 gap-y-10", ruleColumns[columns], className)}>
      {items.map((item, index) => {
        const label = numbered ? String(index + 1).padStart(2, "0") : item.label;
        return (
          <li
            key={item.id ?? (typeof item.title === "string" ? item.title : index)}
            id={item.id}
            data-reveal
            style={reveal(Math.min(index, 7) * 70)}
            className={cn("rule-item flex flex-col border-t pt-5", t.rule, item.id && "scroll-mt-28")}
          >
            {label ? <p className={cn(monoLabel, t.faint)}>{label}</p> : null}
            <h3 className={cn(titleSize === "lg" ? itemTitle : "font-display text-xl font-bold tracking-[-0.01em]", !!label && "mt-3")}>{item.title}</h3>
            {item.body ? <p className={cn("mt-3 max-w-[44ch] text-[16px] leading-[1.65] lg:text-[17px]", t.muted)}>{item.body}</p> : null}
            {item.children ? <div className="mt-4">{item.children}</div> : null}
            {item.link ? (
              <InkLink href={item.link.href} tone={tone} underline={linkUnderline} className="mt-auto pt-3">
                {item.link.label}
              </InkLink>
            ) : null}
          </li>
        );
      })}
    </Tag>
  );
}

/** Orange-dot bullets: the home page's scope lists. */
export function DotList({
  items,
  tone = "pearl",
  columns = 1,
  size = "md",
  marker = "orange",
  className,
}: {
  items: readonly ReactNode[];
  tone?: InkTone;
  columns?: 1 | 2 | 3;
  size?: "md" | "sm";
  /** `neutral` for dense lists (capability columns) so a page never spends its orange budget on bullets. */
  marker?: "orange" | "neutral";
  className?: string;
}) {
  const t = inkTone[tone];
  return (
    <ul className={cn("grid gap-2.5", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, index) => (
        <li key={typeof item === "string" ? item : index} className={cn("flex gap-3 leading-snug", size === "md" ? "text-[15px] lg:text-[16px]" : "text-[14.5px]", t.text)}>
          <span aria-hidden className={cn("mt-2 size-1.5 shrink-0 rounded-full", marker === "orange" ? "bg-[#f97316]" : "bg-current opacity-35")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Label / value rows with a rule between each: billing facts, security facts. */
export function FactRows({ rows, tone = "pearl", className }: { rows: readonly { label: ReactNode; value: ReactNode }[]; tone?: InkTone; className?: string }) {
  const t = inkTone[tone];
  return (
    <dl className={cn("grid", className)}>
      {rows.map((row, index) => (
        <div key={index} data-reveal style={reveal(index * 50)} className={cn("rule-item grid gap-1 border-t py-4 sm:grid-cols-[180px_1fr] sm:gap-6", t.ruleSoft)}>
          <dt className={cn(monoLabel, "pt-1", t.faint)}>{row.label}</dt>
          <dd className={cn("text-[16px] leading-[1.6]", t.text)}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The proof rail: big figures in one panel, counting up when they come into view. */
export function StatRail({
  items,
  tone = "ink",
  beam = false,
  className,
}: {
  items: readonly { id?: string; value: ReactNode; label: ReactNode }[];
  tone?: InkTone;
  /** A light travelling the panel edge. */
  beam?: boolean;
  className?: string;
}) {
  const t = inkTone[tone];
  const cols = items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <ul className={cn("relative grid overflow-hidden rounded-[18px] border sm:grid-cols-2", cols, t.panel, className)}>
      {items.map((item, index) => (
        <li key={item.id ?? index} className={cn("border-b px-5 py-5 sm:border-r lg:border-b-0 lg:py-6 lg:last:border-r-0", t.ruleSoft)}>
          <p className="font-display text-[28px] font-bold tracking-[-0.02em] tabular-nums lg:text-[32px]">
            {typeof item.value === "string" ? <Ticker value={item.value} /> : item.value}
          </p>
          <p className={cn("mt-1 max-w-[24ch] text-sm leading-snug", t.muted)}>{item.label}</p>
        </li>
      ))}
      {beam ? <BorderBeam duration={12} /> : null}
    </ul>
  );
}

/** Text chips: SKU families, vendor names, qualification types. Never a logo without permission. */
export function ChipRow({
  items,
  tone = "pearl",
  mono = false,
  className,
  label,
}: {
  items: readonly { label: string; title?: string }[] | readonly string[];
  tone?: InkTone;
  mono?: boolean;
  className?: string;
  /** Accessible name for the list. */
  label?: string;
}) {
  const t = inkTone[tone];
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const entry = typeof item === "string" ? { label: item } : item;
        return (
          <li
            key={entry.label}
            title={entry.title}
            className={cn("inline-flex min-h-9 items-center rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium", mono && "font-mono text-[12.5px]", t.chip)}
          >
            {entry.label}
          </li>
        );
      })}
    </ul>
  );
}

/** A glass panel on ink or a white panel on pearl, for forms and asides. */
export function Panel({ tone = "ink", className, ...rest }: ComponentPropsWithoutRef<"div"> & { tone?: InkTone }) {
  const t = inkTone[tone];
  return <div data-surface={tone} className={cn("rounded-[18px] border p-6 sm:p-8", t.panel, className)} {...rest} />;
}

export type AccordionItem = { id?: string; q: ReactNode; a: ReactNode };

/** Questions as rule-separated disclosures. */
export function Accordion({ items, tone = "pearl", className }: { items: readonly AccordionItem[]; tone?: InkTone; className?: string }) {
  const t = inkTone[tone];
  return (
    <div className={cn("grid border-b", t.rule, className)}>
      {items.map((item, index) => (
        <details key={item.id ?? index} id={item.id} className={cn("group border-t", t.rule)} open={index === 0}>
          <summary className={cn("flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-[17px] font-semibold [&::-webkit-details-marker]:hidden", t.text)}>
            {item.q}
            <span aria-hidden className="shrink-0 text-2xl leading-none text-[#f97316] group-open:hidden">
              +
            </span>
            <span aria-hidden className="hidden shrink-0 text-2xl leading-none text-[#f97316] group-open:inline">
              –
            </span>
          </summary>
          <div className={cn("max-w-[70ch] pb-6 text-[16px] leading-[1.65]", t.muted)}>{item.a}</div>
        </details>
      ))}
    </div>
  );
}

type NextStepProps = {
  tone?: InkTone;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  primary: { label: string; href: string };
  secondary?: readonly { label: string; href: string }[];
  children?: ReactNode;
  className?: string;
  id?: string;
};

/** A page-specific next step. The company close (Route D) follows every page, so this stays slim. */
export function NextStep({ tone = "ink", eyebrow, title, lead, primary, secondary, children, className, id }: NextStepProps) {
  const t = inkTone[tone];
  return (
    <section id={id} data-surface={tone} className={cn("relative scroll-mt-24 overflow-x-clip", t.ground, className)}>
      <Container className={cn("relative border-t py-14 lg:py-16", t.rule)}>
        <div data-reveal className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <div>
            {eyebrow ? <p className={cn(monoLabel, t.muted)}>{eyebrow}</p> : null}
            <h2 className={cn(chapterTitleSm, "max-w-[22ch] text-balance", !!eyebrow && "mt-4")}>{title}</h2>
            {lead ? <p className={cn("mt-4 max-w-[54ch] text-[17px] leading-[1.6]", t.muted)}>{lead}</p> : null}
            {children}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary?.map((item) => (
              <ButtonLink key={item.href + item.label} href={item.href} variant={tone === "ink" ? "glass" : "outline"}>
                {item.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Dated milestones as a rule rail. */
export function Milestones({ items, tone = "pearl", className }: { items: readonly { when: ReactNode; title: string; body: string }[]; tone?: InkTone; className?: string }) {
  const t = inkTone[tone];
  return (
    <ol className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-5", className)}>
      {items.map((item, index) => (
        <li key={item.title} data-reveal style={reveal(index * 80)} className={cn("rule-item border-t pt-4", t.rule)}>
          <p className={cn(monoLabel, "flex items-center gap-2", t.faint)}>
            <span aria-hidden className="size-1.5 rounded-full bg-[#f97316]" />
            {item.when}
          </p>
          <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.01em]">{item.title}</h3>
          <p className={cn("mt-2 text-[15px] leading-[1.6]", t.muted)}>{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
