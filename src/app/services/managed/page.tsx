import type { Metadata } from "next";
import { ArrowRight, Activity, Cloud, Database, Headset, Laptop, MonitorSmartphone, TicketCheck } from "lucide-react";
import { RuleList } from "@/components/ink/interior";
import { CtaBand, SupportModel } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { PairsWithHubX } from "@/components/marketing/pairs-with-hubx";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/card";
import { Container, Glow, Section } from "@/components/ui/section";
import { serviceSchema } from "@/lib/schema";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { managed } from "@/content/services";

export const metadata: Metadata = {
  title: "Managed services — Microsoft 365, Azure, and database operations run to agreed SLAs",
  description:
    "MSP Hub managed services: around-the-clock monitoring, alerting, and incident management for managed environments across Microsoft 365, Azure, and databases, run to agreed SLAs with direct Microsoft escalation.",
  alternates: { canonical: "/services/managed" },
};

const icons = [Cloud, Laptop, Database, Activity, TicketCheck, Headset, MonitorSmartphone];

export default function ManagedServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services · Managed services" title={managed.headline} lead={managed.lead}>
        <ButtonLink href="/services#inquiry">
          Start a service inquiry
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/services" variant="glass">
          All services
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 left-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="What we run" title="The environments we operate for you." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {managed.offerings.map((o, i) => (
              <FeatureCard key={o.title} icon={icons[i]} title={o.title}>
                {o.body}
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="How it runs" title="Monitor, respond, report, optimize." />
          <RuleList tone="ink" numbered columns={4} titleSize="md" items={managed.howItWorks} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="glass glass-lg p-8 text-center sm:p-12">
            <Eyebrow className="before:hidden">SLAs and reporting</Eyebrow>
            <Display className="mx-auto mt-3.5 max-w-[22ch]">Managed operations run to agreed SLAs.</Display>
            <Lead className="mx-auto mt-4">
              Managed environments are monitored around the clock, with response and resolution targets agreed up front
              and reported monthly, so you always know what was handled, how fast, and what to fix next.
            </Lead>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <SectionHeading eyebrow="Support model" title="What is 24/7, and what is business hours." />
          <SupportModel />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <PairsWithHubX body="Licenses and operations in one relationship. The tenants we run are the tenants you see in HubX, with renewals, invoices, and support tickets in the same place." />
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Hand over the day-to-day."
          lead="Tell us what you run today and what keeps paging your team. We propose scope, SLAs, and a transition plan."
          primary={{ label: "Start a service inquiry", href: "/services#inquiry" }}
          secondary={[{ label: "Contact sales", href: "/contact" }]}
        />
      </Section>
      <JsonLd
        data={serviceSchema({
          name: "Managed services",
          description: metadata.description!,
          path: "/services/managed",
          serviceType: "Managed services for Microsoft 365, Azure, and database environments",
        })}
      />
    </>
  );
}
