import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Status badges. Only these four exist (DESIGN-DIRECTION §5.5). */
const badgeVariants = cva(
  "inline-flex items-center rounded-xs px-2 py-1 text-[0.8125rem] leading-none font-medium tracking-[0.01em] whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-surface-2 text-muted-foreground",
        success: "bg-success-bg text-success",
        warning: "bg-warning-bg text-warning",
        info: "bg-teal-tint text-link",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
