import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/insights/post-card";
import { CtaBand } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { Chip } from "@/components/ui/card";
import { Container, Glow, Section } from "@/components/ui/section";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { formatPostDate, getPost, isoPostDate, posts, postSlugs } from "@/content/insights";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({ title: post.title, description: post.summary, path: `/insights/${post.slug}` });
  return {
    ...base,
    ...(post.canonical ? { alternates: { canonical: post.canonical } } : {}),
    openGraph: { ...base.openGraph, type: "article", publishedTime: isoPostDate(post.date) },
  };
}

export default async function InsightPostPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const jsonLd = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: isoPostDate(post.date),
    author: { "@type": "Organization", name: post.author ?? site.name },
    publisher: { "@type": "Organization", name: site.name, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/insights/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <Section
        className="overflow-hidden pt-12 pb-14 sm:pt-16 lg:pt-20"
        decor={
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
            <div className="bg-hex absolute inset-0" />
            <Glow tone="orange" className="top-[-380px] left-1/2 h-[760px] w-[760px] -translate-x-1/2" />
            <Glow tone="navy" className="top-[20%] left-[-400px] h-[800px] w-[1000px]" />
          </div>
        }
      >
        <Container className="max-w-[900px]">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white">
            <ArrowLeft className="size-4" aria-hidden />
            All insights
          </Link>
          <p className="mt-6">
            <Eyebrow>
              <time dateTime={isoPostDate(post.date)}>{formatPostDate(post.date)}</time>
              {post.author ? ` · ${post.author}` : null}
            </Eyebrow>
          </p>
          <Display as="h1" size="xl" className="mt-5">
            {post.title}
          </Display>
          <Lead className="mt-6">{post.summary}</Lead>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          {post.note ? <p className="mt-5 text-[13px] text-white/60">{post.note}</p> : null}
        </Container>
      </Section>

      <Section tone="light" className="pt-12 sm:pt-14 lg:pt-16">
        <Container className="max-w-[900px]">
          <article className="card-light px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
            <div className="mx-auto max-w-[70ch]">
              <post.Content />
            </div>
          </article>
        </Container>
      </Section>

      {related.length ? (
        <Section tone="light" className="pt-0 sm:pt-0 lg:pt-0">
          <Container>
            <h2 className="mb-6 font-display text-2xl font-semibold tracking-[-0.01em] text-charcoal">More insights</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section>
        <CtaBand
          eyebrow="Next step"
          title="Send us your current Microsoft invoice."
          lead="The deal desk returns a line-by-line comparison and a transfer plan. Nothing gets re-bought."
          primary={{ label: "Start the comparison", href: "/licensing/switch" }}
          secondary={[{ label: "Schedule a HubX demo", href: "/demo" }]}
        />
      </Section>

      <JsonLd data={jsonLd} />
    </>
  );
}
