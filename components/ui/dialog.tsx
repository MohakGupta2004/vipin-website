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

/** Apple close button: 44px round glass control with an X. */
export const closeButtonClass =
  "glass-control inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground outline-hidden transition-[transform,box-shadow] duration-150 ease-out hover:shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.22),0_4px_8px_rgb(0_0_0/0.05)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"

function DialogCloseButton({ className }: { className?: string }) {
  return (
    <DialogPrimitive.Close
      aria-label="Close"
      className={cn(closeButtonClass, "absolute top-2 right-2", className)}
    >
      <X aria-hidden="true" strokeWidth={1.75} className="size-5" />
    </DialogPrimitive.Close>
  )
}

/** Centered modal with a glass scrim (opacity fade only). Traps focus, closes on Esc. */
function DialogContent({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="scrim fixed inset-0 z-40 transition-opacity duration-200 ease-[cubic-bezier(0.2,0,0,1)] data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:opacity-0 motion-reduce:transition-none" />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-120 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-panel border border-border bg-surface p-6 text-foreground shadow-modal transition-[opacity,translate] duration-[180ms] ease-out outline-hidden data-[ending-style]:opacity-0 data-[starting-style]:translate-y-[calc(-50%+8px)] data-[starting-style]:opacity-0 sm:p-8 motion-reduce:transition-opacity motion-reduce:data-[starting-style]:translate-y-[-50%] max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0 max-sm:pb-[max(1.5rem,env(safe-area-inset-bottom))] max-sm:data-[starting-style]:translate-y-full max-sm:motion-reduce:data-[starting-style]:translate-y-0",
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
