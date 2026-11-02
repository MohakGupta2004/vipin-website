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
      <header className="container-site py-10 lg:py-14">
        <div className="max-w-(--container-prose)">
          <h1>Canadian finance exam courses</h1>
          <p className="mt-6 text-lead">
            Vipin Garg teaches IFC, CSC Exam 1, CSC Exam 2, CIRE, RSE and LLQP live online. Exam coaching also
            covers other CIRO, planning and professional exams. Filter by study area and format, or search by exam
            code.
          </p>
        </div>
      </header>
      <section aria-label="Course catalogue" className="container-site pb-16 lg:pb-24">
        <CourseCatalogue headingLevel="h2" id="catalogue" />
      </section>
    </div>
  );
}
