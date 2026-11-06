"use client";

import * as React from "react";
import Link from "next/link";

import { TriangleAlert } from "lucide-react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Button, buttonVariants } from "@/components/ui/button";
import { focusRing, primaryButton, textLink } from "@/components/forms/styles";
import { OptionList, OptionRow } from "@/components/finder/option-list";
import { getCourse, nextCohort } from "@/lib/data/courses";
import { VipinPhoto } from "@/components/course/vipin-photo";
import { isEnabled } from "@/lib/feature-flags";
import {
  finderQuestions,
  recommendCourse,
  type FinderAnswers,
  type FinderQuestion,
} from "@/lib/data/pathways";
import { cn } from "@/lib/utils";

type Partials = Partial<FinderAnswers>;

export type ExamFinderProps = {
  className?: string;
  /** Heading above the steps. Pass `null` to hide (e.g. when a dialog supplies a title). */
  heading?: string | null;
  /** Called when the user follows a result link. Lets a dialog close itself. */
  onNavigate?: () => void;
};

const TOTAL = finderQuestions.length;

/** White card surface for the finder on a grey section or a plain page. */
export const finderCard =
  "rounded-panel bg-white p-5 shadow-[0_0_0_1px_rgb(0_0_0/0.04),0_30px_60px_-40px_rgb(16_42_66/0.35)] sm:rounded-section sm:p-8 lg:p-10";

/** Quiet text-style button for Back. */
const backButton = cn(
  "inline-flex h-12 items-center justify-center rounded-full px-5 text-[15px] font-semibold text-muted-foreground transition-colors duration-150 hover:text-heading motion-reduce:transition-none",
  focusRing,
);

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { dateStyle: "long" }).format(
      new Date(`${iso}T12:00:00`),
    );
  } catch {
    return iso;
  }
}

export function ExamFinder({ className, heading = "Find the right exam in three questions", onNavigate }: ExamFinderProps) {
  const uid = React.useId();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Partials>({});
  const [showResult, setShowResult] = React.useState(false);
  const focusRef = React.useRef<HTMLElement | null>(null);
  const firstRender = React.useRef(true);

  // Move focus to the new step or result so keyboard users keep their place.
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    focusRef.current?.focus();
  }, [step, showResult]);

  const question: FinderQuestion = finderQuestions[step];
  const current = answers[question.id];

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [question.id]: value }));
  }

  function next() {
    if (!current) return;
    if (step < TOTAL - 1) setStep(step + 1);
    else setShowResult(true);
  }

  function back() {
    if (showResult) setShowResult(false);
    else if (step > 0) setStep(step - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  }

  const complete = answers.goal && answers.province && answers.timing;

  // Feature flag: renders nothing (no layout gap) when switched off in config/feature-flags.json.
  if (!isEnabled("examFinder")) return null;

  if (showResult && complete) {
    const rec = recommendCourse(answers as FinderAnswers);
    const primary = rec.primary ? getCourse(rec.primary) : undefined;
    const cohort = primary ? nextCohort(primary) : undefined;
    const others = rec.alsoConsider
      .map((s) => getCourse(s))
      .filter((c): c is NonNullable<typeof c> => !!c);
    const [cta, ...secondary] = rec.next;

    return (
      <section
        aria-labelledby={`${uid}-result`}
        className={cn("vg-rise flex flex-col gap-6", className)}
      >
        <div>
          <p className="text-[0.9375rem] text-muted-foreground">We recommend</p>
          <h3
            id={`${uid}-result`}
            ref={(el) => {
              focusRef.current = el;
            }}
            tabIndex={-1}
            className="mt-1 font-heading text-[1.5rem] leading-tight font-semibold tracking-[-0.03em] text-balance text-heading outline-hidden sm:text-[1.75rem]"
          >
            {rec.headline}
          </h3>
          <p className="mt-3 text-[1.0625rem] text-pretty text-foreground">{rec.reason}</p>
        </div>

        {rec.status === "unavailable" ? (
          <div className="rounded-2xl bg-warning-bg p-4 text-sm text-foreground">
            <p className="flex items-start gap-2 font-medium">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
              We don’t offer the Quebec (Civil Code) LLQP yet.
            </p>
            <ArrowLink href="/insurance/llqp" onClick={onNavigate} className="mt-1">
              Tell me when it’s available
            </ArrowLink>
          </div>
        ) : null}

        {primary ? (
          <div className="divide-y divide-black/[0.06] overflow-clip rounded-2xl bg-white text-card-foreground shadow-[0_0_0_1px_rgb(0_0_0/0.08)]">
            <p className="p-4 text-lg leading-snug font-semibold text-heading sm:px-5">
              <span className="tabular-nums">{primary.code}</span> {primary.name}
            </p>
            <dl className="grid gap-4 p-4 text-[0.9375rem] sm:grid-cols-2 sm:px-5">
              <div>
                <dt className="text-muted-foreground">Exam format</dt>
                <dd className="mt-0.5 font-medium text-heading">
                  {primary.examFormat.questions && primary.examFormat.duration
                    ? `${primary.examFormat.questions}, ${primary.examFormat.duration}`
                    : "Announced soon"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Next cohort</dt>
                <dd className={cohort ? "mt-0.5 font-medium text-heading" : "mt-0.5 text-muted-foreground"}>
                  {cohort ? formatDate(cohort.startDate) : "Announced soon"}
                </dd>
              </div>
            </dl>
            {others.length > 0 ? (
              <p className="p-4 text-[0.9375rem] text-muted-foreground sm:px-5">
                Also consider:{" "}
                {others.map((c, i) => (
                  <React.Fragment key={c.slug}>
                    {i > 0 ? ", " : null}
                    <Link
                      href={c.route}
                      onClick={onNavigate}
                      className={cn("rounded-sm font-medium text-link underline underline-offset-4", focusRing)}
                    >
                      {c.code}
                    </Link>
                  </React.Fragment>
                ))}
              </p>
            ) : null}
          </div>
        ) : null}

        {rec.caveats.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {rec.caveats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:flex-wrap sm:items-center">
          {primary ? (
            <>
              <Link
                href={primary.route}
                onClick={onNavigate}
                className={cn(buttonVariants(), primaryButton, "max-sm:w-full")}
              >
                See {primary.code} course
              </Link>
              <ArrowLink href={`/contact?course=${primary.slug}`} onClick={onNavigate} className="max-sm:mt-2">
                <span className="inline-flex items-center gap-2">
                  <VipinPhoto size={28} round />
                  Talk to Vipin
                </span>
              </ArrowLink>
            </>
          ) : rec.status !== "unavailable" && cta ? (
            <Link href={cta.href} onClick={onNavigate} className={cn(buttonVariants(), primaryButton, "max-sm:w-full")}>
              {cta.label}
            </Link>
          ) : null}
          {secondary
            .filter((l) => !(primary && l.href === primary.route))
            .slice(0, 2)
            .map((l) => (
              <ArrowLink key={l.href} href={l.href} onClick={onNavigate}>
                {l.label}
              </ArrowLink>
            ))}
        </div>

        <div className="flex items-center gap-2 border-t border-black/[0.06] pt-5">
          <Button type="button" variant="ghost" className={cn(backButton, "-ml-5")} onClick={back}>
            Back
          </Button>
          <button type="button" onClick={restart} className={textLink}>
            Start again
          </button>
        </div>
      </section>
    );
  }

  const legendId = `${uid}-legend-${question.id}`;

  const helpId = `${uid}-help`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        {heading ? <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-heading">{heading}</h3> : null}
        <div className="flex items-center gap-3">
          <p className="font-mono text-sm text-muted-foreground tracking-normal tabular-nums" aria-live="polite">
            Step {step + 1} of {TOTAL}
          </p>
          <div className="flex gap-1" aria-hidden="true">
            {finderQuestions.map((q, i) => (
              <span
                key={q.id}
                className={cn("h-1 w-8 rounded-full transition-colors duration-300 ease-out motion-reduce:transition-none", i <= step ? "bg-primary" : "bg-black/10")}
              />
            ))}
          </div>
        </div>
      </div>

      <fieldset className="vg-rise flex min-w-0 flex-col" key={question.id}>
        <legend
          id={legendId}
          ref={(el) => {
            focusRef.current = el;
          }}
          tabIndex={-1}
          className="mb-5 font-heading text-[1.375rem] leading-snug font-semibold tracking-[-0.02em] text-balance text-heading outline-hidden sm:text-[1.5rem]"
        >
          {question.prompt}
        </legend>
        {/* Native radios with one name: Tab enters the group, arrow keys move and select. */}
        <OptionList>
          {question.options.map((o) => (
            <OptionRow
              key={o.value}
              id={`${uid}-${question.id}-${o.value}`}
              name={`${uid}-${question.id}`}
              value={o.value}
              label={o.label}
              checked={current === o.value}
              onChange={() => choose(o.value)}
            />
          ))}
        </OptionList>
      </fieldset>

      <div className="flex flex-col gap-3">
        <p id={helpId} className="min-h-5 text-sm text-muted-foreground">
          {!current ? "Choose an answer to continue." : null}
        </p>
        <div className="flex flex-col-reverse items-stretch gap-1 sm:flex-row sm:items-center sm:gap-3">
          {step > 0 ? (
            <Button type="button" variant="ghost" className={backButton} onClick={back}>
              Back
            </Button>
          ) : null}
          <Button
            type="submit"
            className={cn(primaryButton, "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 max-sm:w-full")}
            aria-disabled={!current}
            aria-describedby={!current ? helpId : undefined}
          >
            {step === TOTAL - 1 ? "See my recommendation" : "Next"}
          </Button>
        </div>
      </div>
    </form>
  );
}
