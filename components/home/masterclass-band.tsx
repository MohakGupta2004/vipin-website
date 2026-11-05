import { LeadForm } from "@/components/forms/lead-form"
import { Reveal } from "@/components/motion/reveal"
import { hasUpcomingMasterclass, siteConfig } from "@/lib/site-config"

import { SectionIntro } from "./section-intro"

const fmt = new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeStyle: "short", timeZone: siteConfig.timezone })

/** The page's one navy band. */
export function MasterclassBand() {
  const m = siteConfig.masterclass
  const upcoming = hasUpcomingMasterclass() && m
  return (
    <section
      id="masterclass"
      aria-labelledby="masterclass-heading"
      className="scroll-mt-20 bg-surface-inverse py-20 text-inverse-fg sm:py-28"
    >
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionIntro
            id="masterclass-heading"
            size="md"
            tone="dark"
            title="Join the free monthly masterclass"
            lead="A live session with Vipin on one exam topic. Ask questions and see how the classes work before you enrol."
          >
            <p className="tabular mt-8 inline-flex items-center gap-2.5 rounded-full bg-white/[0.07] py-2 pr-4 pl-3 text-sm text-inverse-fg/85 ring-1 ring-white/10">
              <span
                aria-hidden="true"
                className={upcoming ? "size-2 rounded-full bg-[#4ade80]" : "size-2 rounded-full bg-inverse-muted/70"}
              />
              {upcoming ? `Next session: ${m.title}, ${fmt.format(new Date(m.startsAt))}` : "Next session: announced soon."}
            </p>
          </SectionIntro>
        </Reveal>
        <Reveal className="lg:col-span-6" delay={80}>
          <div className="rounded-[1.75rem] bg-surface p-6 text-foreground shadow-[0_40px_80px_-40px_rgb(0_0_0/0.5)] sm:p-9">
            <LeadForm kind="masterclass" sourcePath="/" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
