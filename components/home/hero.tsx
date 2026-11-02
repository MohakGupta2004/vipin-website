import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { appUrl } from "@/components/layout/app-links"
import { courses, liveGroupCourses } from "@/lib/data/courses"
import { isEnabled } from "@/lib/feature-flags"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

/*
 * Background photo: public/images/hero-bg.jpg
 * Source: https://www.pexels.com/photo/3756679/ (Pexels licence, free for commercial use, no attribution required)
 * Photographer: Andrea Piacquadio (credit from Pexels catalogue; confirm on the page above if attribution is wanted).
 * PLACEHOLDER: real photo of Vipin's students or classroom — swap hero-bg.jpg, keep the subject on the right third
 */

const focusRing = "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// Only exams the client offers; codes come from the course data so they cannot drift.
const codesFor = (area: string) => courses.filter((c) => c.area === area && c.offerConfirmed && c.status !== "upcoming")

export function Hero() {
  // Secondary link target follows the feature flags; falls back to the catalogue page.
  const findHref = isEnabled("homeCourseSearch") ? "#courses" : isEnabled("examFinder") ? "#find-my-course" : "/courses"
  const { name, portrait } = siteConfig.instructor
  const offered = courses.filter((c) => c.offerConfirmed).length

  const categories = [
    { label: "Securities", href: "/securities", exams: "IFC, CSC & CIRE" },
    { label: "Insurance", href: "/insurance", exams: "LLQP" },
    {
      label: "Financial planning",
      href: "/financial-planning",
      exams: codesFor("financial-planning").slice(0, 3).map((c) => c.code).join(", ").replace(/, ([^,]*)$/, " & $1"),
    },
  ]

  const facts = [
    { value: String(liveGroupCourses.length), label: "live group programmes" },
    { value: String(offered), label: "exams covered" },
    { value: "Live", label: "online, Canada-wide" },
    { value: "Free", label: "account in the learning app" },
  ]

  return (
    <section aria-labelledby="hero-heading">
      <div className="relative isolate overflow-hidden bg-surface-2 lg:flex lg:min-h-[clamp(560px,78vh,760px)] lg:items-center">
        {/* Photo: top band on mobile, full-bleed background from md up. */}
        <div className="relative h-72 w-full md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[28%] lg:-z-10 lg:h-auto lg:w-auto">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_20%] lg:object-[60%_18%]"
          />
        </div>
        {/* Left-to-right wash keeps the headline readable and the subject on the right clear. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-linear-to-r from-surface-2 from-28% via-surface-2/60 via-40% to-transparent to-62% lg:block"
        />

        <div className="container-site relative py-10 pb-24 md:py-14 lg:py-20 lg:pb-28 xl:pb-32">
          <div className="max-w-[46rem] lg:max-w-[36rem] xl:max-w-[40rem]">
            <p className="text-[0.9375rem] font-semibold text-link">Live online exam coaching with {name}</p>
            <h1
              id="hero-heading"
              className="mt-4 max-w-[20ch] font-heading text-[clamp(2.25rem,1.6rem+2.4vw,4rem)] leading-[1.08] font-bold tracking-[-0.02em] text-heading"
            >
              Live classes and exam prep for Canada&apos;s finance licences
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-foreground xl:text-xl">
              Live online classes for IFC, CSC, CIRE, RSE and LLQP, with practice in the learning app between sessions,
              taught by {name}.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {categories.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className={cn(
                      "group flex min-h-16 items-center justify-between gap-3 rounded-lg bg-primary px-4 py-3 text-primary-foreground transition-colors duration-150 hover:bg-cta-hover motion-reduce:transition-none",
                      focusRing
                    )}
                  >
                    <span>
                      <span className="block text-[0.8125rem] font-semibold tracking-wider uppercase opacity-90">{c.label}</span>
                      <span className="block text-[1.0625rem] leading-snug font-bold">{c.exams}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="size-5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-x-8 gap-y-1 sm:flex-row sm:items-center">
              <a
                href={appUrl("signup", { campaign: "home-hero" })}
                rel="noopener"
                className={cn("group inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-link", focusRing)}
              >
                Create free account in the app
                <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </a>
              <Link href={findHref} className={cn("inline-flex min-h-11 items-center text-base font-semibold text-heading underline-offset-4 hover:underline", focusRing)}>
                Find my course
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Facts card overlaps the bottom of the photo. Every figure comes from the course data. */}
      <div className="container-site relative z-10 -mt-12">
        <div className="grid items-stretch rounded-xl border border-border bg-surface shadow-float lg:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4 lg:border-r lg:border-b-0 lg:px-8">
            <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-surface-2">
              <Image src={portrait ?? "/images/vipin-garg.jpg"} alt="" fill sizes="40px" className="object-cover object-[50%_20%]" />
            </span>
            <span className="text-sm text-muted-foreground">
              Taught by
              <span className="block font-heading text-base font-bold text-heading">{name}</span>
            </span>
          </div>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={cn(
                  "flex flex-col-reverse justify-end px-5 py-4 lg:px-8",
                  i % 2 === 1 && "border-l border-border",
                  i > 1 && "border-t border-border lg:border-t-0",
                  i > 0 && "lg:border-l"
                )}
              >
                <dt className="mt-0.5 text-sm text-muted-foreground">{f.label}</dt>
                <dd className="font-heading text-2xl font-extrabold text-heading">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
