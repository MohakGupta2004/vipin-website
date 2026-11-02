import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MediaSlot, PageSection, PageShell } from "@/components/course/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { primaryButton } from "@/components/forms/styles";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "About Vipin Garg: Live Finance Exam Coach",
  description:
    "Meet Vipin Garg, founder and instructor. Live online coaching for Canadian financial exams, with a focus on understanding concepts and how they apply.",
  path: "/about",
});

const approach = [
  {
    title: "Build the foundation",
    text: "Work through the terminology and underlying concepts before moving to more demanding material.",
  },
  {
    title: "Apply the knowledge",
    text: "Discuss examples, interpret scenarios and understand why an answer is appropriate.",
  },
  {
    title: "Prepare deliberately",
    text: "Identify the topics that need attention and organize your preparation around the examination you are taking.",
  },
];

export default function AboutPage() {
  const video = siteConfig.founderVideo;
  return (
    <PageShell
      crumbs={[{ name: "About", href: "/about" }]}
      title="Teaching that makes the subject clearer."
      lead="Vipin Garg Finance Coaching brings live instruction to Canadian financial examination preparation, with an emphasis on understanding concepts and their application."
    >
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lg font-semibold text-heading">Vipin Garg</p>
            <p className="text-sm text-muted-foreground">Founder &amp; Instructor</p>
            <h2 className="mt-6">A personal approach to professional education.</h2>
            <p className="mt-5 max-w-[68ch] text-[17px]">
              {siteConfig.instructor.bio ??
                "The purpose of coaching is to make demanding material easier to work through: explain the reasoning, connect related ideas and give learners an opportunity to ask questions."}
            </p>
            <p className="mt-4 max-w-[68ch] text-[17px]">
              Live group programmes cover IFC, CSC Exam 1, CSC Exam 2, CIRE, RSE and LLQP. Additional coaching covers
              CIRO proficiency examinations, wealth management and financial planning subjects.
            </p>
            <Link href="/courses" className={cn(buttonVariants(), primaryButton, "mt-8")}>
              Explore the programmes <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-5">
            {video ? (
              <video controls poster={video.poster} className="aspect-video w-full rounded-lg" src={video.src}>
                {video.captionsUrl ? <track kind="captions" src={video.captionsUrl} default /> : null}
              </video>
            ) : (
              <MediaSlot label="Introduction video coming soon" />
            )}
          </div>
        </div>
      </PageSection>

      <PageSection tone="band" id="approach" title="Understand the reasoning behind the answer.">
        <p className="max-w-[68ch] text-[17px]">
          A definition is easier to remember when you understand how it works. Coaching connects financial concepts to
          the calculations, client situations and professional decisions you may encounter in your studies.
        </p>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {approach.map((a, i) => (
            <li key={a.title}>
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-full border border-brand-teal text-base font-semibold tabular-nums text-heading"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-sans text-lg">{a.title}</h3>
              <p className="mt-2 text-[17px] text-muted-foreground">{a.text}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="next" title="Find the preparation that fits your goals.">
        <p className="max-w-[68ch] text-[17px]">
          Explore your course, understand the requirements and confirm your coaching arrangements before you enroll.
        </p>
        <Link href="/find-my-course" className={cn(buttonVariants(), primaryButton, "mt-6")}>
          Find my course
        </Link>
      </PageSection>
    </PageShell>
  );
}
