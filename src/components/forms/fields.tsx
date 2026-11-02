import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-white/50 transition focus:border-brand-orange/60 focus:bg-white/8 focus:outline-none aria-invalid:border-error/70";

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Field({ label, htmlFor, hint, error, optional, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-white/85">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-white/65">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-[13px] text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-[13px] text-white/65">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={cn(control, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-[120px] resize-y", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<"select">) {
  return (
    <select className={cn(control, "appearance-none bg-[url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>\")] bg-[length:16px] bg-[position:right_14px_center] bg-no-repeat pr-10 [&>option]:bg-ink", className)} {...rest}>
      {children}
    </select>
  );
}

type ChoiceProps = ComponentProps<"input"> & { label: string; description?: string };

/** Checkbox or radio rendered as a selectable glass tile. */
export function Choice({ label, description, className, type = "checkbox", ...rest }: ChoiceProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-[15px] text-white/85 transition has-[:checked]:border-brand-orange/60 has-[:checked]:bg-brand-orange/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-orange",
        className,
      )}
    >
      <input type={type} className="mt-1 size-4 shrink-0 accent-brand-orange" {...rest} />
      <span>
        <span className="block font-medium text-white">{label}</span>
        {description ? <span className="block text-[13px] text-white/55">{description}</span> : null}
      </span>
    </label>
  );
}
