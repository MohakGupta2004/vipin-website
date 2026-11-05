import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { appUrl } from "@/components/layout/app-links"
import { courses } from "@/lib/data/courses"
import { isEnabled } from "@/lib/feature-flags"
import { cn } from "@/lib/utils"

/*
 * Photo: public/images/hero-bg.jpg
 * Source: https://www.pexels.com/photo/3756679/ (Pexels licence, free for commercial use, no attribution required)
 * Photographer: Andrea Piacquadio (credit from Pexels catalogue; confirm on the page above if attribution is wanted).
 * PLACEHOLDER: real photo of Vipin's students or classroom — swap hero-bg.jpg (subject sits right of centre)
 */

const focusRing =
  "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// Only exams the client offers; codes come from the course data so they cannot drift.
const codesFor = (area: string) =>
  courses.filter(
    (c) => c.area === area && c.offerConfirmed && c.status !== "upcoming"
  )

/**
 * Home hero. Deliberately quiet: one text colour, one accent (blue, on actions only),
 * hierarchy from size and weight, and a decorative photograph behind the copy.
 */
export function Hero() {
  // Secondary link target follows the feature flags; falls back to the catalogue page.
  const findHref = isEnabled("homeCourseSearch")
    ? "#courses"
    : isEnabled("examFinder")
      ? "#find-my-course"
      : "/courses"

  const categories = [
    { label: "Securities", href: "/securities", exams: "IFC, CSC & CIRE" },
    // { label: "Insurance", href: "/insurance", exams: "LLQP" },
    {
      label: "Financial planning",
      href: "/financial-planning",
      exams: codesFor("financial-planning")
        .slice(0, 3)
        .map((c) => c.code)
        .join(", ")
        .replace(/, ([^,]*)$/, " & $1"),
    },
  ]

  const facts = [
    { value: "10+", label: "Years of Teaching Experience" },
    { value: "300+", label: "Students & Professionals Trained" },
    { value: "2000+", label: "Hours of Content Delivered" },
    { value: "CFA Charterholder", label: "Since 2014" },
  ]

  const textLink = cn(
    "group inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium text-link transition-opacity duration-150 hover:opacity-75",
    focusRing
  )
  const chevron =
    "size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
  // Staggered entrance: each block rises 55ms after the previous one; the last one lands under 0.9s.
  const rise = (i: number) => ({
    className: "vg-rise",
    style: { animationDelay: `${40 + i * 55}ms` },
  })

  return (
    <section
      aria-labelledby="hero-heading"
      // Desktop: exactly one screen tall (window minus announcement bar and header), stats pinned to the bottom.
      className="bg-[#fbfbfd] lg:flex lg:min-h-[max(36rem,calc(100svh-var(--header-h)-2.75rem-1px))] lg:flex-col"
    >
      <div className="relative isolate flex flex-col overflow-hidden lg:flex-1">
        {/* Decorative photograph (not the instructor), behind the copy at every size.
          Desktop: the right part of the hero, full height. Phones/tablets: the top of the hero, dissolving
          into the page with a mask (no overlay, so there is never a visible edge). */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[31rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_42%,transparent_100%)] sm:h-[36rem] lg:inset-y-0 lg:right-0 lg:left-[34%] lg:h-auto lg:[mask-image:none] xl:left-[36%]"
        >
          <div className="vg-settle absolute inset-0">
            <Image
              src="/images/hero-bg.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover object-[68%_28%] lg:object-[58%_30%]"
            />
          </div>
          {/* Desktop: a narrow fade on the left edge only (the face stays clear), and a soft one at the bottom. */}
          <div className="absolute inset-y-0 left-0 hidden w-[28%] bg-linear-to-r from-[#fbfbfd] via-[#fbfbfd]/45 to-[#fbfbfd]/0 lg:block" />
          {/* Desktop: a light scrim along the bottom only, so the stats stay legible over the busy foreground. */}
          <div className="absolute inset-x-0 bottom-0 hidden h-[24%] bg-linear-to-t from-[#fbfbfd]/80 via-[#fbfbfd]/40 to-[#fbfbfd]/0 lg:block" />
        </div>

        <div className="container-site lg:flex lg:flex-1 lg:flex-col lg:justify-center">
          <div className="pt-[15.5rem] sm:pt-[20rem] lg:max-w-[33rem] lg:py-[clamp(1rem,3svh,2.5rem)] xl:max-w-[37rem]">
            <p
              {...rise(0)}
              className="vg-rise text-[0.9375rem] font-semibold tracking-[-0.005em] text-muted-foreground sm:text-[1.0625rem]"
            >
              Canadian financial licensing &amp; certification
            </p>

            <h1
              id="hero-heading"
              {...rise(1)}
              className="vg-rise mt-3 font-heading text-[2.5rem] leading-[1.04] min-[400px]:text-[2.75rem] font-semibold tracking-[-0.04em] text-balance text-heading sm:text-[3.75rem] lg:text-[clamp(2.75rem,min(4.6vw,7svh),4.5rem)]"
            >
              Pass Your Next Financial Exam{" "}
              <span className="text-[#86868b]">with Confidence</span>
            </h1>

            <p
              {...rise(2)}
              className="vg-rise mt-6 max-w-[42ch] text-[1.0625rem] leading-[1.6] text-pretty text-muted-foreground sm:text-[1.1875rem] lg:mt-[clamp(0.875rem,2.2svh,1.5rem)] lg:text-[clamp(1rem,2.1svh,1.1875rem)]"
            >
              Master the concepts with structured learning, clear instruction,
              and targeted practice for Canada&apos;s financial licensing and
              certification exams
            </p>

            <ul
              {...rise(3)}
              className="vg-rise mt-10 flex flex-col gap-3 sm:flex-row lg:mt-[clamp(1.25rem,4svh,2.5rem)]"
            >
              {categories.map((c, i) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className={cn(
                      "inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] whitespace-nowrap transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] motion-reduce:transition-none sm:w-auto",
                      i === 0
                        ? "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_1px_2px_rgb(16_42_66/0.18)] hover:bg-cta-hover"
                        : "bg-white/75 text-heading shadow-[0_0_0_1px_rgb(16_42_66/0.08),0_1px_2px_rgb(16_42_66/0.06)] backdrop-blur-xl backdrop-saturate-150 hover:bg-white",
                      focusRing
                    )}
                  >
                    <span className="font-semibold">{c.label}</span>
                    <span
                      aria-hidden="true"
                      className={
                        i === 0 ? "text-white/40" : "text-[#86868b]/60"
                      }
                    >
                      ·
                    </span>
                    <span
                      className={
                        i === 0 ? "text-white/80" : "text-muted-foreground"
                      }
                    >
                      {c.exams}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div
              {...rise(4)}
              className="vg-rise mt-4 flex flex-wrap items-center gap-x-7 lg:mt-[clamp(0.5rem,1.5svh,1.25rem)]"
            >
              <a
                href={appUrl("signup", { campaign: "home-hero" })}
                rel="noopener"
                className={textLink}
              >
                Explore Learning Platform
                <ChevronRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className={chevron}
                />
              </a>
              <Link href={findHref} className={textLink}>
                Find my course
                <ChevronRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className={chevron}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Facts: no panel, just type over the photograph. Legibility comes from full-ink values and
            slightly heavier labels (Apple "vibrancy"), not from a background. */}
        <div className="container-site mt-10 pb-12 sm:mt-12 sm:pb-14 lg:mt-0 lg:pb-[clamp(1rem,3svh,2rem)]">
          <dl
            {...rise(5)}
            className="vg-rise grid grid-cols-2 gap-y-8 border-t border-black/[0.08] pt-8 lg:grid-cols-4 lg:gap-y-0 lg:border-t-0 lg:py-[clamp(0.5rem,2svh,1.25rem)]"
          >
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={cn(
                  "flex min-w-0 flex-col-reverse justify-end px-2 text-center sm:px-6",
                  i % 2 === 1 && "border-l border-[rgb(16_42_66/0.12)]",
                  i > 0 && "lg:border-l"
                )}
              >
                <dt className="mt-2 text-[0.8125rem] font-medium text-heading/65 sm:text-sm">
                  {f.label}
                </dt>
                {/* Fixed-height row so a word value ("CFA Charterholder") sits on the same baseline as the numbers. */}
                <dd className="flex h-7 items-end justify-center font-heading leading-none font-semibold tracking-[-0.035em] whitespace-nowrap text-heading sm:h-9 lg:h-10">
                  <span
                    className={
                      /^\d/.test(f.value)
                        ? "text-[1.75rem] sm:text-[2.25rem] lg:text-[clamp(1.875rem,4svh,2.5rem)]"
                        : "text-base sm:text-[1.5rem] lg:text-[1.625rem]"
                    }
                  >
                    {f.value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
