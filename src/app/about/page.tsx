import type { Metadata } from "next";
import { ArrowRight, Award, BadgeCheck, Layers, ShieldCheck } from "lucide-react";
import { AwardCard, CtaBand, StatBand, Testimonial } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard, IconTile } from "@/components/ui/card";
import { Needs, NeedsBlock } from "@/components/ui/needs";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { testimonials } from "@/content/proof";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About MSP Hub — Microsoft Tier-1 Direct CSP and services company",
  description:
    "MSP Hub is a Microsoft Tier-1 Direct CSP and IT services company: 478+ companies served, 600K+ licenses managed, a 100+ staff services team, and HubX, our Microsoft portal.",
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    when: "Nov 2024",
    title: "Six.One becomes MSP Hub",
    body: "The Six.One marketplace, built by an MSP for MSPs, is rebranded MSP Hub.",
  },
  {
    when: "Jul 2025",
    title: "READY Networks joins MSP Hub",
    body: "The READY Networks services business becomes part of MSP Hub, bringing the professional and managed services practices.",
  },
  {
    when: "2026",
    title: "HubX launches",
    body: "HubX, powered by MSP Hub, is released: the Microsoft portal for licensing, procurement, and spend.",
    needs: "formerly" as const,
  },
];

const credentials = [
  { icon: ShieldCheck, title: "ISO certified", body: "Information security management across our operations." },
  { icon: BadgeCheck, title: "Microsoft Modern Work certified", body: "Microsoft's designation for Microsoft 365 workloads." },
  { icon: BadgeCheck, title: "Azure certified", body: "Microsoft's designation for Azure infrastructure work." },
  { icon: Layers, title: "Microsoft Tier-1 Direct CSP", body: "A direct Cloud Solution Provider relationship with Microsoft." },
  { icon: Award, title: "ChannelPro Editor's Choice 2025", body: "Awarded at ChannelPro LIVE Chicago, April 2025." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MSP Hub"
        title="One partner for licensing, cloud, security, AI, and 24/7 support."
        lead="MSP Hub is a Microsoft Tier-1 Direct CSP and IT services company. We built HubX so IT, finance, and purchasing can see and control their Microsoft estate, and we staff the professional, managed, and development teams that run it."
      >
        <ButtonLink href="/contact">
          Contact us
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/partners" variant="glass">
          Partner with us
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow>Who we are</Eyebrow>
              <Display className="mt-3.5">We simplify IT so you can focus on growth.</Display>
            </div>
            <div className="space-y-5">
              <Lead>
                MSP Hub is your single technology partner for everything Microsoft, from licensing and cloud
                infrastructure to security, AI, and 24/7 managed support.
              </Lead>
              <p className="text-[15px] leading-relaxed text-white/70">
                We serve MSPs and VARs who resell Microsoft and need a platform and a bench behind them, and we serve
                businesses directly, from small companies to large enterprises, with certified cloud architects and
                engineers. Licensing is the entry point; the services make it work.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="blue" className="top-[-100px] left-[30%] h-[600px] w-[800px] opacity-60" />}>
        <Container>
          <SectionHeading eyebrow="By the numbers" title="What we run today." />
          <StatBand />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="History" title="From marketplace to single partner." />
          <ol className="grid gap-4 md:grid-cols-3">
            {timeline.map((t) => (
              <li key={t.title} className="glass p-7">
                <p className="text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">{t.when}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                  {t.body} {t.needs ? <Needs id={t.needs} /> : null}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Credentials" title="Certified, direct, and recognized." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((c) => (
              <GlassCard key={c.title}>
                <IconTile icon={c.icon} className="mb-5" />
                <h3 className="text-lg font-semibold tracking-tight text-white">{c.title}</h3>
                <p className="mt-2 text-[15px] text-white/70">{c.body}</p>
              </GlassCard>
            ))}
            <AwardCard className="sm:col-span-2 lg:col-span-1" />
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Leadership" title="The people behind MSP Hub." />
          <NeedsBlock id="leadership" className="min-h-[220px]">
            <p className="text-xs text-white/45">Names, titles, photos, and short bios to be supplied. <Needs id="team" /></p>
          </NeedsBlock>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <Testimonial quote={testimonials[0]} />
            <GlassCard className="flex flex-col justify-between p-8">
              <div>
                <Eyebrow>Locations</Eyebrow>
                <h3 className="mt-3.5 text-2xl font-semibold tracking-tight text-white">Headquartered in Florida, delivering globally.</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Delivery teams across North America, the UK, and India keep work moving around the clock.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/55">
                Office addresses to be confirmed. <Needs id="offices" /> <Needs id="deliveryCenters" />
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Talk to MSP Hub."
          lead="Partners, customers, advisors, and press: one inbox, a real reply."
          primary={{ label: "Contact us", href: "/contact" }}
          secondary={[{ label: "Schedule a HubX demo", href: "/demo" }]}
        >
          <p className="mt-8 text-sm text-white/70">
            <a href={`mailto:${site.salesEmail}`} className="font-medium text-white underline-offset-4 hover:underline">
              {site.salesEmail}
            </a>
          </p>
        </CtaBand>
      </Section>
    </>
  );
}
