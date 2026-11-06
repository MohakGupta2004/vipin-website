"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";

import { buttonVariants } from "@/components/ui/button";
import { closeButtonClass } from "@/components/ui/dialog";
import { X } from "lucide-react";

import { ctaButton } from "@/components/forms/styles";
import { isEnabled } from "@/lib/feature-flags";
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
  if (!isEnabled("examFinder")) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={cn(buttonVariants(), ctaButton, triggerClassName)}>
        {triggerLabel}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="scrim fixed inset-0 z-50 transition-opacity duration-200 ease-[cubic-bezier(0.2,0,0,1)] data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          className="vg-enter-up vg-sheet fixed inset-x-0 bottom-0 z-50 max-h-[90dvh] w-full overflow-y-auto overscroll-contain rounded-panel bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-foreground shadow-(--shadow-modal) outline-hidden max-sm:rounded-b-none sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-8"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <Dialog.Title className="font-heading text-xl font-semibold tracking-[-0.02em] text-heading">Find my course</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className={closeButtonClass}
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
