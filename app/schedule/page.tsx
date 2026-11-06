import type { Metadata } from "next";
import Link from "next/link";

import { ArrowLink } from "@/components/ui/arrow-link";
import { PageSection, PageShell } from "@/components/course/page-shell";
import { formatDate } from "@/components/course/format";
import { FormCard } from "@/components/course/form-card";
import { LeadForm } from "@/components/forms/lead-form";
import { courses } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Class Schedule: Live Finance Exam Classes",
  description:
    "See upcoming live class dates for IFC, CSC, CIRE, RSE and LLQP with Vipin Garg. When no class is scheduled, register interest and we will email you first.",
  path: "/schedule",
});

export default function SchedulePage() {
  // Data-driven: every cohort from every course, soonest first.
  const rows = courses
    .flatMap((c) => c.cohorts.map((x) => ({ course: c, cohort: x })))
    .sort((a, b) => a.cohort.startDate.localeCompare(b.cohort.startDate));

  return (
    <PageShell
      crumbs={[{ name: "Schedule", href: "/schedule" }]}
      title="Upcoming live classes"
      lead="Class dates, time zone and session length are confirmed before you enroll."
    >
      <PageSection tone="band">
        {rows.length > 0 ? (
          <div className="overflow-x-auto rounded-panel bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.06)] sm:rounded-section">
            <table className="w-full min-w-[34rem] border-collapse text-[15px]">
              <caption className="sr-only">Upcoming cohorts</caption>
              <thead>
                <tr className="bg-[#fbfbfd] text-left">
                  <th scope="col" className="px-3 py-3 font-semibold">Course</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Start</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Schedule</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Seats</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ course, cohort }) => (
                  <tr key={cohort.id} className="border-t border-black/[0.06]">
                    <th scope="row" className="px-3 py-3 text-left font-medium">
                      <Link href={course.route} className="text-link underline underline-offset-4">
                        {course.code}
                      </Link>
                    </th>
                    <td className="px-3 py-3 tabular-nums">{formatDate(cohort.startDate)}</td>
                    <td className="px-3 py-3">{cohort.schedule}</td>
                    <td className="px-3 py-3 tabular-nums">
                      {cohort.seatsLeft !== undefined ? `${cohort.seatsLeft} left` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="max-w-[68ch]">
            <h2 className="text-[1.75rem] sm:text-[2rem]">No cohorts are scheduled right now</h2>
            <p className="mt-3 text-[17px]">
              Class dates are announced soon. Register your interest and we will email you when a class opens for the
              exam you are preparing for.
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-2">
          <span className="text-[17px]">Looking for group cohorts?</span>
          <ArrowLink href="/upcoming-batches">See upcoming batches</ArrowLink>
        </div>
        <div className="mt-12 max-w-2xl">
          <h2 className="text-[1.375rem]">Register interest</h2>
          <FormCard className="mt-5">
            <LeadForm kind="interest" sourcePath="/schedule" />
          </FormCard>
        </div>
      </PageSection>
    </PageShell>
  );
}
