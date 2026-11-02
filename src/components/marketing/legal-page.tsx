import { ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirmBlock } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { site } from "@/content/site";

type LegalPageProps = {
  title: string;
  currentUrl: string;
  summary: string;
};

/**
 * Legal pages are migrated verbatim from the current msphub.com in Phase 3
 * (entity and brand names updated). Until then each page links to the live policy.
 */
export function LegalPage({ title, currentUrl, summary }: LegalPageProps) {
  const link = (
    <ButtonLink href={currentUrl} variant="glass" size="sm">
      Read the current policy on msphub.com
      <ExternalLink className="size-4" aria-hidden />
    </ButtonLink>
  );
  return (
    <Section className="pt-12 sm:pt-16">
      <Container className="max-w-[820px]">
        <Eyebrow>Legal</Eyebrow>
        <Display as="h1" size="lg" className="mt-3.5">
          {title}
        </Display>
        <Lead className="mt-4">{summary}</Lead>
        <div className="mt-10">
          <NeedsConfirmBlock id="legalText" fallback={link}>
            {link}
          </NeedsConfirmBlock>
        </div>
        <p className="mt-10 text-sm text-white/55">
          Questions about this policy:{" "}
          <a href={`mailto:${site.salesEmail}`} className="font-medium text-white underline-offset-4 hover:underline">
            {site.salesEmail}
          </a>
        </p>
      </Container>
    </Section>
  );
}
