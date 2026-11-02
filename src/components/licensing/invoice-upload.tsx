"use client";

import { useId, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { CheckCircle2, FileText, Info, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { invoiceUpload } from "@/content/licensing";
import { cn } from "@/lib/cn";

/**
 * Secure invoice upload for the switch and quote forms (handoff §8).
 *
 * Contract with `POST /api/upload` (server side owned by the plumbing phase):
 *   request  multipart/form-data: `file` (PDF/XLSX/XLS/CSV ≤ 10 MB), `kind` ("switch" | "quote")
 *   200      { ok: true, file: { id, name, size, type } }   `id` is an opaque reference, never a URL
 *   4xx/5xx  { ok: false, error: "invalid_file" | "unsupported_type" | "too_large" | "rate_limited" | "not_configured" | "upload_failed" }
 *
 * The lead then carries `invoiceId`, `invoiceName`, `invoiceSize` as hidden
 * fields, and the lead handler turns the id into a signed, expiring link.
 * When the endpoint is missing (404/405), unconfigured (503), or unreachable,
 * the component says so plainly and the form stays submittable without a file.
 */

type UploadedFile = { id: string; name: string; size: number; type: string };

type State =
  | { kind: "idle" }
  | { kind: "uploading"; name: string }
  | { kind: "done"; file: UploadedFile }
  | { kind: "unavailable" }
  | { kind: "error"; message: string };

type InvoiceUploadProps = {
  /** Which form the file belongs to; forwarded to the endpoint. */
  kind: "switch" | "quote";
  label?: string;
  className?: string;
};

const unavailableStatuses = new Set([404, 405, 501, 503]);

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extensionOf(name: string): string {
  return name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
}

function validate(file: File): string | null {
  const typeOk = invoiceUpload.mimeTypes.includes(file.type) || invoiceUpload.extensions.includes(extensionOf(file.name));
  if (!typeOk) return `That file type isn't supported. ${invoiceUpload.hint}`;
  if (file.size > invoiceUpload.maxBytes) return `That file is ${formatSize(file.size)}; the limit is 10 MB.`;
  if (file.size === 0) return "That file is empty.";
  return null;
}

export function InvoiceUpload({ kind, label = "Current Microsoft invoice", className }: InvoiceUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>({ kind: "idle" });
  const [dragging, setDragging] = useState(false);

  async function upload(file: File) {
    const problem = validate(file);
    if (problem) {
      setState({ kind: "error", message: problem });
      return;
    }
    setState({ kind: "uploading", name: file.name });
    const body = new FormData();
    body.append("file", file);
    body.append("kind", kind);
    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      if (unavailableStatuses.has(res.status)) {
        setState({ kind: "unavailable" });
        return;
      }
      const json = (await res.json().catch(() => null)) as { ok?: boolean; file?: UploadedFile; error?: string } | null;
      if (res.ok && json?.ok && json.file?.id) {
        setState({ kind: "done", file: { ...json.file, name: json.file.name || file.name, size: json.file.size ?? file.size } });
        return;
      }
      if (json?.error === "not_configured" || json === null) {
        setState({ kind: "unavailable" });
        return;
      }
      setState({
        kind: "error",
        message:
          json?.error === "too_large"
            ? "That file is over the 10 MB limit."
            : json?.error === "unsupported_type"
              ? `That file type isn't supported. ${invoiceUpload.hint}`
              : json?.error === "rate_limited"
                ? "Too many uploads from this network in a short time. Try again in a few minutes, or submit without the file."
                : "The upload didn't go through. Try again, or submit without the file and we'll send you a secure way to share it.",
      });
    } catch {
      setState({ kind: "unavailable" });
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void upload(file);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void upload(file);
  }

  function reset() {
    if (inputRef.current) inputRef.current.value = "";
    setState({ kind: "idle" });
  }

  const hintId = `${id}-hint`;
  const statusId = `${id}-status`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-sm font-medium text-white/85" id={`${id}-label`}>
        {label} <span className="ml-1.5 font-normal text-white/65">(optional)</span>
      </span>

      {state.kind === "done" ? (
        <div className="flex items-center gap-3 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-sm text-white">
          <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden />
          <span className="min-w-0 flex-1 truncate">
            <span className="font-medium">{state.file.name}</span>
            <span className="text-white/65"> · {formatSize(state.file.size)} · uploaded securely</span>
          </span>
          <button
            type="button"
            onClick={reset}
            aria-label={`Remove ${state.file.name}`}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" aria-hidden />
          </button>
          <input type="hidden" name="invoiceId" value={state.file.id} />
          <input type="hidden" name="invoiceName" value={state.file.name} />
          <input type="hidden" name="invoiceSize" value={String(state.file.size)} />
        </div>
      ) : state.kind === "unavailable" ? (
        <div className="rounded-xl border border-white/12 bg-white/5 px-4 py-3.5 text-sm text-white/80">
          <p className="flex items-start gap-2.5">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden />
            <span>
              <span className="font-medium text-white">Secure upload isn&apos;t switched on for this site yet.</span> Send the form without
              the file and we reply with a secure way to share your invoice.
            </span>
          </p>
          <button type="button" onClick={reset} className="mt-2 ml-[26px] text-[13px] font-medium text-white/70 underline-offset-4 hover:text-white hover:underline">
            Try the upload again
          </button>
        </div>
      ) : (
        <label
          htmlFor={`${id}-file`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex cursor-pointer items-center gap-4 rounded-xl border border-dashed px-4 py-4 text-sm transition",
            dragging ? "border-brand-orange/70 bg-brand-orange/10" : "border-white/20 bg-white/4 hover:border-white/35 hover:bg-white/6",
            state.kind === "uploading" && "cursor-progress",
            "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-orange",
          )}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-[10px] border border-brand-orange/30 bg-brand-orange/12 text-brand-orange">
            {state.kind === "uploading" ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Upload className="size-5" aria-hidden />}
          </span>
          <span className="min-w-0 flex-1">
            {state.kind === "uploading" ? (
              <span className="block truncate font-medium text-white">Uploading {state.name}…</span>
            ) : (
              <span className="block font-medium text-white">
                <span className="hidden sm:inline">Drop your invoice here, or </span>
                <span className="text-brand-orange">choose a file</span>
              </span>
            )}
            <span id={hintId} className="mt-0.5 block text-[13px] text-white/65">
              {invoiceUpload.hint} Stored privately; shared only with the deal desk.
            </span>
          </span>
          <FileText className="hidden size-5 shrink-0 text-white/40 sm:block" aria-hidden />
          <input
            ref={inputRef}
            id={`${id}-file`}
            type="file"
            accept={invoiceUpload.accept}
            onChange={onChange}
            disabled={state.kind === "uploading"}
            aria-labelledby={`${id}-label`}
            aria-describedby={state.kind === "error" ? `${hintId} ${statusId}` : hintId}
            className="sr-only"
          />
        </label>
      )}

      <p id={statusId} aria-live="polite" className={cn("text-[13px]", state.kind === "error" ? "text-error" : "sr-only")}>
        {state.kind === "error" ? state.message : state.kind === "uploading" ? "Uploading your invoice." : state.kind === "done" ? "Invoice uploaded." : ""}
      </p>
      {state.kind === "error" ? (
        <Button variant="ghost" size="sm" onClick={reset} className="justify-start self-start px-0">
          Choose a different file
        </Button>
      ) : null}
    </div>
  );
}
