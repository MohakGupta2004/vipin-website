import { ExternalLink } from "lucide-react";

import { focusRing } from "@/components/forms/styles";
import { cn } from "@/lib/utils";

export type FactRow = {
  label: string;
  value: React.ReactNode;
  /** Renders the value in muted text (e.g. "To be confirmed"). */
  muted?: boolean;
};

/** Semantic fact table (DESIGN-DIRECTION §5.8): th scope=row, horizontal rules only. */
export function FactsTable({ caption, rows }: { caption: string; rows: FactRow[] }) {
  return (
    <table className="w-full border-collapse text-[15px]">
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className="border-b border-black/[0.08] first:border-t">
            <th
              scope="row"
              className="w-2/5 py-4 pr-4 text-left align-top font-normal text-muted-foreground sm:w-[35%]"
            >
              {r.label}
            </th>
            <td className={cn("py-4 align-top tabular-nums", r.muted ? "text-muted-foreground" : "text-heading")}>
              {r.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
      <ExternalLink className="size-3.5" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
