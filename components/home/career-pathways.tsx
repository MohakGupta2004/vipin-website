import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { careerPathways } from "@/lib/data/pathways"

export function CareerPathways() {
  return (
    <section className="container-site pb-16 md:pb-20 lg:pb-24">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2>Choose your course with the bigger picture in mind</h2>
          <p className="mt-4 max-w-[60ch] text-muted-foreground">
            An exam is one part of a professional pathway. Check how education, experience and registration fit together before you decide what to study.
          </p>
        </div>
        <div className="lg:col-span-5 lg:self-end lg:text-right">
          <Link href="/licensing-pathways" className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-link">
            Explore licensing pathways
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
      <ul className="mt-6 border-t border-border sm:mt-10">
        {careerPathways.map((p) => (
          <li key={p.id} className="grid gap-2 border-b border-border py-5 sm:gap-3 sm:py-6 lg:grid-cols-12 lg:gap-8">
            <h3 className="max-sm:text-lg lg:col-span-4">{p.title}</h3>
            <div className="lg:col-span-6">
              <p className="tabular text-sm font-semibold text-link">{p.courseCodes.join(" · ")}</p>
              <p className="mt-2 text-[0.9375rem] text-muted-foreground">{p.summary}</p>
            </div>
            <p className="lg:col-span-2 lg:text-right">
              <Link href={p.href} className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-link">
                Explore
                <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                <span className="sr-only"> {p.title}</span>
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
