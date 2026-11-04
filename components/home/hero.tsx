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
    // { label: "Insurance", href: "/insurance", exams: "LLQP" },
    {
      label: "Financial planning",
      href: "/financial-planning",
      exams: codesFor("financial-planning").slice(0, 3).map((c) => c.code).join(", ").replace(/, ([^,]*)$/, " & $1"),
    },
  ]

  const facts = [
    { value: "10+", label: "Years of Teaching Experience" },
    { value: "300+", label: "Students & Professionals Trained" },
    { value: "2000+", label: "Hours of Content Delivered" },
    { value: "CFA Charterholder", label: "Since 2014" },
  ]

  return (
    <section aria-labelledby="hero-heading">
      <div className="relative isolate overflow-hidden bg-surface-2 lg:flex lg:min-h-[clamp(560px,78vh,760px)] lg:items-center">
        {/* Photo: background behind the top of the hero below lg, full-bleed on the right from lg up. */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[25rem] md:h-[32rem] lg:inset-y-0 lg:right-0 lg:left-[28%] lg:h-auto lg:w-auto">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_20%] lg:object-[60%_18%]"
          />
        </div>
        {/* Top-to-bottom wash below lg: the headline sits on the lower part of the photo, as on desktop. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[25rem] bg-linear-to-b from-transparent from-25% via-surface-2/85 via-60% to-surface-2 to-95% md:h-[32rem] lg:hidden"
        />
        {/* Left-to-right wash keeps the headline readable and the subject on the right clear. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-linear-to-r from-surface-2 from-28% via-surface-2/60 via-40% to-transparent to-62% lg:block"
        />

        <div className="container-site relative pt-[15rem] pb-20 md:pt-[21rem] md:pb-24 lg:py-20 lg:pb-28 xl:pb-32">
          <div className="max-w-[46rem] lg:max-w-[36rem] xl:max-w-[40rem]">
            <p className="text-[0.9375rem] font-semibold text-link">CANADIAN FINANCIAL LICENSING & CERTIFICATION</p>
            <h1
              id="hero-heading"
              className="mt-4 max-w-[20ch] font-heading leading-[1.08] font-bold tracking-[-0.02em] text-heading"
            >
              {/* Live classes and exam prep for Canada&apos;s finance licences */}
              Pass Your Next Financial Exam with Confidence
            </h1>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-foreground md:mt-6 md:text-lg xl:text-xl">
              {/* Live online classes for IFC, CSC, CIRE, RSE and LLQP, with practice in the learning app between sessions, */}
              {/* taught by {name}. */}
              Master the concepts with structured learning, clear instruction, and targeted practice for Canada's financial licensing and certification exams
            </p>

            <ul className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
              {categories.map((c) => (
                <li key={c.label} className="flex">
                  <Link
                    href={c.href}
                    className={cn(
                      "group flex min-h-14 w-full items-center justify-between gap-4 rounded-lg bg-primary px-4 py-2.5 shadow-sm max-sm:rounded-xl max-sm:transition-[transform,background-color] max-sm:active:scale-[0.98] sm:min-h-16 sm:px-5 sm:py-3 sm:shadow-none whitespace-nowrap sm:w-auto text-primary-foreground transition-colors duration-150 hover:bg-cta-hover motion-reduce:transition-none",
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

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-0 sm:mt-6 sm:flex-nowrap sm:gap-x-8 sm:gap-y-1">
              <a
                href={appUrl("signup", { campaign: "home-hero" })}
                rel="noopener"
                className={cn("group inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-link", focusRing)}
              >
                {/* Create free account in the app
                 */}
                 Explore Learning Platform
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
        <div className="rounded-xl border border-border bg-surface shadow-float max-sm:rounded-2xl">
          {/* <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5 sm:py-4 lg:border-r lg:border-b-0 lg:px-8"> */}
            {/* <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-surface-2">
              <Image src={portrait ?? "/images/vipin-garg.jpg"} alt="" fill sizes="40px" className="object-cover object-[50%_20%]" />
            </span> */}
            {/* <span className="text-sm text-muted-foreground">
              Taught by
              <span className="block font-heading text-base font-bold text-heading">{name}</span>
            </span> */}
          {/* </div> */}
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={cn(
                  "flex flex-col-reverse justify-end px-4 py-3.5 sm:px-5 sm:py-4 lg:px-8",
                  i % 2 === 1 && "border-l border-border",
                  i > 1 && "border-t border-border lg:border-t-0",
                  i > 0 && "lg:border-l"
                )}
              >
                <dt className="mt-0.5 text-sm text-muted-foreground">{f.label}</dt>
                <dd className="font-heading text-xl font-extrabold text-heading sm:text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
