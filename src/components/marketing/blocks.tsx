import Image from "next/image";
import { HexGrid } from "@/components/ui/hex-grid";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Chip, GlassCard } from "@/components/ui/card";
import { NeedsConfirm, showTodos } from "@/components/ui/needs-confirm";
import { Container, Glow } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import type { ConfirmId } from "@/content/confirmations";
import { activeCredentials, enrolledSolutionAreas } from "@/content/credentials";
import type { EcosystemEntry } from "@/content/ecosystem";
import { site, testimonials } from "@/content/site";
import { getStat, stats } from "@/content/stats";
import { cn } from "@/lib/cn";

type KpiTileProps = {
  label: string;
  value: string;
  suffix?: string;
  /** Short qualifier under the number (HubX shows "total" lines here). */
  note?: React.ReactNode;
  /** Delta badge, e.g. "+15%". Only when a real figure exists. */
  delta?: string;
  /** Real series only; decorative sparkline, never invented. */
  sparkline?: number[];
  tone?: "dark" | "light";
  className?: string;
};

/** Mirrors the HubX KPI tile (label / number / delta / note) so the site and the product rhyme (handoff §7.2). */
export function KpiTile({ label, value, suffix, note, delta, sparkline, tone = "dark", className }: KpiTileProps) {
  const dark = tone === "dark";
  return (
    <div className={cn(dark ? "glass" : "card-light", "relative overflow-hidden p-6", className)}>
      <p className={cn("text-xs font-medium tracking-[0.06em] uppercase", dark ? "text-white/60" : "text-charcoal/70")}>{label}</p>
      <p className="mt-2 flex items-baseline gap-2">
        <span className={cn("text-[2.25rem] leading-none font-semibold tracking-[-0.02em] tabular-nums", dark ? "text-white" : "text-charcoal")}>
          {value}
          {suffix ? <span className="text-brand-orange">{suffix}</span> : null}
        </span>
        {delta ? (
          <span className="rounded-md bg-success/15 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-success">{delta}</span>
        ) : null}
      </p>
      {note ? <p className={cn("mt-2 text-[13px]", dark ? "text-white/65" : "text-charcoal/75")}>{note}</p> : null}
      {sparkline && sparkline.length > 1 ? <Sparkline values={sparkline} /> : null}
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 120;
  const h = 32;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`)
    .join(" ");
  return (
    <svg aria-hidden viewBox={`0 0 ${w} ${h}`} className="pointer-events-none absolute right-4 bottom-4 h-8 w-[120px] opacity-70">
      <polyline points={pts} fill="none" stroke="#F97316" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/** Locked statistics as KPI tiles; unconfirmed ones stay hidden in production (`publish: false`). */
export function StatBand({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((s) => {
        const tile = (
          <li className="h-full list-none">
            <KpiTile
              tone={tone}
              label={s.label}
              value={s.value}
              suffix={s.suffix}
              className="h-full"
              note={s.confirm ? <NeedsConfirm id={s.confirm} fallback={null} /> : undefined}
            />
          </li>
        );
        if (s.publish) return <Fragment key={s.id}>{tile}</Fragment>;
        return (
          <NeedsConfirm key={s.id} id={s.confirm ?? "servicesHeadcount"} fallback={null}>
            {tile}
          </NeedsConfirm>
        );
      })}
    </ul>
  );
}

type TimelineItem = { when: React.ReactNode; title: string; body: string };

/** Dated milestones: vertical on small screens, a horizontal rail from lg up. */
export function Timeline({ items, className, columns = 4 }: { items: TimelineItem[]; className?: string; columns?: 4 | 6 }) {
  return (
    <ol className={cn("relative grid gap-6 lg:gap-4", columns === 6 ? "md:grid-cols-3 lg:grid-cols-6" : "lg:grid-cols-4", className)}>
      <span aria-hidden className="absolute top-0 bottom-0 left-[11px] w-px bg-white/12 lg:top-[11px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
      {items.map((t, i) => (
        <li key={t.title} className={cn("relative pl-9 lg:pt-9 lg:pl-0", "motion-safe:animate-fade-up", `stagger-${Math.min(i + 1, 5)}`)}>
          <span aria-hidden className="absolute top-1 left-0 grid size-6 place-items-center rounded-full border border-brand-orange/50 bg-ink lg:top-0 lg:left-0">
            <span className="size-2 rotate-45 rounded-[2px] bg-brand-orange" />
          </span>
          <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">{t.when}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{t.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{t.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Trust strip per the handoff §5.1: heritage, status, locked stats, and active credentials. */
export function TrustStrip({ className }: { className?: string }) {
  const companies = getStat("companies");
  const licenses = getStat("licenses");
  const items: { label: string; confirm?: ConfirmId }[] = [
    { label: `Since ${site.founded}` },
    { label: "Microsoft CSP direct-bill partner" },
    { label: `${companies.value}${companies.suffix ?? ""} companies served`, confirm: companies.confirm },
    { label: `${licenses.value}${licenses.suffix ?? ""} Microsoft licenses managed`, confirm: licenses.confirm },
  ];
  return (
    <div className={cn("glass glass-soft grid gap-6 px-7 py-6 lg:grid-cols-[1.3fr_1fr] lg:items-start [&>*]:min-w-0", className)}>
      <div>
        <p className="mb-3 text-xs tracking-[0.12em] text-white/60 uppercase">MSP Hub at a glance</p>
        <div className="flex flex-wrap gap-2.5">
          {items.map((item) => (
            <Chip key={item.label} wrap className="font-semibold text-white">
              {item.confirm ? <NeedsConfirm id={item.confirm} fallback={item.label} /> : item.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="lg:text-right">
        <p className="mb-3 text-xs tracking-[0.12em] text-white/60 uppercase">Credentials</p>
        <CredentialBadges variant="chips" className="lg:justify-end" />
      </div>
    </div>
  );
}

type CredentialBadgesProps = {
  variant?: "chips" | "cards";
  className?: string;
};

/** Renders only credentials with `active: true` (content/credentials.ts). */
function publishedCredentials() {
  return activeCredentials.filter((c) => !c.confirm || showTodos);
}

export function CredentialBadges({ variant = "chips", className }: CredentialBadgesProps) {
  const credentials = publishedCredentials();
  if (variant === "cards") {
    return (
      <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {credentials.map((c) => (
          <li key={c.id} className="glass flex items-center gap-5 p-5">
            {c.logo ? (
              <Image src={c.logo} alt="" width={960} height={540} className="h-16 w-auto shrink-0 rounded-lg object-cover" />
            ) : (
              <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand-orange/30 bg-brand-orange/12 text-brand-orange">
                <span className="size-3 rotate-45 rounded-[2px] bg-current" />
              </span>
            )}
            <div>
              <p className="font-semibold text-white">
                {c.confirm ? <NeedsConfirm id={c.confirm} fallback={null}>{c.name}</NeedsConfirm> : c.name}
              </p>
              {c.qualifier ? <p className="mt-0.5 text-sm text-white/60">{c.qualifier}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {credentials.map((c) => (
        <Chip key={c.id} tone="orange" wrap>
          {c.confirm ? <NeedsConfirm id={c.confirm} fallback={null}>{c.name}</NeedsConfirm> : c.name}
        </Chip>
      ))}
    </div>
  );
}

/** Microsoft Solutions Partner program: enrolled solution areas as "Enrolled" chips, grouped by designation. No scores. */
export function SolutionAreas({ className }: { className?: string }) {
  if (!showTodos) return null;
  const groups = Array.from(new Set(enrolledSolutionAreas.map((a) => a.designation)));
  return (
    <div className={cn("glass p-6 sm:p-7", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">Microsoft Solutions Partner program</p>
          <p className="mt-1.5 max-w-[60ch] text-[15px] text-white/70">
            Enrolled solution areas in Partner Center. Designation badges appear here once attained.{" "}
            <NeedsConfirm id="badgesHeld" fallback={null} />
          </p>
        </div>
      </div>
      <dl className="mt-5 grid gap-4 md:grid-cols-3">
        {groups.map((g) => (
          <div key={g} className="rounded-[10px] border border-white/10 bg-white/4 p-4">
            <dt className="text-sm font-semibold text-white">{g}</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {enrolledSolutionAreas
                .filter((a) => a.designation === g)
                .map((a) => (
                  <Chip key={a.id} tone="orange" wrap className="text-[13px]">
                    {a.name}
                    <span className="rounded-md bg-success/15 px-1.5 py-0.5 font-mono text-[10.5px] font-semibold tracking-[0.06em] text-success uppercase">Enrolled</span>
                  </Chip>
                ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

type LogoCloudProps = {
  items: EcosystemEntry[];
  className?: string;
  /** Confirmation shown on review builds next to the wall. */
  confirm?: "vendorLogos" | "allianceLogos";
};

/** Vendor / alliance wall. Artwork renders only when `logo` is set (permission obtained); text chips otherwise. */
export function LogoCloud({ items, className, confirm }: LogoCloudProps) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <li key={item.name}>
            {item.logo ? (
              <span className="flex h-14 items-center justify-center rounded-xl bg-white px-4">
                <Image src={item.logo} alt={item.name} width={160} height={48} className="h-8 w-auto object-contain" />
              </span>
            ) : (
              <Chip className="font-semibold text-white" title={item.note}>
                {item.name}
              </Chip>
            )}
          </li>
        ))}
      </ul>
      {confirm ? (
        <p className="mt-3 text-xs text-white/60">
          <NeedsConfirm id={confirm} fallback={null}>
            Names shown as text until logo files and written permission are in hand.
          </NeedsConfirm>
        </p>
      ) : null}
    </div>
  );
}

/** Testimonials render only when quotes exist; the list is empty until current partners and customers supply them. */
export function Testimonials({ className }: { className?: string }) {
  if (testimonials.length === 0) {
    return <NeedsConfirm id="testimonials" fallback={null} />;
  }
  return (
    <div className={cn("grid gap-4 lg:grid-cols-2", className)}>
      {testimonials.map((quote) => (
        <GlassCard key={quote.name + quote.text.slice(0, 16)} className="flex flex-col justify-between p-8 sm:p-9">
          <div>
            <Quote className="size-8 text-brand-orange" strokeWidth={1.6} aria-hidden />
            <blockquote className="mt-5 font-display text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.35] tracking-[-0.01em] text-white">
              “{quote.text}”
            </blockquote>
          </div>
          <footer className="mt-6 text-sm text-white/70">
            <p className="font-semibold text-white">{quote.name}</p>
            <p>{quote.role}</p>
          </footer>
        </GlassCard>
      ))}
    </div>
  );
}

type Step = { title: string; body: string };

export function Steps({ steps, className, tone = "dark" }: { steps: Step[]; className?: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <ol className={cn("grid gap-4 md:grid-cols-3", className)}>
      {steps.map((step, i) => (
        <li key={step.title} className={cn(dark ? "glass" : "card-light", "p-7")}>
          <span className="font-display text-[2.75rem] leading-none text-brand-orange">{i + 1}</span>
          <h3 className={cn("mt-4 text-lg font-semibold", dark ? "text-white" : "text-charcoal")}>{step.title}</h3>
          <p className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-white/70" : "text-charcoal/80")}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export type FaqItem = { q: string; a: React.ReactNode; /** Plain-text answer for FAQPage schema. */ schemaText?: string };

export function Faq({ items, className, tone = "dark" }: { items: FaqItem[]; className?: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className={cn("mx-auto grid max-w-[860px] gap-2.5", className)}>
      {items.map((item, i) => (
        <details key={item.q} className={cn(dark ? "glass glass-soft" : "card-light", "group px-6")} open={i === 0}>
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden",
              dark ? "text-white" : "text-charcoal",
            )}
          >
            {item.q}
            <span aria-hidden className="text-2xl leading-none text-brand-orange group-open:hidden">+</span>
            <span aria-hidden className="hidden text-2xl leading-none text-brand-orange group-open:inline">–</span>
          </summary>
          <div className={cn("max-w-[70ch] pb-5 text-[15px] leading-relaxed", dark ? "text-white/70" : "text-charcoal/80")}>{item.a}</div>
        </details>
      ))}
    </div>
  );
}

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string }[];
  children?: React.ReactNode;
  className?: string;
};

export function CtaBand({ eyebrow = "Next step", title, lead, primary, secondary, children, className }: CtaBandProps) {
  return (
    <Container className={className}>
      <div className="glass glass-lg overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
        <Glow tone="orange" className="top-[-300px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 opacity-80" />
        <HexGrid className="opacity-70" />
        <div className="relative">
          <Eyebrow className="before:hidden">{eyebrow}</Eyebrow>
          <Display className="mx-auto mt-3.5 max-w-[18ch]">{title}</Display>
          {lead ? <Lead className="mx-auto mt-4">{lead}</Lead> : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primary.href}>
              {primary.label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            {secondary?.map((s) => (
              <ButtonLink key={s.href + s.label} href={s.href} variant="glass">
                {s.label}
              </ButtonLink>
            ))}
          </div>
          {children}
        </div>
      </div>
    </Container>
  );
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex h-11 items-center gap-1.5 text-sm font-semibold underline decoration-[#f97316] decoration-2 underline-offset-[5px]", className)}
    >
      {children}
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );
}

/** Checkmark bullet list used on audience and capability cards. */
export function CheckList({ items, className, tone = "dark" }: { items: readonly string[]; className?: string; tone?: "dark" | "light" }) {
  return (
    <ul className={cn("grid gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex items-start gap-3 text-[15px]", tone === "dark" ? "text-white/75" : "text-charcoal/85")}>
          <span
            aria-hidden
            className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full border border-brand-orange/45 bg-brand-orange/15"
          >
            <svg viewBox="0 0 24 24" className="size-2.5 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Support model statement (handoff §3 #1): 24/7 is managed-services monitoring only. */
export function SupportModel({ className, tone = "dark", variant = "card" }: { className?: string; tone?: "dark" | "light"; variant?: "card" | "rule" }) {
  const dark = tone === "dark";
  const rule = variant === "rule";
  const card = rule ? cn("border-t pt-5", dark ? "border-white/15" : "border-[#0b1020]/15") : dark ? "glass p-6" : "card-light p-6";
  const term = rule
    ? cn("font-mono text-[11px] tracking-[0.12em] uppercase", dark ? "text-[#8e98ae]" : "text-[#4b5569]")
    : cn("font-mono text-xs font-semibold tracking-[0.12em] uppercase", dark ? "text-brand-orange" : "text-charcoal");
  const body = rule
    ? cn("mt-3 text-[16px] leading-[1.65]", dark ? "text-white" : "text-[#0b1020]")
    : cn("mt-2 text-[15px]", dark ? "text-white/75" : "text-charcoal/85");
  return (
    <dl className={cn("grid", rule ? "gap-x-8 gap-y-8" : "gap-4", "sm:grid-cols-3", className)}>
      <div className={card}>
        <dt className={term}>Licensing & billing support</dt>
        <dd className={body}>
          <NeedsConfirm id="supportHours" fallback={site.supportHours}>
            {site.supportHoursProposed}
          </NeedsConfirm>
          , through the HubX Service Desk and {site.salesEmail}.
        </dd>
      </div>
      <div className={card}>
        <dt className={term}>Microsoft escalation</dt>
        <dd className={body}>Direct escalation to Microsoft Premier support as a CSP direct-bill partner.</dd>
      </div>
      <div className={card}>
        <dt className={term}>24/7</dt>
        <dd className={body}>Monitoring and incident management for environments under MSP Hub managed services.</dd>
      </div>
    </dl>
  );
}
