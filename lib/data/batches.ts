/**
 * Upcoming group batches: /upcoming-batches, its featured cohort, and (optionally) the top banner.
 *
 * Prototype data for the upcoming-batches UI.
 * IMPORTANT: This is NOT a confirmed public schedule.
 * Use a CMS/database as the source of truth in production.
 * Publish only verified cohort information.
 *
 * Field names mirror the client's BATCHES_CONFIG so updates can be pasted across. The optional fields
 * below them follow the client's CMS schema (cohort_id, course_id, delivery_format, schedule_type,
 * start_date, timezone, days_of_week, start_time, end_time, number_of_sessions, tuition, capacity,
 * seats_remaining, status, published, registration_url, updated_at). Leave a field out when unknown;
 * never fill it with a guess. `note` is guidance for editors and is never shown on the site.
 *
 * Rules (client brief):
 * - Only `published` cohorts appear. A cohort whose start date has passed leaves the Upcoming list.
 * - The top banner may feature a cohort only when published, status "open" and starting in the future;
 *   otherwise it uses the neutral all-batches message (see bannerCohort / GENERIC_BANNER).
 * - Unconfirmed cohorts collect interest only and never show a made-up date.
 * - Times are shown in the cohort's time zone with PT/ET written out.
 */

import { appUrl } from "@/lib/app-links"
import { siteConfig } from "@/lib/site-config"
import { getCourse } from "./courses"

export const batchesConfig = {
  guidanceEmail: "contact@vipingarg.com",
  appUrl: appUrl("signup", { campaign: "upcoming-batches" }),
} as const

export type BatchCourse = {
  code: string
  title: string
  category: string
  /** Concise placeholder pending final copy (client brief). */
  summary: string
  /** Course slug in lib/data/courses.ts: Course Details deep-link and contact form pre-fill. */
  slug: string
}

export type CohortFormat = "Weekday" | "Weekend" | "TBA"
/**
 * Client CMS statuses: draft, tentative, open, full, closed, completed.
 * "interest" (from the prototype config) = no date yet, interest list open; it displays as "Date TBA".
 */
export type CohortStatus = "draft" | "tentative" | "open" | "full" | "closed" | "completed" | "interest"
export type Cohort = {
  id: string
  /** Course code, matching BatchCourse.code. */
  course: string
  title: string
  /** ISO date (YYYY-MM-DD) or null when not announced. */
  start: string | null
  dayLabel: string
  timing: string
  format: CohortFormat
  duration: string
  status: CohortStatus
  /** Short public note shown on the card under the schedule. */
  tag: string
  /** Editor guidance only. Not rendered. */
  note: string
  /** Shown in the page hero. Defaults to the first cohort with a date. */
  featured?: boolean

  /* ---- Client CMS schema (optional until real data exists) ---- */
  /** Default true. false hides the cohort everywhere. */
  published?: boolean
  deliveryFormat?: "group" | "private"
  /** IANA zone, e.g. "America/Vancouver" (PT) or "America/Toronto" (ET). Defaults to siteConfig.timezone. */
  timezone?: string
  daysOfWeek?: string[]
  /** 24h "HH:MM" in `timezone`. */
  startTime?: string
  endTime?: string
  numberOfSessions?: number
  /** CAD. Only when the client confirms it. */
  tuition?: number
  capacity?: number
  /** Only if accurate (real capacity tracking). */
  seatsRemaining?: number
  /** Real registration/checkout URL. Without it, actions go to the enquiry form. */
  registrationUrl?: string
  /** ISO timestamp of the last edit. */
  updatedAt?: string
}

export const batchCourses: BatchCourse[] = [
  { code: "IFC", title: "Investment Funds in Canada", category: "Mutual Funds", summary: "Mutual funds, investments, client needs, and exam preparation.", slug: "ifc" },
  { code: "CSC 1", title: "Canadian Securities Course — Exam 1", category: "Securities", summary: "Economics, financial markets, and investment products.", slug: "csc-1" },
  { code: "CSC 2", title: "Canadian Securities Course — Exam 2", category: "Securities", summary: "Portfolio management, investment analysis, and client-focused advice.", slug: "csc-2" },
  { code: "CIRE", title: "Canadian Investment Regulatory Exam", category: "CIRO", summary: "Canadian investment regulation, conduct, and professional responsibilities.", slug: "cire" },
  { code: "RSE", title: "Retail Securities Exam", category: "CIRO", summary: "Retail investment products, client suitability, and securities knowledge.", slug: "rse" },
  { code: "LLQP", title: "Life Licence Qualification Program", category: "Insurance", summary: "Life insurance products, client needs, and licensing exam preparation.", slug: "llqp" },
]

// PLACEHOLDER: replace with verified cohorts from the client (or a CMS) before launch.
// All cohorts below are samples. 18 November was a tentative date previously discussed; the rest are TBA.
export const cohorts: Cohort[] = [
  {
    id: "ifc-wd-2026-11",
    course: "IFC",
    title: "IFC — Weekday Group",
    start: "2026-11-18",
    dayLabel: "Wednesday, 18 November 2026",
    timing: "Wednesdays & Thursdays · Time TBA",
    format: "Weekday",
    duration: "10 sessions",
    status: "tentative",
    tag: "Start date to be confirmed",
    note: "Example based on a previously discussed date. Do not publish as confirmed.",
    featured: true,
    published: true,
    deliveryFormat: "group",
    daysOfWeek: ["Wednesday", "Thursday"],
    numberOfSessions: 10,
  },
  {
    id: "csc1-we",
    course: "CSC 1",
    title: "CSC Exam 1 — Weekend Group",
    start: null,
    dayLabel: "Date to be announced",
    timing: "Weekend group · Schedule TBA",
    format: "Weekend",
    duration: "Course schedule TBA",
    status: "interest",
    tag: "Interest list open",
    note: "Register interest and receive the schedule when announced.",
    published: true,
    deliveryFormat: "group",
  },
  {
    id: "cire-next",
    course: "CIRE",
    title: "CIRE — Next Group Cohort",
    start: null,
    dayLabel: "Date to be announced",
    timing: "Days and time to be announced",
    format: "TBA",
    duration: "Course schedule TBA",
    status: "interest",
    tag: "Interest list open",
    note: "Express interest to be notified when a cohort is scheduled.",
    published: true,
    deliveryFormat: "group",
  },
  {
    id: "llqp-next",
    course: "LLQP",
    title: "LLQP — Next Group Cohort",
    start: null,
    dayLabel: "Date to be announced",
    timing: "Days and time to be announced",
    format: "TBA",
    duration: "Course schedule TBA",
    status: "interest",
    tag: "Interest list open",
    note: "Express interest to be notified when a cohort is scheduled.",
    published: true,
    deliveryFormat: "group",
  },
]

/* ------------------------------------------------------------------ */
/* Rules                                                               */
/* ------------------------------------------------------------------ */

/** Today as YYYY-MM-DD in the cohort's time zone. */
function todayIn(timezone: string, now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now)
}

const tzOf = (c: Cohort) => c.timezone ?? siteConfig.timezone

/** True once the start date is before today (in the cohort's zone). Undated cohorts never expire. */
export function hasStarted(c: Cohort, now: Date = new Date()): boolean {
  return Boolean(c.start) && (c.start as string) < todayIn(tzOf(c), now)
}

const HIDDEN: CohortStatus[] = ["draft", "completed"]

/** Cohorts for the Upcoming list: published, not draft/completed, not started yet. */
export function upcomingCohorts(now: Date = new Date()): Cohort[] {
  return cohorts.filter((c) => c.published !== false && !HIDDEN.includes(c.status) && !hasStarted(c, now))
}

/** The one cohort the top banner may name: published, status "open", start date in the future. */
export function bannerCohort(now: Date = new Date()): Cohort | undefined {
  return upcomingCohorts(now)
    .filter((c) => c.status === "open" && c.start && c.start > todayIn(tzOf(c), now))
    .sort((a, b) => (a.start as string).localeCompare(b.start as string))[0]
}

/** Neutral banner when no cohort qualifies (client brief: never make up a date). */
export const GENERIC_BANNER = {
  badge: "Upcoming Batches",
  message: "Explore Group Classes & Start Dates",
  linkLabel: "View Upcoming Batches",
  href: "/upcoming-batches",
} as const

export function getFeaturedCohort(now: Date = new Date()): Cohort | undefined {
  const list = upcomingCohorts(now)
  return list.find((c) => c.featured) ?? list.find((c) => c.start) ?? list[0]
}

/* ------------------------------------------------------------------ */
/* Display                                                             */
/* ------------------------------------------------------------------ */

export type StatusDisplay = { label: string; action: string; tone: "success" | "warning" | "neutral" | "muted" }

/** Pill colours per status tone. */
export const statusToneClass: Record<StatusDisplay["tone"], string> = {
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  neutral: "bg-accent text-accent-foreground",
  muted: "bg-surface-2 text-muted-foreground",
}

/** Client labels: Registration Open / Register Now, Date Tentative / Register Your Interest, Date TBA / Join Interest List. */
export function statusDisplay(c: Cohort): StatusDisplay {
  switch (c.status) {
    case "open":
      return { label: "Registration Open", action: "Register Now", tone: "success" }
    case "tentative":
      return { label: "Date Tentative", action: "Register Your Interest", tone: "warning" }
    case "full":
      return { label: "Full", action: "Join Waitlist", tone: "muted" }
    case "closed":
      return { label: "Registration Closed", action: "Join Interest List", tone: "muted" }
    default:
      return { label: "Date TBA", action: "Join Interest List", tone: "neutral" }
  }
}

/** "Wednesday, 18 November 2026", or "Date to be announced". Unconfirmed cohorts keep their own label. */
export function cohortDateLabel(c: Cohort): string {
  if (!c.start) return c.dayLabel || "Date to be announced"
  if (c.dayLabel) return c.dayLabel
  const [y, m, d] = c.start.split("-").map(Number)
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}

/** Parts for a large calendar-style date: { weekday: "Wednesday", day: "18", month: "November", year: "2026" }. */
export function cohortDateParts(c: Cohort): { weekday: string; day: string; month: string; year: string } | null {
  if (!c.start) return null
  const [y, m, d] = c.start.split("-").map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  const part = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { ...o, timeZone: "UTC" }).format(date)
  return { weekday: part({ weekday: "long" }), day: String(d), month: part({ month: "long" }), year: String(y) }
}

const ZONE_ABBR: Record<string, string> = {
  "America/Vancouver": "PT",
  "America/Los_Angeles": "PT",
  "America/Edmonton": "MT",
  "America/Winnipeg": "CT",
  "America/Toronto": "ET",
  "America/Montreal": "ET",
  "America/Halifax": "AT",
}

const to12h = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number)
  const suffix = h >= 12 ? "pm" : "am"
  return `${((h + 11) % 12) + 1}${m ? `:${String(m).padStart(2, "0")}` : ""} ${suffix}`
}

/** Class days/time. With a real start/end time: "Wednesdays & Thursdays · 6–8 pm PT"; otherwise the cohort's own text. */
export function cohortTimingLabel(c: Cohort): string {
  if (!c.startTime) return c.timing
  const zone = ZONE_ABBR[tzOf(c)] ?? tzOf(c)
  let time = to12h(c.startTime)
  if (c.endTime) {
    const [from, to] = [to12h(c.startTime), to12h(c.endTime)]
    // "6–8 pm" when both ends share am/pm, "11 am–1 pm" otherwise.
    time = from.slice(-2) === to.slice(-2) ? `${from.slice(0, -3)}–${to}` : `${from}–${to}`
  }
  const days = c.timing.split("·")[0].trim()
  return `${days} · ${time} ${zone}`
}

export function courseFor(c: Cohort): BatchCourse | undefined {
  return batchCourses.find((b) => b.code === c.course)
}

/** Deep-link to the course's own page on this site, falling back to the batches page. */
export function cohortCourseHref(c: Cohort): string {
  const slug = courseFor(c)?.slug
  return (slug && getCourse(slug)?.route) || "/upcoming-batches"
}

/**
 * Where the main action goes: a real registration URL when one exists and registration is open;
 * otherwise the enquiry form, pre-filled with the course and tagged with the cohort for lead attribution.
 */
export function cohortActionHref(c: Cohort): string {
  if (c.registrationUrl && c.status === "open") return c.registrationUrl
  return cohortContactHref(c)
}

/** Contact page pre-filled with the cohort's course; `cohort` records the originating cohort. */
export function cohortContactHref(c: Cohort): string {
  const slug = courseFor(c)?.slug
  const q = new URLSearchParams()
  if (slug) q.set("course", slug)
  q.set("cohort", c.id)
  return `/contact?${q.toString()}`
}

/** Known cohort id from a query string, or undefined (never trust free text). */
export function findCohort(id: string | undefined): Cohort | undefined {
  return id ? cohorts.find((c) => c.id === id) : undefined
}
