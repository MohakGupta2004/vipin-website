import { siteConfig } from "@/lib/site-config"

import { AnnouncementBar } from "./announcement-bar"
import type { Announcement } from "./announcement-state"

const isExpired = (iso: string) => new Date(iso).getTime() < Date.now()

/** Server wrapper: maps siteConfig.announcement, hides it once expired. */
export function SiteAnnouncement() {
  const a = siteConfig.announcement
  if (!a) return null
  if (a.expiresOn && isExpired(a.expiresOn)) return null
  const announcement: Announcement = {
    id: `${a.text}|${a.href}`,
    message: a.text,
    href: a.href,
    linkLabel: a.linkLabel,
  }
  return <AnnouncementBar announcement={announcement} />
}
