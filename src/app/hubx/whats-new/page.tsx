import type { Metadata } from "next";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Breadcrumbs } from "@/components/hubx/breadcrumbs";
import { EarlyAccessBadge, PointList } from "@/components/hubx/primitives";
import { Chapter, InkLink, NextStep, RuleList, inkTone, itemTitle, monoLabel } from "@/components/ink/interior";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container } from "@/components/ui/section";
import { getModule } from "@/content/hubx-modules";
import { earlyAccess, inProductNow, releases, whatsNewPage } from "@/content/hubx-whats-new";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "What's new in HubX — early-access release notes",
  description:
    "Release notes for HubX, powered by MSP Hub, plus what is in the product today: the October 2026 launch, the modules verified in November 2026, and how to share early-access feedback.",
  alternates: { canonical: "/hubx/whats-new" },
};

export default function HubxWhatsNewPage() {
  const { hero, releases: releasesCopy, now, feedback, cta } = whatsNewPage;
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead}>
        <ButtonLink href={earlyAccess.feedback.cta.href}>
          {earlyAccess.feedback.cta.label}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={site.hubxLoginUrl} variant="glass">
          Log in to HubX
        </ButtonLink>
        <span className="inline-flex h-12 items-center">
          <EarlyAccessBadge />
        </span>
      </PageHero>

      <section className="bg-[#0b1020] pb-10 text-white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "HubX", href: "/hubx" },
              { label: "What's new", href: "/hubx/whats-new" },
            ]}
          />
        </Container>
      </section>

      {/* Release notes */}
      <Chapter tone="ink" pad="tight" eyebrow={releasesCopy.eyebrow} title={releasesCopy.title}>
        <ol className="grid gap-10">
          {releases.map((release) => (
            <li key={release.id} id={release.id} className="grid scroll-mt-28 gap-6 border-t border-white/15 pt-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
              <div>
                <time dateTime={release.dateTime} className={cn(monoLabel, "flex items-center gap-2", inkTone.ink.faint)}>
                  <span aria-hidden className="size-1.5 rounded-full bg-[#f97316]" />
                  {release.date}
                </time>
                <h3 className={cn(itemTitle, "mt-3")}>{release.title}</h3>
              </div>
              <div>
                <p className={cn("max-w-[60ch] text-[16px] leading-[1.65]", inkTone.ink.muted)}>
                  {release.confirm ? (
                    <NeedsConfirm id={release.confirm} fallback={release.summary}>
                      {release.summary} {release.reviewNote}
                    </NeedsConfirm>
                  ) : (
                    release.summary
                  )}
                </p>
                <PointList items={release.items} className="mt-5" />
              </div>
            </li>
          ))}
        </ol>
        <p className={cn("mt-8 text-[15px]", inkTone.ink.muted)}>Release notes are added here as HubX ships updates.</p>
      </Chapter>

      {/* In the product today */}
      <Chapter tone="pearl" eyebrow={now.eyebrow} title={now.title} lead={now.lead} headingWidth="max-w-[20ch]">
        <RuleList
          tone="pearl"
          columns={3}
          titleSize="md"
          items={inProductNow.map((group) => {
            const mod = getModule(group.module);
            return {
              id: `now-${group.module}`,
              title: group.label,
              children: <PointList items={group.items} tone="light" dense />,
              link: mod ? { label: mod.href.startsWith("/hubx/features/") ? `About ${mod.name}` : "Security and administration", href: mod.href } : undefined,
            };
          })}
        />
      </Chapter>

      {/* Feedback */}
      <Chapter tone="ink" size="md" eyebrow={<span className="inline-flex flex-wrap items-center gap-3">{feedback.eyebrow} <EarlyAccessBadge /></span>} title={feedback.title} lead={earlyAccess.body}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12">
          <p className={cn("flex max-w-[60ch] items-start gap-3 text-[16px] leading-[1.6]", inkTone.ink.muted)}>
            <MessageSquareText className="mt-0.5 size-5 shrink-0 text-[#f97316]" aria-hidden />
            {earlyAccess.feedback.inProduct}
          </p>
          <div className="flex flex-col items-start gap-3">
            <ButtonLink href={earlyAccess.feedback.cta.href}>{earlyAccess.feedback.cta.label}</ButtonLink>
            <InkLink href={site.hubxLoginUrl} tone="ink" className="text-[15px]">
              Open HubX
            </InkLink>
          </div>
        </div>
      </Chapter>

      <NextStep tone="pearl" eyebrow={cta.eyebrow} title={cta.title} lead={cta.lead} primary={{ label: "Schedule a demo", href: "/demo" }} secondary={[{ label: "All features", href: "/hubx/features" }]} />
    </>
  );
}
