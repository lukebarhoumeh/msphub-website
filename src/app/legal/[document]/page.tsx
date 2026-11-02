import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { NeedsConfirmBlock, showTodos } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { getLegalDocument, legalDocuments, legalSlugs } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return legalSlugs.map((document) => ({ document }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[document]">): Promise<Metadata> {
  const { document } = await params;
  const doc = getLegalDocument(document);
  if (!doc) return {};
  return pageMetadata({ title: doc.title, description: doc.summary, path: `/legal/${doc.slug}` });
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" }).format(new Date(Date.UTC(y, m - 1, d)));
}

export default async function LegalDocumentPage({ params }: PageProps<"/legal/[document]">) {
  const { document } = await params;
  const doc = getLegalDocument(document);
  if (!doc) notFound();
  const others = legalDocuments.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <Section className="pt-12 pb-10 sm:pt-16">
        <Container className="max-w-[900px]">
          <Eyebrow>Legal · {site.legalName}</Eyebrow>
          <Display as="h1" size="lg" className="mt-3.5">
            {doc.title}
          </Display>
          <Lead className="mt-4">{doc.summary}</Lead>
          <p className="mt-4 font-mono text-[12px] tracking-[0.06em] text-white/60 uppercase">Last updated {formatDate(doc.updated)}</p>
          {showTodos ? (
            <NeedsConfirmBlock id="legalText" fallback={null} className="mt-6">
              <p className="text-sm text-white/70">
                {doc.migrated
                  ? "Verbatim text migrated; confirm the entity and brand name updates."
                  : "Verbatim policy text not yet supplied; this page carries the scope summary and links to the policy in force."}
              </p>
            </NeedsConfirmBlock>
          ) : null}
        </Container>
      </Section>

      <Section tone="light" className="pt-12 sm:pt-14 lg:pt-16">
        <Container className="max-w-[900px]">
          <article className="card-light px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
            <div className="mx-auto max-w-[70ch]">
              <doc.Content />
              {!doc.migrated ? (
                <p className="mt-8">
                  <ButtonLink
                    href={doc.currentUrl}
                    variant="glass"
                    size="sm"
                    className="h-auto min-h-11 max-w-full border-black/15 bg-white py-2.5 text-center whitespace-normal text-charcoal hover:bg-white/80"
                  >
                    Current {doc.title} on msphub.com
                    <ExternalLink className="size-4 shrink-0" aria-hidden />
                  </ButtonLink>
                </p>
              ) : null}
            </div>
          </article>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-charcoal/80">
            <span>Also see:</span>
            {others.map((d) => (
              <Link key={d.slug} href={`/legal/${d.slug}`} className="font-medium text-charcoal underline decoration-brand-orange/60 underline-offset-4 hover:decoration-brand-orange">
                {d.title}
              </Link>
            ))}
            <span className="sm:ml-auto">
              Questions:{" "}
              <a href={`mailto:${site.salesEmail}`} className="font-medium text-charcoal underline decoration-brand-orange/60 underline-offset-4 hover:decoration-brand-orange">
                {site.salesEmail}
              </a>
            </span>
          </div>
        </Container>
      </Section>
    </>
  );
}
