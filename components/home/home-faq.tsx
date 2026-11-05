import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { FaqList } from "@/components/course/faq-list"
import { Reveal } from "@/components/motion/reveal"
import { homeFaqs } from "@/lib/data/faqs"

import { SectionIntro } from "./section-intro"

export function HomeFaq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white py-20 sm:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionIntro id="faq-heading" size="md" title="FAQs" lead="Still unsure which course fits you?">
            <Link
              href="/contact"
              className="group/link mt-3 inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium text-link transition-opacity hover:opacity-75"
            >
              Talk to Vipin
              <ChevronRight
                aria-hidden="true"
                strokeWidth={2}
                className="size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </SectionIntro>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={60}>
          <FaqList items={homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </Reveal>
      </div>
    </section>
  )
}
