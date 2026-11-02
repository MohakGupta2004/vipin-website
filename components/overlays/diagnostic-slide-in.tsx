"use client"

import Link from "next/link"
import { X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useOverlayGate } from "./use-overlay-gate"
import { useScrollOrTimeTrigger } from "./use-overlay-triggers"

/**
 * Course-page slide-in: opens after 50% scroll or 45 s. Suppressed 7 days after close.
 * Bottom-right card on desktop, bottom sheet on mobile. No scrim, no focus trap.
 * NOT mounted anywhere yet (P3 wiring). Pass enabled={false} on contact/legal routes.
 */
export function DiagnosticSlideIn({
  courseCode,
  enabled = true,
}: {
  courseCode: string
  enabled?: boolean
}) {
  const gate = useOverlayGate({ id: "diagnostic-slide-in", suppressDays: 7, enabled })
  useScrollOrTimeTrigger({ onTrigger: gate.open, enabled })

  if (!gate.isOpen) return null
  return (
    <aside
      aria-label="Free diagnostic"
      className="vg-enter-left fixed right-0 bottom-0 z-50 max-h-[70vh] w-full overflow-y-auto rounded-t-xl border border-border bg-surface p-6 text-foreground shadow-modal sm:right-6 sm:bottom-6 sm:w-90 sm:rounded-xl"
    >
      <button
        type="button"
        onClick={gate.close}
        aria-label="Close"
        className="absolute top-1 right-1 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <X aria-hidden="true" strokeWidth={1.75} className="size-5" />
      </button>
      <h2 className="pr-8 font-sans text-lg! leading-snug font-semibold">Check your readiness for {courseCode}</h2>
      {/* PLACEHOLDER: diagnostic length/format — confirm question count before stating one */}
      <p className="mt-2 text-[0.9375rem] text-muted-foreground">
        A free practice diagnostic is on the way. Join the waitlist to get it first.
      </p>
      <div className="mt-4 flex flex-col items-start gap-1">
        <Link href="/free-diagnostic" onClick={gate.close} className={cn(buttonVariants(), "w-full")}>
          Join the diagnostic waitlist
        </Link>
        <button
          type="button"
          onClick={gate.close}
          className="inline-flex min-h-11 items-center px-1 text-[0.9375rem] font-medium text-foreground underline underline-offset-3 hover:decoration-2"
        >
          No thanks
        </button>
      </div>
    </aside>
  )
}
