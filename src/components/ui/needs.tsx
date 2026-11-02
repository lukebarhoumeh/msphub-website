import { needs, type NeedId } from "@/content/needs";
import { cn } from "@/lib/cn";

type NeedsProps = { id: NeedId; className?: string };

/** Inline "Needs Luke" marker for content that still has to be supplied. */
export function Needs({ id, className }: NeedsProps) {
  const item = needs[id];
  return (
    <span className={cn("needs-tag", className)} title={`${item.label}: ${item.detail}`}>
      <span aria-hidden className="size-1.5 rounded-full bg-amber-300" />
      Needs Luke
      <span className="sr-only">
        : {item.label}. {item.detail}
      </span>
    </span>
  );
}

type NeedsBlockProps = {
  id: NeedId;
  className?: string;
  children?: React.ReactNode;
};

/** Larger dashed placeholder for a missing asset or section (screenshot, team, calendar). */
export function NeedsBlock({ id, className, children }: NeedsBlockProps) {
  const item = needs[id];
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-amber-300/50 bg-amber-300/5 p-8 text-center",
        className,
      )}
    >
      <Needs id={id} />
      <p className="text-sm font-medium text-white">{item.label}</p>
      <p className="max-w-md text-sm text-white/60">{item.detail}</p>
      {children}
    </div>
  );
}
