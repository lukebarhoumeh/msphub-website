import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { HubXWithBadge } from "@/components/brand/hubx-logo";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckList, Testimonial, TrustStrip } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { GlassCard } from "@/components/ui/card";
import { NeedsBlock } from "@/components/ui/needs";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { testimonials } from "@/content/proof";

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
        <HubXWithBadge hubxClassName="h-9 w-auto" badgeClassName="h-7 w-auto" />
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
                    "The live portal: licenses, renewals, costs, and orders in one view",
                    "Your scenario: one tenant or many, MSP or direct",
                    "Hub AI recommendations on a sample estate",
                    "Pricing and migration questions answered on the call",
                  ]}
                />
              </GlassCard>
              <NeedsBlock id="booking" className="min-h-[200px]">
                <CalendarDays className="size-6 text-amber-300/80" aria-hidden />
                <p className="text-xs text-white/45">A booking calendar embeds here once the link is supplied.</p>
              </NeedsBlock>
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
          <Testimonial quote={testimonials[1]} className="mx-auto w-full max-w-[900px]" />
        </Container>
      </Section>
    </>
  );
}
