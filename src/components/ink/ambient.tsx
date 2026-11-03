"use client";

import { useEffect } from "react";

/** How long without scroll, pointer, or key input before ambient loops pause. */
const IDLE_MS = 12_000;

/**
 * Ambient loops (aurora drift, border beams, the catalog marquee) never end,
 * so left alone they make the browser composite a full frame every vsync for
 * as long as the page is open. On a machine without GPU compositing that is
 * a whole CPU core, forever. This marks `<html data-ambient="paused">`
 * whenever the page is hidden, the window is not focused, or nobody has
 * touched it for a while; globals.css pauses the loops on that attribute.
 * Any interaction resumes them.
 */
export function AmbientMotion() {
  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;
    let lastTouch = 0;

    const pause = () => {
      root.dataset.ambient = "paused";
    };
    const live = () => {
      window.clearTimeout(timer);
      if (document.hidden || !document.hasFocus()) return pause();
      delete root.dataset.ambient;
      timer = window.setTimeout(pause, IDLE_MS);
    };
    // Pointer moves arrive by the hundred; one timer reset a second is plenty.
    const touch = () => {
      const now = Date.now();
      if (now - lastTouch < 1000 && !root.dataset.ambient) return;
      lastTouch = now;
      live();
    };

    const opts = { passive: true } as const;
    for (const type of ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"]) window.addEventListener(type, touch, opts);
    window.addEventListener("scroll", touch, opts);
    window.addEventListener("focus", live);
    window.addEventListener("blur", pause);
    document.addEventListener("visibilitychange", live);
    live();

    return () => {
      window.clearTimeout(timer);
      for (const type of ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"]) window.removeEventListener(type, touch);
      window.removeEventListener("scroll", touch);
      window.removeEventListener("focus", live);
      window.removeEventListener("blur", pause);
      document.removeEventListener("visibilitychange", live);
      delete root.dataset.ambient;
    };
  }, []);
  return null;
}
