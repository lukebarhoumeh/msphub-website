import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Chip, GlassCard } from "@/components/ui/card";
import { Needs } from "@/components/ui/needs";
import { Container, Glow } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { approvedStats, certifications, platforms } from "@/content/site";
import { vendorLogos, type Testimonial as TestimonialData } from "@/content/proof";
import { cn } from "@/lib/cn";

/** The three approved statistics. */
export function StatBand({ className }: { className?: string }) {
  return (
    <dl className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {approvedStats.map((s) => (
        <div
          key={s.label}
          className="glass p-7 before:hidden after:absolute after:top-0 after:left-7 after:h-0.5 after:w-7 after:rounded-b after:bg-brand-orange"
        >
          <dd className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-white tabular-nums">
            {s.value}
            <sup className="ml-0.5 align-top text-[0.45em] text-brand-orange">{s.suffix}</sup>
          </dd>
          <dt className="mt-2.5 text-[15px] text-white/70">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/** Platform wordmarks + approved credential chips. */
export function TrustStrip({ className }: { className?: string }) {
  return (
    <div className={cn("glass glass-soft grid gap-6 px-7 py-6 lg:grid-cols-[1fr_auto] lg:items-center", className)}>
      <div>
        <p className="mb-3 text-xs tracking-[0.12em] text-white/45 uppercase">Built on the platforms you run</p>
        <div className="flex flex-wrap gap-2.5">
          {platforms.map((p) => (
            <Chip key={p} className="font-semibold text-white">
              {p}
            </Chip>
          ))}
        </div>
      </div>
      <div className="lg:text-right">
        <p className="mb-3 text-xs tracking-[0.12em] text-white/45 uppercase">Credentials</p>
        <div className="flex flex-wrap gap-2.5 lg:justify-end">
          {certifications.map((c) => (
            <Chip key={c} tone="orange">
              {c}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Vendor logos carried over from msphub.com, on white tiles so raster artwork reads on dark glass. */
export function VendorLogoWall({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <div className={className}>
      <ul
        className={cn(
          "grid gap-3",
          compact ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
        )}
      >
        {vendorLogos.map((logo) => (
          <li
            key={logo.name}
            className="flex aspect-[7/4] items-center justify-center rounded-xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,.35)]"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={350}
              height={200}
              className="h-full w-full object-contain"
              sizes="(min-width: 1024px) 180px, 40vw"
            />
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/45">
        Vendor and partner logos as shown on the current msphub.com. <Needs id="logosPermission" />
      </p>
    </div>
  );
}

export function Testimonial({ quote, className }: { quote: TestimonialData; className?: string }) {
  return (
    <GlassCard className={cn("flex flex-col justify-between p-8 sm:p-9", className)}>
      <div>
        <Quote className="size-8 text-brand-orange" strokeWidth={1.6} aria-hidden />
        <blockquote className="mt-5 font-display text-[clamp(1.25rem,1.8vw,1.625rem)] leading-[1.35] tracking-[-0.01em] text-white">
          “{quote.text}”
        </blockquote>
      </div>
      <footer className="mt-6 text-sm text-white/70">
        <p className="font-semibold text-white">{quote.name}</p>
        <p>{quote.role}</p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/45">
          Carried over from msphub.com. <Needs id="testimonialPermission" />
        </p>
      </footer>
    </GlassCard>
  );
}

export function AwardCard({ className }: { className?: string }) {
  return (
    <GlassCard className={cn("flex items-center gap-5 p-5", className)}>
      <Image
        src="/proof/awards/channelpro-editors-choice-2025.webp"
        alt="ChannelPro LIVE 2025 Editor's Choice Award winner badge"
        width={960}
        height={540}
        className="h-24 w-auto shrink-0 rounded-lg object-cover"
      />
      <div>
        <p className="text-xs tracking-[0.12em] text-brand-orange uppercase">Award</p>
        <p className="mt-1 font-semibold text-white">ChannelPro LIVE Chicago 2025 — Editor&apos;s Choice</p>
        <p className="mt-1 text-sm text-white/60">Awarded to MSP Hub at ChannelPro LIVE Chicago, April 2025.</p>
      </div>
    </GlassCard>
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

type FaqItem = { q: string; a: React.ReactNode };

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
export function CheckList({ items, className }: { items: string[]; className?: string }) {
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
