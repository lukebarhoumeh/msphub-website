import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/hubx/breadcrumbs";
import { FeatureGrid } from "@/components/hubx/feature-grid";
import { HubAiConversation } from "@/components/hubx/hubai-conversation";
import { ModuleCard } from "@/components/hubx/module-card";
import { HubxPathChip, PointList, ToneLink } from "@/components/hubx/primitives";
import { ScreenshotCarousel } from "@/components/hubx/screenshot-carousel";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { CtaBand } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { Container, Glow, Section } from "@/components/ui/section";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";
import { hubAiBoundaries } from "@/content/hubai-demo";
import { hubxFeatureTemplate, hubxLockup } from "@/content/hubx";
import { featuresForModule } from "@/content/hubx-features";
import { adjacentModules, featureSlugs, getModule, type HubxModule } from "@/content/hubx-modules";
import { screens } from "@/content/screens";
import { site } from "@/content/site";

type Params = { module: string };

/** Fully static: an unknown slug renders the 404 (with its status) instead of streaming a shell first. */
export const ensureStatic = "navigation";

export function generateStaticParams(): Params[] {
  return featureSlugs.map((slug) => ({ module: slug }));
}

function resolveModule(slug: string): HubxModule {
  const mod = getModule(slug);
  if (!mod || !mod.href.startsWith("/hubx/features/")) notFound();
  return mod;
}

export async function generateMetadata({ params }: PageProps<"/hubx/features/[module]">): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = resolveModule(slug);
  return {
    title: `${mod.name} — HubX features`,
    description: mod.description,
    alternates: { canonical: mod.href },
  };
}

export default async function HubxFeaturePage({ params }: PageProps<"/hubx/features/[module]">) {
  const { module: slug } = await params;
  const mod = resolveModule(slug);
  const t = hubxFeatureTemplate;
  const moduleScreens = mod.screens.map((id) => screens[id]);
  const spotlight = featuresForModule(mod.slug);
  const { prev, next } = adjacentModules(mod.slug);
  const crumbs = [
    { label: "HubX", href: "/hubx" },
    { label: "Features", href: "/hubx/features" },
    { label: mod.name, href: mod.href },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${mod.name} · ${hubxLockup}`}
        title={mod.headline}
        lead={mod.summary}
      >
        <ButtonLink href="/demo">
          Schedule a demo
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={site.hubxLoginUrl} variant="glass">
          Log in to HubX
        </ButtonLink>
        <span className="inline-flex h-12 items-center">
          <HubxPathChip path={mod.hubxPath} />
        </span>
      </PageHero>

      <Section tight className="pt-0 sm:pt-0">
        <Container>
          <Breadcrumbs items={crumbs} />
        </Container>
      </Section>

      {/* Real screens, light canvas */}
      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow={t.screens.eyebrow} title={t.screens.title} />
          {moduleScreens.length > 1 ? (
            <ScreenshotCarousel screens={moduleScreens} label={`${mod.name} screens`} priorityFirst />
          ) : (
            <BrowserFrame screen={moduleScreens[0]} priority viewport="scroll" sizes="(min-width: 1280px) 1100px, 100vw" />
          )}
          {mod.slug === "hubai" ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 [&>*]:min-w-0">
              <HubAiConversation tone="light" />
              <div className="card-light p-6 sm:p-7">
                <Eyebrow tone="light">{hubAiBoundaries.title}</Eyebrow>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal/85">{hubAiBoundaries.body}</p>
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* Capabilities */}
      <Section decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow={t.capabilities.eyebrow} title={t.capabilities.title} />
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <GlassCard className="p-7 sm:p-8">
              <PointList items={mod.bullets} />
            </GlassCard>
            <div className="grid content-start gap-4">
              {mod.aside ? (
                <GlassCard>
                  <Eyebrow>{mod.aside.title}</Eyebrow>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/75">{mod.aside.body}</p>
                </GlassCard>
              ) : null}
              <GlassCard>
                <Eyebrow>Where it lives</Eyebrow>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                  In the HubX top navigation, with every table exportable to CSV and per-page help one click away.
                </p>
                <HubxPathChip path={mod.hubxPath} className="mt-4" />
              </GlassCard>
            </div>
          </div>
        </Container>
      </Section>

      {/* Spotlighted capabilities, anchored so the twelve-tile grid can deep-link here */}
      {spotlight.length > 0 ? (
        <Section className="pt-0 sm:pt-0 lg:pt-0">
          <Container>
            <SectionHeading eyebrow={t.spotlight.eyebrow} title={t.spotlight.title} />
            <FeatureGrid features={spotlight} columns={2} anchors className="max-w-[860px]" />
          </Container>
        </Section>
      ) : null}

      {/* Related modules */}
      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow={t.related.eyebrow} title={t.related.title} />
          <div className="grid gap-4 md:grid-cols-2">
            {prev ? <ModuleCard module={prev} thumbnail={false} /> : null}
            {next ? <ModuleCard module={next} thumbnail={false} /> : null}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <ButtonLink href="/hubx/features" size="sm">
              <ArrowLeft className="size-4" aria-hidden />
              All features
            </ButtonLink>
            <ToneLink href={`/hubx#module-${mod.slug}`} tone="light">
              See it on the HubX overview
            </ToneLink>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          eyebrow={t.cta.eyebrow}
          title={t.cta.title}
          lead={t.cta.lead}
          primary={{ label: "Schedule a demo", href: "/demo" }}
          secondary={[{ label: "Talk to sales", href: "/contact" }]}
        />
      </Section>
    </>
  );
}