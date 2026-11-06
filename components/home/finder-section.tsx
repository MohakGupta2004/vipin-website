import { ExamFinder, finderCard } from "@/components/finder/exam-finder"
import { Reveal } from "@/components/motion/reveal"

import { SectionIntro } from "./section-intro"

/** Exam finder on Apple's light grey: intro on the left (sticky on desktop), the questions on a white card. */
export function FinderSection() {
  return (
    <section id="find-my-course" aria-labelledby="finder-heading" className="scroll-mt-20 bg-[#f5f5f7] py-20 sm:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionIntro
            id="finder-heading"
            size="md"
            title="Not Sure Which Exam"
            tail="Is Right for You?"
            lead="Whether you're entering financial services or advancing your career, find the licensing and certification exams that align with your professional goals."
          >
            <p className="mt-6 text-base text-muted-foreground">
              Answer three quick questions to explore your options.
            </p>
          </SectionIntro>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={80}>
          <ExamFinder heading={null} className={finderCard} />
        </Reveal>
      </div>
    </section>
  )
}
