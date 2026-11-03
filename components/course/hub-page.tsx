import Link from "next/link";
import { Check } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { textLink } from "@/components/forms/styles";
import type { Course } from "@/lib/data/courses";
import type { SiteFaq } from "@/lib/data/faqs";
import { cn } from "@/lib/utils";

import { CourseCard, CourseGrid } from "./course-card";
import { FaqList } from "./faq-list";

export type PathwayFlow = { title: string; summary?: string; steps: string[] };

export type CourseGroup = { title: string; description?: string; courses: Course[] };

/** Left-to-right (stacked on mobile) chain of steps joined by 1px teal rules. HTML/CSS only. */
export function PathwayExplainer({ flows }: { flows: PathwayFlow[] }) {
  return (
    <div className="space-y-10">
      {flows.map((f) => (
        <div key={f.title}>
          <h3 className="font-sans">{f.title}</h3>
          {f.summary ? <p className="mt-2 max-w-[68ch] text-[17px] text-muted-foreground">{f.summary}</p> : null}
          <ol className="mt-5 flex flex-col gap-0 md:flex-row md:items-stretch">
            {f.steps.map((s, i) => (
              <li key={s} className="flex gap-4 md:flex-1 md:flex-col md:gap-0">
                {/* Vertical timeline on phones, horizontal from md up. */}
                <div className="flex flex-col items-center md:w-full md:flex-row">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-teal font-heading text-base font-semibold tabular-nums text-heading max-sm:bg-teal-tint max-sm:text-[0.9375rem]"
                  >
                    {i + 1}
                  </span>
                  {i < f.steps.length - 1 ? (
                    <span aria-hidden="true" className="my-1 w-px flex-1 bg-brand-teal/50 md:my-0 md:h-px md:w-auto md:bg-brand-teal" />
                  ) : null}
                </div>
                <div className={cn("relative pt-1 md:mt-3 md:pt-0 md:pb-0 md:pr-4", i < f.steps.length - 1 && "pb-7")}>
                  <p className="text-[15px] max-md:leading-snug">{s}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

const TIER_ROWS: { label: string; cells: ("yes" | "planned" | "coming" | "none" | "fee")[] }[] = [
  { label: "Live online classes with Vipin Garg", cells: ["yes", "none"] },
  { label: "Guided examples and live discussion", cells: ["yes", "none"] },
  { label: "Study on your own schedule", cells: ["none", "yes"] },
  { label: "Fee", cells: ["fee", "fee"] },
];

/** Tier comparison table: rows = inclusions, columns = study formats. Honest about what is not live yet. */
export function TierTable() {
  const cols = ["Live", "On-demand"];
  return (
    <div className="overflow-x-auto max-sm:overflow-hidden max-sm:rounded-2xl max-sm:border max-sm:border-border">
      <table className="w-full min-w-[34rem] border-collapse text-[15px] max-sm:min-w-0 max-sm:text-sm">
        <caption className="sr-only">Compare study formats</caption>
        <thead>
          <tr className="bg-surface-2 text-left">
            <th scope="col" className="px-3 py-3 font-semibold max-sm:px-4">
              What you get
            </th>
            {cols.map((c) => (
              <th key={c} scope="col" className="px-3 py-3 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIER_ROWS.map((r) => (
            <tr key={r.label} className="border-b border-border max-sm:last:border-b-0">
              <th scope="row" className="px-3 py-3 text-left align-top font-medium max-sm:px-4">
                {r.label}
              </th>
              {r.cells.map((cell, i) => (
                <td key={i} className="px-3 py-3 align-top max-sm:px-2">
                  {cell === "yes" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="size-4 text-success" aria-hidden="true" />
                      <span className="sr-only">Included</span>
                    </span>
                  ) : cell === "planned" ? (
                    <span className="text-muted-foreground">Planned</span>
                  ) : cell === "coming" || cell === "none" ? (
                    <span className="text-muted-foreground">
                      <span aria-hidden="true">—</span>
                      <span className="sr-only">Not available</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Announced soon</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-sm text-muted-foreground">
        Live and on-demand are both available. Your coaching offer confirms what is included and the fee.
      </p>
    </div>
  );
}

export type HubPageProps = {
  crumb: { name: string; href: string };
  h1: string;
  /** 40–60 word answer-first intro. */
  intro: string;
  flows: PathwayFlow[];
  groups: CourseGroup[];
  faqs: SiteFaq[];
  faqTitle: string;
  /** Optional block shown after the course cards (e.g. a link to licensing steps). */
  footerLink?: { label: string; href: string };
};

export function HubPage({ crumb, h1, intro, flows, groups, faqs, faqTitle, footerLink }: HubPageProps) {
  return (
    <div>
      <Breadcrumbs items={[crumb]} />

      <header className="container-site py-10 max-sm:pt-4 max-sm:pb-8 lg:py-14">
        <div className="max-w-(--container-prose)">
          <h1>{h1}</h1>
          <p className="mt-6 text-lead max-sm:mt-4">{intro}</p>
        </div>
      </header>

      <section aria-labelledby="pathway-h" className="container-site py-10 max-sm:pt-2 lg:py-14">
        <h2 id="pathway-h">How do these exams fit together?</h2>
        <div className="mt-8 max-sm:mt-6">
          <PathwayExplainer flows={flows} />
        </div>
        {footerLink ? (
          <Link href={footerLink.href} className={cn(textLink, "mt-6")}>
            {footerLink.label} →
          </Link>
        ) : null}
      </section>

      <section aria-labelledby="courses-h" className="bg-surface-2 py-12 lg:py-16">
        <div className="container-site">
          <h2 id="courses-h">Which course do you need?</h2>
          <div className="mt-8 space-y-12 max-sm:mt-6 max-sm:space-y-10">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="font-sans">{g.title}</h3>
                {g.description ? (
                  <p className="mt-2 max-w-[68ch] text-[17px] text-muted-foreground">{g.description}</p>
                ) : null}
                <CourseGrid className="mt-6">
                  {g.courses.map((c) => (
                    <CourseCard key={c.slug} course={c} />
                  ))}
                </CourseGrid>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="tiers-h" className="container-site py-12 lg:py-16">
        <h2 id="tiers-h">How can you study?</h2>
        <div className="mt-8">
          <TierTable />
        </div>
      </section>

      {faqs.length > 0 ? (
        <section aria-labelledby="hub-faq-h" className="container-site pt-4 pb-16 lg:pb-24">
          <h2 id="hub-faq-h">{faqTitle}</h2>
          <FaqList className="mt-8" items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </section>
      ) : null}
    </div>
  );
}
