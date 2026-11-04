import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubAiConversation } from "@/components/hubx/hubai-conversation";
import { EvidenceFigure } from "@/components/ink/evidence";
import { Parallax } from "@/components/ink/flow";
import { Chapter, DotList, InkLink, RuleList, inkTone, monoLabel } from "@/components/ink/interior";
import { Spotlight } from "@/components/ink/motion";
import { PageHero } from "@/components/marketing/page-hero";
import { PairsWithHubX } from "@/components/marketing/pairs-with-hubx";
import { JsonLd } from "@/components/seo/json-ld";
import { MethodPinned } from "@/components/services/method-pinned";
import { ServiceInquiry } from "@/components/services/service-inquiry";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { NeedsConfirmBlock, showTodos } from "@/components/ui/needs-confirm";
import { serviceSchema } from "@/lib/schema";
import { captures } from "@/content/evidence";
import { hubAiSuggestedPrompts } from "@/content/hubai-demo";
import { hubxPage } from "@/content/hubx";
import { development } from "@/content/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Development as a service — applications, DevOps, and AI development",
  description:
    "MSP Hub development as a service: custom .NET and cloud-native applications, CI/CD and infrastructure as code, and AI development from Copilot rollouts to purpose-built agents.",
  alternates: { canonical: "/services/development" },
};

/**
 * The hero object (spec §4). From lg, the real HubAI conversation, first
 * question only, server-rendered and shown with CSS: it carries no image
 * bytes, so there is nothing to defer, and it is in the first paint instead
 * of mounting into a reserved box and shifting the hero. It renders at 90 %
 * (`zoom` scales layout, like the product UI in the device frames) so the
 * object stays about 470 px tall and chapter 01 starts above the fold at
 * 1440 × 900. Below lg, a strip of the questions HubAI answers, each a jump
 * to the full transcript in chapter 03.
 */
function HubAiTeaser() {
  return (
    <>
      <div className="hidden lg:block">
        <Parallax range={24}>
          <Spotlight className="tilt tilt-hero rounded-[18px]">
            <HubAiConversation tone="dark" turns={1} compact className="[zoom:0.9]" />
          </Spotlight>
        </Parallax>
        <div className="mt-3 flex">
          {/* Neutral underline: the question bubble and the primary button already carry this viewport's orange (the mark is white here). */}
          <Link href="/hubx/features/hubai" className="link-draw inline-flex min-h-11 items-center font-semibold text-white [--ul:rgba(255,255,255,.35)]">
            See the full HubAI demo
          </Link>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="-mx-[var(--page-pad)] overflow-x-auto px-[var(--page-pad)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max items-center gap-2">
            <p id="ask-hubai" className={cn(monoLabel, "inline-flex shrink-0 items-center gap-1.5 pr-1", inkTone.ink.faint)}>
              Ask HubAI
              <ArrowRight className="size-3.5" aria-hidden />
            </p>
            <ul aria-labelledby="ask-hubai" className="flex items-center gap-2">
              {hubAiSuggestedPrompts.map((prompt) => (
                <li key={prompt}>
                  {/* The row scrolls, so the focus ring sits inside the chip where the scroller cannot clip it. */}
                  <a
                    href="#hubai"
                    className={cn("inline-flex h-11 items-center rounded-full border px-4 text-[13.5px] font-medium whitespace-nowrap hover:bg-white/10 focus-visible:outline-offset-[-3px]!", inkTone.ink.chip)}
                  >
                    {prompt}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DevelopmentServicesPage() {
  return (
    <>
      <PageHero
        tone="dark"
        art="ai-inference-lattice"
        eyebrow="Services · Development & AI"
        title={development.headline}
        lead={development.lead}
        facts={development.heroFacts}
        anchors={development.anchors}
        aside={<HubAiTeaser />}
      >
        <ButtonLink href="#inquiry">
          Start a project
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="#method" variant="glass">
          How a project runs
        </ButtonLink>
      </PageHero>

      <Chapter spine="01" tone="ink" pad="flush-top" id="tracks" title="Applications, DevOps, and AI.">
        <RuleList
          tone="ink"
          columns={3}
          items={development.tracks.map((track) => ({
            title: track.title,
            children: <DotList tone="ink" size="sm" marker="neutral" items={track.items} />,
          }))}
        />
      </Chapter>

      <Chapter spine="02" tone="pearl" id="method" title="Discover, build, ship, improve.">
        <MethodPinned stages={development.method} loop={development.loop} />
      </Chapter>

      <Chapter spine="03" tone="pearl" pad="tight" id="hubai" eyebrow={development.hubai.eyebrow} title={development.hubai.title} lead={hubxPage.hubai.lead}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <HubAiConversation tone="light" />
          <div>
            <EvidenceFigure capture={captures.hubaiHome} tone="pearl" accent={false} />
            <div className="mt-2 flex">
              <InkLink href="/hubx/features/hubai" tone="pearl" underline="neutral">
                {development.hubai.link}
              </InkLink>
            </div>
          </div>
        </div>
      </Chapter>

      {/* Review builds only, so production never renders an empty section. */}
      {showTodos ? (
        <Chapter tone="ink" id="products" size="md" eyebrow="Platform engineering heritage" title="Software we built and run ourselves.">
          <NeedsConfirmBlock id="devProducts" fallback={null}>
            <div className="grid gap-4 md:grid-cols-3">
              {development.products.map((product) => (
                <GlassCard key={product.name}>
                  <p className="font-display text-2xl text-white">{product.name}</p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{product.body}</p>
                </GlassCard>
              ))}
            </div>
          </NeedsConfirmBlock>
        </Chapter>
      ) : null}

      <section id="hubx" data-surface="ink" className="relative scroll-mt-24 pb-[clamp(64px,7vw,104px)]">
        <PairsWithHubX body="Copilot rollouts, Power Platform automation, and custom AI tools run on licenses you can buy, assign, and track in HubX." />
      </section>

      <ServiceInquiry branch="development" title={development.inquiry.title} lead={development.inquiry.lead} />
      <JsonLd
        data={serviceSchema({
          name: "Development as a service",
          description: metadata.description!,
          path: "/services/development",
          serviceType: "Application development, DevOps, and AI development",
        })}
      />
    </>
  );
}
