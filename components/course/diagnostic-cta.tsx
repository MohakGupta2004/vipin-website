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
    <div className="rounded-lg border border-border bg-teal-tint p-6 max-sm:rounded-2xl max-sm:border-transparent max-sm:p-5 lg:p-8">
      <h3 className="font-sans">Check where you stand on the {code}</h3>
      <p className="mt-2 max-w-[60ch] text-[17px] text-foreground max-sm:text-base">
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
          className={`${secondaryButton} mt-5 max-sm:w-full max-sm:rounded-xl`}
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
