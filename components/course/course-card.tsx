import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
        "group relative flex h-full flex-col rounded-panel bg-white p-6 shadow-[0_0_0_1px_rgb(0_0_0/0.06)] transition-[scale,box-shadow] duration-200 ease-out hover:shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_20px_40px_-28px_rgb(16_42_66/0.45)] active:scale-[0.985] motion-reduce:transition-none has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring sm:p-7",
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-xs font-semibold tracking-normal tabular-nums text-heading">{course.code}</p>
        <p className="text-xs text-muted-foreground">
          {comingSoon ? "Register interest" : areaLabel(course.area)}
        </p>
      </div>
      <h3 className="mt-3 text-[1.3125rem] leading-snug tracking-[-0.02em]">
        <Link
          href={course.route}
          className="outline-hidden after:absolute after:inset-0 after:rounded-panel"
        >
          {course.name}
        </Link>
      </h3>
      <p className="mt-2 mb-6 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{course.blurb ?? course.tagline}</p>
      <dl className="mt-auto grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 border-t border-black/[0.06] pt-4 text-[0.8125rem]">
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
        View course{" "}
        <ArrowUpRight
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </p>
    </article>
  );
}

/** Upcoming programme card (§5.16): no fee/date rows, one honest line. */
export function UpcomingCard({ program }: { program: UpcomingProgram }) {
  return (
    <article className="group relative flex h-full flex-col rounded-panel bg-white p-6 shadow-[0_0_0_1px_rgb(0_0_0/0.06)] transition-[scale,box-shadow] duration-200 ease-out hover:shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_20px_40px_-28px_rgb(16_42_66/0.45)] active:scale-[0.985] motion-reduce:transition-none has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring sm:p-7">
      <div className="flex items-baseline justify-between gap-3">
        <p className="rounded-xs bg-surface-2 px-2 py-0.5 text-[13px] font-medium text-muted-foreground">
          Upcoming
        </p>
      </div>
      <h3 className="mt-3 text-[1.3125rem] leading-snug tracking-[-0.02em]">
        <Link
          href="/upcoming"
          className="outline-hidden after:absolute after:inset-0 after:rounded-panel"
        >
          {program.name}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-[15px] text-muted-foreground">{program.summary}</p>
      <p className="mt-auto pt-4 text-sm text-muted-foreground">Planned. Join the list to hear first.</p>
      <p className="mt-2 inline-flex items-center gap-1 text-[15px] font-medium text-link">
        Notify me{" "}
        <ArrowUpRight
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </p>
    </article>
  );
}

export function CourseGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6", className)}>{children}</div>
  );
}
