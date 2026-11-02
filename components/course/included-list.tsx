"use client";

import * as React from "react";
import { Tooltip } from "@base-ui/react/tooltip";
import { Check, Info } from "lucide-react";

import { focusRing } from "@/components/forms/styles";
import { cn } from "@/lib/utils";

type Item = { label: string; detail: string; planned?: boolean };

/**
 * "What's included" list. Detail text shows in a tooltip on larger screens
 * (focus opens it at once, hover after 600ms) and inline on small screens.
 */
export function IncludedList({ items }: { items: Item[] }) {
  return (
    <Tooltip.Provider delay={600} closeDelay={0}>
      <ul className="divide-y divide-border border-y border-border">
        {items.map((it) => (
          <li key={it.label} className="flex min-h-12 items-start gap-3 py-3">
            <Check
              className={cn("mt-1 size-4 shrink-0", it.planned ? "text-muted-foreground" : "text-success")}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className={cn("text-[17px]", it.planned && "text-muted-foreground")}>
                {it.label}
                {it.planned ? <span className="text-sm"> (planned, not yet included)</span> : null}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground sm:hidden">{it.detail}</p>
            </div>
            <Tooltip.Root>
              <Tooltip.Trigger
                delay={600}
                aria-label={`More about ${it.label}`}
                className={cn(
                  "hidden size-8 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground sm:inline-flex",
                  focusRing,
                )}
              >
                <Info className="size-4" aria-hidden="true" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner sideOffset={6} className="z-50">
                  <Tooltip.Popup className="max-w-72 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-float">
                    {it.detail}
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </li>
        ))}
      </ul>
    </Tooltip.Provider>
  );
}
