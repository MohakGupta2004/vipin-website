"use client"

import { usePathname } from "next/navigation"

import { getCourse } from "@/lib/data/courses"

import { DiagnosticSlideIn } from "./diagnostic-slide-in"
import { ExitIntentModal } from "./exit-intent-modal"

/** Routes where no lead overlay may show (PLAN §4): contact, legal, and pages that already are the form. */
const NO_OVERLAY = ["/contact", "/terms", "/privacy", "/refund-policy", "/masterclass", "/free-diagnostic"]

const COURSE_ROUTE = /^\/(securities|financial-planning)\/([^/]+)\/?$|^\/(insurance)\/(llqp)\/?$/

/**
 * Single mount point (rendered once in app/layout.tsx).
 * - Diagnostic slide-in: course pages only.
 * - Exit-intent modal: every route except NO_OVERLAY.
 * Both share the one-overlay-per-session gate in use-overlay-gate.
 */
export function OverlayHost() {
  const pathname = usePathname()
  const blocked = NO_OVERLAY.some((p) => pathname === p || pathname.startsWith(p + "/"))
  const match = COURSE_ROUTE.exec(pathname)
  const slug = match ? (match[2] ?? match[4]) : undefined
  const course = slug ? getCourse(slug) : undefined

  if (blocked) return null
  return (
    <>
      {course && <DiagnosticSlideIn key={course.slug} courseCode={course.code} />}
      <ExitIntentModal />
    </>
  )
}
