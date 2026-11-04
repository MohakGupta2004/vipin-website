import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

/**
 * Floating "book a call" button, fixed bottom-right, stacked just above the WhatsApp button.
 * Same safe-area offsets as WhatsAppButton, plus one button height + gap.
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
        "fixed right-4 z-20 inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-float transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none max-sm:size-13",
        "bottom-[calc(env(safe-area-inset-bottom)_+_9.5rem)] lg:right-6 lg:bottom-24",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-0",
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
        className="size-6 max-sm:size-5"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    </a>
  )
}
