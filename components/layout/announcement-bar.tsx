"use client"

import Link from "next/link"
import { ChevronRight, X } from "lucide-react"

import { useAnnouncementDismiss, type Announcement } from "./announcement-state"

/** Renders nothing when there is no real announcement. Not sticky; scrolls away. */
export function AnnouncementBar({ announcement }: { announcement: Announcement | null }) {
  const { visible, dismiss } = useAnnouncementDismiss(announcement)
  if (!announcement || !visible) return null

  const closable = announcement.dismissible !== false
  const { badge, title, message, href, linkLabel } = announcement
  // One line at every width. Phones drop the pill and keep [title · message ›]; the link label
  // ("View Upcoming Batches") returns as soon as there is room for it, and the arrow always stays.
  const content = (
    <>
      {badge || title ? (
        <span className="inline-flex min-w-0 shrink-0 items-center gap-x-2.5 sm:gap-x-3">
          {badge ? (
            <span className="hidden shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[0.625rem] leading-4 font-semibold tracking-[0.08em] text-inverse-fg/85 uppercase ring-1 ring-white/25 ring-inset sm:inline sm:text-[0.6875rem]">
              {badge}
            </span>
          ) : null}
          {title ? <span className="truncate font-semibold text-inverse-fg">{title}</span> : null}
        </span>
      ) : null}
      {title ? <span aria-hidden="true" className="h-3 w-px shrink-0 bg-white/30 sm:h-4" /> : null}
      <span className="inline-flex max-w-full min-w-0 items-center gap-x-2 sm:gap-x-3">
        <span className="min-w-0 truncate text-inverse-fg/85">{message}</span>
        {href ? (
          <span className="inline-flex shrink-0 items-center gap-0.5 font-semibold text-inverse-link">
            <span className="hidden underline-offset-3 group-hover:underline min-[560px]:inline">{linkLabel ?? "Learn more"}</span>
            <ChevronRight
              aria-hidden="true"
              strokeWidth={2}
              className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        ) : null}
      </span>
    </>
  )

  const row =
    "flex min-h-10 flex-nowrap items-center justify-center gap-x-2.5 py-2 text-center text-[0.75rem] leading-snug whitespace-nowrap sm:min-h-11 sm:gap-x-3 sm:text-[0.8125rem] lg:text-sm"

  return (
    <div className="bg-surface-inverse text-inverse-fg" role="region" aria-label="Announcement">
      <div className="container-wide relative">
        <div className={closable ? "px-9 sm:px-11" : undefined}>
          {announcement.href ? (
            // The whole message is the link: one large, obvious target on phones.
            <Link
              href={announcement.href}
              aria-label={[title, message, linkLabel ?? "Learn more"].filter(Boolean).join(". ")}
              className={`group ${row} rounded-sm transition-opacity outline-hidden focus-visible:outline-2 focus-visible:outline-inverse-link pointer-coarse:active:opacity-70`}
            >
              {content}
            </Link>
          ) : (
            <p className={row}>{content}</p>
          )}
        </div>
        {closable && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="absolute top-1/2 right-1.5 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-inverse-muted transition-colors hover:bg-white/10 hover:text-inverse-fg focus-visible:outline-2 focus-visible:outline-inverse-link sm:right-4 lg:right-6"
          >
            <X aria-hidden="true" strokeWidth={2} className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
