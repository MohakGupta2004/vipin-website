import { ArrowUpRight } from "lucide-react";

import { focusRing } from "@/components/forms/styles";
import { cn } from "@/lib/utils";

export type FactRow = {
  label: string;
  value: React.ReactNode;
  /** Renders the value in muted text (e.g. "To be confirmed"). */
  muted?: boolean;
};

/** Fact list: label above value on phones, two columns from sm. Horizontal rules only. */
export function FactsTable({ caption, rows }: { caption: string; rows: FactRow[] }) {
  return (
    <dl aria-label={caption} className="border-t border-black/[0.08] text-[15px]">
      {rows.map((r) => (
        <div
          key={r.label}
          className="grid gap-1 border-b border-black/[0.08] py-4 sm:grid-cols-[35%_1fr] sm:gap-4"
        >
          <dt className="text-muted-foreground">{r.label}</dt>
          <dd className={cn("min-w-0 text-pretty tabular-nums", r.muted ? "text-muted-foreground" : "text-heading")}>
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ExternalLinkText({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn("inline-flex items-center gap-1 rounded-sm text-link underline underline-offset-4 hover:decoration-2", focusRing)}
    >
      {children}
      <ArrowUpRight className="size-3.5" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
