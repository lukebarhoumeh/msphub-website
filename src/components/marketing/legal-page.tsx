import { ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { NeedsBlock } from "@/components/ui/needs";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { site } from "@/content/site";

type LegalPageProps = {
  title: string;
  currentUrl: string;
  summary: string;
};

/**
 * Legal pages are ported from the current msphub.com once the Termly account
 * owner approves the text. Until then each page links to the live policy.
 */
export function LegalPage({ title, currentUrl, summary }: LegalPageProps) {
  return (
    <Section className="pt-12 sm:pt-16">
      <Container className="max-w-[820px]">
        <Eyebrow>Legal</Eyebrow>
        <Display as="h1" size="lg" className="mt-3.5">
          {title}
        </Display>
        <Lead className="mt-4">{summary}</Lead>
        <div className="mt-10">
          <NeedsBlock id="legal">
            <ButtonLink href={currentUrl} variant="glass" size="sm" className="mt-2">
              Read the current policy on msphub.com
              <ExternalLink className="size-4" aria-hidden />
            </ButtonLink>
          </NeedsBlock>
        </div>
        <p className="mt-10 text-sm text-white/55">
          Questions about this policy: {" "}
          <a href={`mailto:${site.salesEmail}`} className="font-medium text-white underline-offset-4 hover:underline">
            {site.salesEmail}
          </a>
        </p>
      </Container>
    </Section>
  );
}
