import { LeadForm } from "@/components/forms/lead-form"
import { hasUpcomingMasterclass, siteConfig } from "@/lib/site-config"

const fmt = new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeStyle: "short", timeZone: siteConfig.timezone })

/** The page's one navy band. */
export function MasterclassBand() {
  const m = siteConfig.masterclass
  const upcoming = hasUpcomingMasterclass() && m
  return (
    <section id="masterclass" className="scroll-mt-24 bg-surface-inverse py-16 text-inverse-fg md:py-20">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="text-inverse-fg">Join the free monthly masterclass</h2>
          <p className="mt-4 max-w-[52ch] text-inverse-muted">
            A live session with Vipin on one exam topic. Ask questions and see how the classes work before you enrol.
          </p>
          <p className="tabular mt-4 text-inverse-muted">
            {upcoming ? `Next session: ${m.title}, ${fmt.format(new Date(m.startsAt))}` : "Next session: announced soon."}
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-lg bg-surface p-5 text-foreground max-sm:rounded-2xl sm:p-6">
            <LeadForm kind="masterclass" sourcePath="/" />
          </div>
        </div>
      </div>
    </section>
  )
}
