import { ArrowRight } from "lucide-react";
import { CtaBand, LogoCloud, Steps } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Chip, GlassCard } from "@/components/ui/card";
import { Container, Glow, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/typography";
import { alliances, vendors } from "@/content/ecosystem";
import { beyondMicrosoft } from "@/content/licensing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Beyond Microsoft — Google Workspace, Adobe, Cisco Meraki, Fortinet, Coro, Citrix, Dell and Lenovo through one partner",
  description: "MSP Hub procures and supports productivity, security, networking, and hardware beyond Microsoft through its distribution relationships. One partner, one invoice.",
  path: "/licensing/beyond-microsoft",
});

const distribution = alliances.filter((a) => a.kind === "distribution");

export default function BeyondMicrosoftPage() {
  return (
    <>
      <PageHero eyebrow={beyondMicrosoft.eyebrow} title={beyondMicrosoft.title} lead={beyondMicrosoft.lead}>
        <ButtonLink href="/contact?topic=sales#contact-form">
          Talk to the deal desk
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/licensing" variant="glass">
          Microsoft licensing
        </ButtonLink>
      </PageHero>

      <Section tone="light">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="What we procure"
            title="The vendors you already run, from the desk that quotes your Microsoft."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beyondMicrosoft.categories.map((c) => (
              <GlassCard key={c.title} tone="light" className="flex flex-col p-6">
                <h3 className="text-lg font-semibold tracking-tight text-charcoal">{c.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.vendors.map((v) => (
                    <li key={v}>
                      <Chip tone="light" className="font-semibold">
                        {v}
                      </Chip>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal/80">{c.body}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section decor={<Glow tone="navy" className="top-0 right-[-300px] h-[700px] w-[900px]" />}>
        <Container>
          <SectionHeading eyebrow="How it works" title="One quote, one partner, one invoice." />
          <Steps steps={beyondMicrosoft.howItWorks} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <p className="mb-4 font-mono text-xs tracking-[0.12em] text-white/60 uppercase">Distribution</p>
              <LogoCloud items={distribution} confirm="allianceLogos" />
              <p className="mt-4 text-[14.5px] leading-relaxed text-white/70">
                Hardware, Google Workspace, Adobe, and the broader vendor catalog are procured through MSP Hub&apos;s distribution relationships.
              </p>
            </GlassCard>
            <GlassCard>
              <p className="mb-4 font-mono text-xs tracking-[0.12em] text-white/60 uppercase">Vendor ecosystem</p>
              <LogoCloud items={vendors} confirm="vendorLogos" />
            </GlassCard>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <CtaBand
          title="Send the deal desk your renewal calendar."
          lead="Microsoft and everything around it, quoted by one desk and delivered by one team."
          primary={{ label: "Talk to the deal desk", href: "/contact?topic=sales#contact-form" }}
          secondary={[{ label: "Get a Microsoft licensing quote", href: "/licensing/quote" }]}
        />
      </Section>
    </>
  );
}
