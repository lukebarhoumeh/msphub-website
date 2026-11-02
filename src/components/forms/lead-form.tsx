"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, Mail, TriangleAlert } from "lucide-react";
import { Choice, Field, Input, Select, Textarea } from "@/components/forms/fields";
import { Button, ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { buildMailto, flowLabels, leadSchema, type LeadFlow, type LeadInput } from "@/lib/lead";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "fallback"; reason: "not_configured" | "delivery_failed" | "rate_limited" | "network"; mailto: string };

type LeadFormProps = {
  flow: LeadFlow;
  submitLabel?: string;
  className?: string;
  /** Preselects a contact topic (e.g. partnership) on the general contact form. */
  defaultTopic?: string;
};

const licenseOptions = [
  "Business Basic",
  "Business Standard",
  "Business Premium",
  "Microsoft 365 E3",
  "Microsoft 365 E5",
  "Microsoft 365 F3",
  "Copilot for Microsoft 365",
  "Teams Phone",
  "Defender",
  "Azure",
  "Dynamics 365",
  "Power BI",
];

function toPayload(form: HTMLFormElement, flow: LeadFlow): Record<string, unknown> {
  const data = new FormData(form);
  const payload: Record<string, unknown> = { flow };
  for (const [key, value] of data.entries()) {
    if (key === "branches" || key === "licenses") {
      const list = (payload[key] as string[] | undefined) ?? [];
      list.push(String(value));
      payload[key] = list;
    } else if (key === "servicesInterest") {
      payload[key] = true;
    } else {
      payload[key] = String(value);
    }
  }
  if (flow === "service" && !payload.branches) payload.branches = [];
  if (flow === "quote" && !payload.licenses) payload.licenses = [];
  if (typeof window !== "undefined") payload.source = window.location.pathname;
  return payload;
}

export function LeadForm({ flow, submitLabel, className, defaultTopic }: LeadFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = toPayload(form, flow);

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });

    const lead: LeadInput = parsed.data;
    const mailto = buildMailto(site.salesEmail, lead);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push(`/thank-you?flow=${flow}`);
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Record<string, string> };
      if (body.fieldErrors) {
        setErrors(body.fieldErrors);
        setStatus({ kind: "idle" });
        return;
      }
      const reason =
        body.error === "not_configured" || body.error === "rate_limited" || body.error === "delivery_failed"
          ? body.error
          : "delivery_failed";
      setStatus({ kind: "fallback", reason, mailto });
    } catch {
      setStatus({ kind: "fallback", reason: "network", mailto });
    }
  }

  const invalid = (name: string) => (errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` } : {});
  const submitting = status.kind === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className={cn("grid gap-5", className)}>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${flow}-website`}>Website</label>
        <input id={`${flow}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" required {...invalid("name")} />
        </Field>
        <Field label="Work email" htmlFor="email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required {...invalid("email")} />
        </Field>
      </div>

      {flow === "demo" ? <DemoFields errors={errors} invalid={invalid} /> : null}
      {flow === "service" ? <ServiceFields errors={errors} invalid={invalid} /> : null}
      {flow === "quote" ? <QuoteFields errors={errors} invalid={invalid} /> : null}
      {flow === "contact" ? <ContactFields errors={errors} invalid={invalid} defaultTopic={defaultTopic} /> : null}

      {status.kind === "fallback" ? (
        <div role="alert" className="rounded-2xl border border-amber-300/40 bg-amber-300/10 p-5 text-sm text-white/85">
          <p className="flex items-start gap-2.5 font-medium text-white">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden />
            {status.reason === "not_configured"
              ? "Email delivery isn't configured on this preview yet, so your message wasn't sent."
              : status.reason === "rate_limited"
                ? "Too many submissions from this network in a short time."
                : "We couldn't send your message just now."}
          </p>
          <p className="mt-2 text-white/70">
            Your details are kept below. Email us directly and we&apos;ll pick it up from there.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href={status.mailto} size="sm">
              <Mail className="size-4" aria-hidden />
              Email {site.salesEmail}
            </ButtonLink>
            <Button variant="glass" size="sm" onClick={() => setStatus({ kind: "idle" })}>
              Try again
            </Button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={submitting} className="min-w-44">
          {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {submitLabel ?? defaultSubmit[flow]}
          {!submitting ? <ArrowRight className="size-4" aria-hidden /> : null}
        </Button>
        <p className="text-[13px] text-white/45">
          Goes to {site.salesEmail}. No newsletters, no sharing your details.
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {submitting ? "Sending your request." : ""}
      </p>
    </form>
  );
}

const defaultSubmit: Record<LeadFlow, string> = {
  demo: "Request a demo",
  service: "Send inquiry",
  quote: "Request my quote",
  contact: "Send message",
};

type FieldsProps = {
  errors: Record<string, string>;
  invalid: (name: string) => Record<string, unknown>;
};

function DemoFields({ errors, invalid }: FieldsProps) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" htmlFor="company" error={errors.company}>
          <Input id="company" name="company" autoComplete="organization" required {...invalid("company")} />
        </Field>
        <Field label="Role" htmlFor="role" optional>
          <Input id="role" name="role" autoComplete="organization-title" placeholder="e.g. IT Director, Owner" />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-white/85">I am</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <Choice type="radio" name="audience" value="msp" label="An MSP or VAR" description="Managing customer tenants" defaultChecked />
          <Choice type="radio" name="audience" value="business" label="A business" description="Managing our own licensing" />
          <Choice type="radio" name="audience" value="csp" label="A direct-bill CSP" description="Evaluating HubX for my own tenant" />
          <Choice type="radio" name="audience" value="other" label="Other" description="Advisor, press, partner" />
        </div>
        {errors.audience ? <p className="mt-2 text-[13px] text-error">{errors.audience}</p> : null}
      </fieldset>
      <Field label="Preferred time" htmlFor="preferredTime" optional hint="Time zone and a couple of windows that work for you.">
        <Input id="preferredTime" name="preferredTime" placeholder="e.g. Tue/Thu mornings, Central Time" />
      </Field>
      <Field label="What should we focus on?" htmlFor="notes" optional>
        <Textarea id="notes" name="notes" placeholder="Tenants, licensing questions, integrations, anything specific." />
      </Field>
    </>
  );
}

function ServiceFields({ errors, invalid }: FieldsProps) {
  return (
    <>
      <Field label="Company" htmlFor="company" error={errors.company}>
        <Input id="company" name="company" autoComplete="organization" required {...invalid("company")} />
      </Field>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-white/85">Which practices?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          <Choice name="branches" value="professional" label="Professional services" description="Migrations, Azure, security, data" />
          <Choice name="branches" value="managed" label="Managed services" description="Monitoring, incident management, SLAs" />
          <Choice name="branches" value="development" label="Development & AI" description="Apps, DevOps, AI development" />
        </div>
        {errors.branches ? <p className="mt-2 text-[13px] text-error">{errors.branches}</p> : null}
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company size" htmlFor="companySize" error={errors.companySize}>
          <Select id="companySize" name="companySize" defaultValue="51-250" {...invalid("companySize")}>
            <option value="1-50">1–50 people</option>
            <option value="51-250">51–250 people</option>
            <option value="251-1000">251–1,000 people</option>
            <option value="1000+">1,000+ people</option>
          </Select>
        </Field>
        <Field label="Timeline" htmlFor="timeline" error={errors.timeline}>
          <Select id="timeline" name="timeline" defaultValue="quarter" {...invalid("timeline")}>
            <option value="now">As soon as possible</option>
            <option value="quarter">This quarter</option>
            <option value="6-months">Within six months</option>
            <option value="exploring">Just exploring</option>
          </Select>
        </Field>
      </div>
      <Field label="What are you trying to get done?" htmlFor="description" error={errors.description}>
        <Textarea id="description" name="description" required placeholder="Current environment, what's changing, and what success looks like." {...invalid("description")} />
      </Field>
    </>
  );
}

function QuoteFields({ errors, invalid }: FieldsProps) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" htmlFor="company" error={errors.company}>
          <Input id="company" name="company" autoComplete="organization" required {...invalid("company")} />
        </Field>
        <Field label="Phone" htmlFor="phone" optional>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Users / seats" htmlFor="seats" error={errors.seats}>
          <Input id="seats" name="seats" type="number" min={1} inputMode="numeric" required {...invalid("seats")} />
        </Field>
        <Field label="Next renewal" htmlFor="renewalDate" optional>
          <Input id="renewalDate" name="renewalDate" type="month" />
        </Field>
        <Field label="Current provider" htmlFor="currentProvider" optional>
          <Input id="currentProvider" name="currentProvider" placeholder="e.g. Microsoft direct, another CSP" />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-white/85">
          Current or planned licenses <span className="font-normal text-white/45">(select all that apply)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {licenseOptions.map((l) => (
            <label
              key={l}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-2 text-sm text-white/80 transition has-[:checked]:border-brand-orange/60 has-[:checked]:bg-brand-orange/12 has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-orange"
            >
              <input type="checkbox" name="licenses" value={l} className="sr-only" />
              {l}
            </label>
          ))}
        </div>
      </fieldset>
      <Choice
        name="servicesInterest"
        value="yes"
        label="Also talk to us about migration or managed services"
        description="Licensing is the entry point; our services team can migrate and run it."
      />
      <Field label="Notes" htmlFor="notes" optional>
        <Textarea id="notes" name="notes" placeholder="Tenants, add-ons, Azure consumption, timing." />
      </Field>
    </>
  );
}

function ContactFields({ errors, invalid, defaultTopic }: FieldsProps & { defaultTopic?: string }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" htmlFor="company" optional>
          <Input id="company" name="company" autoComplete="organization" />
        </Field>
        <Field label="Topic" htmlFor="topic" error={errors.topic}>
          <Select id="topic" name="topic" defaultValue={defaultTopic ?? "general"} {...invalid("topic")}>
            <option value="general">General question</option>
            <option value="sales">Sales</option>
            <option value="billing">Billing question</option>
            <option value="transfer">Partner-to-partner transfer</option>
            <option value="support">Support</option>
            <option value="partnership">Partnership</option>
            <option value="press">Press & media</option>
          </Select>
        </Field>
      </div>
      <Field label="Message" htmlFor="message" error={errors.message}>
        <Textarea id="message" name="message" required placeholder="How can we help?" {...invalid("message")} />
      </Field>
    </>
  );
}

export { flowLabels };
