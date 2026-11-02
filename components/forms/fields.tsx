"use client";

import * as React from "react";

import { Check, ChevronDown, CircleAlert } from "lucide-react";

import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { controlBase, controlHeight } from "./styles";

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm font-medium text-destructive">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (aria: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    "aria-required": boolean | undefined;
  }) => React.ReactNode;
};

/** Label + control + hint + error, wired with aria-describedby. */
function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: FieldShellProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[15px] font-medium text-foreground">
        {label}{" "}
        <span className="font-normal text-muted-foreground">
          {required ? "(required)" : "(optional)"}
        </span>
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required ? true : undefined,
      })}
      {hint ? (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={errorId!}>{error}</FieldError> : null}
    </div>
  );
}

type BaseProps = Omit<FieldShellProps, "children" | "id"> & { name: string };

export function TextField({
  name,
  label,
  required,
  hint,
  error,
  className,
  type = "text",
  autoComplete,
  defaultValue,
  inputMode,
}: BaseProps & {
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  defaultValue?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const uid = React.useId();
  const id = `${uid}-${name}`;
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      {(aria) => (
        <Input
          {...aria}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          inputMode={inputMode}
          required={required}
          className={cn(controlBase, controlHeight)}
        />
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  name,
  label,
  required,
  hint,
  error,
  className,
  rows = 5,
}: BaseProps & { rows?: number }) {
  const uid = React.useId();
  const id = `${uid}-${name}`;
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      {(aria) => (
        <textarea
          {...aria}
          name={name}
          rows={rows}
          required={required}
          className={cn(controlBase, "py-3")}
        />
      )}
    </FieldShell>
  );
}

export type SelectOption = { value: string; label: string };

export function SelectField({
  name,
  label,
  required,
  hint,
  error,
  className,
  options,
  placeholder = "Choose one",
  defaultValue = "",
}: BaseProps & {
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
}) {
  const uid = React.useId();
  const id = `${uid}-${name}`;
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      {(aria) => (
        <div className="relative">
        <select
          {...aria}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className={cn(controlBase, controlHeight, "appearance-none pr-10")}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
          <ChevronDown aria-hidden="true" strokeWidth={1.75} className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      )}
    </FieldShell>
  );
}

/** Group of checkboxes inside a fieldset/legend. Values are read with FormData.getAll(name). */
export function CheckboxGroupField({
  name,
  legend,
  options,
  error,
  hint,
  className,
}: {
  name: string;
  legend: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  className?: string;
}) {
  const uid = React.useId();
  const errorId = error ? `${uid}-error` : undefined;
  const hintId = hint ? `${uid}-hint` : undefined;
  return (
    <fieldset
      className={cn("flex flex-col gap-2", className)}
      aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend className="mb-1 text-[15px] font-medium text-foreground">{legend}</legend>
      {hint ? (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <div className="grid gap-0.5 sm:grid-cols-2">
        {options.map((o) => {
          const id = `${uid}-${o.value}`;
          return (
            <label
              key={o.value}
              htmlFor={id}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-sm px-1 text-sm text-foreground hover:bg-accent"
            >
              <Checkbox id={id} name={name} value={o.value} />
              {o.label}
            </label>
          );
        })}
      </div>
      {error ? <FieldError id={errorId!}>{error}</FieldError> : null}
    </fieldset>
  );
}

/** 20px checkbox, radius-xs, 1px border-strong; checked = primary fill + check. */
export function Checkbox({
  id,
  name,
  value,
  defaultChecked,
  checked,
  onChange,
  ...aria
}: {
  id: string;
  name: string;
  value?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
  "aria-describedby"?: string;
}) {
  return (
    <span className="relative inline-flex size-5 shrink-0">
      <input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        {...aria}
        {...(checked !== undefined ? { checked, onChange } : { defaultChecked })}
        className="peer size-5 appearance-none rounded-xs border border-border-strong bg-surface checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />
      <Check
        className="pointer-events-none absolute inset-0 m-auto hidden size-3.5 text-primary-foreground peer-checked:block"
        strokeWidth={3}
        aria-hidden="true"
      />
    </span>
  );
}

/** CASL consent. Always unchecked on first render. Never `required`. */
export function ConsentCheckbox({
  name = "caslConsent",
  privacyHref = "/privacy",
  required = false,
  error,
}: {
  name?: string;
  privacyHref?: string;
  /** True only for forms whose sole purpose is email (newsletter). Others keep it optional. */
  required?: boolean;
  error?: string;
}) {
  const uid = React.useId();
  const id = `${uid}-consent`;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="-m-3 flex min-h-11 cursor-pointer items-start gap-3 p-3">
        <span className="mt-0.5">
          <Checkbox
            id={id}
            name={name}
            defaultChecked={false}
            aria-required={required ? true : undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
          />
        </span>
        <span className="text-sm text-muted-foreground">
          Yes, email me class dates, masterclass invitations and exam tips from{" "}
          {siteConfig.legalName}. {required ? "" : "This is optional. "}You can unsubscribe at any time.
          Contact: {siteConfig.contact.email}.{" "}
          <a href={privacyHref} className="font-medium text-link underline underline-offset-4">
            Privacy policy
          </a>
        </span>
      </label>
      {error ? <FieldError id={errorId!}>{error}</FieldError> : null}
    </div>
  );
}
