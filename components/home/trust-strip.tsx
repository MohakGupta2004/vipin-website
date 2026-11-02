import { courseCounts } from "@/lib/data/courses"
import { siteConfig } from "@/lib/site-config"

type Fact = { title: string; detail: string }

export function TrustStrip() {
  const more = courseCounts.coaching - courseCounts.liveGroup
  const facts: Fact[] = [
    { title: "Live online classes", detail: "Taught by video, with time for questions" },
    siteConfig.proof.cfaCharter
      ? { title: "Taught by Vipin Garg", detail: siteConfig.proof.cfaCharter }
      : { title: "Taught by Vipin Garg", detail: "One named instructor" },
    {
      title: `${courseCounts.liveGroup} exams with live cohorts`,
      detail: more > 0 ? `${more} more with instructor coaching` : "More exams planned",
    },
    { title: "Official exam formats", detail: "Checked against CIRO and CSI sources" },
  ]
  return (
    <section aria-label="At a glance" className="border-y border-border">
      <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-6 py-6 lg:grid-cols-4 lg:gap-0">
        {facts.map((f, i) => (
          <li key={f.title} className={i > 0 ? "lg:border-l lg:border-border lg:pl-6" : ""}>
            <p className="text-[1.0625rem] font-semibold text-heading">{f.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{f.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
