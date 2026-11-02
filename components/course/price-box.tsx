"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ctaButton, focusRing, textLink } from "@/components/forms/styles";
import { nextCohort, type Course } from "@/lib/data/courses";
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
  const ctaLabel = "Register interest";

  return (
    <div
      id="price-box"
      className="rounded-lg border border-border bg-surface p-6 text-foreground"
    >
      <h2 className="font-sans text-lg font-semibold">Choose how you study</h2>

      <div
        role="radiogroup"
        aria-label="Study format"
        className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border-strong bg-border-strong"
      >
        {tiers.map((t) => {
          const id = `${uid}-${t.id}`;
          return (
            <label
              key={t.id}
              htmlFor={id}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-center text-sm font-semibold leading-tight",
                t.available ? "cursor-pointer" : "cursor-not-allowed text-muted-foreground",
                tierId === t.id ? "bg-primary text-primary-foreground" : "bg-surface hover:bg-accent",
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
              <span>{t.label}</span>
              {!t.available ? <span className="text-[13px] font-normal">Coming</span> : null}
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
          href="#register-interest"
          className={cn(buttonVariants(), ctaButton, "h-12 w-full justify-center px-6")}
        >
          {ctaLabel}
        </a>
        <Link href={`/contact?course=${course.slug}`} className={cn(textLink, "justify-center")}>
          Talk to Vipin about this course <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        {siteConfig.guarantee ? (
          <Link href="/guarantee" className={cn("text-sm text-link underline underline-offset-4", focusRing)}>
            Read the guarantee terms
          </Link>
        ) : null}
      </div>
    </div>
  );
}
