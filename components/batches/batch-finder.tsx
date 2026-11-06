"use client"

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Search, X } from "lucide-react"

import {
  cohortActionHref,
  cohortCourseHref,
  cohortDateLabel,
  cohortTimingLabel,
  courseFor,
  statusDisplay,
  type Cohort,
  type CohortFormat,
} from "@/lib/data/batches"
import { cn } from "@/lib/utils"

import { StatusPill, nudge, primaryPill, textLink } from "./ui"

type FormatFilter = "all" | CohortFormat
type StatusFilter = "all" | "dated" | "tba"

const focusRing = "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
// Apple's ease for things that slide: quick start, long soft landing, no overshoot.
const slide = "duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

type Option<T extends string> = { value: T; label: string; short?: string }

/** Arrow-key navigation shared by the radio groups (roving tabindex, WAI-ARIA radio group pattern). */
function useRovingKeys<T extends string>(options: Option<T>[], value: T, onChange: (v: T) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKeyDown = (e: KeyboardEvent) => {
    const i = options.findIndex((o) => o.value === value)
    const map: Record<string, number> = {
      ArrowRight: (i + 1) % options.length,
      ArrowDown: (i + 1) % options.length,
      ArrowLeft: (i - 1 + options.length) % options.length,
      ArrowUp: (i - 1 + options.length) % options.length,
      Home: 0,
      End: options.length - 1,
    }
    const next = map[e.key]
    if (next === undefined) return
    e.preventDefault()
    onChange(options[next].value)
    refs.current[next]?.focus()
  }
  return { refs, onKeyDown }
}

/** iOS-style segmented control: equal segments, a white thumb that slides to the selection. */
function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string
  value: T
  options: Option<T>[]
  onChange: (v: T) => void
  className?: string
}) {
  const index = Math.max(0, options.findIndex((o) => o.value === value))
  const { refs, onKeyDown } = useRovingKeys(options, value, onChange)
  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn("relative grid h-10 rounded-full bg-[#e8e8ed]/70 p-1", className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.08),inset_0_0_0_0.5px_rgb(0_0_0/0.06)] transition-transform",
          slide
        )}
        style={{ width: `calc((100% - 0.5rem) / ${options.length})`, transform: `translateX(${index * 100}%)` }}
      />
      {options.map((o, i) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={cn(
              "relative z-10 rounded-full px-2 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-200",
              on ? "text-heading" : "text-heading/55 hover:text-heading/80",
              focusRing
            )}
          >
            {o.short ? (
              <>
                <span className="sm:hidden">{o.short}</span>
                <span className="hidden sm:inline">{o.label}</span>
              </>
            ) : (
              o.label
            )}
          </button>
        )
      })}
    </div>
  )
}

/** Single-select exam chips; scrolls sideways on phones. */
function Chips({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: Option<string>[]
  onChange: (v: string) => void
}) {
  const { refs, onKeyDown } = useRovingKeys(options, value, onChange)
  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="flex w-fit max-w-full snap-x gap-1 overflow-x-auto rounded-full bg-[#e8e8ed]/70 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((o, i) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.value)}
            className={cn(
              "h-10 shrink-0 snap-start rounded-full px-4 text-sm font-medium whitespace-nowrap transition-[background-color,color,box-shadow] duration-200 ease-out motion-reduce:transition-none",
              on
                ? "bg-white text-heading shadow-[0_1px_2px_rgb(0_0_0/0.08),inset_0_0_0_0.5px_rgb(0_0_0/0.06)]"
                : "text-heading/65 hover:text-heading",
              focusRing
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */

function BatchRow({ cohort, index }: { cohort: Cohort; index: number }) {
  const course = courseFor(cohort)
  const s = statusDisplay(cohort)
  const specs = [
    { label: "Start date", value: cohortDateLabel(cohort), strong: Boolean(cohort.start) },
    { label: "Class days & time", value: cohortTimingLabel(cohort) },
    { label: "Sessions", value: cohort.duration },
  ]
  return (
    <li
      className="vg-rise transition-colors duration-300 hover:bg-[#fbfbfd]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <article
        aria-labelledby={`cohort-${cohort.id}`}
        className="grid gap-x-10 gap-y-5 px-5 py-6 sm:px-8 sm:py-9 xl:grid-cols-[7.5rem_minmax(0,1fr)_auto] xl:items-start"
      >
        <div className="flex items-start justify-between gap-4 xl:block">
          <div>
            <p className="font-heading text-[1.875rem] leading-none font-semibold tracking-[-0.035em] text-heading sm:text-[2.125rem]">
              {cohort.course}
            </p>
            {course ? <p className="mt-2 text-[0.8125rem] text-muted-foreground">{course.category}</p> : null}
          </div>
          <StatusPill cohort={cohort} className="xl:hidden" />
        </div>

        <div className="min-w-0">
          <h3
            id={`cohort-${cohort.id}`}
            className="font-heading text-[1.25rem] leading-snug font-semibold tracking-[-0.02em] text-heading"
          >
            {cohort.title}
          </h3>
          {course ? (
            <>
              <p className="mt-1 text-[0.9375rem] text-muted-foreground">{course.title}</p>
              <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-foreground">{course.summary}</p>
            </>
          ) : null}

          <dl className="mt-6 grid gap-x-6 gap-y-4 border-t border-black/[0.06] pt-5 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1.4fr)_minmax(0,0.75fr)]">
            {specs.map((sp) => (
              <div key={sp.label} className="min-w-0">
                <dt className="text-xs text-muted-foreground">{sp.label}</dt>
                <dd
                  className={cn(
                    "mt-1 text-[0.9375rem] leading-snug",
                    "tabular-nums",
                    sp.strong ? "font-semibold text-heading" : "text-heading/85"
                  )}
                >
                  {sp.value}
                </dd>
              </div>
            ))}
          </dl>

          {cohort.tag ? <p className="mt-4 text-[0.8125rem] text-muted-foreground">{cohort.tag}</p> : null}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 xl:min-w-[12rem] xl:flex-col xl:items-end xl:gap-y-3">
          <StatusPill cohort={cohort} className="hidden xl:inline-flex" />
          <Link href={cohortActionHref(cohort)} className={primaryPill("max-sm:w-full xl:mt-3")}>
            {s.action}
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn("size-4", nudge)} />
          </Link>
          <Link href={cohortCourseHref(cohort)} className={cn(textLink, "max-sm:w-full max-sm:justify-center")}>
            Course Details
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn("size-4", nudge)} />
          </Link>
        </div>
      </article>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Finder                                                              */
/* ------------------------------------------------------------------ */

export function BatchFinder({ cohorts }: { cohorts: Cohort[] }) {
  const [query, setQuery] = useState("")
  const [exam, setExam] = useState("all")
  const [format, setFormat] = useState<FormatFilter>("all")
  const [status, setStatus] = useState<StatusFilter>("all")
  const searchRef = useRef<HTMLInputElement>(null)

  const exams = useMemo(() => Array.from(new Set(cohorts.map((c) => c.course))), [cohorts])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cohorts.filter((c) => {
      if (exam !== "all" && c.course !== exam) return false
      if (format !== "all" && c.format !== format) return false
      if (status === "dated" && !c.start) return false
      if (status === "tba" && c.start) return false
      const course = courseFor(c)
      const haystack = [c.course, c.title, course?.title ?? "", course?.category ?? "", course?.summary ?? ""]
      if (q && !haystack.some((s) => s.toLowerCase().includes(q))) return false
      return true
    })
  }, [cohorts, query, exam, format, status])

  const filtered = query !== "" || exam !== "all" || format !== "all" || status !== "all"
  const reset = () => {
    setQuery("")
    setExam("all")
    setFormat("all")
    setStatus("all")
  }

  // "/" focuses search from anywhere on the page (unless already typing somewhere).
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable=true]")) return
      e.preventDefault()
      searchRef.current?.focus()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div>
      <div role="search" aria-label="Filter batches" className="space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Chips
            label="Exam"
            value={exam}
            onChange={setExam}
            options={[{ value: "all", label: "All Exams" }, ...exams.map((e) => ({ value: e, label: e }))]}
          />

          <label className="group/search relative block lg:w-80">
            <span className="sr-only">Search batches</span>
            <Search
              aria-hidden="true"
              strokeWidth={2}
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && query) {
                  e.preventDefault()
                  setQuery("")
                }
              }}
              placeholder="Search IFC, CSC, CIRE, LLQP…"
              className="h-11 w-full rounded-full bg-white pr-11 pl-10 text-[0.9375rem] text-heading shadow-[0_0_0_1px_rgb(0_0_0/0.08)] transition-shadow duration-200 outline-hidden placeholder:text-placeholder hover:shadow-[0_0_0_1px_rgb(0_0_0/0.16)] focus:shadow-[0_0_0_1px_var(--primary),0_0_0_4px_rgb(36_99_235/0.15)] [&::-webkit-search-cancel-button]:hidden"
            />
            {/* "/" hint at rest; a clear button once there is text. */}
            <kbd
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-md bg-black/[0.05] px-1.5 py-0.5 font-sans text-xs text-muted-foreground transition-opacity duration-150 group-focus-within/search:opacity-0 lg:block",
                query && "opacity-0"
              )}
            >
              /
            </kbd>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                searchRef.current?.focus()
              }}
              aria-label="Clear search"
              tabIndex={query ? 0 : -1}
              className={cn(
                "absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/[0.06] text-heading/70 transition-[opacity,transform] duration-200 hover:bg-black/10",
                query ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
                focusRing
              )}
            >
              <X aria-hidden="true" strokeWidth={2.25} className="size-3.5" />
            </button>
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Segmented
            label="Schedule"
            value={format}
            onChange={setFormat}
            className="sm:w-[26rem]"
            options={[
              { value: "all", label: "Any Schedule", short: "Any" },
              { value: "Weekday", label: "Weekday" },
              { value: "Weekend", label: "Weekend" },
              { value: "TBA", label: "TBA" },
            ]}
          />
          <Segmented
            label="Start date"
            value={status}
            onChange={setStatus}
            className="sm:w-[22rem]"
            options={[
              { value: "all", label: "All Batches", short: "All" },
              { value: "dated", label: "Date announced", short: "Announced" },
              { value: "tba", label: "Date TBA" },
            ]}
          />
        </div>
      </div>

      {/* Count + Reset share one line, so a hidden Reset never leaves a gap. */}
      <div className="mt-6 mb-3 flex min-h-10 items-center justify-between gap-4 px-1">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {shown.length} {shown.length === 1 ? "batch" : "batches"}
          {filtered ? (shown.length === 1 ? " matches your filters" : " match your filters") : ""}
        </p>
        <button
          type="button"
          onClick={reset}
          tabIndex={filtered ? 0 : -1}
          aria-hidden={!filtered}
          className={cn(
            "inline-flex h-10 items-center px-2 text-sm font-medium text-link transition-[opacity,transform] duration-200 ease-out hover:opacity-75",
            filtered ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-1 opacity-0",
            focusRing
          )}
        >
          Reset Filters
        </button>
      </div>

      {shown.length > 0 ? (
        <ul className="divide-y divide-black/[0.06] overflow-hidden rounded-panel sm:rounded-section bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.05),0_20px_40px_-32px_rgb(16_42_66/0.3)]">
          {shown.map((c, i) => (
            <BatchRow key={c.id} cohort={c} index={i} />
          ))}
        </ul>
      ) : (
        <div className="vg-rise rounded-panel sm:rounded-section bg-white px-6 py-16 text-center shadow-[0_0_0_1px_rgb(0_0_0/0.05)]">
          <p className="font-heading text-xl font-semibold tracking-[-0.02em] text-heading">No batches match these filters</p>
          <p className="mx-auto mt-2 max-w-[44ch] text-[0.9375rem] text-muted-foreground">
            Don&apos;t see your preferred batch? Join the interest list and we will email you when one opens.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <Link href="/contact" className={primaryPill()}>
              Join Interest List
              <ArrowUpRight aria-hidden="true" strokeWidth={2} className={cn("size-4", nudge)} />
            </Link>
            <button type="button" onClick={reset} className={textLink}>
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
