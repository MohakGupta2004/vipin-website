import Link from "next/link"

import { FaqList } from "@/components/course/faq-list"
import { homeFaqs } from "@/lib/data/faqs"

export function HomeFaq() {
  return (
    <section className="container-site grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24 xl:py-28">
      <div className="lg:col-span-4">
        <h2>Common questions</h2>
        <p className="mt-4 text-muted-foreground">Still unsure which course fits you?</p>
        <Link href="/contact" className="mt-2 inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-link underline underline-offset-3 hover:decoration-2">
          Talk to Vipin
        </Link>
      </div>
      <div className="lg:col-span-8">
        <FaqList items={homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      </div>
    </section>
  )
}
