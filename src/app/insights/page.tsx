import { PostCard } from "@/components/insights/post-card";
import { CtaBand } from "@/components/marketing/blocks";
import { PageHero } from "@/components/marketing/page-hero";
import { NeedsConfirmBlock, showTodos } from "@/components/ui/needs-confirm";
import { Container, Section } from "@/components/ui/section";
import { insightsPage, posts } from "@/content/insights";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights — news and Microsoft licensing guidance from MSP Hub",
  description: insightsPage.lead,
  path: "/insights",
});

/** Literal class names so Tailwind's scanner emits every stagger step. */
const stagger = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"];

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow={insightsPage.eyebrow} title={insightsPage.title} lead={insightsPage.lead} />

      {showTodos ? (
        <Section tight className="pt-0 sm:pt-0">
          <Container>
            <NeedsConfirmBlock id="insightsSource" fallback={null}>
              <p className="text-sm text-white/70">
                These posts are rebuilt from facts in the handoff; the originals from the previous msphub.com are replaced when the
                WordPress export lands.
              </p>
            </NeedsConfirmBlock>
          </Container>
        </Section>
      ) : null}

      <Section tone="light">
        <Container>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <li key={post.slug} className={`motion-safe:animate-fade-up ${stagger[Math.min(i, 4)]}`}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <CtaBand
          eyebrow="Talk to the team"
          title="Questions about your Microsoft estate?"
          lead="The licensing desk reads every message. Send your invoice for a line-by-line comparison, or book a HubX demo."
          primary={{ label: "Get a licensing quote", href: "/licensing/quote" }}
          secondary={[{ label: "Schedule a HubX demo", href: "/demo" }]}
        />
      </Section>
    </>
  );
}
