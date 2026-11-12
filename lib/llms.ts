/**
 * Builds /llms.txt and /llms-full.txt (https://llmstxt.org) from the same data
 * the pages use, so AI assistants always get current, accurate facts.
 * Only confirmed values are emitted: null/placeholder fields are skipped.
 */
import { courses, upcomingPrograms, type Course, type CourseArea } from "@/lib/data/courses"
import { siteFaqs } from "@/lib/data/faqs"
import { absoluteUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

const AREAS: { area: CourseArea; label: string; path: string }[] = [
  { area: "securities", label: "Securities (CSI / CIRO)", path: "/securities" },
  { area: "insurance", label: "Life insurance licensing", path: "/insurance" },
  { area: "financial-planning", label: "Financial planning and wealth", path: "/financial-planning" },
]

const KEY_PAGES: [string, string, string][] = [
  ["All courses", "/courses", "Full catalogue with filters by study area"],
  ["Find my course", "/find-my-course", "Three-question finder that recommends the right exam"],
  ["Licensing pathways", "/licensing-pathways", "Which exams lead to which Canadian licence or role"],
  ["Class schedule", "/schedule", "Live class times"],
  ["Upcoming batches", "/upcoming-batches", "Next intakes for live group classes"],
  ["Free diagnostic", "/free-diagnostic", "Check readiness before booking an exam"],
  ["Free masterclass", "/masterclass", "Free live session on exam strategy"],
  ["For firms", "/for-firms", "Group training for dealers, insurers and advisory firms"],
  ["About Vipin Garg", "/about", "Instructor background and teaching approach"],
  ["FAQ", "/faq", "Answers about courses, enrolling, licensing and learning"],
  ["Contact", "/contact", "Ways to reach the team"],
]

/** Unique courses (some share a route, e.g. LLQP regions). */
function uniqueCourses(): Course[] {
  const seen = new Set<string>()
  return courses.filter((c) => (seen.has(c.route) ? false : (seen.add(c.route), true)))
}

function header(): string[] {
  const { contact, instructor } = siteConfig
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description} Classes are taught live online across Canada by ${instructor.name}, who also offers instructor guidance between classes.`,
    "",
    `- Website: ${absoluteUrl("/")}`,
    `- Instructor: ${instructor.name}, ${instructor.role} (${absoluteUrl("/about")})`,
    "- Format: live online classes (English), serving learners across Canada",
  ]
  if (contact.email) lines.push(`- Email: ${contact.email}`)
  if (contact.whatsapp) lines.push(`- WhatsApp: ${contact.whatsapp}`)
  if (contact.scheduleUrl) lines.push(`- Book a call: ${contact.scheduleUrl}`)
  lines.push(`- Learning app: ${siteConfig.app.base}`)
  lines.push("", siteConfig.disclaimer, siteConfig.trademarkNotice)
  return lines
}

export function buildLlmsTxt(): string {
  const all = uniqueCourses()
  const out = header()

  for (const { area, label, path } of AREAS) {
    const list = all.filter((c) => c.area === area)
    if (!list.length) continue
    out.push("", `## ${label}`, "", `- [${label} overview](${absoluteUrl(path)})`)
    for (const c of list) {
      out.push(`- [${c.code}: ${c.name}](${absoluteUrl(c.route)}): ${c.tagline}`)
    }
  }

  out.push("", "## Key pages", "")
  for (const [name, path, desc] of KEY_PAGES) out.push(`- [${name}](${absoluteUrl(path)}): ${desc}`)

  if (upcomingPrograms.length) {
    out.push("", "## Coming soon", "", `- [Upcoming programmes](${absoluteUrl("/upcoming")})`)
    for (const u of upcomingPrograms) out.push(`- ${u.name}: ${u.summary}`)
  }

  out.push(
    "",
    "## Optional",
    "",
    `- [Full content for AI models](${absoluteUrl("/llms-full.txt")}): every course summary, topic list, exam format and FAQ in one file`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
  )
  return out.join("\n") + "\n"
}

function courseSection(c: Course): string[] {
  const out = [`### ${c.code}: ${c.name}`, "", `URL: ${absoluteUrl(c.route)}`, "", c.summary]
  if (c.whoFor.length) out.push("", "Who it is for:", ...c.whoFor.map((w) => `- ${w}`))
  if (c.topics.length) out.push("", "Topics covered:", ...c.topics.map((t) => `- ${t}`))
  const { questions, duration, notes } = c.examFormat
  const fmt = [questions, duration, notes].filter(Boolean).join("; ")
  if (fmt) out.push("", `Exam format: ${fmt}`)
  if (c.careerUse) out.push("", `Career use: ${c.careerUse}`)
  if (c.ciro2026Note) out.push("", `Note: ${c.ciro2026Note.text} (${c.ciro2026Note.href})`)
  out.push("", `Official exam provider: ${c.officialUrl}`)
  const priced = c.pricing.tiers.filter((t) => t.available && typeof t.price === "number" && t.price > 0)
  if (priced.length) {
    out.push("", "Pricing:", ...priced.map((t) => `- ${t.label}: ${t.price} ${c.pricing.currency}`))
  }
  if (c.faqs.length) {
    out.push("", "FAQ:")
    for (const f of c.faqs) out.push("", `Q: ${f.question}`, `A: ${f.answer}`)
  }
  out.push("", `Last reviewed: ${c.lastReviewed}`)
  return out
}

export function buildLlmsFullTxt(): string {
  const all = uniqueCourses()
  const out = header()

  if (siteConfig.trustFacts.length) {
    out.push("", "## At a glance", "", ...siteConfig.trustFacts.map((f) => `- ${f}`))
  }

  for (const { area, label, path } of AREAS) {
    const list = all.filter((c) => c.area === area)
    if (!list.length) continue
    out.push("", `## ${label}`, "", `Overview: ${absoluteUrl(path)}`)
    for (const c of list) out.push("", ...courseSection(c))
  }

  out.push("", "## Frequently asked questions", "")
  for (const f of siteFaqs) {
    out.push(`Q: ${f.question}`, `A: ${f.answer}${f.link ? ` (${absoluteUrl(f.link.href)})` : ""}`, "")
  }

  if (upcomingPrograms.length) {
    out.push("## Coming soon", "")
    for (const u of upcomingPrograms) out.push(`### ${u.name}`, "", u.summary, "")
  }

  out.push("## Key pages", "")
  for (const [name, path, desc] of KEY_PAGES) out.push(`- ${name}: ${absoluteUrl(path)} (${desc})`)
  return out.join("\n") + "\n"
}
