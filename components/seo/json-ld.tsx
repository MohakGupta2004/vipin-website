import type { Course } from "@/lib/data/courses"
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

type JsonObject = Record<string, unknown>

/** Renders JSON-LD. `<` is escaped so data can never close the script tag. */
export function JsonLd({ data }: { data: JsonObject | JsonObject[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export function organizationLd(): JsonObject {
  const sameAs = Object.values(siteConfig.social).filter((u): u is string => Boolean(u))
  const { email, phone } = siteConfig.contact
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    description: siteConfig.description,
    areaServed: { "@type": "Country", name: "Canada" },
    founder: { "@id": `${SITE_URL}/#vipin-garg` },
    ...(sameAs.length > 0 && { sameAs }),
    ...((email || phone) && {
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        ...(email && { email }),
        ...(phone && { telephone: phone }),
        areaServed: "CA",
        availableLanguage: "English",
      },
    }),
    // PLACEHOLDER: logo URL — add once a logo file exists, e.g. https://vipingarg.com/logo.png
  }
}

export function personLd(): JsonObject {
  const { name, role, credentials, portrait } = siteConfig.instructor
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#vipin-garg`,
    name,
    url: absoluteUrl("/about"),
    jobTitle: role,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    ...(portrait && { image: absoluteUrl(portrait) }),
    ...(credentials.length > 0 && { hasCredential: credentials.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })) }),
  }
}

export function websiteLd(): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: siteConfig.locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

export type Crumb = { name: string; href: string }

export function breadcrumbLd(items: Crumb[]): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}

export type Faq = { question: string; answer: string }

export function faqLd(faqs: Faq[]): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

/** Minimal shape; align with Builder B's Course type once lib/data/courses exists. */
export type CourseLdInput = {
  slug: string
  path: string
  name: string
  description: string
  /** Real values only. Omit when unknown. */
  price?: number
  priceCurrency?: string
  cohorts?: { startDate: string; endDate?: string }[]
}

export function courseLd(course: CourseLdInput): JsonObject {
  const hasPrice = typeof course.price === "number" && course.price > 0
  const cohorts = course.cohorts?.filter((c) => c.startDate) ?? []
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: absoluteUrl(course.path),
    inLanguage: "en-CA",
    provider: { "@id": `${SITE_URL}/#organization` },
    ...(hasPrice && {
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: course.priceCurrency ?? "CAD",
        category: "Paid",
        url: absoluteUrl(course.path),
      },
    }),
    ...(cohorts.length > 0 && {
      hasCourseInstance: cohorts.map((c) => ({
        "@type": "CourseInstance",
        courseMode: "Online",
        startDate: c.startDate,
        ...(c.endDate && { endDate: c.endDate }),
      })),
    }),
  }
}

/** Course JSON-LD from Builder B's data. Offers only for real prices, instances only for real cohorts. */
export function courseLdFromData(course: Course): JsonObject {
  const priced = course.pricing.tiers.filter((t) => t.available && typeof t.price === "number" && t.price > 0)
  const lowest = priced.length > 0 ? Math.min(...priced.map((t) => t.price as number)) : undefined
  return courseLd({
    slug: course.slug,
    path: course.route,
    name: `${course.code} exam prep: ${course.name}`,
    description: course.summary,
    price: lowest,
    priceCurrency: course.pricing.currency,
    cohorts: course.cohorts.map((c) => ({ startDate: c.startDate, endDate: c.endDate })),
  })
}
