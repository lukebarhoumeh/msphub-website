import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CredentialBadges, CtaBand, SolutionAreas, StatBand, SupportModel, Testimonials, Timeline } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { companyStory, leadership, site, timeline } from "@/content/site";

export const metadata: Metadata = {
  title: "About MSP Hub — Microsoft CSP direct-bill partner and IT services company since 1999",
  description:
    "MSP Hub started in 1999 as ReadyNetworks. Today it is a Microsoft CSP direct-bill partner (Tier-1 Direct) and IT services company, and the team that built HubX.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About MSP Hub · Since ${site.founded}`}
        title="One partner for licensing, cloud, security, AI, and managed operations."
        lead="MSP Hub is a Microsoft CSP direct-bill partner (Tier-1 Direct) and IT services company. We built HubX so IT, finance, and purchasing can see and control their Microsoft estate, and we staff the professional, managed, and development teams that run it."
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
              <Display className="mt-3.5">{companyStory.headline}</Display>
            </div>
            <div className="space-y-5">
              <Lead>{companyStory.lead}</Lead>
              {companyStory.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[15px] leading-relaxed text-white/70">
                  {paragraph}
                </p>
              ))}
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
          <SectionHeading eyebrow="History" title="From an MSP's own tool to HubX." />
          <Timeline
            columns={6}
            items={timeline.map((t) => ({
              when: "confirm" in t ? <NeedsConfirm id={t.confirm} fallback={t.when} /> : t.when,
              title: t.title,
              body: t.body,
            }))}
          />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Credentials" title="Certified, direct, and recognized." />
          <CredentialBadges variant="cards" />
          <SolutionAreas className="mt-4" />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Support model" title="Business hours for licensing. Around the clock for managed environments." />
          <SupportModel />
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="Leadership"
            title="The team driving MSP Hub's platform, partner channel, and Microsoft cloud delivery."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {leadership.map((p) => (
              <li key={p.slug} className="card-light flex flex-col p-5">
                <Image
                  src={p.photo}
                  alt={`${p.name}, ${p.title}`}
                  width={360}
                  height={360}
                  sizes="(min-width: 1024px) 200px, (min-width: 640px) 45vw, 90vw"
                  className="aspect-square w-full rounded-[10px] object-cover"
                />
                <p className="mt-4 font-mono text-[11px] font-semibold tracking-[0.12em] text-charcoal/80 uppercase">{p.title}</p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-charcoal">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{p.bio}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-charcoal/70">
            <NeedsConfirm id="teamPhotos" fallback={null}>
              Portraits cropped from the leadership slide; hi-res originals to follow.
            </NeedsConfirm>{" "}
            <NeedsConfirm id="leadership" fallback={null} />
          </p>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard className="p-8">
              <Eyebrow>Locations</Eyebrow>
              <h3 className="mt-3.5 text-2xl font-semibold tracking-tight text-white">
                Headquartered in {site.hq.city}.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                <NeedsConfirm
                  id="deliveryRegions"
                  fallback="Headquartered in North Palm Beach, Florida."
                />
              </p>
              <p className="mt-3 text-sm text-white/65">
                <NeedsConfirm id="officePresentation" fallback={null}>
                  Full address shown in the footer and legal pages only.
                </NeedsConfirm>
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <Eyebrow>Heritage</Eyebrow>
              <h3 className="mt-3.5 text-2xl font-semibold tracking-tight text-white">Formerly READY Networks.</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                The ReadyNetworks name carried the company from 1999 to the July 2025 rebrand. The people, the Microsoft
                relationship, and the platform engineering continue as MSP Hub.
              </p>
            </GlassCard>
          </div>
          <Testimonials className="mt-4" />
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
