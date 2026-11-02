"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

function DialogCloseButton({ className }: { className?: string }) {
  return (
    <DialogPrimitive.Close
      aria-label="Close"
      className={cn(
        "absolute top-2 right-2 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground outline-hidden hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      <X aria-hidden="true" strokeWidth={1.75} className="size-5" />
    </DialogPrimitive.Close>
  )
}

/** Centered modal with scrim. No blur. Traps focus, closes on Esc. */
function DialogContent({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 z-40 bg-[var(--scrim)] transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none" />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-120 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-surface p-6 text-foreground shadow-modal transition-[opacity,translate] duration-[180ms] ease-out outline-hidden data-[ending-style]:opacity-0 data-[starting-style]:translate-y-[calc(-50%+8px)] data-[starting-style]:opacity-0 sm:p-8 motion-reduce:transition-opacity motion-reduce:data-[starting-style]:translate-y-[-50%]",
          className
        )}
        {...props}
      >
        {children}
        <DialogCloseButton />
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogCloseButton,
}
