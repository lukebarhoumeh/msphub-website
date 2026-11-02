import type { MDXProps } from "mdx/types";
import type { JSX } from "react";
import { z } from "zod";
import Cookies, { frontmatter as cookiesMeta } from "./cookies.mdx";
import Privacy, { frontmatter as privacyMeta } from "./privacy.mdx";
import Terms, { frontmatter as termsMeta } from "./terms.mdx";

/**
 * Legal documents (handoff §5.14): Terms, Privacy, Cookies, migrated verbatim
 * with entity and brand names updated. Until the verbatim text is supplied,
 * each MDX file carries its scope summary and links to the policy in force on
 * msphub.com; paste the policy text into the MDX body to publish it here.
 */
const frontmatterSchema = z.object({
  title: z.string().min(1).max(80),
  summary: z.string().min(1).max(400),
  /** The policy currently in force on the previous site, linked until the text is migrated. */
  currentUrl: z.url(),
  /** ISO date of the last revision of the text in this file. */
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** True once the full policy text has been pasted into the MDX body. */
  migrated: z.boolean().default(false),
});

export type LegalFrontmatter = z.infer<typeof frontmatterSchema>;

export type LegalDocument = LegalFrontmatter & {
  slug: "terms" | "privacy" | "cookies";
  Content: (props: MDXProps) => JSX.Element;
};

function defineDocument(slug: LegalDocument["slug"], frontmatter: unknown, Content: (props: MDXProps) => JSX.Element): LegalDocument {
  const parsed = frontmatterSchema.safeParse(frontmatter);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in src/content/legal/${slug}.mdx: ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`);
  }
  return { ...parsed.data, slug, Content };
}

export const legalDocuments: LegalDocument[] = [
  defineDocument("terms", termsMeta, Terms),
  defineDocument("privacy", privacyMeta, Privacy),
  defineDocument("cookies", cookiesMeta, Cookies),
];

export const legalSlugs = legalDocuments.map((d) => d.slug);

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((d) => d.slug === slug);
}
