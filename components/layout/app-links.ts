import { siteConfig } from "@/lib/site-config"

// TODO(Builder B): siteConfig.app + appUrl() are not in lib/site-config.ts yet. This adapter
// matches the PLAN shape; once B ships appUrl(), re-export it here (or swap imports) and delete this body.
const APP_BASE = siteConfig.studentLoginUrl

type AppKind = "signup" | "login" | "courses"
const PATH: Record<AppKind, string> = { signup: "/signup", login: "/login", courses: "/courses" }

/** App URL with UTM params. `campaign` = placement, e.g. "header", "hero", "app-prompt". */
export function appUrl(kind: AppKind, opts: { campaign: string; content?: string }): string {
  const u = new URL(PATH[kind], APP_BASE)
  u.searchParams.set("utm_source", "vipingarg.com")
  u.searchParams.set("utm_medium", "website")
  u.searchParams.set("utm_campaign", opts.campaign)
  if (opts.content) u.searchParams.set("utm_content", opts.content)
  return u.toString()
}
