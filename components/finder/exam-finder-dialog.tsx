"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";

import { buttonVariants } from "@/components/ui/button";
import { X } from "lucide-react";

import { ctaButton } from "@/components/forms/styles";
import { cn } from "@/lib/utils";

import { ExamFinder } from "./exam-finder";

/** ExamFinder inside an accessible modal (focus trap, Esc to close). */
export function ExamFinderDialog({
  triggerLabel = "Find my course",
  triggerClassName,
}: {
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={cn(buttonVariants(), ctaButton, triggerClassName)}>
        {triggerLabel}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="vg-enter-fade fixed inset-0 z-50 bg-(--scrim)" />
        <Dialog.Popup
          className="vg-enter-up fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-surface p-6 text-foreground shadow-(--shadow-modal) outline-none sm:p-8"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <Dialog.Title className="text-xl font-semibold text-heading">Find my course</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className={cn(buttonVariants({ variant: "ghost" }), "size-11 shrink-0 rounded-md p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-0")}
            >
              <X aria-hidden="true" strokeWidth={1.75} className="size-5" />
            </Dialog.Close>
          </div>
          <ExamFinder heading={null} onNavigate={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
