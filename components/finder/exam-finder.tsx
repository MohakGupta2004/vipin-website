"use client";

import * as React from "react";
import Link from "next/link";

import { ArrowRight, TriangleAlert } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { focusRing, primaryButton, secondaryButton, textLink } from "@/components/forms/styles";
import { getCourse, nextCohort } from "@/lib/data/courses";
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
        className={cn("flex flex-col gap-5 rounded-lg bg-surface-2 p-6 sm:p-8", className)}
      >
        <div>
          <p className="text-sm text-muted-foreground">We recommend</p>
          <h3
            id={`${uid}-result`}
            ref={(el) => {
              focusRef.current = el;
            }}
            tabIndex={-1}
            className="mt-1 text-xl font-semibold text-heading outline-none"
          >
            {rec.headline}
          </h3>
          <p className="mt-2 text-base text-foreground">{rec.reason}</p>
        </div>

        {rec.status === "unavailable" ? (
          <div className="rounded-md bg-warning-bg p-4 text-sm text-foreground">
            <p className="flex items-start gap-2 font-medium">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
              We don’t offer the Quebec (Civil Code) LLQP yet.
            </p>
            <Link href="/insurance/llqp" onClick={onNavigate} className={cn(textLink, "mt-1")}>
              Tell me when it’s available <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : null}

        {primary ? (
          <div className="rounded-lg border border-border bg-surface p-4 text-card-foreground">
            <p className="text-lg font-semibold text-heading">
              <span className="font-semibold tabular-nums text-link">{primary.code}</span>{" "}
              {primary.name}
            </p>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Exam format</dt>
                <dd className="font-medium">
                  {primary.examFormat.questions && primary.examFormat.duration
                    ? `${primary.examFormat.questions}, ${primary.examFormat.duration}`
                    : "Announced soon"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Next cohort</dt>
                <dd className={cohort ? "font-medium" : "text-muted-foreground"}>
                  {cohort ? formatDate(cohort.startDate) : "Announced soon"}
                </dd>
              </div>
            </dl>
            {others.length > 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
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

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {primary ? (
            <>
              <Link href={primary.route} onClick={onNavigate} className={cn(buttonVariants(), primaryButton)}>
                See {primary.code} course
              </Link>
              <Link href={`/contact?course=${primary.slug}`} onClick={onNavigate} className={textLink}>
                Talk to Vipin <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </>
          ) : rec.status !== "unavailable" && cta ? (
            <Link href={cta.href} onClick={onNavigate} className={cn(buttonVariants(), primaryButton)}>
              {cta.label}
            </Link>
          ) : null}
          {secondary
            .filter((l) => !(primary && l.href === primary.route))
            .slice(0, 2)
            .map((l) => (
              <Link key={l.href} href={l.href} onClick={onNavigate} className={textLink}>
                {l.label}
              </Link>
            ))}
        </div>

        <div className="flex items-center gap-4 border-t border-border pt-4">
          <Button type="button" variant="outline" className={secondaryButton} onClick={back}>
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
      className={cn("flex flex-col gap-5 rounded-lg bg-surface-2 p-6 sm:p-8", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        {heading ? <h2 className="text-xl font-semibold text-heading">{heading}</h2> : null}
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Step {step + 1} of {TOTAL}
          </p>
          <div className="flex gap-1" aria-hidden="true">
            {finderQuestions.map((q, i) => (
              <span
                key={q.id}
                className={cn("h-1.5 w-6 rounded-xs", i <= step ? "bg-brand-teal" : "bg-border")}
              />
            ))}
          </div>
        </div>
      </div>

      <fieldset className="flex min-w-0 flex-col gap-3" key={question.id}>
        <legend
          id={legendId}
          ref={(el) => {
            focusRef.current = el;
          }}
          tabIndex={-1}
          className="mb-3 text-lg font-medium text-heading outline-none"
        >
          {question.prompt}
        </legend>
        {/* Native radios with one name: Tab enters the group, arrow keys move and select. */}
        <div role="radiogroup" aria-labelledby={legendId} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {question.options.map((o) => {
            const id = `${uid}-${question.id}-${o.value}`;
            return (
              <label
                key={o.value}
                htmlFor={id}
                className="flex min-h-16 cursor-pointer items-center gap-3 rounded-md border border-border-strong bg-surface px-4 py-3 text-[15px] text-foreground hover:bg-accent has-checked:border-primary has-checked:bg-teal-tint has-checked:shadow-[inset_0_0_0_1px_var(--primary)] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
              >
                <input
                  id={id}
                  type="radio"
                  name={`${uid}-${question.id}`}
                  value={o.value}
                  checked={current === o.value}
                  onChange={() => choose(o.value)}
                  className="size-5 shrink-0 appearance-none rounded-full border border-border-strong bg-surface checked:border-primary checked:bg-primary checked:shadow-[inset_0_0_0_4px_var(--surface)]"
                />
                <span>{o.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3 max-sm:sticky max-sm:bottom-0 max-sm:-mx-6 max-sm:bg-surface-2 max-sm:px-6 max-sm:py-3">
        {step > 0 ? (
          <Button type="button" variant="outline" className={secondaryButton} onClick={back}>
            Back
          </Button>
        ) : null}
        <Button
          type="submit"
          className={primaryButton}
          disabled={!current}
          aria-disabled={!current}
          aria-describedby={!current ? helpId : undefined}
        >
          {step === TOTAL - 1 ? "See my recommendation" : "Next"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
        {!current ? (
          <p id={helpId} className="text-sm text-muted-foreground">
            Choose an answer to continue.
          </p>
        ) : null}
      </div>
    </form>
  );
}
