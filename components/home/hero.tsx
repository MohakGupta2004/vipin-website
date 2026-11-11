import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { appUrl } from "@/components/layout/app-links"
import { buttonVariants } from "@/components/ui/button"
import { courses } from "@/lib/data/courses"
import { isEnabled } from "@/lib/feature-flags"
import { cn } from "@/lib/utils"

import { CountUp } from "./count-up"

/*
 * Photo: public/hero.jpg — two professionals learning at a laptop (generic, not the instructor).
 * PLACEHOLDER: confirm licence/source of public/hero.jpg, or swap for a real photo of Vipin's class.
 */

const focusRing =
  "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// Desktop: exactly one screen tall (window minus announcement bar and header).
const desktopHeight = "min-h-[max(36rem,calc(100svh-var(--header-h)-2.75rem-1px))]"

// Frosted glass used by the eyebrow, the second button and the stat cards.
const glass = "bg-white/10 ring-1 ring-white/20 backdrop-blur-md"

// North-east arrow, same as the header's "Learning App" button. Nudges up-right on hover.
const arrowIcon =
  "size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"

const facts = [
  { value: "10+", label: "Years of Teaching Experience" },
  { value: "300+", label: "Students & Professionals Trained" },
  { value: "2000+", label: "Hours of Content Delivered" },
  { value: "CFA Charterholder", label: "Since 2014" },
]

// Only exams the client offers; codes come from the course data so they cannot drift.
function getExamCodes(area: string): string {
  const codes: string[] = []
  for (const course of courses) {
    if (course.area !== area) continue
    if (!course.offerConfirmed || course.status === "upcoming") continue
    codes.push(course.code)
  }
  const firstThree = codes.slice(0, 3)
  const last = firstThree.pop()
  if (firstThree.length === 0) return last ?? ""
  return `${firstThree.join(", ")} & ${last}`
}

// Secondary link target follows the feature flags; falls back to the catalogue page.
function getFindHref(): string {
  if (isEnabled("homeCourseSearch")) return "#courses"
  if (isEnabled("examFinder")) return "#find-my-course"
  return "/courses"
}

// Staggered entrance: each block rises 55ms after the previous one.
function rise(index: number) {
  return { className: "vg-rise", style: { animationDelay: `${40 + index * 55}ms` } }
}

/**
 * Pill version of the project Button. First one solid white, second one frosted.
 * No outer ring or border: depth comes from inner shadows only (a top highlight and a soft bottom shade).
 */
function categoryButtonClass(isFirst: boolean): string {
  const base = cn(buttonVariants({ variant: "cta", size: "lg" }), "group h-[3.25rem] w-auto rounded-full border-0 px-7 max-sm:rounded-full")
  if (isFirst) {
    return cn(
      base,
      "bg-white text-heading shadow-[inset_0_2px_1px_rgb(255_255_255/1),inset_0_-3px_8px_rgb(16_42_66/0.14),0_1px_2px_rgb(16_42_66/0.18)] hover:bg-white/95"
    )
  }
  return cn(
    base,
    "bg-white/12 text-white backdrop-blur-md shadow-[inset_0_1px_1px_rgb(255_255_255/0.3),inset_0_-3px_8px_rgb(0_0_0/0.25),inset_0_0_18px_rgb(255_255_255/0.06)] hover:bg-white/16"
  )
}

function TextLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium text-white transition-opacity duration-150 hover:opacity-75",
        focusRing,
        className
      )}
    >
      {children}
      <ArrowUpRight aria-hidden="true" strokeWidth={2} className={arrowIcon} />
    </Link>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  const isNumber = /^\d/.test(value)
  return (
    <div className={cn("flex min-w-0 flex-col-reverse justify-end rounded-2xl p-5 ring-white/15 backdrop-blur-xl [@media(max-height:820px)]:px-5 [@media(max-height:820px)]:py-4", glass)}>
      <dt className="mt-1.5 text-sm font-medium text-white/75">{label}</dt>
      {/* Fixed-height row so a word value ("CFA Charterholder") sits on the same baseline as the numbers. */}
      <dd className="flex h-9 items-end font-heading leading-none font-semibold tracking-[-0.035em] whitespace-nowrap text-white tabular-nums">
        <span className={isNumber ? "text-[2.125rem]" : "text-[1.375rem]"}>
          <CountUp value={value} />
        </span>
      </dd>
    </div>
  )
}

/** Phone stat card: smaller type, and a word value may wrap so it never spills out of a half-width card. */
function MobileStat({ value, label }: { value: string; label: string }) {
  const isNumber = /^\d/.test(value)
  return (
    <div className={cn("flex min-w-0 flex-col-reverse justify-end rounded-2xl p-3.5 [@media(max-height:760px)]:px-3 [@media(max-height:760px)]:py-2.5 ring-white/15 backdrop-blur-xl sm:p-4", glass)}>
      <dt className="mt-1 text-[0.75rem] leading-snug font-medium text-white/70 sm:mt-1.5 sm:text-[0.8125rem]">{label}</dt>
      <dd className="flex min-h-7 items-end font-heading leading-none font-semibold tracking-[-0.03em] text-white tabular-nums">
        <span className={isNumber ? "text-[1.625rem] sm:text-[1.875rem]" : "text-[0.9375rem] leading-tight sm:text-[1.0625rem]"}>
          <CountUp value={value} />
        </span>
      </dd>
    </div>
  )
}

function getCategories() {
  return [
    { label: "Securities", href: "/securities", exams: "IFC, CSC & CIRE" },
    // { label: "Insurance", href: "/insurance", exams: "LLQP" },
    { label: "Financial planning", href: "/financial-planning", exams: getExamCodes("financial-planning") },
  ]
}

/** The desktop hero: one screen tall, copy on the left, stats pinned to the bottom. */
function DesktopHero() {
  const categories = getCategories()

  return (
    <div className={cn("relative isolate overflow-hidden bg-[#102a42]", desktopHeight)}>
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 1px"
          className="object-cover object-[70%_50%] saturate-[.85]"
        />
      </div>

      {/* Navy fade so white text reads, left to right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-[rgb(16_42_66/0.85)] via-[rgb(16_42_66/0.48)] to-transparent"
      />
      {/* Soft light behind the headline. */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-20 size-[34rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(255_255_255/0.28),rgb(255_255_255/0.08)_45%,transparent_70%)] blur-3xl"
      />

      <div className={cn("relative z-10 container-site flex flex-col pt-14 pb-8 [@media(max-height:820px)]:pt-8 [@media(max-height:820px)]:pb-6", desktopHeight)}>
        <div className="my-auto max-w-[40rem] pb-8 [@media(max-height:820px)]:pb-6">
          <p
            {...rise(0)}
            className={cn("vg-rise inline-flex w-fit rounded-full px-4 py-2 text-[1.0625rem] font-semibold text-white", glass)}
          >
            Canadian financial licensing &amp; certification
          </p>

          <h1
            id="hero-heading"
            {...rise(1)}
            className="vg-rise mt-3 font-heading text-[clamp(2.75rem,4.4vw,4.25rem)] [@media(max-height:820px)]:text-[clamp(2.5rem,3.6vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-white"
          >
            Pass Your Next Financial Exam <span className="text-white/60">with Confidence</span>
          </h1>

          <p
            {...rise(2)}
            className="vg-rise mt-6 max-w-[42ch] text-[1.1875rem] [@media(max-height:820px)]:mt-4 leading-[1.6] text-pretty text-white/75"
          >
            Master the concepts with structured learning, clear instruction, and targeted practice for
            Canada&apos;s financial licensing and certification exams
          </p>

          <ul {...rise(3)} className="vg-rise mt-9 flex flex-row gap-3 [@media(max-height:820px)]:mt-6">
            {categories.map((category, i) => {
              const isFirst = i === 0
              return (
                <li key={category.label}>
                  <Link href={category.href} className={categoryButtonClass(isFirst)}>
                    <span>{category.label}</span>
                    <span aria-hidden="true" className={isFirst ? "text-heading/35" : "text-white/45"}>
                      ·
                    </span>
                    <span className={cn("font-normal", isFirst ? "text-heading/75" : "text-white/80")}>
                      {category.exams}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div {...rise(4)} className="vg-rise mt-4 flex flex-wrap items-center gap-x-7">
            <TextLink href={appUrl("signup", { campaign: "home-hero" })}>Explore Learning Platform</TextLink>
            <TextLink href={getFindHref()}>Find my course</TextLink>
          </div>
        </div>

        {/* Stats sit at the bottom of the hero, in normal flow so they never ride up into the links. */}
        <dl {...rise(5)} className="vg-rise grid grid-cols-4 gap-4">
          {facts.map((fact) => (
            <Stat key={fact.label} value={fact.value} label={fact.label} />
          ))}
        </dl>
      </div>

    </div>
  )
}

/**
 * Phones and tablets: a real stacked layout (not the desktop one shrunk).
 * Photo fills the whole hero under a top-to-bottom navy fade; copy, two stacked pills,
 * two text links, then the stats as a 2x2 grid (one row of four from md up).
 */
function MobileHero() {
  const categories = getCategories()

  return (
    <div className="relative isolate overflow-hidden bg-[#102a42]">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 1023px) 100vw, 1px"
          className="object-cover object-[78%_30%] saturate-[.85]"
        />
      </div>

      {/* Navy fade, light at the top and almost solid at the bottom, so copy and cards read on the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-[rgb(16_42_66/0.5)] via-[rgb(16_42_66/0.72)] to-[rgb(16_42_66/0.96)]"
      />
      {/* Soft light behind the headline. */}
      <div
        aria-hidden="true"
        className="absolute -top-28 -left-28 size-[24rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(255_255_255/0.22),rgb(255_255_255/0.06)_45%,transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 container-site pt-6 pb-6 [@media(max-height:760px)]:pt-4 [@media(max-height:760px)]:pb-4 sm:pt-14 sm:pb-14">
        <div className="max-w-[36rem]">
          <p
            {...rise(0)}
            className={cn(
              "vg-rise inline-flex w-fit rounded-full px-3 py-1 text-[0.75rem] font-semibold text-white/90 max-[359px]:rounded-xl sm:py-1.5 sm:text-[0.8125rem]",
              glass
            )}
          >
            Canadian financial licensing &amp; certification
          </p>

          <h1
            id="hero-heading-compact"
            {...rise(1)}
            className="vg-rise mt-3 font-heading text-[clamp(2rem,8.6vw,3.5rem)] [@media(max-height:760px)]:mt-2.5 [@media(max-height:760px)]:text-[clamp(1.75rem,7.6vw,2.5rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-white"
          >
            Pass Your Next Financial Exam <span className="text-white/60">with Confidence</span>
          </h1>

          <p {...rise(2)} className="vg-rise mt-3 max-w-[42ch] text-[0.9375rem] leading-[1.5] text-pretty text-white/75 [@media(max-height:760px)]:mt-2 [@media(max-height:760px)]:text-[0.875rem] sm:mt-5 sm:text-[1.0625rem] sm:leading-[1.6]">
            Master the concepts with structured learning, clear instruction, and targeted practice for
            Canada&apos;s financial licensing and certification exams
          </p>

          <ul {...rise(3)} className="vg-rise mt-5 flex flex-col items-start gap-2 [@media(max-height:760px)]:mt-4 sm:mt-8 sm:gap-3">
            {categories.map((category, i) => {
              const isFirst = i === 0
              return (
                <li key={category.label} className="max-w-full">
                  <Link
                    href={category.href}
                    className={cn(
                      categoryButtonClass(isFirst),
                      "h-auto min-h-11 max-w-full flex-wrap justify-start px-5 py-2 text-left [@media(max-height:760px)]:min-h-10 text-[0.875rem] whitespace-normal sm:min-h-12 sm:px-6 sm:py-3 sm:text-[0.9375rem]"
                    )}
                  >
                    <span>{category.label}</span>
                    <span aria-hidden="true" className={isFirst ? "text-heading/35" : "text-white/45"}>
                      ·
                    </span>
                    <span className={cn("font-normal", isFirst ? "text-heading/75" : "text-white/80")}>
                      {category.exams}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div {...rise(4)} className="vg-rise mt-1 flex flex-wrap items-center gap-x-4 sm:mt-3 sm:gap-x-5">
            <TextLink href={appUrl("signup", { campaign: "home-hero" })} className="text-[0.875rem] [@media(max-height:760px)]:min-h-9 sm:text-[1.0625rem]">
              Explore Learning Platform
            </TextLink>
            <TextLink href={getFindHref()} className="text-[0.875rem] [@media(max-height:760px)]:min-h-9 sm:text-[1.0625rem]">
              Find my course
            </TextLink>
          </div>
        </div>

        <dl {...rise(5)} className="vg-rise grid grid-cols-2 gap-2.5 pt-5 [@media(max-height:760px)]:gap-2 [@media(max-height:760px)]:pt-3 sm:gap-3 sm:pt-10 md:grid-cols-4">
          {facts.map((fact) => (
            <MobileStat key={fact.label} value={fact.value} label={fact.label} />
          ))}
        </dl>
      </div>
    </div>
  )
}

/**
 * Home hero. Full-bleed photo under a navy fade, white copy, frosted-glass controls and stat cards.
 * Desktop: one screen tall. Phones/tablets: their own stacked layout.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <div className="hidden lg:block">
        <DesktopHero />
      </div>
      <div className="lg:hidden">
        <MobileHero />
      </div>
    </section>
  )
}
