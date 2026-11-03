import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/hubx/breadcrumbs";
import { FeatureGrid } from "@/components/hubx/feature-grid";
import { HubAiConversation } from "@/components/hubx/hubai-conversation";
import { ModuleCard } from "@/components/hubx/module-card";
import { HubxPathChip, PointList } from "@/components/hubx/primitives";
import { EvidenceFigure } from "@/components/ink/evidence";
import { Chapter, InkLink, NextStep, inkTone, monoLabel } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { hubAiBoundaries } from "@/content/hubai-demo";
import { hubxFeatureTemplate, hubxLockup } from "@/content/hubx";
import { featuresForModule } from "@/content/hubx-features";
import { adjacentModules, featureSlugs, getModule, type HubxModule } from "@/content/hubx-modules";
import { captures, moduleEvidence } from "@/content/evidence";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

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
  const evidence = (moduleEvidence[mod.slug] ?? []).map((id) => captures[id]);
  const spotlight = featuresForModule(mod.slug);
  const { prev, next } = adjacentModules(mod.slug);
  const crumbs = [
    { label: "HubX", href: "/hubx" },
    { label: "Features", href: "/hubx/features" },
    { label: mod.name, href: mod.href },
  ];

  return (
    <>
      <PageHero eyebrow={`${mod.name} · ${hubxLockup}`} title={mod.headline} lead={mod.summary}>
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

      <section className="bg-[#0b1020] pb-10 text-white">
        <Container>
          <Breadcrumbs items={crumbs} />
        </Container>
      </section>

      {/* Real screens, pearl canvas */}
      <Chapter tone="pearl" eyebrow={t.screens.eyebrow} title={t.screens.title}>
        <div className="grid gap-12 lg:grid-cols-2">
          {evidence.map((capture) => (
            <EvidenceFigure key={capture.id} capture={capture} tone="pearl" />
          ))}
        </div>
        {mod.slug === "customers" ? (
          <div className="mt-12 border-t border-[#0b1020]/10 pt-8">
            <p className={cn(monoLabel, inkTone.pearl.faint)}>Illustrative — not product UI</p>
            <h3 className="mt-3 font-display text-2xl font-bold">GDAP and partner-to-partner transfer</h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "The customer accepts the reseller relationship from a link.",
                "Admin access is granted through a GDAP relationship HubX can show.",
                "Subscriptions move by partner-to-partner transfer inside Microsoft’s window.",
                "Terms and renewal dates carry over. Nothing is re-bought.",
              ].map((step, index) => (
                <li key={step} className="text-[15px] leading-relaxed">
                  <span className={cn(monoLabel, "mr-2", inkTone.pearl.faint)}>{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        {mod.slug === "quotations" ? (
          <div className="mt-12 border-t border-[#0b1020]/10 pt-8">
            <p className={cn(monoLabel, inkTone.pearl.faint)}>Illustrative — not product UI</p>
            <h3 className="mt-3 font-display text-2xl font-bold">Quote, approve, cart, order</h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-4">
              {["Quote", "Approve", "Cart", "Order"].map((step, index) => (
                <li key={step} className="border-t border-[#0b1020]/15 pt-3 font-display text-xl font-bold">
                  <span className={cn(monoLabel, "mr-2 font-medium", inkTone.pearl.faint)}>{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        {mod.slug === "catalog" ? (
          <p className={cn("mt-8 max-w-[68ch] text-[16px] leading-relaxed", inkTone.pearl.muted)}>
            Qualification and term filters live above the listing in HubX. This crop opens on the product listing itself. The public catalog line stays
            7,600+.
          </p>
        ) : null}
        {mod.slug === "service-desk" ? (
          <p className={cn("mt-8 max-w-[68ch] text-[16px] leading-relaxed", inkTone.pearl.muted)}>
            Service Desk tickets show priority and SLA state to the customer and the partner. Licensing and billing support stays business hours. 24/7
            applies only to monitoring and incident management for managed environments.
          </p>
        ) : null}
        {mod.slug === "hubai" ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 [&>*]:min-w-0">
            <HubAiConversation tone="light" />
            <div className="border-t border-[#0b1020]/15 pt-5">
              <p className={cn(monoLabel, inkTone.pearl.faint)}>{hubAiBoundaries.title}</p>
              <p className={cn("mt-3 max-w-[46ch] text-[16px] leading-[1.65]", inkTone.pearl.muted)}>{hubAiBoundaries.body}</p>
            </div>
          </div>
        ) : null}
      </Chapter>

      {/* Capabilities */}
      <Chapter tone="ink" eyebrow={t.capabilities.eyebrow} title={t.capabilities.title} headingWidth="max-w-[20ch]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="border-t border-white/15 pt-6 lg:col-span-7">
            <PointList items={mod.bullets} />
          </div>
          <div className="grid content-start gap-8 lg:col-span-5">
            {mod.aside ? (
              <div className="border-t border-white/15 pt-5">
                <p className={cn(monoLabel, inkTone.ink.faint)}>{mod.aside.title}</p>
                <p className={cn("mt-3 text-[16px] leading-[1.65]", inkTone.ink.muted)}>{mod.aside.body}</p>
              </div>
            ) : null}
            <div className="border-t border-white/15 pt-5">
              <p className={cn(monoLabel, inkTone.ink.faint)}>Where it lives</p>
              <p className={cn("mt-3 text-[16px] leading-[1.65]", inkTone.ink.muted)}>
                In the HubX top navigation, with every table exportable to CSV and per-page help one click away.
              </p>
              <HubxPathChip path={mod.hubxPath} className="mt-4" />
            </div>
          </div>
        </div>
      </Chapter>

      {/* Spotlighted capabilities, anchored so the twelve-tile grid can deep-link here */}
      {spotlight.length > 0 ? (
        <Chapter tone="ink" pad="tight" eyebrow={t.spotlight.eyebrow} title={t.spotlight.title} headingWidth="max-w-[20ch]">
          <FeatureGrid features={spotlight} columns={2} anchors className="max-w-[960px]" />
        </Chapter>
      ) : null}

      {/* Related modules */}
      <Chapter tone="pearl" size="md" eyebrow={t.related.eyebrow} title={t.related.title}>
        <div className="grid gap-10 md:grid-cols-2">
          {prev ? <ModuleCard module={prev} label="Previous" /> : null}
          {next ? <ModuleCard module={next} label="Next" /> : null}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <ButtonLink href="/hubx/features" variant="outline" size="sm">
            <ArrowLeft className="size-4" aria-hidden />
            All features
          </ButtonLink>
          <InkLink href={`/hubx#module-${mod.slug}`} tone="pearl">
            See it on the HubX overview
          </InkLink>
        </div>
      </Chapter>

      <NextStep tone="ink" eyebrow={t.cta.eyebrow} title={t.cta.title} lead={t.cta.lead} primary={{ label: "Schedule a demo", href: "/demo" }} secondary={[{ label: "Talk to sales", href: "/contact" }]} />
    </>
  );
}
