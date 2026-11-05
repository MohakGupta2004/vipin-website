import type { Metadata } from "next";

import { VipinPhoto } from "@/components/course/vipin-photo";
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
          <aside className="flex items-center gap-4 lg:order-last lg:col-span-4 lg:col-start-9 lg:items-start">
            <VipinPhoto size={96} />
            <p className="text-[15px]">
              <span className="font-semibold text-heading">Vipin Garg</span>
              <span className="block text-sm text-muted-foreground">Founder &amp; Instructor</span>
              <span className="mt-2 block max-w-[32ch] text-muted-foreground">
                You will hear from Vipin about your team’s exams.
              </span>
            </p>
          </aside>
          <div className="lg:col-span-7">
            {/* PLACEHOLDER: confirm group offering — group size minimum, pricing model, manager progress reports */}
            <h2 className="text-[1.75rem] sm:text-[2rem]">Tell us about your team</h2>
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
