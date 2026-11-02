/**
 * Minimal analytics hook-up for the HubX components (`screenshot_view`,
 * `hubx_login_click`). It forwards to GA4's `gtag` when the analytics loader
 * has installed it and always dispatches a DOM event the loader can observe,
 * so nothing here depends on an analytics script having loaded first.
 */
export type TrackParams = Record<string, string | number | boolean>;

type TrackingWindow = Window & { gtag?: (command: "event", name: string, params?: TrackParams) => void };

export const TRACK_EVENT = "msphub:track";

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(TRACK_EVENT, { detail: { event, ...params } }));
  (window as TrackingWindow).gtag?.("event", event, params);
}
