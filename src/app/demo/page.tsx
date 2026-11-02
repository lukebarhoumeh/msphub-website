import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { HubXLockup } from "@/components/brand/hubx-logo";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckList, Testimonials, TrustStrip } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { GlassCard } from "@/components/ui/card";
import { NeedsConfirmBlock } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Schedule a HubX demo",
  description:
    "See HubX, powered by MSP Hub, in 30 minutes: a live walkthrough of the Microsoft portal with your tenant scenario and your licensing questions.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Schedule a demo · HubX, powered by MSP Hub"
        title="See HubX in 30 minutes."
        lead="A live walkthrough of the Microsoft portal with your tenant scenario, your licensing questions, and clear next steps. No obligation."
      >
        <HubXLockup logoClassName="h-9 w-auto" />
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div className="space-y-6">
              <GlassCard>
                <Eyebrow>What you&apos;ll see</Eyebrow>
                <CheckList
                  className="mt-4"
                  items={[
                    "Home and performance: customers, subscriptions, licenses, revenue, and margin",
                    "Customers, catalog, quotations, and billing with partner-branded invoices",
                    "Dashboards, scheduled reports, and the Service Desk",
                    "HubAI answering questions about a demo estate",
                    "Your scenario: one tenant or many; MSP, business, or direct-bill CSP",
                  ]}
                />
              </GlassCard>
              <NeedsConfirmBlock id="bookingLink" fallback={null}>
                <p className="flex items-center gap-2 text-sm text-white/70">
                  <CalendarDays className="size-5 text-amber-300/80" aria-hidden />A Microsoft Bookings calendar embeds here once the link is supplied; the form stays as fallback.
                </p>
              </NeedsConfirmBlock>
            </div>
            <div className="glass glass-lg p-7 sm:p-10">
              <Display size="md" className="mb-2">
                Request a demo
              </Display>
              <Lead className="mb-7 text-base">Tell us who you are and when works. We confirm a time within one business day.</Lead>
              <LeadForm flow="demo" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container className="grid gap-4">
          <TrustStrip />
          <Testimonials />
        </Container>
      </Section>
    </>
  );
}
