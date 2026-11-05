import type { Metadata } from "next";

import { PageSection, PageShell } from "@/components/course/page-shell";
import { LeadForm } from "@/components/forms/lead-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Diagnostic Test: Join the Waitlist",
  description:
    "Original practice tests and exam simulations are planned first for IFC, CSC Exam 1, CSC Exam 2 and CIRE. Join the waitlist to hear when the free diagnostic opens.",
  path: "/free-diagnostic",
});

export default function FreeDiagnosticPage() {
  return (
    <PageShell
      crumbs={[{ name: "Free diagnostic", href: "/free-diagnostic" }]}
      title="Check where you stand before you book."
      lead="Original practice tests, mock examinations and timed simulations are planned first for IFC, CSC Exam 1, CSC Exam 2 and CIRE."
    >
      <PageSection>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-[1.75rem] sm:text-[2rem]">Launching soon</h2>
            <p className="mt-3 max-w-[60ch] text-[17px]">
              The diagnostic is not ready yet. These will be independently developed learning tools, separate from
              official examinations. Availability and inclusions will be announced before launch.
            </p>
            <LeadForm kind="diagnostic" sourcePath="/free-diagnostic" className="mt-8" />
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
