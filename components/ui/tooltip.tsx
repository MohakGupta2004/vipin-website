"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"

function TooltipProvider(props: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delay={600} closeDelay={100} {...props} />
}

/** Info-icon tooltip. Opens on keyboard focus and hover; text is also exposed via aria-label. */
function InfoTooltip({ label, className }: { label: string; className?: string }) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger
        aria-label={label}
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className
        )}
      >
        <Info aria-hidden="true" strokeWidth={1.75} className="size-4" />
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner sideOffset={6} className="z-50">
          <TooltipPrimitive.Popup className="max-w-64 rounded-md border border-border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-float">
            {label}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

export { TooltipProvider, InfoTooltip }
