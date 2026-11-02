import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { appUrl } from "@/components/layout/app-links"
import { courses, liveGroupCourses, nextCohort } from "@/lib/data/courses"
import { isEnabled } from "@/lib/feature-flags"
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

const focusRing = "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
const chipBase =
  "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm text-inverse-fg transition-colors duration-150 motion-reduce:transition-none"

const assurances = [
  "Live classes, not pre-recorded",
  "Practise in the app between classes",
  "Ask questions as you go",
]

export function Hero() {
  const intake = nextIntake()
  // Secondary CTA target follows the feature flags; falls back to the catalogue page.
  const findHref = isEnabled("homeCourseSearch") ? "#courses" : isEnabled("examFinder") ? "#find-my-course" : "/courses"
  const { name, role, portrait, credentials } = siteConfig.instructor
  // Only exams the client has confirmed they offer (excludes CFP / QAFP).
  const offered = courses.filter((c) => c.offerConfirmed).length
  const moreExams = offered - liveGroupCourses.length
  const cohortDate = intake ? dateFmt.format(new Date(`${intake.cohort.startDate}T12:00:00`)) : null

  const stats = [
    { value: String(liveGroupCourses.length), label: "live group programmes" },
    { value: String(offered), label: "exams covered" },
    { value: "Live", label: "online classes, Canada-wide" },
    { value: "Free", label: "account in the learning app" },
  ]

  return (
    <section aria-labelledby="hero-heading">
      <div className="bg-surface-inverse text-inverse-fg">
        <div className="container-site grid gap-12 pt-12 pb-32 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pt-20 lg:pb-32">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[0.9375rem] font-semibold text-inverse-fg">
              <span aria-hidden="true" className="h-0.5 w-6 bg-brand-teal" />
              Live online exam coaching · Canada
            </p>
            <h1
              id="hero-heading"
              className="mt-6 max-w-[20ch] font-heading text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.02em] text-inverse-fg"
            >
              Pass your Canadian finance exams with live classes from Vipin Garg.
            </h1>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-inverse-muted">
              Vipin teaches live online classes for IFC, CSC, CIRE, RSE and LLQP. Between classes you practise in the
              learning app, and one instructor guides you from first lesson to exam day.
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold text-inverse-muted">What I teach</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {liveGroupCourses.map((c) => (
                  <li key={c.slug}>
                    <Link href={c.route} className={cn(chipBase, "bg-white/10 ring-1 ring-white/15 hover:bg-white/15", focusRing)}>
                      <span className="font-heading font-extrabold">{c.code}</span>
                    </Link>
                  </li>
                ))}
                {moreExams > 0 && (
                  <li>
                    <Link href="/courses" className={cn(chipBase, "font-semibold ring-1 ring-white/40 hover:bg-white/10", focusRing)}>
                      +{moreExams} more exams
                      <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={appUrl("signup", { campaign: "home-hero" })}
                rel="noopener"
                className={cn(
                  "inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors duration-150 hover:bg-cta-hover motion-reduce:transition-none sm:w-auto",
                  focusRing
                )}
              >
                Create free account
              </a>
              <Link
                href={findHref}
                className={cn(
                  "inline-flex min-h-12 w-full items-center justify-center rounded-lg px-6 text-base font-semibold text-inverse-fg ring-1 ring-white/40 transition-colors duration-150 hover:bg-white/10 motion-reduce:transition-none sm:w-auto",
                  focusRing
                )}
              >
                Find my course
              </Link>
            </div>

            <ul className="mt-8 flex flex-col gap-2 text-[0.9375rem] text-inverse-muted xl:flex-row xl:gap-x-6">
              {assurances.map((a) => (
                <li key={a} className="flex items-center gap-2 xl:whitespace-nowrap">
                  <Check aria-hidden="true" strokeWidth={2} className="size-4 shrink-0 text-brand-teal" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div aria-hidden="true" className="absolute -right-3 -bottom-3 left-6 top-6 rounded-2xl bg-brand-teal/35 sm:-right-5 sm:-bottom-5" />
            <div className="relative aspect-[4/5] max-h-[420px] w-full overflow-hidden rounded-2xl bg-surface-2 shadow-float lg:max-h-none">
              <Image
                src={portrait ?? "/images/vipin-garg.jpg"}
                alt="Vipin Garg, finance exam coach"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            {/* Cards sit on the lower third of the frame so the face stays clear. */}
            <div className="absolute -bottom-5 left-4 rounded-xl bg-surface px-4 py-3 shadow-float lg:-left-6">
              <span className="block text-[0.8125rem] text-muted-foreground">Your instructor</span>
              <span className="mt-0.5 block font-heading text-sm font-bold text-heading">{name}</span>
              <span className="block text-[0.8125rem] text-heading">{credentials[0] ?? role}</span>
            </div>
            {intake && (
              <div className="absolute top-[64%] -right-5 hidden rounded-xl bg-surface px-4 py-3 shadow-float lg:block">
                <span className="block text-[0.8125rem] text-muted-foreground">Next live cohort</span>
                <span className="mt-0.5 flex items-center gap-2 font-heading text-sm font-bold text-heading tabular">
                  <span aria-hidden="true" className="size-2 rounded-full bg-success" />
                  {intake.course.code} · {cohortDate}
                </span>
              </div>
            )}
          </figure>
        </div>
      </div>

      {/* Stat card straddles the bottom edge of the navy band. Every figure is derived from the catalogue. */}
      <div className="container-site relative z-10 -mt-14 lg:-mt-12">
        <dl className="grid grid-cols-2 rounded-2xl border border-border bg-surface shadow-float lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex flex-col-reverse justify-end px-5 py-5 lg:px-8 lg:py-6",
                i % 2 === 1 && "border-l border-border",
                i > 1 && "border-t border-border lg:border-t-0",
                i > 0 && "lg:border-l"
              )}
            >
              <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="font-heading text-3xl font-extrabold text-heading lg:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
