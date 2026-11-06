import type { Metadata } from "next";

import { CourseCatalogue } from "@/components/course/course-catalogue";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Canadian Finance Exam Courses",
  description:
    "Browse live IFC, CSC, CIRE, RSE and LLQP classes plus CIRO, planning and professional exam coaching with Vipin Garg. Filter by area and format.",
  path: "/courses",
});

export default function CoursesPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Courses", href: "/courses" }]} />
      <header className="container-site pt-8 pb-12 sm:pt-10 lg:pt-14 lg:pb-16">
        <div className="max-w-(--container-prose)">
          <h1 className="text-balance">Canadian finance exam courses</h1>
          <p className="mt-6 max-w-[52ch] text-lead text-pretty">
            Vipin Garg teaches IFC, CSC Exam 1, CSC Exam 2, CIRE, RSE and LLQP live online. Exam coaching also
            covers other CIRO, planning and professional exams. Filter by study area and format, or search by exam
            code.
          </p>
        </div>
      </header>
      <section aria-label="Course catalogue" className="container-site pb-20 sm:pb-28">
        <CourseCatalogue headingLevel="h2" id="catalogue" />
      </section>
    </div>
  );
}
