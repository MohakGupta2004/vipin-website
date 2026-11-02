import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CourseCard } from "@/components/course/course-card"
import { liveGroupCourses } from "@/lib/data/courses"

export function Programmes() {
  return (
    <section className="container-site pb-16 md:pb-20 lg:pb-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[56ch]">
          <h2>Live group programmes</h2>
          <p className="mt-4 text-muted-foreground">
            Six exams taught live online by Vipin. Exam details come from the official providers.
          </p>
        </div>
        <Link
          href="/courses"
          className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-link"
        >
          All courses
          <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </Link>
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-8">
        {liveGroupCourses.map((c) => (
          <li key={c.slug}>
            <CourseCard course={c} />
          </li>
        ))}
      </ul>
    </section>
  )
}
