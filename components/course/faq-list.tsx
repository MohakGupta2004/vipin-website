import { Minus, Plus } from "lucide-react";

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
    <div className={cn("max-w-(--container-prose) border-t border-border", className)}>
      {items.map((f) => (
        <details key={f.question} className="group border-b border-border">
          <summary
            className={cn(
              "flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden",
              focusRing,
            )}
          >
            <h3 className="font-sans text-lg max-sm:text-base max-sm:leading-snug">{f.question}</h3>
            <Plus className="size-5 shrink-0 text-muted-foreground group-open:hidden" aria-hidden="true" />
            <Minus className="hidden size-5 shrink-0 text-muted-foreground group-open:block" aria-hidden="true" />
          </summary>
          <p className="max-w-[68ch] pb-5 text-[17px] text-foreground max-sm:text-base max-sm:text-muted-foreground">{f.answer}</p>
        </details>
      ))}
      {schema ? <JsonLd data={faqLd(items)} /> : null}
    </div>
  );
}
