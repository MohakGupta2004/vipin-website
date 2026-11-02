import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { PathwayExplainer } from "@/components/course/hub-page";
import { PageSection, PageShell } from "@/components/course/page-shell";
import { RoleSelector } from "@/components/finder/role-selector";
import { textLink } from "@/components/forms/styles";
import { CIRO_EXAM_HUB } from "@/lib/data/courses";
import { careerPathways, designationPathways, llqpSteps } from "@/lib/data/pathways";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Licensing Pathways: CIRO, LLQP, PFP, CFP, CFA",
  description:
    "See how Canadian finance exams, licences and designations fit together. Pick the role you want and see which exam to start with and what else applies.",
  path: "/licensing-pathways",
});

const core = careerPathways.filter((p) => p.id !== "wealth-financial-planning");

export default function LicensingPathwaysPage() {
  return (
    <PageShell
      crumbs={[{ name: "Licensing pathways", href: "/licensing-pathways" }]}
      title="See how your education fits."
      lead="Explore the relationship between examinations, qualifications and professional roles. Use the official requirements to confirm the pathway that applies to you."
    >
      <PageSection id="roles" title="Which exam does my role need?">
        <RoleSelector />
      </PageSection>

      <PageSection tone="band" id="pathways" title="Which pathways lead to which roles?">
        <PathwayExplainer
          flows={core.map((p) => ({ title: p.title, summary: p.summary, steps: p.steps }))}
        />
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
          <li>
            <Link href="/securities/ifc" className={textLink}>
              Explore IFC coaching <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <a href={CIRO_EXAM_HUB} target="_blank" rel="noopener" className={textLink}>
              Explore official CIRO pathways <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <Link href="/insurance/llqp" className={textLink}>
              Explore LLQP coaching <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </PageSection>

      <PageSection id="llqp-steps" title="What are the steps to an LLQP licence?">
        <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
          {llqpSteps.map((s) => (
            <li key={s.step} className="bg-surface p-5">
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-full border border-brand-teal text-base font-semibold tabular-nums text-heading"
              >
                {s.step}
              </span>
              <h3 className="mt-3 font-sans text-lg">{s.title}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{s.description}</p>
              {s.coachingHelps ? (
                <p className="mt-3 text-sm font-medium text-link">Where LLQP coaching helps</p>
              ) : null}
              {s.typicalTime ? <p className="mt-1 text-sm tabular-nums">{s.typicalTime}</p> : null}
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-[68ch] text-sm text-muted-foreground">
          Becoming licensed involves approved education, provider certification, applicable provincial examinations and
          the requirements of the provincial insurance regulator.
        </p>
        <Link href="/insurance/llqp" className={cn(textLink, "mt-2")}>
          See LLQP coaching <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </PageSection>

      <PageSection tone="band" id="designations" title="What about designations such as PFP, CFP and CFA?">
        <PathwayExplainer
          flows={designationPathways.map((d) => ({ title: d.title, summary: d.summary, steps: d.steps }))}
        />
        <ul className="mt-8 grid gap-1 sm:grid-cols-2">
          {designationPathways.map((d) => (
            <li key={d.id}>
              <a href={d.officialUrl} target="_blank" rel="noopener" className={textLink}>
                {d.officialLabel} <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[68ch] text-sm text-muted-foreground">
          An examination is one part of a professional pathway. Registration, experience, education and employer
          requirements may also apply.
        </p>
      </PageSection>
    </PageShell>
  );
}
