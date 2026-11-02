"use client";

import { consentCopy } from "@/content/consent";
import { openConsentSettings } from "@/lib/consent";
import { cn } from "@/lib/cn";

const enabled = Boolean(process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_CLARITY_ID);

/** "Cookie settings" control for the footer; renders nothing when analytics is not configured. */
export function ConsentSettingsButton({ className }: { className?: string }) {
  if (!enabled) return null;
  return (
    <button type="button" onClick={openConsentSettings} className={cn("hover:text-white", className)}>
      {consentCopy.settingsLabel}
    </button>
  );
}
