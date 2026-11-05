"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { secondaryButton } from "@/components/forms/styles";

/** Mid-page diagnostic prompt. The diagnostic is not built yet, so this is a waitlist. */
export function DiagnosticCta({ courseSlug, code, sourcePath }: { courseSlug: string; code: string; sourcePath: string }) {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();

  return (
    <div className="rounded-[1.75rem] bg-[#f5f5f7] p-7 sm:p-10">
      <h3 className="text-[1.5rem] sm:text-[1.75rem]">Check where you stand on the {code}</h3>
      <p className="mt-3 max-w-[56ch] text-[17px] leading-relaxed text-muted-foreground max-sm:text-base">
        The free diagnostic is not ready yet. Join the waitlist and we will email you when it opens.
      </p>
      {open ? (
        <div id={panelId} className="mt-6">
          <LeadForm
            kind="diagnostic"
            courseSlug={courseSlug}
            sourcePath={sourcePath}
            className="max-w-120 max-sm:max-w-none"
          />
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className={`${secondaryButton} mt-6 max-sm:w-full`}
          aria-expanded={false}
          aria-controls={panelId}
          onClick={() => setOpen(true)}
        >
          Join the diagnostic waitlist
        </Button>
      )}
    </div>
  );
}
