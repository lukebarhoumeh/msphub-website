import type { Metadata } from "next";
import { ArrowRight, Clock, Globe2, Headset, Users } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { HubXPoweredBy } from "@/components/brand/hubx-logo";
import { TrustStrip } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard, IconTile } from "@/components/ui/card";
import { Needs } from "@/components/ui/needs";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { branches, serviceBranches } from "@/content/branches";

export const metadata: Metadata = {
  title: "Services — professional, managed, and development services for Microsoft estates",
  description:
    "Four practices, one delivery team. MSP Hub designs, migrates, runs, and builds on Microsoft 365, Azure, and the data platform, with HubX as the front door to licensing.",
  alternates: { canonical: "/services" },
};

const delivery = [
  {
    icon: Globe2,
    title: "Follow-the-sun delivery",
    body: "Delivery teams across North America, the UK, and India keep migrations and operations moving around the clock.",
    needs: "deliveryCenters" as const,
  },
  { icon: Clock, title: "Agreed SLAs", body: "Managed operations run to agreed SLAs, monitored and supported around the clock." },
  { icon: Headset, title: "Direct Microsoft escalation", body: "A Tier-1 Direct CSP relationship means issues escalate straight to Microsoft." },
  { icon: Users, title: "100+ staff services team", body: "Certified cloud architects and engineers across cloud, Microsoft 365, database, and development." },
];

export default function ServicesPage() {
  const hubx = branches[0];
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four practices, one delivery team."
        lead="Engage a single practice or hand over the full stack. The same MSP Hub team designs it, migrates it, runs it, and builds on it, with HubX as the front door to your Microsoft licensing."
      >
        <ButtonLink href="#inquiry">
          Start a service inquiry
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/contact" variant="glass">
          Book a scoping call
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 left-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <GlassCard className="flex flex-col border-brand-orange/30 md:col-span-2 lg:col-span-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div>
                <span className="inline-flex h-7.5 items-center rounded-full border border-brand-orange/30 bg-brand-orange/12 px-3 text-xs font-semibold tracking-[0.06em] text-brand-orange uppercase">
                  Licensing · the front door
                </span>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{hubx.short}</h2>
                <p className="mt-2.5 max-w-[70ch] text-[15px] leading-relaxed text-white/70">{hubx.description}</p>
                <p className="mt-3">
                  <HubXPoweredBy logoClassName="h-5 w-auto" />
                </p>
              </div>
              <ButtonLink href="/hubx" variant="glass" className="mt-6 shrink-0 lg:mt-0">
                Explore HubX
              </ButtonLink>
            </GlassCard>
            {serviceBranches.map((b) => (
              <GlassCard key={b.slug} className="flex flex-col gap-5 md:col-span-2 lg:col-span-4 lg:flex-row lg:items-center lg:gap-8">
                <IconTile icon={b.icon} className="shrink-0" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold tracking-tight text-white">{b.name}</h2>
                  <p className="mt-1 font-medium text-white/85">{b.short}</p>
                  <p className="mt-2 max-w-[80ch] text-[15px] leading-relaxed text-white/70">{b.description}</p>
                </div>
                <ButtonLink href={b.href} variant="glass" size="sm" className="shrink-0 self-start lg:self-auto">
                  {b.linkLabel}
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Delivery model" title="One team, end to end." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {delivery.map((d) => (
              <GlassCard key={d.title}>
                <IconTile icon={d.icon} className="mb-5" />
                <h3 className="text-lg font-semibold tracking-tight text-white">{d.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">
                  {d.body} {d.needs ? <Needs id={d.needs} /> : null}
                </p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <TrustStrip />
        </Container>
      </Section>

      <Section id="inquiry" className="scroll-mt-20 pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="glass glass-lg grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:p-14">
            <div>
              <Eyebrow>Service inquiry</Eyebrow>
              <Display className="mt-3.5">Tell us what you&apos;re trying to get done.</Display>
              <Lead className="mt-4">
                Pick the practices involved and describe the work. A solutions engineer replies with questions and a
                proposed scoping call.
              </Lead>
              <ul className="mt-6 grid gap-2 text-sm text-white/60">
                <li>One practice or the whole stack</li>
                <li>Fixed-scope assessments available</li>
                <li>Pairs with HubX for licensing</li>
              </ul>
            </div>
            <LeadForm flow="service" />
          </div>
        </Container>
      </Section>
    </>
  );
}
