import { FaqList } from "@/components/course/faq-list"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { homeFaqs } from "@/lib/data/faqs"

import { SectionIntro } from "./section-intro"

export function HomeFaq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white pt-20 pb-12 sm:pt-28 sm:pb-16">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionIntro id="faq-heading" size="md" title="FAQs" lead="Still unsure which course fits you?">
            <ArrowLink href="/contact" className="mt-3">
              Talk to Vipin
            </ArrowLink>
          </SectionIntro>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={60}>
          <FaqList items={homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </Reveal>
      </div>
    </section>
  )
}
