import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { appUrl } from "@/components/layout/app-links"
import { isEnabled } from "@/lib/feature-flags"
import { liveGroupCourses, nextCohort } from "@/lib/data/courses"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const dateFmt = new Intl.DateTimeFormat("en-CA", { day: "numeric", month: "long", year: "numeric" })

/** Earliest real upcoming cohort across live-group courses, or null. */
function nextIntake() {
  const all = liveGroupCourses
    .map((c) => ({ course: c, cohort: nextCohort(c) }))
    .filter((x): x is { course: (typeof liveGroupCourses)[number]; cohort: NonNullable<ReturnType<typeof nextCohort>> } =>
      Boolean(x.cohort)
    )
    .sort((a, b) => a.cohort.startDate.localeCompare(b.cohort.startDate))
  return all[0] ?? null
}

export function Hero() {
  const intake = nextIntake()
  // Secondary CTA target follows the feature flags; falls back to the catalogue page.
  const findHref = isEnabled("homeCourseSearch") ? "#courses" : isEnabled("examFinder") ? "#find-my-course" : "/courses"
  const { name, portrait, credentials } = siteConfig.instructor
  return (
    <section className="container-site grid gap-10 pt-16 pb-16 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-20">
      <div className="lg:col-span-7">
        <h1 className="text-display">Canadian finance exam prep, taught live by Vipin Garg.</h1>
        <p className="text-lead mt-6 max-w-[56ch]">
          Live online classes for IFC, CSC, CIRE, RSE and LLQP. Practise between sessions and check your
          readiness before you book the exam.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={appUrl("signup", { campaign: "home-hero" })}
            rel="noopener"
            className={cn(buttonVariants({ variant: "cta", size: "lg" }), "w-full sm:w-auto")}
          >
            Create free account
          </a>
          <Link
            href={findHref}
            className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-link"
          >
            Find my course
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </div>
        {intake && (
          <p className="mt-8 inline-flex items-center gap-2 rounded-xs bg-surface-2 px-3 py-2 text-sm">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
            <span className="tabular">
              Next cohort: {intake.course.code} · {dateFmt.format(new Date(`${intake.cohort.startDate}T12:00:00`))} · Live online
            </span>
          </p>
        )}
      </div>

      <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
        {/* Layered composition: sage frame offset behind the portrait, info card overlapping the corner. */}
        <div aria-hidden="true" className="absolute -right-3 -bottom-3 left-6 top-6 rounded-2xl bg-brand-teal/35 sm:-right-5 sm:-bottom-5" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2 shadow-float">
          <Image
            src={portrait ?? "/images/vipin-garg.jpg"}
            alt="Vipin Garg, finance exam coach"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
        <figcaption className="absolute -bottom-6 left-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm shadow-float sm:left-[-1.5rem]">
          <span className="block font-heading text-base font-bold text-heading">{name}</span>
          {credentials[0] ? <span className="block text-muted-foreground">{credentials[0]}</span> : null}
          <span className="mt-1 flex items-center gap-2 text-muted-foreground">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            Live online classes
          </span>
        </figcaption>
      </figure>
    </section>
  )
}
