import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { BatchFinder } from "@/components/batches/batch-finder"
import { Reveal } from "@/components/motion/reveal"
import { StatusPill, nudge, primaryPill, textLink } from "@/components/batches/ui"
import {
  batchesConfig,
  cohortActionHref,
  cohortCourseHref,
  cohortDateParts,
  cohortTimingLabel,
  courseFor,
  getFeaturedCohort,
  statusDisplay,
  upcomingCohorts,
  type Cohort,
} from "@/lib/data/batches"
import { buildMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata: Metadata = buildMetadata({
  title: "Upcoming Batches: Live Group Exam Coaching",
  description:
    "See upcoming live group batches for IFC, CSC, CIRE and LLQP with Vipin Garg. Choose a course, check the schedule and register your interest in a few steps.",
  path: "/upcoming-batches",
})

// Re-check hourly so a cohort drops off the Upcoming list once its start date passes.
export const revalidate = 3600

// Staggered entrance for the hero (same motion as the home hero).
const rise = (i: number) => ({ className: "vg-rise", style: { animationDelay: `${40 + i * 60}ms` } })

export default function UpcomingBatchesPage() {
  const list = upcomingCohorts()
  const featured = getFeaturedCohort()

  return (
    <>
      {/* Hero: centred, type-led, on the same warm white as the header. */}
      <section aria-labelledby="batches-heading" className="bg-[#fbfbfd]">
        <div className="container-site pt-14 pb-12 text-center sm:pt-20 sm:pb-16 lg:pt-24">
          <p {...rise(0)} className="vg-rise text-[0.9375rem] font-semibold text-muted-foreground sm:text-[1.0625rem]">
            Live, instructor-led group coaching
          </p>
          <h1
            id="batches-heading"
            {...rise(1)}
            className="vg-rise mt-3 font-heading text-[clamp(3rem,8vw,5.75rem)] leading-[1] font-semibold tracking-[-0.045em] text-heading"
          >
            Upcoming Batches
          </h1>
          <p
            {...rise(2)}
            className="vg-rise mx-auto mt-6 max-w-[42ch] text-lg leading-[1.55] text-pretty text-muted-foreground sm:text-[1.3125rem]"
          >
            Find your next exam-preparation cohort. See upcoming schedules, choose a course, and register your interest
            in a few steps.
          </p>
          <div
            {...rise(3)}
            className="vg-rise mt-9 flex flex-col items-center justify-center gap-x-8 gap-y-3 sm:flex-row"
          >
            <a href="#find-batch" className={primaryPill("max-sm:w-full max-sm:max-w-xs")}>
              View Upcoming Batches
              <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn("size-4", nudge)} />
            </a>
            <Link href="/find-my-course" className={textLink}>
              Not Sure Which Exam?
              <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn("size-4", nudge)} />
            </Link>
          </div>
        </div>

        {featured ? (
          <div {...rise(4)} className="vg-rise container-site pb-20 sm:pb-28">
            <Spotlight cohort={featured} />
          </div>
        ) : null}
      </section>

      {/* Finder */}
      <section id="find-batch" aria-labelledby="find-heading" className="scroll-mt-20 bg-[#f5f5f7] py-20 sm:py-28">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <p className="text-[0.9375rem] font-semibold text-muted-foreground">Find a group cohort</p>
            <h2
              id="find-heading"
              className="mt-2 font-heading text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] text-heading sm:text-5xl"
            >
              Find Your Next Batch
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Browse by exam or schedule. Don&apos;t see your preferred batch?{" "}
              <Link href="/contact" className="text-link underline-offset-4 hover:underline">
                Join the interest list.
              </Link>
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <BatchFinder cohorts={list} />
          </Reveal>

          {/* Other ways in */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-section max-sm:rounded-panel bg-surface-inverse p-6 text-inverse-fg sm:p-10 lg:p-12">
                <p className="text-[0.9375rem] font-semibold text-inverse-muted">Personalized preparation</p>
                <h2 className="mt-2 font-heading text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.03em] text-inverse-fg sm:text-[2rem]">
                  Prefer <span className="whitespace-nowrap">One-on-One</span> Coaching?
                </h2>
                <p className="mt-4 max-w-[38ch] text-[1.0625rem] leading-relaxed text-inverse-muted">
                  Discuss your exam, preparation needs, and a schedule that works for you.
                </p>
                <div className="mt-auto pt-8">
                  <Link
                    href="/contact"
                    className="group/link inline-flex h-12 items-center gap-1.5 rounded-full bg-white px-6 text-[0.9375rem] font-semibold text-heading transition-[background-color,transform] duration-150 ease-out outline-hidden hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverse-link active:scale-[0.97] motion-reduce:transition-none"
                  >
                    Enquire About Private Coaching
                    <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn("size-4", nudge)} />
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex h-full flex-col rounded-section max-sm:rounded-panel bg-white p-6 shadow-[0_0_0_1px_rgb(0_0_0/0.05)] sm:p-10 lg:p-12">
                <p className="text-[0.9375rem] font-semibold text-muted-foreground">Explore before you enroll</p>
                <h2 className="mt-2 font-heading text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.03em] text-heading sm:text-[2rem]">
                  Take a Look at the Learning Platform
                </h2>
                <p className="mt-4 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
                  Explore the app for digital study resources, practice questions, and course materials.
                </p>
                <div className="mt-auto pt-8">
                  <a
                    href={batchesConfig.appUrl}
                    target="_blank"
                    rel="noopener"
                    className="group/link inline-flex h-12 items-center gap-1.5 rounded-full px-6 text-[0.9375rem] font-semibold text-heading shadow-[0_0_0_1px_rgb(0_0_0/0.14)] transition-[box-shadow,transform] duration-150 ease-out outline-hidden hover:shadow-[0_0_0_1px_rgb(0_0_0/0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] motion-reduce:transition-none"
                  >
                    Explore Learning Platform
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <p className="mx-auto mt-12 max-w-[60ch] text-center text-xs leading-relaxed text-muted-foreground">
            Independent exam preparation. Official licensing and examination registration remain with the relevant
            authorities.
          </p>
        </div>
      </section>
    </>
  )
}

/** The next batch, given room: details on the left, a large calendar-style date on the right. */
function Spotlight({ cohort }: { cohort: Cohort }) {
  const course = courseFor(cohort)
  const date = cohortDateParts(cohort)
  const s = statusDisplay(cohort)
  return (
    <article
      aria-labelledby="next-batch-heading"
      className="grid overflow-hidden rounded-section max-sm:rounded-panel bg-white text-left shadow-[0_0_0_1px_rgb(0_0_0/0.05),0_40px_80px_-48px_rgb(16_42_66/0.45)] lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
    >
      <div className="order-2 p-7 sm:p-10 lg:order-1 lg:p-14">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[0.9375rem] font-semibold text-muted-foreground">Next group batch</p>
          <StatusPill cohort={cohort} />
        </div>
        <h2
          id="next-batch-heading"
          className="mt-4 font-heading text-[1.875rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance text-heading sm:text-[2.75rem]"
        >
          {cohort.title}
        </h2>
        {course ? <p className="mt-2 text-lg text-muted-foreground">{course.title}</p> : null}

        <dl className="mt-8 grid max-w-2xl gap-x-10 gap-y-5 border-t border-black/[0.06] pt-6 sm:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div>
            <dt className="text-xs text-muted-foreground">Class days &amp; time</dt>
            <dd className="mt-1 text-[1.0625rem] text-heading">{cohortTimingLabel(cohort)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Sessions</dt>
            <dd className="mt-1 text-[1.0625rem] text-heading">{cohort.duration}</dd>
          </div>
        </dl>
        {cohort.tag ? <p className="mt-5 text-sm text-muted-foreground">{cohort.tag}</p> : null}

        <div className="mt-9 flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:items-center">
          <Link href={cohortActionHref(cohort)} className={primaryPill("max-sm:w-full")}>
            {s.action}
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn("size-4", nudge)} />
          </Link>
          <Link href={cohortCourseHref(cohort)} className={cn(textLink, "max-sm:justify-center")}>
            Course Details
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn("size-4", nudge)} />
          </Link>
        </div>
      </div>

      {/* Calendar-style date. Undated cohorts say so plainly; nothing is invented. */}
      <div className="order-1 flex items-center justify-center bg-[#f5f5f7] px-8 py-7 text-center lg:order-2 lg:flex-col lg:py-14">
        {date ? (
          // Phones: a compact row (day | month, weekday, year). Desktop: a tall calendar leaf.
          <div className="flex items-center gap-5 lg:flex-col lg:gap-0">
            <p className="order-2 text-[1.0625rem] font-semibold text-muted-foreground max-lg:hidden lg:order-1">
              {date.month}
            </p>
            <p className="order-1 font-heading text-[4.5rem] leading-[0.95] font-semibold tracking-[-0.05em] text-heading tabular-nums sm:text-[5.5rem] lg:order-2 lg:mt-1 lg:text-[8rem]">
              {date.day}
            </p>
            <div className="order-3 text-left lg:mt-3 lg:text-center">
              <p className="text-[1.0625rem] font-semibold text-muted-foreground lg:hidden">{date.month}</p>
              <p className="mt-1 text-[1.0625rem] font-medium text-heading lg:mt-0">{date.weekday}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{date.year}</p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[0.9375rem] font-semibold text-muted-foreground">Start date</p>
            <p className="mt-3 font-heading text-3xl font-semibold tracking-[-0.03em] text-heading">To be announced</p>
          </>
        )}
      </div>
    </article>
  )
}
