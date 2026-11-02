import type { Metadata } from "next";

import { CourseCatalogue, type CatalogueItem } from "@/components/course/course-catalogue";
import { examSummary } from "@/components/course/format";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { courses, upcomingPrograms } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Canadian Finance Exam Courses",
  description:
    "Browse live IFC, CSC, CIRE, RSE and LLQP classes plus CIRO, planning and professional exam coaching with Vipin Garg. Filter by area and format.",
  path: "/courses",
});

const items: CatalogueItem[] = [
  ...courses.map((c): CatalogueItem => ({
    key: c.slug,
    kind: "course",
    code: c.code,
    name: c.name,
    blurb: c.blurb ?? c.tagline,
    href: c.route,
    area: c.area,
    type: c.status === "upcoming" ? "upcoming" : c.status,
    exam: examSummary(c),
    confirmed: c.offerConfirmed,
    haystack: [c.code, c.name, c.tagline, c.category, ...c.topics].join(" ").toLowerCase(),
  })),
  ...upcomingPrograms.map((u): CatalogueItem => ({
    key: u.slug,
    kind: "upcoming",
    code: u.name,
    name: u.name,
    blurb: u.summary,
    href: "/upcoming",
    area: null,
    type: "upcoming",
    exam: null,
    confirmed: false,
    haystack: [u.name, u.summary].join(" ").toLowerCase(),
  })),
];

export default function CoursesPage() {
  return (
    <div>
      <div className="container-site pt-6 text-sm">
        <Breadcrumbs items={[{ name: "Courses", href: "/courses" }]} />
      </div>
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
        <CourseCatalogue items={items} />
      </section>
    </div>
  );
}
