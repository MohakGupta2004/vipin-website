import type { Metadata } from "next";
import Link from "next/link";

import { PageSection, PageShell } from "@/components/course/page-shell";
import { ExamFinder } from "@/components/finder/exam-finder";
import { textLink } from "@/components/forms/styles";
import { isEnabled } from "@/lib/feature-flags";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Find My Course: Which Canadian Finance Exam?",
  description:
    "Answer three questions about your role, province and exam timing to see which Canadian finance exam to start with and which live class fits.",
  path: "/find-my-course",
});

export default function FindMyCoursePage() {
  return (
    <PageShell
      crumbs={[{ name: "Find my course", href: "/find-my-course" }]}
      title="What are you preparing for?"
      lead="Find the right coaching for your next exam."
    >
      <PageSection>
        <div className="max-w-4xl">
          {isEnabled("examFinder") ? (
            <ExamFinder heading="Find the right exam in three questions" />
          ) : (
            <p className="max-w-[60ch] text-[17px]">
              The course finder is not available right now.
              {/* hidden until courses live in app
              {" "}
              <Link href="/courses" className={cn(textLink, "underline")}>
                Browse all courses
              </Link>
              */}
            </p>
          )}
          <p className="mt-8 text-[17px]">
            Not sure which examination you need?{" "}
            <Link href="/licensing-pathways" className={cn(textLink, "underline")}>
              Explore career &amp; designation pathways
            </Link>
          </p>
        </div>
      </PageSection>
    </PageShell>
  );
}
