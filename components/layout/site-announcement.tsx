import { GENERIC_BANNER, bannerCohort, cohortDateLabel, cohortTimingLabel } from "@/lib/data/batches"
import { getAnnouncement } from "@/lib/feature-flags"

import { AnnouncementBar } from "./announcement-bar"
import type { Announcement } from "./announcement-state"

/**
 * Server wrapper. Reads config/feature-flags.json; renders nothing when off or invalid.
 * With `"source": "cohorts"` the bar follows the client rule: it names a cohort only when it is
 * published, open and starts in the future ("NEXT GROUP BATCH · IFC · [date] · View Upcoming Batches");
 * otherwise it shows the neutral all-batches message. It never makes up a date.
 */
export function SiteAnnouncement() {
  const a = getAnnouncement()
  if (!a) return null

  let announcement: Announcement
  if (a.source === "cohorts") {
    const c = bannerCohort()
    announcement = c
      ? {
          id: `cohort-${c.id}-${c.start}`,
          badge: "Next Group Batch",
          title: c.course,
          message: c.startTime ? `${cohortDateLabel(c)} · ${cohortTimingLabel(c).split("·").pop()?.trim()}` : cohortDateLabel(c),
          href: GENERIC_BANNER.href,
          linkLabel: GENERIC_BANNER.linkLabel,
          dismissible: a.dismissible,
        }
      : {
          id: "upcoming-batches-generic",
          title: GENERIC_BANNER.badge,
          message: GENERIC_BANNER.message,
          href: GENERIC_BANNER.href,
          linkLabel: GENERIC_BANNER.linkLabel,
          dismissible: a.dismissible,
        }
  } else {
    announcement = {
      id: a.id,
      message: a.message,
      badge: a.badge,
      title: a.title,
      href: a.href,
      linkLabel: a.linkLabel,
      dismissible: a.dismissible,
    }
  }

  return <AnnouncementBar announcement={announcement} />
}
