"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { formMessages } from "@/content/forms";

/**
 * Cloudflare Turnstile widget, rendered explicitly so several forms on one
 * page share one script. The site key is public (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`);
 * the server verifies tokens with `TURNSTILE_SECRET_KEY`. Without a site key
 * the component renders an honest notice and the form still submits (the
 * server passes through when its secret is unset).
 */

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
      const script = existing ?? document.createElement("script");
      const settle = () => {
        if (window.turnstile) resolve(window.turnstile);
        else reject(new Error("Turnstile loaded without an API"));
      };
      script.addEventListener("load", settle, { once: true });
      script.addEventListener(
        "error",
        () => {
          scriptPromise = null;
          reject(new Error("Turnstile script failed to load"));
        },
        { once: true },
      );
      if (!existing) {
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    });
  }
  return scriptPromise;
}

export type TurnstileState = "unconfigured" | "loading" | "ready" | "error";

type TurnstileProps = {
  /** Receives the current token, or null when it expired or errored. */
  onToken: (token: string | null) => void;
  onStateChange?: (state: TurnstileState) => void;
  className?: string;
};

export function Turnstile({ onToken, onStateChange, className }: TurnstileProps) {
  const container = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TurnstileState>(turnstileSiteKey ? "loading" : "unconfigured");
  const callbacks = useRef({ onToken, onStateChange });

  useEffect(() => {
    callbacks.current = { onToken, onStateChange };
  }, [onToken, onStateChange]);

  useEffect(() => {
    callbacks.current.onStateChange?.(state);
  }, [state]);

  useEffect(() => {
    if (!turnstileSiteKey || !container.current) return;
    let widgetId: string | null = null;
    let cancelled = false;
    const host = container.current;

    loadTurnstile()
      .then((api) => {
        if (cancelled) return;
        widgetId = api.render(host, {
          sitekey: turnstileSiteKey,
          theme: "dark",
          size: "flexible",
          appearance: "always",
          callback: (token: string) => {
            callbacks.current.onToken(token);
            setState("ready");
          },
          "expired-callback": () => callbacks.current.onToken(null),
          "timeout-callback": () => callbacks.current.onToken(null),
          "error-callback": () => {
            callbacks.current.onToken(null);
            setState("error");
          },
        });
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);

  if (state === "unconfigured") {
    return (
      <p className={className} role="note">
        <span className="inline-flex items-start gap-2 text-[13px] text-white/65">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-300/90" aria-hidden />
          {formMessages.turnstileMissing}
        </span>
      </p>
    );
  }

  return (
    <div className={className}>
      <div ref={container} className="min-h-[65px]" />
      {state === "error" ? (
        <p role="note" className="mt-2 inline-flex items-start gap-2 text-[13px] text-white/65">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-300/90" aria-hidden />
          {formMessages.turnstileError}
        </p>
      ) : null}
    </div>
  );
}
