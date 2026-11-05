import { Plus } from "lucide-react";

import { JsonLd, faqLd } from "@/components/seo/json-ld";
import { focusRing } from "@/components/forms/styles";
import { cn } from "@/lib/utils";

type Item = { question: string; answer: string };

/**
 * FAQ accordion on native <details>. Answers stay in the DOM when closed.
 * Renders FAQPage JSON-LD unless `schema={false}`.
 */
export function FaqList({
  items,
  schema = true,
  className,
}: {
  items: Item[];
  schema?: boolean;
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={cn("max-w-(--container-prose) border-t border-black/[0.08]", className)}>
      {items.map((f) => (
        // vg-details: smooth height on open where supported (globals.css). The + turns into × on open.
        <details key={f.question} className="vg-details group border-b border-black/[0.08]">
          <summary
            className={cn(
              "flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 [&::-webkit-details-marker]:hidden",
              focusRing,
            )}
          >
            <h3 className="font-heading text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-heading sm:text-[1.1875rem]">
              {f.question}
            </h3>
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-heading transition-[rotate,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45 group-hover:bg-black/[0.09] motion-reduce:transition-none"
            >
              <Plus className="size-4" strokeWidth={2.25} />
            </span>
          </summary>
          <p className="max-w-[64ch] pr-12 pb-6 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">{f.answer}</p>
        </details>
      ))}
      {schema ? <JsonLd data={faqLd(items)} /> : null}
    </div>
  );
}
