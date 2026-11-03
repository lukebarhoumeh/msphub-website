import type { MDXProps } from "mdx/types";
import type { JSX } from "react";
import { z } from "zod";
import IntroducingMspHub, { frontmatter as introducingMspHubMeta } from "./introducing-msp-hub.mdx";
import UnlockingProductivity, { frontmatter as unlockingProductivityMeta } from "./unlocking-business-productivity-with-microsoft-365.mdx";

/**
 * Insights registry. Each post is an MDX file in this folder with YAML
 * frontmatter (title, date, summary, tags, optional canonical/author/note);
 * add a post by importing it below. Frontmatter is validated here so a
 * malformed file fails the build instead of rendering a broken card.
 */
const frontmatterSchema = z.object({
  title: z.string().min(1).max(160),
  /** ISO date; month precision (YYYY-MM) is allowed when only the month is known. */
  date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "date must be YYYY-MM-DD or YYYY-MM"),
  summary: z.string().min(1).max(400),
  tags: z.array(z.string().min(1).max(40)).max(8).default([]),
  canonical: z.url().optional(),
  author: z.string().max(80).optional(),
  /** Short provenance line shown under the title (e.g. migrated from the previous site). */
  note: z.string().max(240).optional(),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export type Post = PostFrontmatter & {
  slug: string;
  Content: (props: MDXProps) => JSX.Element;
};

function definePost(slug: string, frontmatter: unknown, Content: (props: MDXProps) => JSX.Element): Post {
  const parsed = frontmatterSchema.safeParse(frontmatter);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in src/content/insights/${slug}.mdx: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
  }
  return { ...parsed.data, slug, Content };
}

/** Newest first. */
export const posts: Post[] = [
  definePost("unlocking-business-productivity-with-microsoft-365", unlockingProductivityMeta, UnlockingProductivity),
  definePost("introducing-msp-hub", introducingMspHubMeta, IntroducingMspHub),
].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const postSlugs = posts.map((p) => p.slug);

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** "July 30, 2025" for full dates, "July 2025" for month precision. */
export function formatPostDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day || 1));
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", year: "numeric", month: "long", ...(day ? { day: "numeric" } : {}) }).format(value);
}

/** Machine-readable date for `<time dateTime>` and schema. */
export function isoPostDate(date: string): string {
  return date.length === 7 ? `${date}-01` : date;
}

export const insightsPage = {
  eyebrow: "News & Insights",
  title: "Insights from the MSP Hub team.",
  lead: "Company news, Microsoft licensing guidance, and notes from the people who run migrations, managed operations, and HubX.",
};
