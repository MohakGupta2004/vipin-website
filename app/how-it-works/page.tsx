import type { Metadata } from "next";
import Link from "next/link";

import { PageSection, PageShell } from "@/components/course/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { primaryButton } from "@/components/forms/styles";
import { buildMetadata } from "@/lib/seo";
import { appUrl } from "@/lib/app-links";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "How Live Exam Coaching Works with Vipin Garg",
  description:
    "Choose your programme, discuss your preparation, confirm your coaching and begin your studies. See what to confirm before you pay and how student access works.",
  path: "/how-it-works",
});

const steps = [
  {
    title: "Choose your programme",
    text: "Review the content, examination format and pathway for the course you are preparing for.",
  },
  {
    title: "Discuss your preparation",
    text: "Share your course, current understanding, target exam date and availability.",
  },
  {
    title: "Confirm your coaching",
    text: "Review the schedule, total fee, included resources and cancellation terms before making a payment.",
  },
  {
    title: "Begin your studies",
    text: "Use your learning app account to access the classes and resources included in your enrollment.",
  },
];

const confirm = [
  "Class dates, time zone and session length",
  "Total coaching fee and payment arrangements",
  "Materials and resources available for your course",
  "Support, access and cancellation terms",
  "Separate official course or examination fees",
];

export default function HowItWorksPage() {
  return (
    <PageShell
      crumbs={[{ name: "How it works", href: "/how-it-works" }]}
      title="A considered start to your preparation."
      lead="Choosing a course should be straightforward. Understand what you need, confirm what is included and know how you will access your learning."
    >
      <PageSection id="steps" title="How do I enroll?">
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-full border border-brand-teal text-base font-semibold tabular-nums text-heading"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-sans text-lg">{s.title}</h3>
              <p className="mt-2 text-[17px] text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection tone="band" id="access" title="Where do I study after I enroll?">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3 className="font-sans">Your learning, in one place.</h3>
            <p className="mt-3 text-[17px]">
              The website helps you explore your options. The learning app is your destination for your account,
              enrolled courses and available learning resources.
            </p>
            <a
              href={appUrl("login", { campaign: "how-it-works" })}
              className={cn(buttonVariants({ variant: "outline" }), "mt-5 h-11 rounded-md px-5 text-[15px] font-semibold")}
            >
              Open the learning app
            </a>
            <p className="mt-5 text-sm text-muted-foreground">
              Enrollment and payment arrangements are confirmed separately. Browsing this website does not enroll you or
              create a payment obligation.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="font-sans">Confirm these details before payment</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {confirm.map((c) => (
                <li key={c} className="py-3 text-[17px]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection id="next" title="Find the preparation that fits your goals.">
        <p className="max-w-[68ch] text-[17px]">
          Explore your course, understand the requirements and confirm your coaching arrangements before you enroll.
        </p>
        <Link href="/courses" className={cn(buttonVariants(), primaryButton, "mt-6")}>
          Explore all programmes
        </Link>
      </PageSection>
    </PageShell>
  );
}
