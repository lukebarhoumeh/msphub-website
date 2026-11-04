import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/hubx/breadcrumbs";
import { FaqSection } from "@/components/hubx/faq-section";
import { PointList } from "@/components/hubx/primitives";
import { EvidenceFigure } from "@/components/ink/evidence";
import { Chapter, NextStep, RuleList, StatRail, inkTone } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container } from "@/components/ui/section";
import { captures } from "@/content/evidence";
import { hubxSecurityFaq } from "@/content/hubx-faq";
import { securityFacts, securityPage, securityPillars } from "@/content/hubx-security";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "HubX security — SSO, roles, audit logs, and Microsoft access under the CSP program",
  description:
    "How HubX handles access: single sign-on with Microsoft Entra ID, Google, or Okta, roles per organization and customer, audit logs everywhere, and Microsoft tenant access through reseller relationships, GDAP, and the MCA.",
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

      <section className="bg-[#0b1020] pb-14 text-white">
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[
              { label: "HubX", href: "/hubx" },
              { label: "Security", href: "/hubx/security" },
            ]}
          />
          <StatRail
            tone="ink"
            items={securityFacts.map((fact) => ({
              id: fact.label,
              value: fact.value,
              label: fact.label,
            }))}
          />
        </Container>
      </section>

      <Chapter tone="ink" pad="tight" eyebrow={pillars.eyebrow} title={pillars.title} headingWidth="max-w-[20ch]">
        <RuleList
          tone="ink"
          numbered
          columns={2}
          items={securityPillars.map((pillar) => ({
            id: pillar.id,
            title: pillar.title,
            body: pillar.confirm ? <NeedsConfirm id={pillar.confirm} fallback={pillar.summary} /> : pillar.summary,
            children: <PointList items={pillar.points} dense />,
          }))}
        />
      </Chapter>

      <Chapter tone="pearl" eyebrow={audit.eyebrow} title={audit.title} lead={audit.lead} headingWidth="max-w-[18ch]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <EvidenceFigure capture={captures.homeWidgets} tone="pearl" />
          </div>
          <div className="border-t border-[#0b1020]/15 pt-5 lg:col-span-5">
            <p className={cn("max-w-[46ch] text-[16px] leading-[1.65]", inkTone.pearl.muted)}>
              Organization-wide audit logs sit under Administration, per-customer logs on each customer record, and the latest events on the home page.
              Every table exports to CSV.
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter tone="pearl" pad="tight" id="faq" size="md" eyebrow={faq.eyebrow} title={faq.title}>
        <FaqSection items={hubxSecurityFaq} tone="light" variant="rule" className="max-w-[860px]" />
      </Chapter>

      <NextStep tone="ink" eyebrow={cta.eyebrow} title={cta.title} lead={cta.lead} primary={{ label: "Schedule a demo", href: "/demo" }} secondary={[{ label: "Talk to sales", href: "/contact" }]}>
        <p className={cn("mt-6 text-[15px]", inkTone.ink.muted)}>
          <a href={`mailto:${site.salesEmail}`} className="font-semibold text-white underline decoration-[#ffb05c] decoration-2 underline-offset-[5px]">
            {site.salesEmail}
          </a>
        </p>
      </NextStep>
    </>
  );
}
