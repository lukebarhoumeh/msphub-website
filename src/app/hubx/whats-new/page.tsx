import type { Metadata } from "next";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Breadcrumbs } from "@/components/hubx/breadcrumbs";
import { EarlyAccessBadge, PointList, ToneLink } from "@/components/hubx/primitives";
import { CtaBand } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard, IconTile } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { getModule } from "@/content/hubx-modules";
import { earlyAccess, inProductNow, releases, whatsNewPage } from "@/content/hubx-whats-new";
import { site } from "@/content/site";

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

      <Section tight className="pt-0 sm:pt-0">
        <Container>
          <Breadcrumbs
            items={[
              { label: "HubX", href: "/hubx" },
              { label: "What's new", href: "/hubx/whats-new" },
            ]}
          />
        </Container>
      </Section>

      {/* Release notes */}
      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 left-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow={releasesCopy.eyebrow} title={releasesCopy.title} />
          <ol className="grid gap-4">
            {releases.map((r) => (
              <li key={r.id} id={r.id} className="scroll-mt-28">
                <GlassCard className="grid gap-6 p-7 sm:p-8 lg:grid-cols-[200px_1fr] lg:gap-10">
                  <div>
                    <time dateTime={r.dateTime} className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">
                      {r.date}
                    </time>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-white">{r.title}</h3>
                  </div>
                  <div>
                    <p className="text-[15px] leading-relaxed text-white/75">
                      {r.confirm ? (
                        <NeedsConfirm id={r.confirm} fallback={r.summary}>
                          {r.summary} {r.reviewNote}
                        </NeedsConfirm>
                      ) : (
                        r.summary
                      )}
                    </p>
                    <PointList items={r.items} className="mt-5" />
                  </div>
                </GlassCard>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-white/60">Release notes are added here as HubX ships updates.</p>
        </Container>
      </Section>

      {/* In the product today */}
      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow={now.eyebrow} title={now.title} lead={now.lead} />
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProductNow.map((group) => {
              const mod = getModule(group.module);
              return (
                <li key={group.module} className="card-light flex flex-col p-6">
                  <div className="flex items-center gap-3">
                    {mod ? <IconTile icon={mod.icon} /> : null}
                    <h3 className="text-lg font-semibold tracking-tight text-charcoal">{group.label}</h3>
                  </div>
                  <PointList items={group.items} tone="light" className="mt-4" dense />
                  {mod ? (
                    <ToneLink href={mod.href} tone="light" className="mt-auto pt-5">
                      {mod.href.startsWith("/hubx/features/") ? `About ${mod.name}` : "Security and administration"}
                    </ToneLink>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Feedback */}
      <Section>
        <Container>
          <div className="glass glass-lg grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[60ch]">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{feedback.eyebrow}</Eyebrow>
                <EarlyAccessBadge />
              </div>
              <Display className="mt-3.5">{feedback.title}</Display>
              <Lead className="mt-4">{earlyAccess.body}</Lead>
              <p className="mt-4 flex items-start gap-3 text-[15px] text-white/75">
                <MessageSquareText className="mt-0.5 size-5 shrink-0 text-brand-orange" aria-hidden />
                {earlyAccess.feedback.inProduct}
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <ButtonLink href={earlyAccess.feedback.cta.href}>{earlyAccess.feedback.cta.label}</ButtonLink>
              <a href={site.hubxLoginUrl} rel="noopener" className="text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline">
                Open HubX
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          eyebrow={cta.eyebrow}
          title={cta.title}
          lead={cta.lead}
          primary={{ label: "Schedule a demo", href: "/demo" }}
          secondary={[{ label: "All features", href: "/hubx/features" }]}
        />
      </Section>
    </>
  );
}
