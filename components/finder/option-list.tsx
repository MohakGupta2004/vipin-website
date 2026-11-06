import type { ReactNode } from "react";

import { Check } from "lucide-react";

/** iOS-style grouped list: one rounded container, rows split by hairlines. */
export function OptionList({ children }: { children: ReactNode }) {
  return (
    <div className="divide-y divide-black/[0.06] overflow-clip rounded-2xl bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
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
      className="flex min-h-14 cursor-pointer items-center justify-between gap-3 px-4 py-3 text-[1.0625rem] leading-snug text-heading transition-[background-color,opacity] duration-150 ease-out pointer-fine:hover:bg-black/[0.02] active:opacity-70 motion-reduce:transition-none has-checked:bg-accent/40 has-checked:font-medium has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-ring"
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
      {checked ? <Check className="size-5 shrink-0 text-primary" strokeWidth={2.25} aria-hidden="true" /> : null}
    </label>
  );
}
