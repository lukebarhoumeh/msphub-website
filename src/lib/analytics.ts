/**
 * Analytics events (handoff §8): `demo_request`, `quote_request`,
 * `invoice_upload`, `partner_apply`, `hubx_login_click`, `screenshot_view`.
 * `track()` is safe to call anywhere on the client: it forwards to GA4 and
 * Clarity only when they have been loaded by `<Analytics />` (ids present,
 * consent granted) and is a no-op otherwise.
 */

export type AnalyticsEventName =
  | "demo_request"
  | "quote_request"
  | "service_inquiry"
  | "contact_message"
  | "invoice_upload"
  | "partner_apply"
  | "hubx_login_click"
  | "screenshot_view"
  | (string & {});

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type Gtag = (...args: unknown[]) => void;
type Clarity = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    clarity?: Clarity;
  }
}

/** DOM event other components may dispatch instead of importing `track` (detail: `{ event, ...params }`). */
export const TRACK_EVENT = "msphub:track";

const recent = new Map<string, number>();
const DEDUPE_MS = 250;

export function track(event: AnalyticsEventName, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined) clean[k] = v;
  // The same interaction can be reported twice (a component's onClick plus the
  // global HubX-login click listener); count it once.
  const key = `${event}:${JSON.stringify(clean)}`;
  const now = Date.now();
  const last = recent.get(key);
  if (last !== undefined && now - last < DEDUPE_MS) return;
  recent.set(key, now);
  if (recent.size > 50) recent.clear();
  try {
    window.gtag?.("event", event, { ...clean, transport_type: "beacon" });
    window.clarity?.("event", event);
  } catch {
    // Analytics must never break the page.
  }
}

/** Forwards `msphub:track` DOM events to `track()`; returns the unsubscribe function. */
export function subscribeToTrackEvents(): () => void {
  const onTrack = (e: Event) => {
    const detail = (e as CustomEvent<Record<string, unknown>>).detail;
    if (!detail || typeof detail.event !== "string") return;
    const { event, ...rest } = detail;
    const params: AnalyticsParams = {};
    for (const [k, v] of Object.entries(rest)) {
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") params[k] = v;
    }
    track(event, params);
  };
  window.addEventListener(TRACK_EVENT, onTrack);
  return () => window.removeEventListener(TRACK_EVENT, onTrack);
}
