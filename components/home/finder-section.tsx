import { ExamFinder } from "@/components/finder/exam-finder"
import { Reveal } from "@/components/motion/reveal"

import { SectionIntro } from "./section-intro"

/** Exam finder on Apple's light grey: intro on the left, the three questions on a white surface. */
export function FinderSection() {
  return (
    <section id="find-my-course" aria-labelledby="finder-heading" className="scroll-mt-20 bg-[#f5f5f7] py-20 sm:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5 lg:pt-6">
          <SectionIntro
            id="finder-heading"
            size="md"
            title="Not Sure Which Exam Is Right for You?"
            lead="Whether you're entering financial services or advancing your career, find the licensing and certification exams that align with your professional goals."
          >
            <p className="mt-6 text-[1.0625rem] font-medium text-heading">
              Answer three quick questions to explore your options.
            </p>
          </SectionIntro>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={80}>
          <ExamFinder
            heading={null}
            className="bg-white p-6 shadow-[0_0_0_1px_rgb(0_0_0/0.04),0_30px_60px_-40px_rgb(16_42_66/0.35)] sm:p-10"
          />
        </Reveal>
      </div>
    </section>
  )
}
