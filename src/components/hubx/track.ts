/**
 * Analytics hook-up for the HubX components (`screenshot_view`,
 * `hubx_login_click`). Re-exports the site-wide `track()` from
 * `src/lib/analytics.ts`, which forwards to GA4 and Clarity only when
 * `<Analytics />` has loaded them (ids present, consent granted) and is a
 * no-op otherwise. `TRACK_EVENT` is the DOM event the analytics layer also
 * listens for, should a component prefer dispatching to importing.
 */
export { TRACK_EVENT, track, type AnalyticsParams as TrackParams } from "@/lib/analytics";
