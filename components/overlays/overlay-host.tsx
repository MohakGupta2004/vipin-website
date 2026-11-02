"use client"

import { usePathname } from "next/navigation"

import { getCourse } from "@/lib/data/courses"
import { isEnabled } from "@/lib/feature-flags"

import { AppSignupPrompt, type AppSignupPromptConfig } from "./app-signup-prompt"
import { DiagnosticSlideIn } from "./diagnostic-slide-in"
import { ExitIntentModal } from "./exit-intent-modal"

/** Routes where no lead overlay may show (PLAN §4): contact, legal, and pages that already are the form. */
const NO_OVERLAY = ["/contact", "/terms", "/privacy", "/refund-policy", "/masterclass", "/free-diagnostic"]

const COURSE_ROUTE = /^\/(securities|financial-planning)\/([^/]+)\/?$|^\/(insurance)\/(llqp)\/?$/

// TODO(Builder B): replace with getFlags().appSignupPrompt once lib/feature-flags.ts exposes it (PLAN shape).
const APP_PROMPT: AppSignupPromptConfig = {
  enabled: true,
  delaySeconds: 30,
  cooldownMinutes: 10,
  maxDismissals: 3,
  afterMaxDismissals: "block",
  excludePaths: ["/contact", "/terms", "/privacy", "/refund-policy"],
}

/**
 * Single mount point (rendered once in app/layout.tsx).
 * - App sign-up prompt: priority overlay, own exclude list.
 * - Diagnostic slide-in: course pages only (flag diagnosticSlideIn).
 * - Exit-intent modal: every route except NO_OVERLAY (flag exitIntentPopup).
 * Lead overlays share the one-overlay-per-session gate; the app prompt shuts them out once shown.
 */
export function OverlayHost() {
  const pathname = usePathname()
  const blocked = NO_OVERLAY.some((p) => pathname === p || pathname.startsWith(p + "/"))
  const match = COURSE_ROUTE.exec(pathname)
  const slug = match ? (match[2] ?? match[4]) : undefined
  const course = slug ? getCourse(slug) : undefined

  return (
    <>
      <AppSignupPrompt config={APP_PROMPT} />
      {!blocked && course && isEnabled("diagnosticSlideIn") && (
        <DiagnosticSlideIn key={course.slug} courseCode={course.code} />
      )}
      {!blocked && isEnabled("exitIntentPopup") && <ExitIntentModal />}
    </>
  )
}
