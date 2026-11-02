import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Chip, GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import type { ConfirmId } from "@/content/confirmations";
import { activeCredentials } from "@/content/credentials";
import type { EcosystemEntry } from "@/content/ecosystem";
import { site, testimonials } from "@/content/site";
import { stats } from "@/content/stats";
import { cn } from "@/lib/cn";

/** Locked statistics; unconfirmed ones stay hidden in production (`publish: false`). */
export function StatBand({ className }: { className?: string }) {
  return (
    <dl className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((s) => {
        const tile = (
          <div className="glass h-full p-7 before:hidden after:absolute after:top-0 after:left-7 after:h-0.5 after:w-7 after:rounded-b after:bg-brand-orange">
            <dd className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-white tabular-nums">
              {s.value}
              {s.suffix ? <sup className="ml-0.5 align-top text-[0.45em] text-brand-orange">{s.suffix}</sup> : null}
            </dd>
            <dt className="mt-2.5 text-[15px] text-white/70">
              {s.label}
              {s.confirm ? (
                <>
                  {" "}
                  <NeedsConfirm id={s.confirm} fallback={null} />
                </>
              ) : null}
            </dt>
          </div>
        );
        if (s.publish) return <div key={s.id}>{tile}</div>;
        return (
          <NeedsConfirm key={s.id} id={s.confirm ?? "servicesHeadcount"} fallback={null}>
            {tile}
          </NeedsConfirm>
        );
      })}
    </dl>
  );
}

/** Trust strip per the handoff §5.1: heritage, status, locked stats, and active credentials. */
export function TrustStrip({ className }: { className?: string }) {
  const items: { label: string; confirm?: ConfirmId }[] = [
    { label: `Since ${site.founded}` },
    { label: "Microsoft CSP direct-bill partner" },
    { label: "478+ companies served", confirm: "companiesNumber" },
    { label: "500K+ Microsoft licenses managed", confirm: "licensesNumber" },
  ];
  return (
    <div className={cn("glass glass-soft grid gap-6 px-7 py-6 lg:grid-cols-[1.3fr_1fr] lg:items-start [&>*]:min-w-0", className)}>
      <div>
        <p className="mb-3 text-xs tracking-[0.12em] text-white/45 uppercase">MSP Hub at a glance</p>
        <div className="flex flex-wrap gap-2.5">
          {items.map((item) => (
            <Chip key={item.label} wrap className="font-semibold text-white">
              {item.confirm ? <NeedsConfirm id={item.confirm} fallback={item.label} /> : item.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="lg:text-right">
        <p className="mb-3 text-xs tracking-[0.12em] text-white/45 uppercase">Credentials</p>
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
export function CredentialBadges({ variant = "chips", className }: CredentialBadgesProps) {
  if (variant === "cards") {
    return (
      <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {activeCredentials.map((c) => (
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
                {c.confirm ? <NeedsConfirm id={c.confirm} fallback={c.name} /> : c.name}
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
      {activeCredentials.map((c) => (
        <Chip key={c.id} tone="orange" wrap>
          {c.confirm ? <NeedsConfirm id={c.confirm} fallback={c.name} /> : c.name}
        </Chip>
      ))}
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
        <p className="mt-3 text-xs text-white/45">
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

export function Steps({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-4 md:grid-cols-3", className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="glass p-7">
          <span className="font-display text-[2.75rem] leading-none text-brand-orange">{i + 1}</span>
          <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export type FaqItem = { q: string; a: React.ReactNode; /** Plain-text answer for FAQPage schema. */ schemaText?: string };

export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("mx-auto grid max-w-[860px] gap-2.5", className)}>
      {items.map((item, i) => (
        <details key={item.q} className="glass glass-soft group px-6" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-white [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden className="text-2xl leading-none text-brand-orange group-open:hidden">+</span>
            <span aria-hidden className="hidden text-2xl leading-none text-brand-orange group-open:inline">–</span>
          </summary>
          <div className="max-w-[70ch] pb-5 text-[15px] leading-relaxed text-white/70">{item.a}</div>
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
        <div aria-hidden className="bg-hex absolute inset-0 opacity-70" />
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
      className={cn("inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange hover:text-orange-hover", className)}
    >
      {children}
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );
}

/** Checkmark bullet list used on audience and capability cards. */
export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] text-white/75">
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
export function SupportModel({ className }: { className?: string }) {
  return (
    <dl className={cn("grid gap-4 sm:grid-cols-3", className)}>
      <div className="glass p-6">
        <dt className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">Licensing & billing support</dt>
        <dd className="mt-2 text-[15px] text-white/75">
          <NeedsConfirm id="supportHours" fallback={site.supportHours}>
            {site.supportHoursProposed}
          </NeedsConfirm>
          , through the HubX Service Desk and {site.salesEmail}.
        </dd>
      </div>
      <div className="glass p-6">
        <dt className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">Microsoft escalation</dt>
        <dd className="mt-2 text-[15px] text-white/75">Direct escalation to Microsoft Premier support as a CSP direct-bill partner.</dd>
      </div>
      <div className="glass p-6">
        <dt className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">24/7</dt>
        <dd className="mt-2 text-[15px] text-white/75">Monitoring and incident management for environments under MSP Hub managed services.</dd>
      </div>
    </dl>
  );
}
