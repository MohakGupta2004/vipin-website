import { CourseCatalogue } from "@/components/course/course-catalogue"
import { Reveal } from "@/components/motion/reveal"

import { SectionIntro } from "./section-intro"

/** Home course search + filter. Section heading is owned here; cards use h3. */
export function Programmes() {
  return (
    <section aria-labelledby="courses-heading" className="bg-white py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <SectionIntro
            id="courses-heading"
            title="Explore Courses"
            lead="Explore exam preparation courses tailored to your professional goals."
          />
        </Reveal>
        <Reveal className="mt-10 sm:mt-12" delay={60}>
          <CourseCatalogue id="courses" defaultArea="live-group" initialLimit={6} showSearch headingLevel="h3" />
        </Reveal>
      </div>
    </section>
  )
}
