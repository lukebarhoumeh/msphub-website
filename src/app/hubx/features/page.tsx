import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/hubx/breadcrumbs";
import { FeatureGrid } from "@/components/hubx/feature-grid";
import { ModuleCard } from "@/components/hubx/module-card";
import { CtaBand } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Glow, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/typography";
import { hubxFeaturesPage } from "@/content/hubx";
import { hubxModules } from "@/content/hubx-modules";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "HubX features — every module of the Microsoft portal",
  description:
    "What HubX does, module by module: home and performance, customers, catalog, quotations, billing and invoices, dashboards and reports, Service Desk, HubAI, and administration. Verified from the live product.",
  alternates: { canonical: "/hubx/features" },
};

export default function HubxFeaturesPage() {
  const { hero, modules, features, cta } = hubxFeaturesPage;
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
        <Container>
          <Breadcrumbs
            items={[
              { label: "HubX", href: "/hubx" },
              { label: "Features", href: "/hubx/features" },
            ]}
          />
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow={modules.eyebrow} title={modules.title} lead={modules.lead} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hubxModules.map((m) => (
              <ModuleCard key={m.slug} module={m} />
            ))}
          </div>
        </Container>
      </Section>

      <Section decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow={features.eyebrow} title={features.title} lead={features.lead} />
          <FeatureGrid columns={3} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          eyebrow={cta.eyebrow}
          title={cta.title}
          lead={cta.lead}
          primary={{ label: "Schedule a demo", href: "/demo" }}
          secondary={[{ label: "HubX security", href: "/hubx/security" }]}
        />
      </Section>
    </>
  );
}
