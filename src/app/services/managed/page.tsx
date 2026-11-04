import type { Metadata } from "next";
import { Activity, ArrowRight, Cloud, Database, Headset, Laptop, TicketCheck, type LucideIcon } from "lucide-react";
import { DeviceFrame } from "@/components/ink/device-frame";
import { Parallax } from "@/components/ink/flow";
import { Chapter, FactRows, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { Spotlight } from "@/components/ink/motion";
import { WideOnly } from "@/components/ink/wide-only";
import { SupportModel } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { PairsWithHubX } from "@/components/marketing/pairs-with-hubx";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceInquiry } from "@/components/services/service-inquiry";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm, showTodos } from "@/components/ui/needs-confirm";
import { serviceSchema } from "@/lib/schema";
import { captures, truthLabel } from "@/content/evidence";
import { managed } from "@/content/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Managed services — Microsoft 365, Azure, and database operations run to agreed SLAs",
  description:
    "MSP Hub managed services: around-the-clock monitoring, alerting, and incident management for managed environments across Microsoft 365, Azure, and databases, run to agreed SLAs with direct Microsoft escalation.",
  alternates: { canonical: "/services/managed" },
};

/** One neutral 16 px icon per offering, set inside its mono label: no orange tiles. */
const icons: readonly LucideIcon[] = [Cloud, Laptop, Database, Activity, TicketCheck, Headset];

const offerings = managed.offerings.map((offering, index) => {
  const Icon = icons[index % icons.length];
  return {
    title: offering.title,
    body: offering.body,
    label: (
      <span className="inline-flex items-center gap-2">
        <Icon className="size-4" strokeWidth={1.8} aria-hidden />
        {String(index + 1).padStart(2, "0")}
      </span>
    ),
  };
});

/** Browser chrome around a capture: two 1 px borders and the 36 px route bar. */
const FRAME_CHROME = 38;

/**
 * The hero object (spec §5): Service Desk in HubX, the home widgets crop in a
 * browser frame. `WideOnly` mounts it on desktops only, so phones never fetch
 * the priority image. The box reserves the frame's exact height at any width
 * (the crop's aspect plus the chrome) and the frame mounts absolutely inside
 * it, so nothing shifts when it appears.
 */
function ServiceDeskFrame() {
  const { crop } = captures.homeWidgets;
  const ratio = crop.height / crop.width;
  // The crop sits inside the 1 px side borders, so its width is the box width less 2 px.
  const reserve = `calc(${ratio * 100}% + ${FRAME_CHROME - 2 * ratio}px)`;
  return (
    <div>
      <figure className="ml-auto w-full max-w-[420px]">
        <div className="relative" style={{ paddingTop: reserve }}>
          <WideOnly className="absolute inset-x-0 top-0">
            <Parallax range={24}>
              <Spotlight className="tilt tilt-hero rounded-[18px]">
                <DeviceFrame variant="browser" capture={captures.homeWidgets} path="/" priority />
              </Spotlight>
            </Parallax>
          </WideOnly>
        </div>
        <figcaption className={cn(monoLabel, "mt-3", inkTone.ink.muted)}>Service Desk in HubX · {truthLabel}</figcaption>
      </figure>
    </div>
  );
}

export default function ManagedServicesPage() {
  // The commercial model ships hidden until Luke supplies one line (spec §12 #2); review builds show the open decision.
  const agreement = showTodos ? [...managed.facts, { label: "Commercial model", value: <NeedsConfirm id="managedPricingModel" fallback={null} /> }] : managed.facts;
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Services · Managed services"
        title={managed.headline}
        lead={managed.lead}
        facts={managed.heroFacts}
        anchors={managed.anchors}
        aside={<ServiceDeskFrame />}
        asideBelowLg={false}
      >
        <ButtonLink href="#inquiry">
          Start a service inquiry
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="#how-it-runs" variant="glass">
          How it runs
        </ButtonLink>
      </PageHero>

      <Chapter spine="01" tone="ink" pad="flush-top" id="what-we-run" title="The environments we operate for you.">
        <RuleList tone="ink" columns={3} titleSize="md" items={offerings} />
      </Chapter>

      <Chapter spine="02" tone="pearl" id="how-it-runs" title="Monitor, respond, report, optimize.">
        <RuleList tone="pearl" numbered columns={4} titleSize="md" items={managed.howItWorks} />
        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <h3 className={cn(monoLabel, "lg:col-span-4 lg:pt-5", inkTone.pearl.muted)}>The agreement</h3>
          <FactRows tone="pearl" rows={agreement} className="lg:col-span-8" />
        </div>
      </Chapter>

      <Chapter spine="03" tone="pearl" pad="tight" id="support" title="What is 24/7, and what is business hours.">
        <SupportModel tone="light" variant="rule" />
      </Chapter>

      <section id="hubx" data-surface="ink" className="relative scroll-mt-24 pb-[clamp(64px,7vw,104px)]">
        <PairsWithHubX body="Licenses and operations in one relationship. The tenants we run are the tenants you see in HubX, with renewals, invoices, and support tickets in the same place." />
      </section>

      <ServiceInquiry branch="managed" title={managed.inquiry.title} lead={managed.inquiry.lead} />
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
