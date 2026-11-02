import { HubXLockup } from "@/components/brand/hubx-logo";
import { FeatureGrid } from "@/components/hubx/feature-grid";
import { ToneLink } from "@/components/hubx/primitives";
import { ScreenshotCarousel } from "@/components/hubx/screenshot-carousel";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirm } from "@/components/ui/needs-confirm";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead, SectionHeading } from "@/components/ui/typography";
import { hubxHome } from "@/content/hubx";
import { screens } from "@/content/screens";

/** Home §5.1 item 2: product proof as a carousel of real light-theme captures on the light canvas. */
export function HomeProductProof() {
  const { proof } = hubxHome;
  return (
    <Section tone="light">
      <Container>
        <SectionHeading tone="light" eyebrow={proof.eyebrow} title={proof.title} lead={proof.lead} />
        <ScreenshotCarousel
          screens={proof.screens.map((id) => screens[id])}
          labels={proof.labels}
          label="HubX product proof"
          sizes="(min-width: 1280px) 1100px, 100vw"
        />
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {proof.links.map((link) => (
            <ToneLink key={link.href} href={link.href} tone="light">
              {link.label}
            </ToneLink>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Home §5.1 item 6: the HubX spotlight with the twelve real capabilities instead of generic tiles. */
export function HomeHubxSpotlight() {
  const { spotlight } = hubxHome;
  return (
    <Section className="pt-0 sm:pt-0 lg:pt-0" decor={<Glow tone="orange" className="top-0 right-[-200px] h-[700px] w-[700px] opacity-70" />}>
      <Container>
        <div className="glass glass-lg overflow-hidden p-7 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-14">
            <div>
              <HubXLockup logoClassName="h-12 w-auto sm:h-14" />
              <Eyebrow className="mt-7">{spotlight.eyebrow}</Eyebrow>
              <Display className="mt-3.5">{spotlight.title}</Display>
            </div>
            <div>
              <Lead>{spotlight.lead}</Lead>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                {spotlight.body} <NeedsConfirm id="whiteLabel" fallback={null} />
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={spotlight.primary.href}>{spotlight.primary.label}</ButtonLink>
                <ButtonLink href={spotlight.secondary.href} variant="glass">
                  {spotlight.secondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
          <FeatureGrid compact columns={4} className="mt-10" />
        </div>
      </Container>
    </Section>
  );
}
