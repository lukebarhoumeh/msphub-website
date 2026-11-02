import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/ui/card";
import { formatPostDate, isoPostDate, type Post } from "@/content/insights";
import { cn } from "@/lib/cn";

/** Card for the insights index (light canvas). The whole card is one link target. */
export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <article className={cn("card-light relative flex h-full flex-col p-7 transition hover:border-black/15", className)}>
      <p className="font-mono text-xs tracking-[0.1em] text-charcoal/80 uppercase">
        <time dateTime={isoPostDate(post.date)}>{formatPostDate(post.date)}</time>
      </p>
      <h2 className="mt-3 font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.01em] text-charcoal">
        <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-charcoal/80">{post.summary}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Chip tone="light" className="h-7 px-2.5 text-[12px]">
                {tag}
              </Chip>
            </li>
          ))}
        </ul>
        <span aria-hidden className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal">
          Read
          <ArrowRight className="size-3.5 text-brand-orange" />
        </span>
      </div>
    </article>
  );
}
