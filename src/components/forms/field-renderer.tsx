"use client";

import { useFormContext, type FieldErrors } from "react-hook-form";
import { Choice, Field, Input, Select, Textarea } from "@/components/forms/fields";
import type { FieldDef } from "@/lib/lead";
import { cn } from "@/lib/cn";

/**
 * Renders a lead kind's field definitions with react-hook-form. Every field
 * is labelled, errors are tied with `aria-describedby`, and invalid controls
 * carry `aria-invalid` so the first error receives focus on submit.
 */

function messageOf(errors: FieldErrors, name: string): string | undefined {
  const err = errors[name];
  return typeof err?.message === "string" ? err.message : undefined;
}

const gridCols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" } as const;

export function FieldRenderer({ fields, idPrefix }: { fields: FieldDef[]; idPrefix: string }) {
  return (
    <>
      {fields.map((field, i) => (
        <RenderField key={field.type === "row" ? `row-${i}` : field.name} field={field} idPrefix={idPrefix} />
      ))}
    </>
  );
}

function RenderField({ field, idPrefix }: { field: FieldDef; idPrefix: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (field.type === "row") {
    return (
      <div className={cn("grid gap-5", gridCols[field.columns ?? 2])}>
        <FieldRenderer fields={field.fields} idPrefix={idPrefix} />
      </div>
    );
  }

  const id = `${idPrefix}-${field.name}`;
  const error = messageOf(errors, field.name);
  const describedBy = error ? `${id}-error` : "hint" in field && field.hint ? `${id}-hint` : undefined;
  const a11y = { "aria-invalid": error ? true : undefined, "aria-describedby": describedBy };

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
    case "number":
    case "month":
      return (
        <Field label={field.label} htmlFor={id} error={error} hint={field.hint} optional={field.optional}>
          <Input
            id={id}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            min={field.min}
            inputMode={field.type === "number" ? "numeric" : field.type === "tel" ? "tel" : undefined}
            required={!field.optional}
            {...a11y}
            {...register(field.name)}
          />
        </Field>
      );
    case "textarea":
      return (
        <Field label={field.label} htmlFor={id} error={error} hint={field.hint} optional={field.optional}>
          <Textarea id={id} placeholder={field.placeholder} required={!field.optional} {...a11y} {...register(field.name)} />
        </Field>
      );
    case "select":
      return (
        <Field label={field.label} htmlFor={id} error={error} hint={field.hint} optional={field.optional}>
          <Select
            id={id}
            required={!field.optional}
            className={field.placeholder ? "[&:has(option[value='']:checked)]:text-white/50" : undefined}
            {...a11y}
            {...register(field.name)}
          >
            {field.placeholder ? (
              <option value="" disabled>
                {field.placeholder}
              </option>
            ) : null}
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      );
    case "radio":
      return (
        <fieldset aria-describedby={error ? `${id}-error` : undefined} aria-invalid={error ? true : undefined}>
          <legend className="mb-2 text-sm font-medium text-white/85">{field.legend}</legend>
          <div className={cn("grid gap-3", gridCols[field.columns ?? 2])}>
            {field.options.map((o) => (
              <Choice key={o.value} type="radio" value={o.value} label={o.label} description={o.description} {...register(field.name)} />
            ))}
          </div>
          {error ? (
            <p id={`${id}-error`} className="mt-2 text-[13px] text-error">
              {error}
            </p>
          ) : null}
        </fieldset>
      );
    case "checkboxes":
      return (
        <fieldset aria-describedby={error ? `${id}-error` : undefined} aria-invalid={error ? true : undefined}>
          <legend className="mb-2 text-sm font-medium text-white/85">
            {field.legend}
            {field.hint ? <span className="ml-1.5 font-normal text-white/65">({field.hint})</span> : null}
          </legend>
          {field.variant === "chips" ? (
            <div className="flex flex-wrap gap-2">
              {field.options.map((o) => (
                <label
                  key={o.value}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-2 text-sm text-white/80 transition has-[:checked]:border-brand-orange/60 has-[:checked]:bg-brand-orange/12 has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-orange"
                >
                  <input type="checkbox" value={o.value} className="sr-only" {...register(field.name)} />
                  {o.label}
                </label>
              ))}
            </div>
          ) : (
            <div className={cn("grid gap-3", gridCols[field.columns ?? 3])}>
              {field.options.map((o) => (
                <Choice key={o.value} type="checkbox" value={o.value} label={o.label} description={o.description} {...register(field.name)} />
              ))}
            </div>
          )}
          {error ? (
            <p id={`${id}-error`} className="mt-2 text-[13px] text-error">
              {error}
            </p>
          ) : null}
        </fieldset>
      );
    case "checkbox":
      return <Choice type="checkbox" label={field.label} description={field.description} {...register(field.name)} />;
  }
}
