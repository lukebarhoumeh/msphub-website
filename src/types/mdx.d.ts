declare module "*.mdx" {
  /**
   * YAML frontmatter, exported by `remark-mdx-frontmatter`. Left `unknown` on
   * purpose: the content registries (`src/content/insights`, `src/content/legal`)
   * validate it with zod at build time so a malformed file fails `next build`.
   */
  export const frontmatter: unknown;
}
