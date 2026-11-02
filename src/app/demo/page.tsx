import { HubXLockup } from "@/components/brand/hubx-logo";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckList, Testimonials, TrustStrip } from "@/components/marketing/blocks";
import { BookingsEmbed } from "@/components/marketing/bookings-embed";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { GlassCard } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Schedule a HubX demo",
  description:
    "See HubX, powered by MSP Hub, in 30 minutes: a live walkthrough of the Microsoft portal with your tenant scenario and your licensing questions.",
  path: "/demo",
});

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
        <Container className="grid gap-6">
          <BookingsEmbed
            title="Pick a time"
            lead="Book a 30-minute HubX demo straight into the sales-engineering calendar."
            fallbackNote="Prefer not to use the calendar? The request form below reaches the same team and we confirm a time within one business day."
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
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
            <div className="glass glass-lg p-7 sm:p-10">
              <Display size="md" className="mb-2">
                Request a demo
              </Display>
              <Lead className="mb-7 text-base">Tell us who you are and when works. We confirm a time within one business day.</Lead>
              <LeadForm kind="demo" />
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

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "HubX", path: "/hubx" },
          { name: "Schedule a demo", path: "/demo" },
        ])}
      />
    </>
  );
}
