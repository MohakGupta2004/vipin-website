import type { MetadataRoute } from "next"

import { courses } from "@/lib/data/courses"
import { SITE_URL } from "@/lib/seo"

// /results is noindex until real data exists, so it is left out on purpose.
// Course routes come from lib/data/courses (unique routes only; /insurance/llqp is also static).
const staticRoutes = [
  "/",
  "/courses",
  "/securities",
  "/insurance",
  "/financial-planning",
  "/upcoming",
  "/find-my-course",
  "/licensing-pathways",
  "/how-it-works",
  "/schedule",
  "/masterclass",
  "/free-diagnostic",
  "/guarantee",
  "/for-firms",
  "/about",
  "/faq",
  "/contact",
  "/terms",
  "/privacy",
  "/refund-policy",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
  const seen = new Set(staticRoutes)
  for (const c of courses) {
    if (seen.has(c.route)) continue
    seen.add(c.route)
    entries.push({
      url: `${SITE_URL}${c.route}`,
      lastModified: new Date(c.lastReviewed),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  }
  return entries
}
