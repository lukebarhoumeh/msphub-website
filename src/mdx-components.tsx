import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Global element styles for MDX bodies (insights posts, legal pages). Long-form
 * text always renders on a light canvas section, so these map to charcoal type
 * per the handoff §7 tokens; headings use the serif display face.
 */
function Anchor({ href = "", className, children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const classes = cn("font-medium text-charcoal underline decoration-brand-orange/60 underline-offset-4 hover:decoration-brand-orange", className);
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} className={classes} {...(external ? { rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}

const components = {
  h1: ({ className, ...p }) => <h1 className={cn("font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-charcoal", className)} {...p} />,
  h2: ({ className, ...p }) => <h2 className={cn("mt-12 mb-4 font-display text-[clamp(1.5rem,2.2vw,1.875rem)] leading-[1.15] font-semibold tracking-[-0.01em] text-charcoal first:mt-0", className)} {...p} />,
  h3: ({ className, ...p }) => <h3 className={cn("mt-9 mb-3 text-xl font-semibold tracking-tight text-charcoal", className)} {...p} />,
  h4: ({ className, ...p }) => <h4 className={cn("mt-7 mb-2 text-lg font-semibold text-charcoal", className)} {...p} />,
  p: ({ className, ...p }) => <p className={cn("my-5 text-[17px] leading-[1.7] text-charcoal/85", className)} {...p} />,
  a: Anchor,
  ul: ({ className, ...p }) => <ul className={cn("my-5 grid list-disc gap-2 pl-6 text-[17px] leading-[1.65] text-charcoal/85 marker:text-brand-orange", className)} {...p} />,
  ol: ({ className, ...p }) => <ol className={cn("my-5 grid list-decimal gap-2 pl-6 text-[17px] leading-[1.65] text-charcoal/85 marker:font-semibold marker:text-charcoal", className)} {...p} />,
  li: ({ className, ...p }) => <li className={cn("pl-1", className)} {...p} />,
  strong: ({ className, ...p }) => <strong className={cn("font-semibold text-charcoal", className)} {...p} />,
  em: ({ className, ...p }) => <em className={cn("italic", className)} {...p} />,
  blockquote: ({ className, ...p }) => (
    <blockquote className={cn("my-7 border-l-2 border-brand-orange pl-5 font-display text-[1.25rem] leading-[1.45] text-charcoal", className)} {...p} />
  ),
  hr: ({ className, ...p }) => <hr className={cn("my-10 border-black/10", className)} {...p} />,
  code: ({ className, ...p }) => <code className={cn("rounded-md bg-black/6 px-1.5 py-0.5 font-mono text-[0.9em] text-charcoal", className)} {...p} />,
  pre: ({ className, ...p }) => <pre className={cn("my-6 overflow-x-auto rounded-xl border border-black/8 bg-white p-5 font-mono text-[14px] leading-relaxed text-charcoal", className)} {...p} />,
  table: ({ className, ...p }) => (
    <div className="my-7 overflow-x-auto">
      <table className={cn("w-full border-collapse text-left text-[15px] text-charcoal/85", className)} {...p} />
    </div>
  ),
  thead: ({ className, ...p }) => <thead className={cn("font-mono text-[12px] tracking-[0.06em] text-charcoal uppercase", className)} {...p} />,
  th: ({ className, ...p }) => <th className={cn("border-b border-black/12 px-3 py-2.5 font-semibold", className)} {...p} />,
  td: ({ className, ...p }) => <td className={cn("border-b border-black/8 px-3 py-2.5 align-top", className)} {...p} />,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
