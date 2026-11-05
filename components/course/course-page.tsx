import Link from "next/link"
import { ArrowRight, Check, TriangleAlert } from "lucide-react"

import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { JsonLd, courseLd } from "@/components/seo/json-ld"
import { LeadForm } from "@/components/forms/lead-form"
import { focusRing, textLink } from "@/components/forms/styles"
import { getSiblings, nextCohort, type Course } from "@/lib/data/courses"
import { appUrl } from "@/lib/app-links"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

import { CourseCard, CourseGrid } from "./course-card"
import { DiagnosticCta } from "./diagnostic-cta"
import { ExternalLinkText, FactsTable, type FactRow } from "./facts-table"
import { FaqList } from "./faq-list"
import {
  areaLabel,
  courseH1,
  examBody,
  eyebrow,
  formatDate,
  formatLabel,
  formatReviewed,
  hostOf,
  lowestPrice,
  formatCad,
} from "./format"
import { IncludedList } from "./included-list"
import { MobileCourseBar } from "./mobile-course-bar"
import { VipinPhoto } from "./vipin-photo"
import { PriceBox } from "./price-box"

const hubOf = (area: Course["area"]) =>
  area === "securities"
    ? "/securities"
    : area === "insurance"
      ? "/insurance"
      : "/financial-planning"

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
      <h2 id={`${id}-h`}>{title}</h2>
      <div className="mt-6 sm:mt-8">{children}</div>
    </section>
  )
}

export type CoursePageProps = {
  course: Course
  /** Extra section rendered after "What you'll learn" (e.g. LLQP region matrix). */
  extras?: React.ReactNode
}

/** One template for every course page. Data-driven; unknown values render as "Announced soon". */
export function CoursePage({ course, extras }: CoursePageProps) {
  const c = course
  const siblings = getSiblings(c)
  const cohort = nextCohort(c)
  const price = lowestPrice(c)
  const feeLabel =
    price !== null ? `From ${formatCad(price)}` : "Fee announced soon"
  const body = examBody(c)

  const officialRows: FactRow[] = [
    { label: "Exam provider", value: body },
    {
      label: "Questions",
      value: c.examFormat.questions ?? "To be confirmed",
      muted: !c.examFormat.questions,
    },
    {
      label: "Time allowed",
      value: c.examFormat.duration ?? "To be confirmed",
      muted: !c.examFormat.duration,
    },
    ...(c.examFormat.notes
      ? [{ label: "Notes", value: c.examFormat.notes }]
      : []),
    {
      label: "Official page",
      value: (
        <ExternalLinkText href={c.officialUrl}>
          {hostOf(c.officialUrl)}
        </ExternalLinkText>
      ),
    },
  ]

  const coachingRows: FactRow[] = [
    { label: "Format", value: formatLabel(c) },
    { label: "Instructor", value: siteConfig.instructor.name },
    {
      label: "Next cohort",
      value: cohort ? formatDate(cohort.startDate) : "Announced soon",
      muted: !cohort,
    },
    ...(cohort ? [{ label: "Schedule", value: cohort.schedule }] : []),
    { label: "Fee", value: feeLabel, muted: price === null },
    {
      label: "Study formats",
      value: "Live and on-demand. Your offer confirms what is included.",
    },
    {
      label: "Official registration",
      value: "Separate. Not included unless your offer says so in writing.",
    },
  ]

  const included = [
    {
      label: `Live online classes with ${siteConfig.instructor.name}`,
      detail:
        "Class dates, time zone and session length are confirmed before you enroll.",
    },
    {
      label: "Guided examples and live discussion",
      detail:
        "Work through examples together and ask questions as they come up.",
    },
    {
      label: `Preparation shaped around the ${c.code}`,
      detail:
        "Time goes to the topics that need attention for the exam you are taking.",
    },
    ...(c.practiceTests === "in-development"
      ? [
          {
            label: "Practice tests and exam simulations",
            detail:
              "In development, starting with IFC, CSC Exam 1, CSC Exam 2 and CIRE. Availability is announced before launch.",
            planned: true,
          },
        ]
      : []),
  ]

  const breadcrumbItems = [
    { name: areaLabel(c.area), href: hubOf(c.area) },
    { name: courseH1(c), href: c.route },
  ]

  return (
    <div className="pb-24 lg:pb-0">
      <JsonLd
        data={courseLd({
          slug: c.slug,
          path: c.route,
          name: `${c.name} (${c.code}) coaching`,
          description: c.summary,
          price: price ?? undefined,
          cohorts: c.cohorts.map((x) => ({
            startDate: x.startDate,
            endDate: x.endDate,
          })),
        })}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="container-site grid gap-x-8 gap-y-12 pt-6 pb-16 sm:gap-y-14 sm:pt-8 lg:grid-cols-12 lg:pt-14 lg:pb-24 xl:gap-x-16">
        {/* Hero */}
        <header className="lg:col-span-8">
          <p className="vg-rise text-eyebrow">{eyebrow(c)}</p>
          <h1 className="vg-rise mt-3" style={{ animationDelay: "50ms" }}>{courseH1(c)}</h1>
          <p className="vg-rise mt-3 text-xl tracking-[-0.01em] text-heading/70 max-sm:text-lg" style={{ animationDelay: "100ms" }}>
            {c.name}
          </p>
          <p className="vg-rise text-lead mt-8 max-w-[58ch] max-sm:mt-5" style={{ animationDelay: "150ms" }}>
            {c.summary}
          </p>
          <p className="mt-6 text-[15px] font-medium text-heading">
            {formatLabel(c)} · Online · {siteConfig.instructor.name}
          </p>
          <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <VipinPhoto size={32} round />
            <span>
              Last reviewed{" "}
              <time dateTime={c.lastReviewed}>
                {formatReviewed(c.lastReviewed)}
              </time>{" "}
              by {siteConfig.instructor.name}
            </span>
          </p>
          {c.ciro2026Note ? (
            <div className="mt-8 flex max-w-[68ch] items-start gap-3 rounded-2xl bg-warning-bg p-5 text-[15px] leading-relaxed text-foreground">
              <TriangleAlert
                className="mt-0.5 size-4 shrink-0 text-warning"
                aria-hidden="true"
              />
              <div>
                <p>{c.ciro2026Note.text}</p>
                <ExternalLinkText href={c.ciro2026Note.href}>
                  {c.ciro2026Note.linkLabel}
                </ExternalLinkText>
              </div>
            </div>
          ) : null}
        </header>

        {/* Price rail (inline on mobile, sticky on desktop) */}
        <aside
          aria-label="Fees and registration"
          className="vg-rise lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:self-start"
        >
          <PriceBox course={c} />
        </aside>

        {/* Body */}
        <div className="space-y-16 sm:space-y-20 lg:col-span-8 lg:space-y-24">
          <Section id="who-for" title={`Who is the ${c.code} for?`}>
            <ul className="max-w-[68ch] space-y-3">
              {c.whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-[17px] leading-relaxed text-heading/85 max-sm:text-base">
                  <Check
                    className="mt-1.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="learn" title={`What does the ${c.code} cover?`}>
            {c.topics.length > 0 ? (
              <>
                <ol className="grid gap-x-10 border-t border-black/[0.08] max-sm:rounded-2xl max-sm:border-t-0 max-sm:bg-[#f5f5f7] max-sm:px-4 sm:grid-cols-2">
                  {c.topics.map((t, i) => (
                    <li
                      key={t}
                      className="flex gap-4 border-b border-black/[0.08] py-4 text-[17px] text-heading/85 max-sm:py-3.5 max-sm:text-base max-sm:last:border-b-0"
                    >
                      <span className="w-6 shrink-0 font-semibold text-primary tabular-nums">
                        {i + 1}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 max-w-[68ch] text-sm text-muted-foreground">
                  This is an overview of the subject areas. Consult the official
                  provider’s syllabus for the complete examinable content.
                </p>
              </>
            ) : (
              <p className="max-w-[68ch] text-[17px] text-muted-foreground">
                Syllabus overview to be confirmed. See the official page for the
                current requirements.
              </p>
            )}
          </Section>

          {extras}

          <Section id="career" title={`Where does the ${c.code} apply?`}>
            <p className="max-w-[68ch] text-[17px]">{c.careerUse}</p>
            <p className="mt-3 max-w-[68ch] text-sm text-muted-foreground">
              An examination is one part of a professional pathway.
              Registration, experience, education and employer requirements may
              also apply.
            </p>
            <Link href="/licensing-pathways" className={cn(textLink, "mt-2")}>
              Explore career &amp; designation pathways{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Section>

          <Section id="exam" title={`How does the ${c.code} exam work?`}>
            <p className="mb-4 max-w-[68ch] text-sm text-muted-foreground">
              Official exam details, set by {body}. Last checked{" "}
              <time dateTime={c.lastReviewed}>
                {formatReviewed(c.lastReviewed)}
              </time>{" "}
              by {siteConfig.instructor.name}. Confirm on the official page
              before you book.
            </p>
            <FactsTable
              caption={`Official ${c.code} exam details`}
              rows={officialRows}
            />
          </Section>

          <Section
            id="coaching"
            title={`How does our ${c.code} coaching work?`}
          >
            <FactsTable
              caption={`${c.code} coaching details`}
              rows={coachingRows}
            />
            <h3 className="mt-12 mb-4 text-[1.375rem]">What’s included</h3>
            <IncludedList items={included} />
            <p className="mt-3 max-w-[68ch] text-sm text-muted-foreground">
              Resources vary by programme. Your coaching offer lists exactly
              what you receive.
            </p>
          </Section>

          <Section id="schedule" title={`When is the next ${c.code} class?`}>
            {c.cohorts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[28rem] border-collapse text-[15px]">
                  <thead>
                    <tr className="bg-[#f5f5f7] text-left">
                      <th scope="col" className="px-3 py-3 font-semibold">
                        Start
                      </th>
                      <th scope="col" className="px-3 py-3 font-semibold">
                        Schedule
                      </th>
                      <th scope="col" className="px-3 py-3 font-semibold">
                        Seats
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.cohorts.map((x) => (
                      <tr key={x.id} className="border-b border-black/[0.06]">
                        <td className="px-3 py-3 tabular-nums">
                          {formatDate(x.startDate)}
                        </td>
                        <td className="px-3 py-3">{x.schedule}</td>
                        <td className="px-3 py-3 tabular-nums">
                          {x.seatsLeft !== undefined
                            ? `${x.seatsLeft} left`
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="max-w-[68ch]">
                <h3>
                  No cohorts are scheduled right now
                </h3>
                <p className="mt-2 text-[17px]">
                  Dates for the {c.code} are announced soon. Register your
                  interest and we will email you first.
                </p>
              </div>
            )}
            <div
              id="register-interest"
              className="mt-10 scroll-mt-24 rounded-[1.75rem] bg-[#f5f5f7] p-6 sm:p-9"
            >
              <h3 className="text-[1.375rem]">
                {c.offerConfirmed
                  ? `Register interest in the ${c.code}`
                  : `Tell me when ${c.code} coaching is confirmed`}
              </h3>
              <LeadForm
                kind="interest"
                courseSlug={c.slug}
                sourcePath={c.route}
                className="mt-5 max-sm:max-w-none"
                successTitle="Interest registered"
                successMessage={`Thank you. We will email you about the ${c.code} when there is news.`}
              />
            </div>
          </Section>

          <DiagnosticCta
            courseSlug={c.slug}
            code={c.code}
            sourcePath={c.route}
          />

          <Section id="instructor" title="Who teaches the course?">
            <div className="flex max-w-[68ch] flex-col gap-5 sm:flex-row">
              <VipinPhoto size={120} />
              <div>
                <p className="font-heading text-xl font-semibold tracking-[-0.02em] text-heading">
                  {siteConfig.instructor.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.instructor.role}
                </p>
                <p className="mt-3 text-[17px]">
                  {siteConfig.instructor.bio ??
                    `${siteConfig.name} brings live instruction to Canadian financial exam preparation, with an emphasis on understanding concepts and how they apply.`}
                </p>
                <Link href="/about" className={cn(textLink, "mt-1")}>
                  About Vipin{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Section>

          {c.faqs.length > 0 ? (
            <Section id="faq" title={`Common questions about the ${c.code}`}>
              <FaqList items={c.faqs} />
            </Section>
          ) : null}

          {siblings.length > 0 ? (
            <section aria-labelledby="next-h" className="scroll-mt-28">
              <h2 id="next-h">Taking {siblings[0].code} next?</h2>
              <p className="mt-3 max-w-[68ch] text-[17px] text-muted-foreground">
                Related exams that many learners study alongside or after the{" "}
                {c.code}.
              </p>
              <CourseGrid className="mt-6 sm:grid-cols-2 lg:grid-cols-2">
                {siblings.slice(0, 2).map((s) => (
                  <CourseCard key={s.slug} course={s} />
                ))}
              </CourseGrid>
            </section>
          ) : null}

          <aside className="rounded-[1.5rem] bg-[#f5f5f7] p-6 text-[15px] text-heading/85">
            Studying through your employer?{" "}
            <Link
              href="/for-firms"
              className={cn(
                "font-medium text-link underline underline-offset-4",
                focusRing
              )}
            >
              Ask about group cohorts →
            </Link>
          </aside>
        </div>
      </div>

      <MobileCourseBar
        code={c.code}
        feeLabel={feeLabel}
        signupHref={appUrl("signup", {
          campaign: `course-${c.slug}`,
          content: "mobile-bar",
        })}
      />
    </div>
  )
}
