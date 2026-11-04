"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { BorderBeam } from "@/components/ink/atmosphere";
import { Spotlight } from "@/components/ink/motion";
import { capturedLabel, captures, truthLabel, type Capture, type CaptureId } from "@/content/evidence";
import { cn } from "@/lib/cn";

/** A declared crop as a plain `<img>`; frames in `device-frame.tsx` and the bezel below wrap it. */
export function CaptureImage({ capture, className, priority = false }: { capture: Capture; className?: string; priority?: boolean }) {
  return (
    // Real captures stay off the Next image optimizer so the crop is not recompressed.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={capture.crop.src}
      alt={capture.alt}
      width={capture.crop.width}
      height={capture.crop.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("h-auto w-full max-w-[400px] rounded-[10px]", className)}
    />
  );
}

export function EvidenceCaption({ capture, inViewer = false }: { capture: Capture; inViewer?: boolean }) {
  return (
    <figcaption className="mt-3 grid gap-1">
      <p className="font-mono text-[11px] tracking-[0.12em] uppercase opacity-70">{truthLabel}</p>
      <p className="text-sm text-current">{capture.screenName}</p>
      {inViewer ? <p className="font-mono text-[11px] tracking-[0.12em] uppercase opacity-70">{capturedLabel}</p> : null}
    </figcaption>
  );
}

export function EvidenceBezel({ capture, tilt = false, beam = false, priority = false, className }: { capture: Capture; tilt?: boolean; beam?: boolean; priority?: boolean; className?: string }) {
  return (
    <div className={cn("relative w-full max-w-[420px]", tilt && "tilt tilt-hero", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(circle,rgba(249,115,22,.34),transparent_68%)]"
      />
      <Spotlight className="overflow-hidden rounded-[18px] border border-white/14 bg-[#12192b] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_24px_64px_rgba(0,0,0,.28)]">
        <CaptureImage capture={capture} priority={priority} />
        {beam ? <BorderBeam duration={10} /> : null}
      </Spotlight>
    </div>
  );
}

function EvidenceViewer({
  capture,
  onClose,
}: {
  capture: Capture;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = [...root.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-[#0b1020]/80 p-4 sm:p-8" role="presentation" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="mx-auto flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-[18px] bg-[#12192b] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div>
            <p id={titleId} className="font-semibold">
              {capture.screenName}
            </p>
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#b8c0d4] uppercase">{capturedLabel}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-white"
          >
            <X className="size-5" aria-hidden />
            <span className="sr-only">Close full screen</span>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={capture.full.src}
            alt={capture.alt}
            width={capture.full.width}
            height={capture.full.height}
            className="h-auto max-w-none"
            style={{ width: capture.full.width }}
          />
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#b8c0d4]">{capture.takeaway}</p>
          <EvidenceCaption capture={capture} inViewer />
        </div>
      </div>
    </div>
  );
}

/** `accent={false}` gives "View full screen" a neutral underline where the viewport's orange is already spent. */
export function EvidenceFigure({ capture, tone = "ink", accent = true }: { capture: Capture; tone?: "ink" | "pearl"; accent?: boolean }) {
  const [open, setOpen] = useState(false);
  const pearl = tone === "pearl";
  return (
    <figure className={cn("m-0", pearl ? "text-[#0b1020]" : "text-white")}>
      <EvidenceBezel capture={capture} />
      <p className={cn("mt-4 max-w-[42ch] text-[15px] leading-relaxed", pearl ? "text-[#4b5569]" : "text-[#b8c0d4]")}>{capture.takeaway}</p>
      <EvidenceCaption capture={capture} />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "mt-3 inline-flex h-11 items-center text-sm font-semibold underline decoration-2 underline-offset-[5px]",
          accent ? (pearl ? "decoration-[#f97316]" : "decoration-[#ffb05c]") : pearl ? "decoration-[#0b1020]/25" : "decoration-white/30",
        )}
      >
        View full screen
      </button>
      {open ? <EvidenceViewer capture={capture} onClose={() => setOpen(false)} /> : null}
    </figure>
  );
}

/** User-controlled evidence. Desktop swaps one pane. Mobile stacks every crop. No autoplay. */
export function EvidenceStage({ ids, tone = "ink" }: { ids: readonly CaptureId[]; tone?: "ink" | "pearl" }) {
  const baseId = useId();
  const [index, setIndex] = useState(0);
  const items = ids.map((id) => captures[id]);
  const pearl = tone === "pearl";
  const label = pearl ? "text-[#0b1020]" : "text-white";
  const muted = pearl ? "text-[#4b5569]" : "text-[#b8c0d4]";

  return (
    <div>
      <div className="md:hidden">
        <ul className="grid gap-12">
          {items.map((capture) => (
            <li key={capture.id}>
              <EvidenceFigure capture={capture} tone={tone} />
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:grid md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-10">
        <div role="tablist" aria-label="HubX evidence" className="grid content-start gap-1">
          {items.map((capture, i) => {
            const selected = i === index;
            return (
              <button
                key={capture.id}
                id={`${baseId}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => {
                  const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? i + 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : null;
                  if (next === null) return;
                  e.preventDefault();
                  const target = (next + items.length) % items.length;
                  setIndex(target);
                  document.getElementById(`${baseId}-tab-${target}`)?.focus();
                }}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-[15px] font-semibold",
                  selected ? (pearl ? "bg-white" : "bg-white/8") : "hover:bg-white/5",
                  label,
                )}
              >
                <span aria-hidden className={cn("size-1.5 rounded-full", selected ? "bg-[#f97316]" : "bg-current opacity-30")} />
                {capture.screenName}
              </button>
            );
          })}
        </div>
        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${index}`} className="motion-safe:transition-opacity motion-safe:duration-200">
          <EvidenceFigure capture={items[index]} tone={tone} />
          <p className={cn("sr-only", muted)}>{items[index].takeaway}</p>
        </div>
      </div>
    </div>
  );
}
