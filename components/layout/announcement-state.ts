"use client"

import { useCallback, useEffect, useState } from "react"

import { readStorage, writeStorage } from "@/components/overlays/storage"

const key = (id: string) => `vg:announcement-dismissed:${id}`

export type Announcement = {
  /** Changes whenever the message changes, so a new announcement shows again. */
  id: string
  message: string
  /** Short tag before the message, e.g. "New". */
  badge?: string
  /** Bold lead-in before the message, e.g. "IFC Group Class". */
  title?: string
  href?: string
  linkLabel?: string
  /** false = no close button. */
  dismissible?: boolean
}

/**
 * Dismiss state per announcement id. Starts hidden on the server and first paint
 * (avoids hydration mismatch), then shows if not dismissed.
 */
export function useAnnouncementDismiss(announcement: Announcement | null) {
  const id = announcement?.id
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- storage is only readable after mount
    setVisible(Boolean(id) && !readStorage("local", key(id as string)))
  }, [id])

  const dismiss = useCallback(() => {
    if (id) writeStorage("local", key(id), "1")
    setVisible(false)
  }, [id])

  return { visible: visible && Boolean(announcement), dismiss }
}
