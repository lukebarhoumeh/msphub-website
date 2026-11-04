"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { findGroups, findIndex, type FindEntry, type FindGroup } from "@/content/find-index";
import { cn } from "@/lib/cn";

/**
 * Quick Find palette (spec §2.3). A native `<dialog>` opened with
 * `showModal()`, so the focus trap, Escape, and the backdrop come from the
 * browser; the fade lives in globals.css (`dialog.quick-find`) and is removed
 * under reduced motion. This module is only ever loaded by `QuickFindMount`
 * on the first open, so it and the index ship in their own chunk.
 */

const LIMIT = 12;
const EMPTY_GROUPS: readonly FindGroup[] = ["Audiences", "Actions"];
const mono = "font-mono text-[11px] tracking-[0.12em] text-[#8e98ae] uppercase";

/* ------------------------------------------------------------------ */
/* Scoring                                                              */
/* ------------------------------------------------------------------ */

type Indexed = { entry: FindEntry; label: string; words: string[]; haystack: string };

const groupRank = new Map<FindGroup, number>(findGroups.map((group, i) => [group, i]));

/** The index, lower-cased once and guaranteed to sit in group order (ties in the scorer fall back to this order). */
const indexed: Indexed[] = findIndex
  .map((entry, order) => ({ entry, order }))
  .sort((a, b) => (groupRank.get(a.entry.group) ?? 99) - (groupRank.get(b.entry.group) ?? 99) || a.order - b.order)
  .map(({ entry }) => {
    const label = entry.label.toLowerCase();
    return {
      entry,
      label,
      words: label.split(/[^a-z0-9]+/).filter(Boolean),
      haystack: [entry.description ?? "", ...(entry.keywords ?? [])].join("\n").toLowerCase(),
    };
  });

/** label prefix 3 · label word-prefix 2 · label substring 1 · keyword or description substring 0.5 · no match 0. */
function scoreToken(item: Indexed, token: string): number {
  if (item.label.startsWith(token)) return 3;
  if (item.words.some((word) => word.startsWith(token))) return 2;
  if (item.label.includes(token)) return 1;
  if (item.haystack.includes(token)) return 0.5;
  return 0;
}

/** Every token must match somewhere; token scores sum; ties keep group order, then index order (stable sort). */
function search(query: string): FindEntry[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return indexed.filter((item) => EMPTY_GROUPS.includes(item.entry.group)).map((item) => item.entry);
  const scored: { entry: FindEntry; score: number }[] = [];
  for (const item of indexed) {
    let total = 0;
    for (const token of tokens) {
      const score = scoreToken(item, token);
      if (score === 0) {
        total = 0;
        break;
      }
      total += score;
    }
    if (total > 0) scored.push({ entry: item.entry, score: total });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, LIMIT).map((hit) => hit.entry);
}

/* ------------------------------------------------------------------ */
/* Dialog shell                                                         */
/* ------------------------------------------------------------------ */

type QuickFindProps = {
  open: boolean;
  onClose: () => void;
};

export function QuickFind({ open, onClose }: QuickFindProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector("input")?.focus();
    // A modal dialog makes the page inert, but most browsers still wheel-scroll it. Lock the root rather than
    // body: the header's mobile sheet owns body overflow, and the two locks must not restore over each other.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousGutter = root.style.scrollbarGutter;
    if (window.innerWidth > root.clientWidth) root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
      if (dialog.open) dialog.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="quick-find"
      aria-label="Quick Find"
      onClose={() => {
        // `close` is queued as a task, so it can arrive after the dialog has opened again (React re-runs the
        // effect in development, and a fast re-open does the same). Only a dialog that is still closed means closed.
        if (!dialogRef.current?.open) onClose();
      }}
      onPointerDown={(event) => {
        // The dialog fills the viewport; a press on it (outside the panel) is a backdrop click.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {open ? <Panel onClose={onClose} /> : null}
    </dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Panel                                                                */
/* ------------------------------------------------------------------ */

type GroupRows = { group: FindGroup; entries: FindEntry[]; offset: number };

function Panel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => search(query.trim()), [query]);
  // Groups appear in the order of their best match (rows are score-sorted, ties in group order), so the best
  // result is row 0. The highlight, the announced option, and Enter all read this one drawn order.
  const groups = useMemo(() => {
    const out: GroupRows[] = [];
    let offset = 0;
    for (const group of new Set(rows.map((entry) => entry.group))) {
      const entries = rows.filter((entry) => entry.group === group);
      out.push({ group, entries, offset });
      offset += entries.length;
    }
    return out;
  }, [rows]);
  const ordered = useMemo(() => groups.flatMap((g) => g.entries), [groups]);

  const activeIndex = ordered.length === 0 ? -1 : Math.min(active, ordered.length - 1);
  const activeId = activeIndex >= 0 ? `qf-opt-${activeIndex}` : undefined;

  const activate = (entry: FindEntry) => {
    if (/^https?:\/\//.test(entry.href)) window.location.assign(entry.href);
    else router.push(entry.href);
    onClose();
  };

  const moveTo = (index: number) => {
    setActive(index);
    document.getElementById(`qf-opt-${index}`)?.scrollIntoView({ block: "nearest" });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setActive(0);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    const count = ordered.length;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (count) moveTo((activeIndex + 1) % count);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (count) moveTo((activeIndex - 1 + count) % count);
        break;
      case "Home":
        event.preventDefault();
        if (count) moveTo(0);
        break;
      case "End":
        event.preventDefault();
        if (count) moveTo(count - 1);
        break;
      case "Enter": {
        event.preventDefault();
        const entry = ordered[activeIndex];
        if (entry) activate(entry);
        break;
      }
      case "Escape":
        event.preventDefault();
        onClose();
        break;
    }
  };

  return (
    <div className="mx-auto mt-[12vh] flex max-h-[min(70vh,560px)] w-[min(640px,calc(100%-32px))] flex-col overflow-hidden rounded-[18px] border border-white/13 bg-[#12192b] text-white shadow-[0_24px_64px_rgba(0,0,0,.45)]">
      <div className="qf-search flex h-14 shrink-0 items-center gap-3 border-b border-white/10 px-4">
        <Search className="size-[18px] shrink-0 text-[#8e98ae]" aria-hidden />
        <input
          type="text"
          role="combobox"
          aria-label="Quick Find"
          aria-expanded="true"
          aria-controls="qf-list"
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          placeholder="Find a page, an action, or an audience…"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-[#8e98ae]"
        />
        <button
          type="button"
          onClick={onClose}
          className={cn(mono, "shrink-0 rounded-md border border-white/13 px-1.5 py-0.5 transition-colors duration-150 hover:text-white")}
        >
          Esc<span className="sr-only">, close Quick Find</span>
        </button>
      </div>

      <div
        id="qf-list"
        ref={listRef}
        role="listbox"
        aria-label="Results"
        onMouseDown={(event) => event.preventDefault()}
        className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", rows.length > 0 && "p-2")}
      >
        {groups.map(({ group, entries, offset }) => (
          <ul key={group} role="group" aria-label={group}>
            <li role="presentation" aria-hidden="true" className={cn(mono, "px-3 pt-3 pb-1")}>
              {group}
            </li>
            {entries.map((entry, i) => {
              const index = offset + i;
              const isActive = index === activeIndex;
              return (
                <li
                  key={`${entry.group}:${entry.href}`}
                  id={`qf-opt-${index}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => {
                    if (!isActive) setActive(index);
                  }}
                  onClick={() => activate(entry)}
                  className={cn(
                    "relative flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-2",
                    isActive && "bg-white/8 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-0.5 before:rounded-full before:bg-[#f97316]",
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] leading-snug font-semibold text-white">{entry.label}</span>
                    {entry.description ? <span className="mt-0.5 block truncate text-[13.5px] text-[#b8c0d4]">{entry.description}</span> : null}
                  </span>
                  {isActive ? (
                    <span aria-hidden className="shrink-0 font-mono text-[11px] text-[#8e98ae]">
                      ↵
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ))}
      </div>

      <p role="status" className={rows.length === 0 ? "px-5 py-7 text-[15px] text-[#b8c0d4]" : "sr-only"}>
        {rows.length === 0 ? (
          <>
            No matches for “{query.trim()}”.
            <span className="mt-1 block text-[13.5px] text-[#8e98ae]">Try “quote”, “transfer”, or “demo”.</span>
          </>
        ) : null}
      </p>
    </div>
  );
}
