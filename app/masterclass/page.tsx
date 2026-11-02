import type { Metadata } from "next";

import { formatDate } from "@/components/course/format";
import { VipinPhoto } from "@/components/course/vipin-photo";
import { PageSection, PageShell } from "@/components/course/page-shell";
import { MasterclassSignup } from "@/components/forms/masterclass-signup";
import { isEnabled } from "@/lib/feature-flags";
import { buildMetadata } from "@/lib/seo";
import { hasUpcomingMasterclass, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Free Live Masterclass with Vipin Garg",
  description:
    "Join a live session with Vipin Garg on financial concepts, exam preparation and career pathways, with room for your questions. Register to hear the next date.",
  path: "/masterclass",
});

// Proposed sessions, from the reference site's webinars page.
const sessions = [
  {
    title: "Choosing an examination pathway",
    text: "Understand the different purposes of IFC, CSC and CIRO examinations before committing to a study route.",
  },
  {
    title: "Understanding bonds and yields",
    text: "Work through the relationship between bond prices, yields and changing interest rates.",
  },
  {
    title: "Interpreting scenario questions",
    text: "Identify the relevant facts, distinguish competing answers and connect a scenario to the underlying concept.",
  },
];

export default function MasterclassPage() {
  const m = siteConfig.masterclass;
  const hasDate = hasUpcomingMasterclass();
  return (
    <PageShell
      crumbs={[{ name: "Free masterclass", href: "/masterclass" }]}
      title="A closer look at the subjects that matter."
      lead="Planned masterclasses explore financial concepts, examination preparation and career pathways, with room for questions and discussion."
    >
      <PageSection>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {/* PLACEHOLDER: confirm the masterclass is free, and how often it runs — "Free, monthly, 45 minutes" */}
            <h2 className="font-sans text-2xl">Reserve your seat</h2>
            {hasDate && m ? (
              <p className="mt-3 text-[17px]">
                <span className="font-semibold">{m.title}</span>
                <br />
                <span className="tabular-nums">{formatDate(m.startsAt.slice(0, 10))}</span> · {m.durationMinutes}{" "}
                minutes · {m.topic}
              </p>
            ) : (
              <p className="mt-3 max-w-[60ch] text-[17px]">
                Dates will be announced soon. Register now and we will email you when a session is scheduled. No
                sessions are currently open for booking.
              </p>
            )}
            {isEnabled("masterclassSignup") ? (
              <MasterclassSignup sourcePath="/masterclass" className="mt-6" />
            ) : (
              <p className="mt-6 max-w-[60ch] text-[17px] text-muted-foreground">
                Masterclass registration is closed right now.
              </p>
            )}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="mb-8 flex items-center gap-4">
              <VipinPhoto size={72} />
              <p className="text-[15px]">
                <span className="block text-sm text-muted-foreground">Hosted by</span>
                <span className="font-semibold text-heading">Vipin Garg</span>
              </p>
            </div>
            <h2 className="font-sans text-2xl">Topics in development</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {sessions.map((s) => (
                <li key={s.title} className="py-4">
                  <h3 className="font-sans text-lg">{s.title}</h3>
                  <p className="mt-1 text-[17px] text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Registration and replay access are planned through the learning app.
            </p>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
