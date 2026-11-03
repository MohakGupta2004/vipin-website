"use client"

import Link from "next/link"
import { ChevronRight, X } from "lucide-react"

import { useAnnouncementDismiss, type Announcement } from "./announcement-state"

/** Renders nothing when there is no real announcement. Not sticky; scrolls away. */
export function AnnouncementBar({ announcement }: { announcement: Announcement | null }) {
  const { visible, dismiss } = useAnnouncementDismiss(announcement)
  if (!announcement || !visible) return null

  const closable = announcement.dismissible !== false
  const content = (
    <>
      {announcement.badge ? (
        <span className="shrink-0 rounded-full bg-white/12 px-2 py-0.5 text-[0.6875rem] leading-4 font-semibold tracking-wide text-inverse-fg uppercase ring-1 ring-white/20 ring-inset">
          {announcement.badge}
        </span>
      ) : null}
      <span className="min-w-0 text-inverse-fg/90 max-sm:line-clamp-2">{announcement.message}</span>
      {announcement.href ? (
        <span className="inline-flex shrink-0 items-center font-semibold text-inverse-link">
          <span className="hidden underline-offset-3 group-hover:underline sm:inline">
            {announcement.linkLabel ?? "Learn more"}
          </span>
          <ChevronRight
            aria-hidden="true"
            strokeWidth={2}
            className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </span>
      ) : null}
    </>
  )

  const row = "flex min-h-11 items-center justify-center gap-x-2.5 py-2 text-center text-[0.8125rem] leading-snug sm:gap-x-3 sm:text-sm"

  return (
    <div className="bg-surface-inverse text-inverse-fg" role="region" aria-label="Announcement">
      <div className="container-wide relative">
        <div className={closable ? "px-9 sm:px-11" : undefined}>
          {announcement.href ? (
            // The whole message is the link: one large, obvious target on phones.
            <Link
              href={announcement.href}
              aria-label={`${announcement.message} ${announcement.linkLabel ?? "Learn more"}`}
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
