import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { AudienceBand } from "@/components/ink/audience-band";
import { SpineMark } from "@/components/ink/canvas";
import { EngineTile } from "@/components/ink/cards";
import { InkLink, chapterTitle, chapterTitleSm, inkTone, itemTitle, reveal, type InkTone } from "@/components/ink/interior";
import { SupportModel } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceInquiry, type ServiceBranch } from "@/components/services/service-inquiry";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { branchOptions } from "@/content/forms";
import { homeEngines } from "@/content/home";
import { servicesIndex } from "@/content/services";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services — professional, managed, and development services for Microsoft estates",
  description:
    "Professional, managed, and development services for Microsoft estates, with licensing from the same team and every subscription visible in HubX.",
  alternates: { canonical: "/services" },
};

const licensing = {
  name: "Licensing",
  href: "/licensing",
  description: "Microsoft 365, Azure, Copilot, Dynamics 365, and the rest of the catalog, bought direct from a CSP direct-bill partner. Existing subscriptions transfer. Terms carry over.",
};

const anchors = [
  { label: "Services", href: "#engines" },
  { label: "Who we serve", href: "#audiences" },
  { label: "Support", href: "#support" },
  { label: "Start", href: "#inquiry" },
] as const;

function isServiceBranch(value: string): value is ServiceBranch {
  return branchOptions.some((option) => option.value === value);
}

/** Reads `?branch=` at request time; isolated so the rest of the page prerenders (the `/contact` `?topic=` pattern). */
async function ServicesInquiryForm({ searchParams }: { searchParams: PageProps<"/services">["searchParams"] }) {
  const params = await searchParams;
  const requested = typeof params.branch === "string" ? params.branch : undefined;
  const branch = requested && isServiceBranch(requested) ? requested : undefined;
  return <LeadForm kind="service" defaultValues={branch ? { branches: [branch] } : undefined} />;
}

type IndexChapterProps = {
  /** Spine numeral. */
  n: string;
  id: string;
  tone: InkTone;
  title: string;
  size?: "lg" | "md";
  headingWidth?: string;
  pad?: "normal" | "flush-top";
  children: ReactNode;
};

/**
 * `Chapter` plus a spine numeral. `.spine-mark` is positioned from the
 * viewport edge, so the numeral must be the section's own child, and
 * `Chapter` renders everything inside its container; this mirrors its
 * markup one level up.
 */
function IndexChapter({ n, id, tone, title, size = "lg", headingWidth = "max-w-[22ch]", pad = "normal", children }: IndexChapterProps) {
  const t = inkTone[tone];
  return (
    <section id={id} data-surface={tone} className={cn("relative scroll-mt-24 overflow-x-clip", t.ground, pad === "normal" ? "py-[clamp(64px,7vw,104px)]" : "pt-0 pb-[clamp(48px,5vw,72px)]")}>
      <SpineMark n={n} />
      <Container className="relative">
        <h2 data-reveal style={reveal(60)} className={cn(size === "lg" ? chapterTitle : chapterTitleSm, headingWidth, "text-balance")}>
          {title}
        </h2>
        <div className="mt-10 lg:mt-12">{children}</div>
      </Container>
    </section>
  );
}

export default function ServicesPage({ searchParams }: PageProps<"/services">) {
  const hubx = homeEngines[0];
  const practices = homeEngines.slice(1);
  return (
    <>
      <PageHero
        tone="dark"
        art="four-engine-refraction"
        eyebrow="Services"
        title="Three practices, plus licensing."
        lead="Plan and deliver the change, run what comes next, and build what the estate still needs, from the team that also holds your licensing. Every project starts from your estate as it actually is, in HubX."
        anchors={anchors}
      >
        <ButtonLink href="#inquiry">Start a service inquiry</ButtonLink>
        <ButtonLink href="/licensing" variant="glass">
          Licensing
        </ButtonLink>
      </PageHero>

      <IndexChapter n="01" id="engines" tone="pearl" pad="flush-top" title="Four engines. One accountable partner." headingWidth="max-w-[18ch]">
        <div className="grid gap-4">
          <div data-reveal="scale" style={reveal(80)}>
            <EngineTile {...hubx} wide />
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {practices.map((engine, index) => (
              <div key={engine.id} data-reveal style={reveal(160 + index * 70)}>
                <EngineTile {...engine} className="h-full" accent={false} />
              </div>
            ))}
          </div>
        </div>
        <div data-reveal className={cn("mt-10 grid gap-x-8 gap-y-3 border-t pt-6 lg:grid-cols-[180px_minmax(0,1fr)_auto] lg:items-center", inkTone.pearl.rule)}>
          <h3 className={itemTitle}>{licensing.name}</h3>
          <p className={cn("max-w-[68ch] text-[16px] leading-[1.65]", inkTone.pearl.muted)}>{licensing.description}</p>
          <InkLink href={licensing.href} tone="pearl" underline="neutral">
            Explore licensing
          </InkLink>
        </div>
      </IndexChapter>

      <IndexChapter n="02" id="audiences" tone="ink" title="Which of these are you?" headingWidth="max-w-[14ch]">
        <AudienceBand variant="rows" tone="ink" eyebrow={null} />
      </IndexChapter>

      <IndexChapter n="03" id="support" tone="pearl" size="md" title="Business hours for licensing and billing. Around the clock for managed environments." headingWidth="max-w-[26ch]">
        <SupportModel tone="light" variant="rule" />
      </IndexChapter>

      <ServiceInquiry
        title={servicesIndex.inquiry.title}
        lead={servicesIndex.inquiry.lead}
        form={
          <Suspense fallback={<LeadForm kind="service" />}>
            <ServicesInquiryForm searchParams={searchParams} />
          </Suspense>
        }
      />
    </>
  );
}
