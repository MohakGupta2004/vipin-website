"use client"

import { LeadForm } from "@/components/forms/lead-form"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

import { useOverlayGate } from "./use-overlay-gate"
import { useExitIntent } from "./use-overlay-triggers"

/**
 * Desktop-only exit-intent modal (cursor leaves through the top). Suppressed 14 days after close.
 * Shares the one-overlay-per-session gate with the slide-in.
 * NOT mounted anywhere yet (P3 wiring). Pass enabled={false} on contact/legal routes.
 */
export function ExitIntentModal({ enabled = true }: { enabled?: boolean }) {
  const gate = useOverlayGate({ id: "exit-intent-masterclass", suppressDays: 14, enabled })
  useExitIntent({ onTrigger: gate.open, enabled })

  return (
    <Dialog open={gate.isOpen} onOpenChange={(open) => !open && gate.close()}>
      <DialogContent>
        <DialogTitle className="pr-8 font-heading text-2xl leading-tight font-semibold text-heading">Before you go</DialogTitle>
        <DialogDescription className="mt-2 mb-6 text-[0.9375rem] text-muted-foreground">
          Save a seat at the next free masterclass with Vipin.
        </DialogDescription>
        <LeadForm kind="masterclass" sourcePath="exit-intent" onSuccess={() => undefined} />
        <button
          type="button"
          onClick={gate.close}
          className="mt-3 inline-flex min-h-11 items-center px-1 text-[0.9375rem] font-medium text-foreground underline underline-offset-3 hover:decoration-2"
        >
          No thanks
        </button>
      </DialogContent>
    </Dialog>
  )
}
