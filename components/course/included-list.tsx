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
      <ul className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
        {items.map((it) => (
          <li key={it.label} className="flex min-h-14 items-start gap-3 py-4">
            <Check
              className={cn("mt-1 size-4 shrink-0", "text-muted-foreground")}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className={cn("text-[17px] text-heading/90", it.planned && "text-muted-foreground")}>
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
                  <Tooltip.Popup className="max-w-72 origin-(--transform-origin) rounded-xl bg-surface px-3.5 py-2.5 text-sm text-foreground shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_12px_32px_-12px_rgb(16_42_66/0.3)] transition-[opacity,scale] duration-150 ease-out data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0">
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
