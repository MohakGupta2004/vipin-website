import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { focusRing } from "@/components/forms/styles";
import type { Course, UpcomingProgram } from "@/lib/data/courses";
import { nextCohort } from "@/lib/data/courses";
import { cn } from "@/lib/utils";

import { areaLabel, examSummary, formatDate, lowestPrice, formatCad } from "./format";

const Muted = ({ children }: { children: React.ReactNode }) => (
  <span className="text-muted-foreground">{children}</span>
);

/** Course card per DESIGN-DIRECTION §5.5. The title link stretches over the card. */
export function CourseCard({ course }: { course: Course }) {
  const cohort = nextCohort(course);
  const price = lowestPrice(course);
  const exam = examSummary(course);
  const comingSoon = !course.offerConfirmed;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring lg:p-8",
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-semibold tabular-nums text-link">{course.code}</p>
        <p className="text-sm text-muted-foreground">
          {comingSoon ? "Register interest" : areaLabel(course.area)}
        </p>
      </div>
      <h3 className="mt-3 font-sans text-xl">
        <Link
          href={course.route}
          className="underline-offset-4 outline-none group-hover:underline after:absolute after:inset-0"
        >
          {course.name}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-[15px] text-muted-foreground">{course.blurb ?? course.tagline}</p>
      <dl className="mt-auto grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5 border-t border-border pt-4 text-sm">
        <dt className="text-muted-foreground">Exam</dt>
        <dd className="tabular-nums">{exam ?? <Muted>Announced soon</Muted>}</dd>
        <dt className="text-muted-foreground">Class</dt>
        <dd>{course.status === "live-group" ? "Live online cohort" : "Instructor-led coaching"}</dd>
        <dt className="text-muted-foreground">Next</dt>
        <dd className="tabular-nums">
          {cohort ? formatDate(cohort.startDate) : <Muted>Announced soon</Muted>}
        </dd>
        <dt className="text-muted-foreground">Fee</dt>
        <dd className="tabular-nums">
          {price !== null ? formatCad(price) : <Muted>Announced soon</Muted>}
        </dd>
      </dl>
      <p className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-link">
        View course <ArrowRight className="size-4" aria-hidden="true" />
      </p>
    </article>
  );
}

/** Upcoming programme card (§5.16): no fee/date rows, one honest line. */
export function UpcomingCard({ program }: { program: UpcomingProgram }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring lg:p-8">
      <div className="flex items-baseline justify-between gap-3">
        <p className="rounded-xs bg-surface-2 px-2 py-0.5 text-[13px] font-medium text-muted-foreground">
          Upcoming
        </p>
      </div>
      <h3 className="mt-3 font-sans text-xl">
        <Link
          href="/upcoming"
          className={cn("underline-offset-4 outline-none group-hover:underline after:absolute after:inset-0", focusRing)}
        >
          {program.name}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-[15px] text-muted-foreground">{program.summary}</p>
      <p className="mt-auto pt-4 text-sm text-muted-foreground">Planned. Join the list to hear first.</p>
      <p className="mt-2 inline-flex items-center gap-1 text-[15px] font-medium text-link">
        Notify me <ArrowRight className="size-4" aria-hidden="true" />
      </p>
    </article>
  );
}

export function CourseGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8", className)}>{children}</div>
  );
}
