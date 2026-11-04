"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { QUICK_FIND_EVENT } from "@/lib/quick-find";

/**
 * Mounted once in the root layout. Owns the ⌘K / Ctrl+K shortcut and the
 * `QUICK_FIND_EVENT` listener (what the header button and the sheet row
 * dispatch via `openQuickFind()`), and loads the palette module on the first
 * open only, so neither the palette nor its index ships on first paint.
 */
const QuickFind = dynamic(() => import("./quick-find").then((mod) => mod.QuickFind), { ssr: false });

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function QuickFindMount() {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const show = () => {
      setRequested(true);
      setOpen(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey || event.repeat) return;
      if (event.key.toLowerCase() !== "k" && event.code !== "KeyK") return;
      if (isEditable(event.target)) return;
      event.preventDefault();
      show();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(QUICK_FIND_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(QUICK_FIND_EVENT, show);
    };
  }, []);

  if (!requested) return null;
  return <QuickFind open={open} onClose={() => setOpen(false)} />;
}
