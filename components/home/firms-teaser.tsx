import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"

export function FirmsTeaser() {
  return (
    <section aria-labelledby="firms-heading" className="bg-white pb-20 sm:pb-28">
      <div className="container-site">
        <Reveal>
          <div className="grid gap-8 rounded-section bg-[#f5f5f7] p-6 max-sm:rounded-panel sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-16">
            <div className="lg:col-span-8">
              <h2
                id="firms-heading"
                className="font-heading text-[2rem] leading-[1.08] font-semibold tracking-[-0.035em] text-heading sm:text-[2.5rem]"
              >
                Training a team?
              </h2>
              <p className="mt-4 max-w-[54ch] text-lg leading-[1.55] text-muted-foreground">
                Firms can book group cohorts for licensing and proficiency exams. Tell us about your team and the exams they
                need.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/for-firms"
                className="group/link inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-heading px-6 text-[15px] font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-heading/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] motion-reduce:transition-none max-sm:w-full"
              >
                Ask about group cohorts
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
