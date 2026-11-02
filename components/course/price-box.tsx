"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ctaButton, textLink } from "@/components/forms/styles";
import { nextCohort, type Course } from "@/lib/data/courses";
import { appUrl } from "@/lib/app-links";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { formatCad, formatDate } from "./format";

/** Sticky price box with tier selector (DESIGN-DIRECTION §5.7). Fees show "announced soon" until real. */
export function PriceBox({ course }: { course: Course }) {
  const uid = React.useId();
  const tiers = course.pricing.tiers;
  const [tierId, setTierId] = React.useState<string>(tiers[0].id);
  const tier = tiers.find((t) => t.id === tierId) ?? tiers[0];
  const cohort = nextCohort(course);
  const signupHref = appUrl("signup", { campaign: `course-${course.slug}`, content: "price-box" });

  return (
    <div
      id="price-box"
      className="rounded-2xl border border-border bg-surface p-6 text-foreground shadow-float"
    >
      <h2 className="text-lg font-bold">Choose how you study</h2>

      <div
        role="radiogroup"
        aria-label="Study format"
        className="mt-4 flex flex-col gap-2"
      >
        {tiers.map((t) => {
          const id = `${uid}-${t.id}`;
          return (
            <label
              key={t.id}
              htmlFor={id}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-lg border px-3 py-2 text-[0.9375rem] font-semibold transition-colors motion-reduce:transition-none",
                t.available ? "cursor-pointer" : "cursor-not-allowed text-muted-foreground",
                tierId === t.id ? "border-primary bg-accent text-heading ring-1 ring-primary" : "border-border bg-surface hover:border-border-strong",
                "has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-ring",
              )}
            >
              <input
                id={id}
                type="radio"
                name={`${uid}-tier`}
                value={t.id}
                checked={tierId === t.id}
                disabled={!t.available}
                onChange={() => setTierId(t.id)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border-2",
                  tierId === t.id ? "border-primary" : "border-border-strong",
                )}
              >
                {tierId === t.id ? <span className="size-2 rounded-full bg-primary" /> : null}
              </span>
              <span className="flex-1 whitespace-nowrap">{t.label}</span>
              {!t.available ? (
                <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[13px] font-medium text-muted-foreground">Soon</span>
              ) : null}
            </label>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{tier.description}</p>

      <p className="mt-5 font-heading text-[clamp(2rem,1.8rem+0.8vw,2.5rem)] font-semibold leading-none tabular-nums text-heading">
        {tier.price !== null ? (
          formatCad(tier.price)
        ) : (
          <span className="font-sans text-lg font-medium text-muted-foreground">Fee announced soon</span>
        )}
      </p>
      {tier.price !== null ? (
        <p className="mt-1 text-sm text-muted-foreground">CAD. Taxes may apply.</p>
      ) : null}

      <dl className="mt-5 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 border-t border-border pt-4 text-sm">
        <dt className="text-muted-foreground">Next cohort</dt>
        <dd className="tabular-nums">
          {cohort ? formatDate(cohort.startDate) : <span className="text-muted-foreground">Announced soon</span>}
        </dd>
        {cohort ? (
          <>
            <dt className="text-muted-foreground">Schedule</dt>
            <dd>{cohort.schedule}</dd>
          </>
        ) : null}
        {cohort?.seatsLeft !== undefined ? (
          <>
            <dt className="text-muted-foreground">Seats</dt>
            <dd className="tabular-nums">{cohort.seatsLeft} left</dd>
          </>
        ) : null}
        <dt className="text-muted-foreground">Format</dt>
        <dd>{course.status === "live-group" ? "Live online group classes" : "Instructor-led coaching"}</dd>
      </dl>

      <div className="mt-5 flex flex-col gap-1">
        <a
          href={signupHref}
          rel="noopener"
          className={cn(buttonVariants(), ctaButton, "h-12 w-full justify-center px-6")}
        >
          Sign up free
        </a>
        <p className="text-center text-sm text-muted-foreground">Create your account in the learning app.</p>
        <Link href={`/contact?course=${course.slug}`} className={cn(textLink, "justify-center")}>
          Ask Vipin a question <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <a href="#register-interest" className={cn(textLink, "justify-center text-sm")}>
          Or register interest in the {course.code}
        </a>
        {siteConfig.guarantee ? (
          <Link href="/guarantee" className={cn(textLink, "justify-center text-sm")}>
            Read the guarantee terms
          </Link>
        ) : null}
      </div>
    </div>
  );
}
