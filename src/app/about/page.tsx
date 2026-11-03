import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EngineSymbol } from "@/components/ink/engine-symbol";
import { Chapter, Milestones, NextStep, RuleList, StatRail, inkTone, itemTitle, monoLabel } from "@/components/ink/interior";
import { SolutionAreas, SupportModel, Testimonials } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm, showTodos } from "@/components/ui/needs-confirm";
import { Container } from "@/components/ui/section";
import { activeCredentials } from "@/content/credentials";
import { homeEngines } from "@/content/home";
import { companyStory, leadership, site, timeline } from "@/content/site";
import { publishedStats, stats } from "@/content/stats";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About MSP Hub — Microsoft CSP direct-bill partner and IT services company since 1999",
  description:
    "MSP Hub started in 1999 as ReadyNetworks. Today it is a Microsoft CSP direct-bill partner (Tier-1 Direct) and IT services company, and the team that built HubX.",
  alternates: { canonical: "/about" },
};

/** Credentials with an open confirmation stay off production until Luke confirms them. */
const credentials = activeCredentials.filter((c) => !c.confirm || showTodos);

export default function AboutPage() {
  const hidden = stats.filter((s) => !s.publish);
  return (
    <>
      <PageHero
        art="four-engine-refraction"
        eyebrow={`About MSP Hub · Since ${site.founded}`}
        title="One partner for licensing, cloud, security, AI, and managed operations."
        lead="MSP Hub is a Microsoft CSP direct-bill partner (Tier-1 Direct) and IT services company. We built HubX so IT, finance, and purchasing can see and control their Microsoft estate, and we staff the professional, managed, and development teams that run it."
      >
        <ButtonLink href="/contact">
          Contact us
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/partners" variant="glass">
          Partner with us
        </ButtonLink>
      </PageHero>

      <section aria-label="Company proof" className="bg-[#0b1020] pb-14 text-white">
        <Container>
          <StatRail tone="ink" items={publishedStats.map((s) => ({ id: s.id, value: `${s.value}${s.suffix ?? ""}`, label: s.label }))} />
          {hidden.map((s) => (
            <p key={s.id} className={cn("mt-3 text-[13px]", inkTone.ink.muted)}>
              <NeedsConfirm id={s.confirm ?? "servicesHeadcount"} fallback={null}>
                Hidden until confirmed: {s.value}
                {s.suffix} {s.label.toLowerCase()}.
              </NeedsConfirm>
            </p>
          ))}
        </Container>
      </section>

      <Chapter tone="pearl" title={companyStory.headline} headingWidth="max-w-[20ch]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="max-w-[58ch] text-[19px] leading-[1.55] font-medium">{companyStory.lead}</p>
            <div className="mt-6 grid max-w-[62ch] gap-5">
              {companyStory.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className={cn("text-[16px] leading-[1.65] lg:text-[17px]", inkTone.pearl.muted)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className={cn(monoLabel, inkTone.pearl.faint)}>Four sibling branches</p>
            <ul className="mt-4 grid">
              {homeEngines.map((engine) => (
                <li key={engine.id} className="flex items-center gap-4 border-t border-[#0b1020]/10 py-3">
                  <EngineSymbol engine={engine.id} />
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-xl font-bold tracking-[-0.01em]">{engine.name}</span>
                    {engine.meta ? <span className={cn(monoLabel, inkTone.pearl.faint)}>{engine.meta}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Chapter>

      <Chapter tone="ink" title="From an MSP's own tool to HubX." headingWidth="max-w-[16ch]">
        <Milestones
          tone="ink"
          items={timeline.map((t) => ({
            when: "confirm" in t ? <NeedsConfirm id={t.confirm} fallback={t.when} /> : t.when,
            title: t.title,
            body: t.body,
          }))}
        />
      </Chapter>

      <Chapter tone="ink" pad="tight" size="md" title="Certified, direct, and recognized.">
        <RuleList
          tone="ink"
          columns={3}
          titleSize="md"
          items={credentials.map((c) => ({
            id: `credential-${c.id}`,
            label: c.issuer === "microsoft" ? "Microsoft" : c.issuer === "iso" ? "Certification" : "Award",
            title: c.confirm ? <NeedsConfirm id={c.confirm} fallback={null}>{c.name}</NeedsConfirm> : c.name,
            body: c.qualifier,
            children: c.logo ? (
              <Image src={c.logo} alt="" width={960} height={540} className="h-16 w-auto rounded-lg object-cover" />
            ) : undefined,
          }))}
        />
        <SolutionAreas className="mt-10" />
      </Chapter>

      <Chapter tone="pearl" size="md" title="Business hours for licensing. Around the clock for managed environments." headingWidth="max-w-[26ch]">
        <SupportModel tone="light" variant="rule" />
      </Chapter>

      <Chapter tone="pearl" pad="tight" title="The team driving MSP Hub's platform, partner channel, and Microsoft cloud delivery." headingWidth="max-w-[26ch]">
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {leadership.map((person) => (
            <li key={person.slug} className="flex flex-col border-t border-[#0b1020]/15 pt-5">
              <Image
                src={person.photo}
                alt={`${person.name}, ${person.title}`}
                width={360}
                height={360}
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 45vw, 90vw"
                className="aspect-square w-full rounded-[12px] object-cover"
              />
              <p className={cn(monoLabel, "mt-5", inkTone.pearl.faint)}>{person.title}</p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.01em]">{person.name}</h3>
              <p className={cn("mt-2 text-[15px] leading-[1.6]", inkTone.pearl.muted)}>{person.bio}</p>
            </li>
          ))}
        </ul>
        <p className={cn("mt-6 text-[13px]", inkTone.pearl.faint)}>
          <NeedsConfirm id="teamPhotos" fallback={null}>
            Portraits cropped from the leadership slide; hi-res originals to follow.
          </NeedsConfirm>{" "}
          <NeedsConfirm id="leadership" fallback={null} />
        </p>
      </Chapter>

      <Chapter tone="pearl" pad="tight">
        <div className="grid gap-10 border-t border-[#0b1020]/15 pt-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className={cn(monoLabel, inkTone.pearl.faint)}>Locations</p>
            <h2 className={cn(itemTitle, "mt-3")}>Headquartered in {site.hq.city}.</h2>
            <p className={cn("mt-3 max-w-[46ch] text-[16px] leading-[1.65]", inkTone.pearl.muted)}>
              <NeedsConfirm id="deliveryRegions" fallback={`Teams across ${site.deliveryRegions[0]}, ${site.deliveryRegions[1]}, and ${site.deliveryRegions[2]}.`} />
            </p>
            <p className={cn("mt-3 text-[14px]", inkTone.pearl.faint)}>
              <NeedsConfirm id="officePresentation" fallback={null}>
                Full address shown in the footer and legal pages only.
              </NeedsConfirm>
            </p>
          </div>
          <div>
            <p className={cn(monoLabel, inkTone.pearl.faint)}>Heritage</p>
            <h2 className={cn(itemTitle, "mt-3")}>Formerly READY Networks.</h2>
            <p className={cn("mt-3 max-w-[46ch] text-[16px] leading-[1.65]", inkTone.pearl.muted)}>
              The ReadyNetworks name carried the company from 1999 to the July 2025 rebrand. The people, the Microsoft relationship, and the platform
              engineering continue as MSP Hub.
            </p>
          </div>
        </div>
        <Testimonials className="mt-10" />
      </Chapter>

      <NextStep
        tone="ink"
        title="One inbox, a real reply."
        lead="Partners, customers, advisors, and press all reach the same team."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={[{ label: "Schedule a HubX demo", href: "/demo" }]}
      >
        <p className={cn("mt-6 text-[15px]", inkTone.ink.muted)}>
          <a href={`mailto:${site.salesEmail}`} className="font-semibold text-white underline decoration-[#ffb05c] decoration-2 underline-offset-[5px]">
            {site.salesEmail}
          </a>
        </p>
      </NextStep>
    </>
  );
}
