import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { siteConfig } from "@/lib/site-config"

/** Hidden until the client supplies approved guarantee terms in siteConfig.guarantee. */
export function GuaranteeTeaser() {
  const g = siteConfig.guarantee
  if (!g) return null
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <div className="grid gap-6 rounded-section bg-[#f5f5f7] p-6 max-sm:rounded-panel sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-16">
            <div className="lg:col-span-8">
              <h2 className="font-heading text-[2rem] leading-[1.08] font-semibold tracking-[-0.035em] text-heading sm:text-[2.5rem]">
                {g.headline}
              </h2>
              <p className="mt-4 max-w-[60ch] text-lg leading-[1.55] text-muted-foreground">{g.summary}</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <ArrowLink href="/guarantee">Read the terms</ArrowLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
