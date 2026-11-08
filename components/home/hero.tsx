import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { appUrl } from "@/components/layout/app-links"
import { buttonVariants } from "@/components/ui/button"
import { courses } from "@/lib/data/courses"
import { isEnabled } from "@/lib/feature-flags"
import { cn } from "@/lib/utils"

import { CountUp } from "./count-up"
import { HeroScale } from "./hero-scale"

/*
 * Photo: public/hero.jpg — two professionals learning at a laptop (generic, not the instructor).
 * PLACEHOLDER: confirm licence/source of public/hero.jpg, or swap for a real photo of Vipin's class.
 */

const focusRing =
  "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// Desktop: exactly one screen tall (window minus announcement bar and header).
const desktopHeight = "min-h-[max(36rem,calc(100svh-var(--header-h)-2.75rem-1px))]"

// Phones/tablets: the desktop hero is drawn at this fixed size and scaled down to the screen width,
// so it looks exactly like desktop. Taller than 16:9 so the hero has room to breathe on a phone;
// the photo is anchored right so both people stay in frame.
const FRAME_WIDTH = 1024
const FRAME_HEIGHT = 900

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
  const base = cn(buttonVariants({ variant: "cta", size: "lg" }), "group h-[3.25rem] w-auto rounded-full px-7 max-sm:rounded-full")
  if (isFirst) {
    return cn(base, "bg-white text-heading shadow-[0_1px_2px_rgb(16_42_66/0.18)] hover:bg-white/90")
  }
  return cn(
    base,
    glass,
    "text-white ring-white/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_24px_-16px_rgb(0_0_0/0.7)] hover:bg-white/15"
  )
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium text-white transition-opacity duration-150 hover:opacity-75",
        focusRing
      )}
    >
      {children}
      <ArrowUpRight aria-hidden="true" strokeWidth={2} className={arrowIcon} />
    </Link>
  )
}

function Stat({ value, label, compact }: { value: string; label: string; compact: boolean }) {
  const isNumber = /^\d/.test(value)
  return (
    <div className={cn("flex min-w-0 flex-col-reverse justify-end rounded-2xl p-5 ring-white/15 backdrop-blur-xl", glass)}>
      <dt className="mt-1.5 text-sm font-medium text-white/75">{label}</dt>
      {/* Fixed-height row so a word value ("CFA Charterholder") sits on the same baseline as the numbers. */}
      <dd className="flex h-9 items-end font-heading leading-none font-semibold tracking-[-0.035em] whitespace-nowrap text-white tabular-nums">
        <span className={isNumber ? "text-[2.125rem]" : compact ? "text-[1.1875rem]" : "text-[1.375rem]"}>
          <CountUp value={value} />
        </span>
      </dd>
    </div>
  )
}

/**
 * The desktop hero layout. `frame` draws it at the fixed FRAME size (used scaled-down on phones/tablets);
 * otherwise it is one screen tall.
 */
function HeroScene({ frame, headingId }: { frame: boolean; headingId: string }) {
  const categories = [
    { label: "Securities", href: "/securities", exams: "IFC, CSC & CIRE" },
    // { label: "Insurance", href: "/insurance", exams: "LLQP" },
    { label: "Financial planning", href: "/financial-planning", exams: getExamCodes("financial-planning") },
  ]

  return (
    <div className={cn("relative isolate overflow-hidden bg-[#102a42]", frame ? "h-full" : desktopHeight)}>
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes={frame ? "(max-width: 1023px) 100vw, 1px" : "(min-width: 1024px) 100vw, 1px"}
          className={cn("object-cover saturate-[.85]", frame ? "object-[80%_50%]" : "object-[70%_50%]")}
        />
      </div>

      {/* Navy fade so white text reads, left to right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-[rgb(16_42_66/0.85)] via-[rgb(16_42_66/0.48)] to-transparent"
      />
      {/* Phones/tablets: deepen the bottom so the stat cards read and the hero settles into the page. */}
      {frame && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[rgb(16_42_66/0.9)] via-[rgb(16_42_66/0.45)] to-transparent"
        />
      )}
      {/* Soft light behind the headline. */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-20 size-[34rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(255_255_255/0.28),rgb(255_255_255/0.08)_45%,transparent_70%)] blur-3xl"
      />

      <div
        className={cn(
          "relative z-10 flex flex-col justify-center",
          frame ? "h-full px-14 pt-12 pb-[12.5rem]" : cn("container-site pt-14 pb-28", desktopHeight)
        )}
      >
        <div className="max-w-[40rem]">
          <p
            {...rise(0)}
            className={cn("vg-rise inline-flex w-fit rounded-full px-4 py-2 text-[1.0625rem] font-semibold text-white", glass)}
          >
            Canadian financial licensing &amp; certification
          </p>

          <h1
            id={headingId}
            {...rise(1)}
            className={cn(
              "vg-rise mt-3 font-heading leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-white",
              frame ? "text-[3.5rem]" : "text-[clamp(2.75rem,4.4vw,4.25rem)]"
            )}
          >
            Pass Your Next Financial Exam <span className="text-white/60">with Confidence</span>
          </h1>

          <p
            {...rise(2)}
            className="vg-rise mt-6 max-w-[42ch] text-[1.1875rem] leading-[1.6] text-pretty text-white/75"
          >
            Master the concepts with structured learning, clear instruction, and targeted practice for
            Canada&apos;s financial licensing and certification exams
          </p>

          <ul {...rise(3)} className="vg-rise mt-9 flex flex-row gap-3">
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
      </div>

      {/* Stats pinned to the bottom of the hero. */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 left-0 z-10",
          frame ? "bottom-14 px-14" : "bottom-8 container-site"
        )}
      >
        <dl {...rise(5)} className="vg-rise grid grid-cols-4 gap-4">
          {facts.map((fact) => (
            <Stat key={fact.label} value={fact.value} label={fact.label} compact={frame} />
          ))}
        </dl>
      </div>
    </div>
  )
}

/**
 * Home hero. Full-bleed photo under a navy fade, white copy, frosted-glass controls and stat cards.
 * Desktop: one screen tall. Phones/tablets: the same desktop layout, scaled down to fit the width.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <div className="hidden lg:block">
        <HeroScene frame={false} headingId="hero-heading" />
      </div>
      <HeroScale width={FRAME_WIDTH} height={FRAME_HEIGHT} className="bg-[#102a42] lg:hidden">
        <HeroScene frame headingId="hero-heading-compact" />
      </HeroScale>
    </section>
  )
}
