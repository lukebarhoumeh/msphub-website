"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { FormProvider, useForm, type FieldValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail, TriangleAlert } from "lucide-react";
import { FieldRenderer } from "@/components/forms/field-renderer";
import { Turnstile, turnstileSiteKey, type TurnstileState } from "@/components/forms/turnstile";
import { Button, ButtonLink } from "@/components/ui/button";
import { formFootnote, formMessages } from "@/content/forms";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  buildMailto,
  flattenFields,
  leadKinds,
  parseLead,
  thankYouPath,
  type FieldDef,
  type LeadInput,
  type LeadKind,
  type LeadKindDef,
} from "@/lib/lead";

/**
 * The shared lead form (react-hook-form + zod + Turnstile + honeypot). Every
 * form on the site is `<LeadForm kind="…" />`; the kind's schema and fields
 * come from the registry in `src/lib/lead.ts`, so the client and
 * `POST /api/lead` validate identically.
 *
 * `children` render inside the form (and inside react-hook-form's
 * `FormProvider`), so a page can add kind-specific controls such as an
 * invoice upload: use `useFormContext()` to `setValue("invoiceId", id)`, or
 * drop in plain inputs — any named control inside the <form> that the
 * registry does not manage is sent along with the submission.
 */

export type LeadFormFallbackReason = "not_configured" | "delivery_failed" | "rate_limited" | "captcha_failed" | "network";

export type LeadFormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "fallback"; reason: LeadFormFallbackReason; mailto: string };

type LeadFormContextValue = {
  kind: LeadKind;
  status: LeadFormStatus;
  /** Shows the fallback panel with a custom reason (e.g. after an upload problem). */
  fail: (reason: LeadFormFallbackReason) => void;
};

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

/** Access the surrounding LeadForm's kind and status from a child control. */
export function useLeadForm(): LeadFormContextValue {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used inside <LeadForm>");
  return ctx;
}

export type LeadFormProps = {
  kind: LeadKind;
  submitLabel?: string;
  className?: string;
  /** Pre-filled values, e.g. `{ topic: "partnership" }` from `/contact?topic=`. */
  defaultValues?: Record<string, unknown>;
  /** Where to go after a successful submission (defaults to the kind's thank-you page). */
  successPath?: string;
  /** Extra controls rendered between the kind's fields and the submit row. */
  children?: ReactNode;
  /** Pearl forms sit on a light page. Ink forms keep the dark field styles. */
  surface?: "ink" | "pearl";
};

function defaultsFor(fields: FieldDef[]): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};
  for (const f of flattenFields(fields)) {
    switch (f.type) {
      case "checkboxes":
        defaults[f.name] = [];
        break;
      case "checkbox":
        defaults[f.name] = false;
        break;
      case "radio":
        defaults[f.name] = f.options[0]?.value ?? "";
        break;
      case "select":
        defaults[f.name] = f.placeholder ? "" : (f.options[0]?.value ?? "");
        break;
      default:
        defaults[f.name] = "";
    }
  }
  return defaults;
}

const fallbackCopy: Record<LeadFormFallbackReason, string> = {
  not_configured: formMessages.notConfigured,
  rate_limited: formMessages.rateLimited,
  captcha_failed: formMessages.captchaFailed,
  delivery_failed: formMessages.failed,
  network: formMessages.failed,
};

export function LeadForm({ kind, submitLabel, className, defaultValues, successPath, children, surface = "ink" }: LeadFormProps) {
  const def: LeadKindDef = leadKinds[kind];
  const router = useRouter();
  const idPrefix = useId().replace(/[^a-zA-Z0-9]/g, "");
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<LeadFormStatus>({ kind: "idle" });

  const token = useRef<string | null>(null);
  const tokenWaiters = useRef<((t: string | null) => void)[]>([]);
  const turnstileState = useRef<TurnstileState>(turnstileSiteKey ? "loading" : "unconfigured");

  const onToken = useCallback((t: string | null) => {
    token.current = t;
    if (t) {
      tokenWaiters.current.splice(0).forEach((resolve) => resolve(t));
    }
  }, []);
  const onTurnstileState = useCallback((s: TurnstileState) => {
    turnstileState.current = s;
    if (s === "error" || s === "unconfigured") tokenWaiters.current.splice(0).forEach((resolve) => resolve(null));
  }, []);

  /** The current token, waiting briefly if the widget is still solving. */
  const awaitToken = useCallback((timeoutMs: number) => {
    if (token.current || turnstileState.current !== "loading") return Promise.resolve(token.current);
    return new Promise<string | null>((resolve) => {
      const timer = setTimeout(() => resolve(token.current), timeoutMs);
      tokenWaiters.current.push((t) => {
        clearTimeout(timer);
        resolve(t);
      });
    });
  }, []);

  const form = useForm<FieldValues>({
    resolver: zodResolver(def.schema) as Resolver<FieldValues>,
    defaultValues: useMemo(() => ({ ...defaultsFor(def.fields), ...defaultValues }), [def.fields, defaultValues]),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const deliver = async (values: FieldValues) => {
    const el = formRef.current;
    // Named controls inside the <form> that the registry does not manage (e.g. an upload's hidden inputs).
    const extras: Record<string, string> = {};
    if (el) {
      for (const [name, value] of new FormData(el).entries()) {
        if (!(name in values) && name !== "website" && !name.startsWith("cf-") && typeof value === "string") extras[name] = value;
      }
    }
    const payload: Record<string, unknown> = {
      ...extras,
      ...values,
      kind,
      website: honeypotRef.current?.value ?? "",
      source: window.location.pathname,
    };

    const parsed = parseLead(payload);
    if (!parsed.ok) {
      for (const [name, message] of Object.entries(parsed.fieldErrors)) form.setError(name, { type: "validate", message });
      return;
    }
    const lead: LeadInput = parsed.lead;
    const mailto = buildMailto(site.salesEmail, lead);

    setStatus({ kind: "submitting" });
    payload.turnstileToken = (await awaitToken(10_000)) ?? "";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        track(def.analyticsEvent, { kind });
        router.push(successPath ?? thankYouPath(kind));
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Record<string, string> };
      if (body.fieldErrors) {
        for (const [name, message] of Object.entries(body.fieldErrors)) form.setError(name, { type: "server", message });
        setStatus({ kind: "idle" });
        el?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
        return;
      }
      const reason: LeadFormFallbackReason =
        body.error === "not_configured" || body.error === "rate_limited" || body.error === "delivery_failed" || body.error === "captcha_failed"
          ? body.error
          : "delivery_failed";
      setStatus({ kind: "fallback", reason, mailto });
    } catch {
      setStatus({ kind: "fallback", reason: "network", mailto });
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => form.handleSubmit(deliver)(event);

  const submitting = status.kind === "submitting";
  const context: LeadFormContextValue = {
    kind,
    status,
    fail: (reason) => {
      const current = parseLead({ ...form.getValues(), kind });
      setStatus({ kind: "fallback", reason, mailto: current.ok ? buildMailto(site.salesEmail, current.lead) : `mailto:${site.salesEmail}` });
    },
  };

  return (
    <LeadFormContext.Provider value={context}>
      <FormProvider {...form}>
        <form ref={formRef} onSubmit={onSubmit} noValidate data-surface={surface} className={cn("grid gap-5", className)} aria-busy={submitting}>
          {/* Honeypot: hidden from people, tempting to bots. Not part of the schema. */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor={`${idPrefix}-website`}>Website</label>
            <input ref={honeypotRef} id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <FieldRenderer fields={def.fields} idPrefix={idPrefix} />

          {children}

          <Turnstile onToken={onToken} onStateChange={onTurnstileState} />

          {status.kind === "fallback" ? (
            <div role="alert" className="rounded-2xl border border-amber-300/40 bg-amber-300/10 p-5 text-sm text-white/85">
              <p className="flex items-start gap-2.5 font-medium text-white">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden />
                {fallbackCopy[status.reason]}
              </p>
              <p className="mt-2 text-white/70">{formMessages.keptBelow}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href={status.mailto} size="sm">
                  <Mail className="size-4" aria-hidden />
                  {formMessages.emailUs} {site.salesEmail}
                </ButtonLink>
                <Button variant="glass" size="sm" onClick={() => setStatus({ kind: "idle" })}>
                  {formMessages.tryAgain}
                </Button>
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={submitting} className="min-w-44">
              {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
              {submitLabel ?? def.submitLabel}
              {!submitting ? <ArrowRight className="size-4" aria-hidden /> : null}
            </Button>
            <p className="text-[13px] text-white/65">
              Goes to {site.salesEmail}. {formFootnote}
            </p>
          </div>
          <p aria-live="polite" className="sr-only">
            {submitting ? formMessages.sending : ""}
          </p>
        </form>
      </FormProvider>
    </LeadFormContext.Provider>
  );
}
