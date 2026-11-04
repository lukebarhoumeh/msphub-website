"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type WideOnlyProps = {
  children: ReactNode;
  /** Viewport width from which the children render. */
  minWidth?: number;
  /**
   * Wrapper classes. Reserve the box here (an `aspect-[…]` or `min-h-[…]`)
   * so nothing shifts when the children mount, and hide it below the
   * breakpoint (`hidden lg:block`) so phones give it no space.
   */
  className?: string;
};

/**
 * Renders its children only on wide viewports, and only after mount: the
 * server renders the empty box, so a priority hero image inside never
 * reaches a phone's network (an `<img>` hidden with CSS still downloads).
 * Pair with `DeferredArt` for decorative renders; this is for real objects
 * that should appear as soon as the page hydrates on a desktop.
 */
export function WideOnly({ children, minWidth = 1024, className }: WideOnlyProps) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    // rem, like the CSS `lg:` breakpoint (64rem), so the box and its content switch at the same width.
    const media = window.matchMedia(`(min-width: ${minWidth / 16}rem)`);
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [minWidth]);
  return <div className={cn(className)}>{wide ? children : null}</div>;
}
