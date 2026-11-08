import type { ReactNode } from "react";

import { Check } from "lucide-react";

/**
 * Phones: options wrap as pills, so a long list fits in a few rows instead of a tall column.
 * Tablet and up: iOS-style grouped list, one rounded container with rows split by hairlines.
 */
export function OptionList({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-2 sm:block sm:divide-y sm:divide-black/[0.06] sm:overflow-clip sm:rounded-2xl sm:bg-white sm:shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
      {children}
    </div>
  );
}

type OptionRowProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

/**
 * One row of the list. A native radio (visually hidden) keeps arrow-key behaviour;
 * the whole row is its label. The selected row shows a trailing check.
 */
export function OptionRow({ id, name, value, label, checked, onChange }: OptionRowProps) {
  return (
    <label
      htmlFor={id}
      className={
        // Phones: a pill sized to its label; the selected one fills with the primary colour.
        "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[0.9375rem] leading-snug text-heading shadow-[0_0_0_1px_rgb(0_0_0/0.1)] transition-[background-color,color,box-shadow,opacity] duration-150 ease-out active:opacity-70 motion-reduce:transition-none has-checked:bg-primary has-checked:font-medium has-checked:text-primary-foreground has-checked:shadow-[0_1px_2px_rgb(16_42_66/0.2)] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring " +
        // Tablet and up: a full-width row in the grouped list with a trailing check.
        "sm:flex sm:min-h-14 sm:justify-between sm:gap-3 sm:rounded-none sm:px-4 sm:py-3 sm:text-[1.0625rem] sm:shadow-none sm:pointer-fine:hover:bg-black/[0.02] sm:has-checked:bg-accent/40 sm:has-checked:text-heading sm:has-checked:shadow-none sm:has-focus-visible:-outline-offset-2"
      }
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span>{label}</span>
      {checked ? (
        <Check className="size-4 shrink-0 sm:size-5 sm:text-primary" strokeWidth={2.25} aria-hidden="true" />
      ) : null}
    </label>
  );
}
