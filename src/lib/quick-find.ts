/**
 * Quick Find contract. The palette (`components/layout/quick-find.tsx`) is
 * mounted once in the root layout and opens on ⌘K / Ctrl+K or on this DOM
 * event, so any trigger (header button, mobile sheet row) stays a plain
 * client component with no shared state.
 */
export const QUICK_FIND_EVENT = "msphub:quick-find";

export function openQuickFind() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(QUICK_FIND_EVENT));
}
