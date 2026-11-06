"use client";

import * as React from "react";
import Link from "next/link";

import { ArrowLink } from "@/components/ui/arrow-link";
import { buttonVariants } from "@/components/ui/button";
import { ctaButton } from "@/components/forms/styles";
import { nextCohort, type Course } from "@/lib/data/courses";
import { appUrl } from "@/lib/app-links";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { formatCad, formatDate } from "./format";

const quietLink =
  "group/link inline-flex min-h-11 items-center justify-center gap-0.5 rounded-md text-[0.9375rem] font-medium text-link transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Sticky price panel, Apple "buy" style. The study format is an iOS-style segmented control
 * built on real radio inputs (keyboard and screen readers work as before). Fees show "announced soon" until real.
 */
export function PriceBox({ course }: { course: Course }) {
  const uid = React.useId();
  const tiers = course.pricing.tiers;
  const [tierId, setTierId] = React.useState<string>(tiers[0].id);
  const tier = tiers.find((t) => t.id === tierId) ?? tiers[0];
  const index = Math.max(0, tiers.findIndex((t) => t.id === tierId));
  const cohort = nextCohort(course);
  const signupHref = appUrl("signup", { campaign: `course-${course.slug}`, content: "price-box" });

  return (
    <div
      id="price-box"
      className="rounded-panel bg-white p-6 text-foreground shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_30px_60px_-40px_rgb(16_42_66/0.45)] sm:rounded-section sm:p-8"
    >
      <h2 className="text-[1.375rem] leading-snug tracking-[-0.025em]">Choose how you study</h2>

      <div
        role="radiogroup"
        aria-label="Study format"
        className="relative mt-5 grid h-11 rounded-full bg-[#e8e8ed] p-1"
        style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }}
      >
        {/* Sliding thumb */}
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.08),inset_0_0_0_0.5px_rgb(0_0_0/0.06)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ width: `calc((100% - 0.5rem) / ${tiers.length})`, transform: `translateX(${index * 100}%)` }}
        />
        {tiers.map((t) => {
          const id = `${uid}-${t.id}`;
          const on = tierId === t.id;
          return (
            <label
              key={t.id}
              htmlFor={id}
              className={cn(
                "relative z-10 flex items-center justify-center gap-1.5 rounded-full px-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                t.available ? "cursor-pointer" : "cursor-not-allowed",
                on ? "text-heading" : t.available ? "text-heading/55 hover:text-heading/80" : "text-heading/35",
                "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
              )}
            >
              <input
                id={id}
                type="radio"
                name={`${uid}-tier`}
                value={t.id}
                checked={on}
                disabled={!t.available}
                onChange={() => setTierId(t.id)}
                className="sr-only"
              />
              {t.label}
              {!t.available ? <span className="text-[0.6875rem] font-medium text-muted-foreground">Soon</span> : null}
            </label>
          );
        })}
      </div>
      <p key={tier.id} className="vg-enter-fade mt-3 text-sm text-muted-foreground">
        {tier.description}
      </p>

      <p className="mt-7 font-heading text-[2.5rem] leading-none font-semibold tracking-[-0.04em] text-heading tabular-nums">
        {tier.price !== null ? (
          formatCad(tier.price)
        ) : (
          <span className="text-[1.375rem] tracking-[-0.02em] text-heading/60">Fee announced soon</span>
        )}
      </p>
      {tier.price !== null ? <p className="mt-1.5 text-sm text-muted-foreground">CAD. Taxes may apply.</p> : null}

      <dl className="mt-6 divide-y divide-black/[0.06] border-y border-black/[0.06] text-sm">
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-muted-foreground">Next cohort</dt>
          <dd className="text-right text-heading tabular-nums">
            {cohort ? formatDate(cohort.startDate) : <span className="text-muted-foreground">Announced soon</span>}
          </dd>
        </div>
        {cohort ? (
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Schedule</dt>
            <dd className="text-right text-heading">{cohort.schedule}</dd>
          </div>
        ) : null}
        {cohort?.seatsLeft !== undefined ? (
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Seats</dt>
            <dd className="text-right text-heading tabular-nums">{cohort.seatsLeft} left</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4 py-3">
          <dt className="text-muted-foreground">Format</dt>
          <dd className="text-right text-heading">
            {course.status === "live-group" ? "Live online group classes" : "Instructor-led coaching"}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col">
        <a href={signupHref} rel="noopener" className={cn(buttonVariants(), ctaButton, "w-full justify-center px-6")}>
          Sign up free
        </a>
        <p className="mt-2 text-center text-[0.8125rem] text-muted-foreground">Create your account in the learning app.</p>
        <div className="mt-3 flex flex-col items-center border-t border-black/[0.06] pt-2">
          <ArrowLink href={`/contact?course=${course.slug}`}>Ask Vipin a question</ArrowLink>
          <a href="#register-interest" className={cn(quietLink, "min-h-9 text-sm text-muted-foreground hover:text-heading hover:opacity-100")}>
            Or register interest in the {course.code}
          </a>
          {siteConfig.guarantee ? (
            <Link href="/guarantee" className={cn(quietLink, "min-h-9 text-sm")}>
              Read the guarantee terms
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
