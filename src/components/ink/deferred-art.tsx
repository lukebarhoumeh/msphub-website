"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Mounts decorative artwork only after the page has loaded, and only on wide
 * viewports, so a masked background render is never the largest contentful
 * paint and never costs a phone its bandwidth. Children render nothing on
 * the server.
 */
export function DeferredArt({ children, minWidth = 1024 }: { children: ReactNode; minWidth?: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidth}px)`);
    if (!media.matches) return;
    let cancelled = false;
    const show = () => {
      if (cancelled) return;
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idle(() => {
        if (!cancelled) setReady(true);
      });
    };
    if (document.readyState === "complete") show();
    else window.addEventListener("load", show, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", show);
    };
  }, [minWidth]);
  return ready ? <>{children}</> : null;
}
