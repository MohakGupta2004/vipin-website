import { getAnnouncement } from "@/lib/feature-flags"

import { AnnouncementBar } from "./announcement-bar"

/** Server wrapper. Reads only config/feature-flags.json; renders nothing when off or invalid. */
export function SiteAnnouncement() {
  const a = getAnnouncement()
  if (!a) return null
  return <AnnouncementBar announcement={{ id: a.id, message: a.message, badge: a.badge, href: a.href, linkLabel: a.linkLabel, dismissible: a.dismissible }} />
}
