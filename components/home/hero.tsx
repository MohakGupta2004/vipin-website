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
const desktopHeight = "lg:min-h-[max(36rem,calc(100svh-var(--header-h)-2.75rem-1px))]"

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

/** Pill version of the project Button. First one solid white, second one glass. */
function categoryButtonClass(isFirst: boolean): string {
  const base = cn(
    buttonVariants({ variant: "cta", size: "lg" }),
    // Narrow phones: less side padding so "Financial planning · WME, FP1 & FP2" fits on one line.
    "group h-[3.25rem] w-full rounded-full px-4 max-sm:rounded-full min-[360px]:px-7 sm:w-auto"
  )
  if (isFirst) {
    return cn(base, "bg-white text-heading shadow-[0_1px_2px_rgb(16_42_66/0.18)] hover:bg-white/90")
  }
  return cn(
    base,
    glass,
    "text-white ring-white/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_24px_-16px_rgb(0_0_0/0.7)] hover:bg-white/15"
  )
}

// Phones/tablets: the two categories are rows of one grouped glass list.
function CategoryRow({ href, label, exams }: { href: string; label: string; exams: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex min-h-14 items-center justify-between gap-2 px-3 outline-hidden transition-colors min-[360px]:gap-3 min-[360px]:px-4 duration-150 hover:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring active:bg-white/10"
      >
        <span className="min-w-0 truncate text-[0.8125rem] text-white min-[360px]:text-[0.9375rem]">
          <span className="font-semibold">{label}</span>
          <span aria-hidden="true" className="text-white/45">
            {" · "}
          </span>
          <span className="text-white/75">{exams}</span>
        </span>
        <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn(arrowIcon, "shrink-0 text-white/70")} />
      </Link>
    </li>
  )
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-0.5 text-[0.9375rem] font-medium text-white transition-opacity sm:text-[1.0625rem] duration-150 hover:opacity-75",
        focusRing
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
    <div className={cn("flex min-w-0 flex-col-reverse justify-end rounded-2xl p-4 ring-white/15 backdrop-blur-xl sm:p-5", glass)}>
      <dt className="mt-1.5 text-[0.8125rem] font-medium text-white/75 sm:text-sm">{label}</dt>
      {/* Fixed-height row so a word value ("CFA Charterholder") sits on the same baseline as the numbers. */}
      <dd className="flex h-8 items-end font-heading leading-none font-semibold tracking-[-0.035em] whitespace-nowrap text-white tabular-nums sm:h-9">
        <span className={isNumber ? "text-[1.75rem] sm:text-[2.125rem]" : "text-base sm:text-[1.375rem]"}>
          <CountUp value={value} />
        </span>
      </dd>
    </div>
  )
}

// Hairlines between the cells of the 2x2 (phones) or 1x4 (tablets) panel.
function phoneStatBorders(index: number): string {
  let borders = ""
  if (index % 2 === 0) borders += " border-r"
  if (index < 2) borders += " border-b"
  borders += " sm:border-b-0"
  if (index < 3) borders += " sm:border-r"
  else borders += " sm:border-r-0"
  return borders
}

// Phones/tablets: the four facts as one glass panel.
function PhoneStats() {
  return (
    <dl
      {...rise(5)}
      className={cn(
        "vg-rise mt-6 grid grid-cols-2 overflow-clip rounded-2xl ring-white/15 backdrop-blur-xl sm:mt-8 sm:grid-cols-4 lg:hidden",
        glass
      )}
    >
      {facts.map((fact, index) => {
        const isNumber = /^\d/.test(fact.value)
        return (
          <div
            key={fact.label}
            className={cn("flex min-w-0 flex-col-reverse justify-end border-white/12 p-3 min-[360px]:p-4", phoneStatBorders(index))}
          >
            <dt className="mt-1.5 text-[0.75rem] leading-snug font-medium text-white/70">{fact.label}</dt>
            <dd className="flex h-8 items-end font-heading leading-none font-semibold tracking-[-0.035em] whitespace-nowrap text-white tabular-nums">
              <span className={isNumber ? "text-[1.5rem]" : "text-[0.8125rem] min-[360px]:text-[0.9375rem]"}>
                <CountUp value={fact.value} />
              </span>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

function Stats({ className }: { className: string }) {
  return (
    <dl {...rise(5)} className={cn("vg-rise grid gap-3 sm:gap-4", className)}>
      {facts.map((fact) => (
        <Stat key={fact.label} value={fact.value} label={fact.label} />
      ))}
    </dl>
  )
}

/**
 * Home hero. Full-bleed photo under a navy fade, white copy, frosted-glass controls and stat cards.
 */
export function Hero() {
  const categories = [
    { label: "Securities", href: "/securities", exams: "IFC, CSC & CIRE" },
    // { label: "Insurance", href: "/insurance", exams: "LLQP" },
    { label: "Financial planning", href: "/financial-planning", exams: getExamCodes("financial-planning") },
  ]

  return (
    <section aria-labelledby="hero-heading">
      <div className={cn("relative isolate overflow-hidden bg-[#102a42] lg:bg-transparent", desktopHeight)}>
        {/* Phones/tablets: the photo is a band at the top. Desktop: it fills the whole hero. */}
        <div className="absolute inset-x-0 top-0 h-[16rem] sm:h-[22rem] lg:inset-0 lg:h-auto">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_30%] saturate-[.85] lg:object-[70%_50%]"
          />
        </div>

        {/* Navy fade so white text reads: photo band melts into navy on phones, left-to-right on desktop. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[16rem] bg-linear-to-b from-transparent via-[rgb(16_42_66/0.35)] to-[#102a42] sm:h-[22rem] lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-r from-[rgb(16_42_66/0.85)] via-[rgb(16_42_66/0.48)] to-transparent lg:block"
        />
        {/* Soft light behind the headline. */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-20 hidden size-[34rem] lg:block rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(255_255_255/0.28),rgb(255_255_255/0.08)_45%,transparent_70%)] blur-3xl"
        />

        <div
          className={cn(
            "container-site relative z-10 pt-44 pb-24 sm:pt-64 lg:flex lg:flex-col lg:justify-center lg:pt-14 lg:pb-28",
            desktopHeight
          )}
        >
          <div className="max-w-[40rem]">
            <p
              {...rise(0)}
              className={cn(
                "vg-rise inline-flex w-fit rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold text-white max-[359px]:text-[0.75rem] sm:px-4 sm:py-2 sm:text-[0.9375rem] lg:text-[1.0625rem]",
                glass
              )}
            >
              Canadian financial licensing &amp; certification
            </p>

            <h1
              id="hero-heading"
              {...rise(1)}
              className="vg-rise mt-3 font-heading text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-white min-[400px]:text-[2.75rem] sm:text-[3.75rem] lg:text-[clamp(2.75rem,4.4vw,4.25rem)]"
            >
              Pass Your Next Financial Exam <span className="text-white/60">with Confidence</span>
            </h1>

            <p
              {...rise(2)}
              className="vg-rise mt-6 max-w-[34ch] text-base leading-[1.55] text-pretty text-white/75 sm:text-[1.0625rem] lg:max-w-[42ch] lg:text-[1.1875rem] lg:leading-[1.6]"
            >
              Master the concepts with structured learning, clear instruction, and targeted practice for
              Canada&apos;s financial licensing and certification exams
            </p>

            {/* Phones/tablets: one grouped glass list. */}
            <ul
              {...rise(3)}
              className={cn(
                "vg-rise mt-8 divide-y divide-white/15 overflow-clip rounded-2xl sm:grid sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:hidden",
                glass
              )}
            >
              {categories.map((category) => (
                <CategoryRow key={category.label} href={category.href} label={category.label} exams={category.exams} />
              ))}
            </ul>

            {/* Desktop: two pills side by side. */}
            <ul {...rise(3)} className="vg-rise mt-9 hidden flex-row gap-3 lg:flex">
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

            <div {...rise(4)} className="vg-rise mt-4 flex flex-wrap items-center gap-x-6 max-lg:gap-y-1 lg:gap-x-7">
              <TextLink href={appUrl("signup", { campaign: "home-hero" })}>Explore Learning Platform</TextLink>
              <TextLink href={getFindHref()}>Find my course</TextLink>
            </div>

            <PhoneStats />
          </div>
        </div>

        {/* Desktop: stats pinned to the bottom of the hero. */}
        <div className="container-site pointer-events-none absolute right-0 bottom-8 left-0 z-10 hidden lg:block">
          <Stats className="grid-cols-4" />
        </div>
      </div>
    </section>
  )
}
