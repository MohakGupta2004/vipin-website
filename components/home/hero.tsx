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
  const { name, role, portrait, credentials } = siteConfig.instructor
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

      <figure className="lg:col-span-5">
        <div className="relative aspect-[4/5] max-h-[420px] overflow-hidden rounded-lg border border-border bg-surface-2 lg:max-h-none">
          {/* PLACEHOLDER: replace with real photo of Vipin Garg teaching (4:5, ≥1200×1500) — set siteConfig.instructor.portrait */}
          <Image
            src={portrait ?? "/images/hero-placeholder.png"}
            alt={portrait ? "Vipin Garg teaching a live online class" : "Student studying for a Canadian finance exam (placeholder photo)"}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-top"
          />
        </div>
        <figcaption className="mt-3 text-sm">
          <span className="font-semibold text-heading">{name}</span>
          {credentials[0] ? `, ${credentials[0]}` : ""}
          <span className="block text-muted-foreground">{role === "Founder & Instructor" ? "Lead instructor" : role}</span>
        </figcaption>
      </figure>
    </section>
  )
}
