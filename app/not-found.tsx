import Link from "next/link"

import { ExamFinder } from "@/components/finder/exam-finder"
import { buttonVariants } from "@/components/ui/button"
import { liveGroupCourses } from "@/lib/data/courses"
import { cn } from "@/lib/utils"

export const metadata = { title: "Page not found", robots: { index: false, follow: true } }

export default function NotFound() {
  const popular = liveGroupCourses.slice(0, 5)
  return (
    <div className="container-site py-16 text-center md:py-24">
      <h1>We couldn&apos;t find that page</h1>
      <p className="text-lead mx-auto mt-4 max-w-[52ch]">
        The link may be old or mistyped. Try the course finder, or open one of the live programmes.
      </p>
      <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-surface-2 p-6 text-left sm:p-8">
        <ExamFinder heading="Find the right exam in three questions" />
      </div>
      <h2 className="mt-14 text-[1.5rem]!">Popular courses</h2>
      <ul className="mt-6 flex flex-wrap justify-center gap-3">
        {popular.map((c) => (
          <li key={c.slug}>
            <Link href={c.route} className={cn(buttonVariants({ variant: "secondary" }))}>
              {c.code}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/courses" className={cn(buttonVariants({ variant: "default" }))}>
            All courses
          </Link>
        </li>
      </ul>
    </div>
  )
}
