import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { siteConfig } from "@/lib/site-config"

/** Hidden until the client supplies approved guarantee terms in siteConfig.guarantee. */
export function GuaranteeTeaser() {
  const g = siteConfig.guarantee
  if (!g) return null
  return (
    <section className="container-site pb-16 md:pb-20">
      <div className="grid gap-6 rounded-lg border border-border p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-8">
          <h3>{g.headline}</h3>
          <p className="mt-3 max-w-[60ch] text-muted-foreground">{g.summary}</p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Link href="/guarantee" className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-link">
            Read the terms
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
    </section>
  )
}
