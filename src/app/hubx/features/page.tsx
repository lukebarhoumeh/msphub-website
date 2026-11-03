import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/hubx/breadcrumbs";
import { NextStep } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
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

const moduleGroups = [
  { title: "See the estate", slugs: ["home", "dashboards-reports", "service-desk"] },
  { title: "Buy and renew", slugs: ["customers", "catalog", "quotations", "billing"] },
  { title: "Ask and administer", slugs: ["hubai", "administration"] },
] as const;

export default function HubxFeaturesPage() {
  const { hero, modules, cta } = hubxFeaturesPage;
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

      <section className="bg-[#0b1020] pb-10 text-white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "HubX", href: "/hubx" },
              { label: "Features", href: "/hubx/features" },
            ]}
          />
        </Container>
      </section>

      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow={modules.eyebrow} title={modules.title} lead={modules.lead} />
          <div className="grid gap-12 lg:grid-cols-3">
            {moduleGroups.map((group) => (
              <section key={group.title}>
                <h3 className="border-t border-[#0b1020]/15 pt-4 font-display text-2xl font-bold">{group.title}</h3>
                <ul className="mt-4 grid">
                  {group.slugs.map((slug) => {
                    const feature = hubxModules.find((item) => item.slug === slug);
                    if (!feature) return null;
                    return (
                      <li key={slug}>
                        <Link href={feature.href} className="flex min-h-12 items-center text-[17px] font-semibold underline decoration-[#f97316] decoration-2 underline-offset-[5px]">
                          {feature.name}
                        </Link>
                        <p className="mb-3 max-w-[36ch] text-[15px] leading-relaxed text-[#4b5569]">{feature.summary}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <NextStep
        tone="ink"
        eyebrow={cta.eyebrow}
        title={cta.title}
        lead={cta.lead}
        primary={{ label: "Schedule a demo", href: "/demo" }}
        secondary={[{ label: "HubX security", href: "/hubx/security" }]}
      />
    </>
  );
}
