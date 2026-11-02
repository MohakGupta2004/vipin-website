"use client"

import Link from "next/link"
import { X } from "lucide-react"

import { useAnnouncementDismiss, type Announcement } from "./announcement-state"

/** Renders nothing when there is no real announcement. Not sticky; scrolls away. */
export function AnnouncementBar({ announcement }: { announcement: Announcement | null }) {
  const { visible, dismiss } = useAnnouncementDismiss(announcement)
  if (!announcement || !visible) return null
  return (
    <div className="bg-surface-inverse text-inverse-fg" role="region" aria-label="Announcement">
      <div className="container-wide flex min-h-10 items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-x-4 text-sm leading-5">
          <span className="truncate">{announcement.message}</span>
          {announcement.href && (
            <Link
              href={announcement.href}
              className="shrink-0 font-medium text-inverse-link underline underline-offset-3 hover:decoration-2"
            >
              {announcement.linkLabel ?? "Learn more"}
            </Link>
          )}
        </p>
        {announcement.dismissible !== false && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="-mr-3 inline-flex size-11 shrink-0 items-center justify-center rounded-md text-inverse-muted hover:text-inverse-fg focus-visible:outline-2 focus-visible:outline-inverse-link"
        >
          <X aria-hidden="true" strokeWidth={1.75} className="size-4" />
        </button>
        )}
      </div>
    </div>
  )
}
