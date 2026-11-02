import { Container } from "@/components/ui/section";
import { showTodos } from "@/components/ui/needs-confirm";
import { integrationStatus } from "@/lib/env";

/**
 * Review-build strip (NEXT_PUBLIC_SHOW_TODOS=true only) listing which
 * integrations this deployment has configured. Presence flags only, never
 * values. Production renders nothing.
 */
export function IntegrationStatusStrip() {
  if (!showTodos) return null;
  const s = integrationStatus();
  const items: [string, string][] = [
    ["Pipedrive", s.pipedrive ? "on" : "off → mailto fallback"],
    ["Email (Resend)", s.email ? "on" : "off → mailto fallback"],
    ["Turnstile", s.turnstile ? "on" : "off → pass-through"],
    ["Bookings", s.bookings ? "on" : "off → form only"],
    ["Uploads", s.storage ? `on (${s.storage})` : "off → 503 not_configured"],
    ["GA4", s.ga4 ? "on" : "off"],
    ["Clarity", s.clarity ? "on" : "off"],
  ];
  return (
    <aside aria-label="Integration status (review build)" className="border-t border-dashed border-amber-300/40 bg-amber-300/5">
      <Container className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3 font-mono text-[11.5px] tracking-[0.04em] text-amber-100/90">
        <span className="font-semibold uppercase text-amber-300">Review build · integrations</span>
        {items.map(([name, state]) => (
          <span key={name}>
            {name}: <span className={state.startsWith("on") ? "text-emerald-300" : "text-amber-100/80"}>{state}</span>
          </span>
        ))}
      </Container>
    </aside>
  );
}
