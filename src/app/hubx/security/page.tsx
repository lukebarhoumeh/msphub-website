import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/hubx/breadcrumbs";
import { FaqSection } from "@/components/hubx/faq-section";
import { PointList } from "@/components/hubx/primitives";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CtaBand } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard, IconTile } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { hubxSecurityFaq } from "@/content/hubx-faq";
import { securityFacts, securityPage, securityPillars } from "@/content/hubx-security";
import { screens } from "@/content/screens";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "HubX security — SSO, roles, audit logs, and Microsoft access under the CSP program",
  description:
    "How HubX handles access: single sign-on with Microsoft Entra ID, Google, or Okta, roles per organization and customer, audit logs everywhere, Microsoft tenant access through reseller relationships, GDAP, and the MCA, delivered by an ISO/IEC 27001:2022-certified organization.",
  alternates: { canonical: "/hubx/security" },
};

export default function HubxSecurityPage() {
  const { hero, pillars, audit, faq, cta } = securityPage;
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead}>
        <ButtonLink href="/demo">
          Schedule a demo
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={site.hubxLoginUrl} variant="glass">
          Log in to HubX
        </ButtonLink>
      </PageHero>

      <Section tight className="pt-0 sm:pt-0">
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[
              { label: "HubX", href: "/hubx" },
              { label: "Security", href: "/hubx/security" },
            ]}
          />
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {securityFacts.map((fact) => (
              <div key={fact.label} className="glass p-5">
                <dt className="font-mono text-[11px] tracking-[0.12em] text-white/60 uppercase">{fact.label}</dt>
                <dd className="mt-2 font-semibold text-white">
                  {"confirm" in fact ? <NeedsConfirm id={fact.confirm} fallback={fact.value} /> : fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow={pillars.eyebrow} title={pillars.title} />
          <ol className="grid gap-4 lg:grid-cols-2">
            {securityPillars.map((p, i) => (
              <li key={p.id} id={p.id} className="scroll-mt-28">
                <GlassCard className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <IconTile icon={p.icon} />
                    <span className="font-mono text-xs tracking-[0.08em] text-white/60">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">
                    {p.confirm ? <NeedsConfirm id={p.confirm} fallback={p.summary} /> : p.summary}
                  </p>
                  <PointList items={p.points} className="mt-5" />
                </GlassCard>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
            <div>
              <Eyebrow tone="light">{audit.eyebrow}</Eyebrow>
              <Display tone="light" className="mt-3.5">
                {audit.title}
              </Display>
              <Lead tone="light" className="mt-4">
                {audit.lead}
              </Lead>
            </div>
            <BrowserFrame screen={screens.homeWidgets} sizes="(min-width: 1024px) 640px, 100vw" viewport="scroll" />
          </div>
        </Container>
      </Section>

      <Section id="faq">
        <Container>
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} align="center" />
          <FaqSection items={hubxSecurityFaq} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          eyebrow={cta.eyebrow}
          title={cta.title}
          lead={cta.lead}
          primary={{ label: "Schedule a demo", href: "/demo" }}
          secondary={[{ label: "Talk to sales", href: "/contact" }]}
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
