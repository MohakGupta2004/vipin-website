import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { floatingButton, floatingGlass } from "./floating-control"

/**
 * Floating "book a call" button, fixed bottom-right, stacked just above the WhatsApp button.
 * Shown on every screen size; the mobile menu also has a "Book a call" row.
 */
export function ScheduleButton() {
  const { scheduleUrl } = siteConfig.contact
  if (!scheduleUrl) return null

  return (
    <a
      href={scheduleUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a strategy call"
      className={cn(
        floatingButton,
        floatingGlass,
        "right-4 size-12 sm:size-14",
        "bottom-[calc(env(safe-area-inset-bottom)_+_9.25rem)] sm:bottom-[calc(env(safe-area-inset-bottom)_+_9.5rem)] lg:right-6 lg:bottom-24",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-6 text-primary"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    </a>
  )
}
