import type { ReactNode } from "react";
import { confirmations, type ConfirmId } from "@/content/confirmations";
import { cn } from "@/lib/cn";

/** True only on review builds (Vercel Preview with the variable set). */
export const showTodos = process.env.NEXT_PUBLIC_SHOW_TODOS === "true";

type NeedsConfirmProps = {
  id: ConfirmId;
  /**
   * What production renders. Required: pass `null` to render nothing, a
   * string, or any node. Review builds render the chip and `children`
   * (or, when `children` is omitted, the fallback plus the chip).
   */
  fallback: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Marks an unconfirmed fact, pending decision, or missing asset from the
 * handoff. Never ships to production: without NEXT_PUBLIC_SHOW_TODOS=true the
 * component is exactly its `fallback`.
 */
export function NeedsConfirm({ id, fallback, children, className }: NeedsConfirmProps) {
  if (!showTodos) return <>{fallback}</>;
  const item = confirmations[id];
  return (
    <span className={cn("inline", className)}>
      {children === undefined ? fallback : children}{" "}
      <span className="needs-tag align-middle" title={`${item.label}: ${item.detail}`}>
        <span aria-hidden className="size-1.5 rounded-full bg-amber-300" />
        {item.kind === "decision" ? "Decision" : item.kind === "asset" ? "Asset" : "Confirm"}
        <span className="sr-only">
          : {item.label}. {item.detail}
        </span>
      </span>
    </span>
  );
}

type NeedsConfirmBlockProps = {
  id: ConfirmId;
  fallback: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Block-level variant for whole sections (leadership, booking calendar). */
export function NeedsConfirmBlock({ id, fallback, children, className }: NeedsConfirmBlockProps) {
  if (!showTodos) return <>{fallback}</>;
  const item = confirmations[id];
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-amber-300/50 bg-amber-300/5 p-6",
        className,
      )}
    >
      <p className="mb-3 flex flex-wrap items-center gap-2 text-sm text-white/70">
        <span className="needs-tag">
          <span aria-hidden className="size-1.5 rounded-full bg-amber-300" />
          {item.kind === "decision" ? "Decision" : item.kind === "asset" ? "Asset" : "Confirm"}
        </span>
        <span className="font-medium text-white">{item.label}.</span> {item.detail}
      </p>
      {children ?? fallback}
    </div>
  );
}
