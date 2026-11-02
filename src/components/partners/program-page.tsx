import { ArrowRight } from "lucide-react";
import { CheckList, CtaBand, Steps } from "@/components/marketing/blocks";
import { FaqSection } from "@/components/marketing/faq-section";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard, GlassCard } from "@/components/ui/card";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/typography";
import { partnerEnablement, partnerPrograms, type ProgramDetail } from "@/content/partners";

/** Literal class names so Tailwind's scanner emits every stagger step. */
const stagger = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];

/** Shared layout for the three partner program pages; all copy comes from `content/partners.ts`. */
export function ProgramPage({ program }: { program: ProgramDetail }) {
  const others = partnerPrograms.filter((p) => p.id !== program.id);
  return (
    <>
      <PageHero eyebrow={program.eyebrow} title={program.title} lead={program.lead}>
        <ButtonLink href={program.cta.href}>
          {program.cta.label}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/demo" variant="glass">
          Schedule a HubX demo
        </ButtonLink>
      </PageHero>

      <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="Who it's for" title="Built for the way you already sell." />
          <div className="grid gap-4 md:grid-cols-3">
            {program.forWhom.map((f, i) => (
              <GlassCard key={f.title} className={`motion-safe:animate-fade-up ${stagger[i]}`}>
                <h3 className="text-lg font-semibold tracking-tight text-white">{f.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow="What's included" title="What the program gives you." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {program.includes.map((item) => (
              <FeatureCard key={item.title} title={item.title} tone="light">
                {item.body}
              </FeatureCard>
            ))}
          </div>
          <GlassCard tone="light" className="mt-6 p-6">
            <p className="font-mono text-xs font-semibold tracking-[0.12em] text-charcoal uppercase">Commercial terms</p>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal/85">
              {program.economics.confirm ? (
                <NeedsConfirm id={program.economics.confirm} fallback={program.economics.body} />
              ) : (
                program.economics.body
              )}
            </p>
          </GlassCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="How it works" title="From application to the first billing run." />
          <Steps steps={program.steps} className={program.steps.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : undefined} />
          <GlassCard className="mt-4">
            <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">Enablement</p>
            <CheckList items={partnerEnablement} className="mt-4 sm:grid-cols-2" />
          </GlassCard>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading tone="light" eyebrow="Questions" title="Program questions, answered." align="center" />
          <FaqSection items={program.faq} tone="light" />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Other programs" title="Not the right fit? Two more ways to partner." />
          <div className="grid gap-4 md:grid-cols-2">
            {others.map((p) => (
              <GlassCard key={p.id} className="flex flex-col">
                <p className="font-mono text-xs font-semibold tracking-[0.12em] text-brand-orange uppercase">{p.who}</p>
                <h3 className="mt-3 font-display text-[1.5rem] leading-tight tracking-[-0.01em] text-white">{p.name}</h3>
                <CheckList items={p.gets.slice(0, 3)} className="mt-4 flex-1" />
                <ButtonLink href={p.href} variant="glass" size="sm" className="mt-6 self-start">
                  {p.name}
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Apply to partner with MSP Hub."
          lead="Tell us about your business and your customers. The partner team replies with next steps and a call."
          primary={{ label: program.cta.label, href: program.cta.href }}
          secondary={[{ label: "Schedule a HubX demo", href: "/demo" }]}
        />
      </Section>
    </>
  );
}
