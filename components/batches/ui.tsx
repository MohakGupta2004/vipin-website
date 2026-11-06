import { statusDisplay, type Cohort, type StatusDisplay } from "@/lib/data/batches"
import { cn } from "@/lib/utils"

/* Shared, server-safe styles for the batches page (used by the server page and the client finder). */

const focusRing = "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

/** Text link with a north-east arrow that nudges on hover (hover is pointer-only in Tailwind v4). */
export const textLink = cn(
  "group/link inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium text-link transition-opacity duration-150 hover:opacity-75",
  focusRing
)
export const nudge = "transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"

/** Primary pill: blue, presses down slightly (feedback on press, not on release). */
export function primaryPill(extra?: string) {
  return cn(
    "group/link inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-[0.9375rem] font-semibold whitespace-nowrap text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-cta-hover active:scale-[0.97] motion-reduce:transition-none",
    focusRing,
    extra
  )
}

const dotTone: Record<StatusDisplay["tone"], string> = {
  success: "bg-[#1f9d55]",
  warning: "bg-[#e0901b]",
  neutral: "bg-primary",
  muted: "bg-border-strong",
}

/** Quiet status label with a coloured dot (Registration Open / Date Tentative / Date TBA). */
export function StatusPill({ cohort, className }: { cohort: Cohort; className?: string }) {
  const s = statusDisplay(cohort)
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] py-1 pr-2.5 pl-2 text-xs font-medium whitespace-nowrap text-heading",
        className
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dotTone[s.tone])} />
      {s.label}
    </span>
  )
}
