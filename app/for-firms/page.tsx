import type { Metadata } from "next";

import { PageSection, PageShell } from "@/components/course/page-shell";
import { LeadForm } from "@/components/forms/lead-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Group Exam Training for Firms and Teams",
  description:
    "Studying through your employer? Tell us which exams your team is preparing for and when. Vipin Garg will confirm what is possible for group cohorts.",
  path: "/for-firms",
});

export default function ForFirmsPage() {
  return (
    <PageShell
      crumbs={[{ name: "For firms", href: "/for-firms" }]}
      title="Group exam training for your team."
      lead="Studying through your employer? Tell us which exams your team is preparing for, how many people are involved and when the exams are."
    >
      <PageSection>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* PLACEHOLDER: confirm group offering — group size minimum, pricing model, manager progress reports */}
            <h2 className="font-sans text-2xl">Tell us about your team</h2>
            <p className="mt-3 max-w-[60ch] text-[17px] text-muted-foreground">
              Scope, schedule and pricing are confirmed for each request. Sending this form does not commit you to
              anything.
            </p>
            <LeadForm kind="firms" sourcePath="/for-firms" className="mt-8" />
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
