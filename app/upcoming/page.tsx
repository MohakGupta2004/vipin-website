import type { Metadata } from "next";

import { PageSection, PageShell } from "@/components/course/page-shell";
import { LeadForm } from "@/components/forms/lead-form";
import { upcomingPrograms } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Upcoming Programmes: CFA, AI & Finance, More",
  description:
    "Practice tests, recorded courses, AI & Finance, CFA preparation and British Columbia licensing programmes are planned. Join the list to hear first when each opens.",
  path: "/upcoming",
});

export default function UpcomingPage() {
  return (
    <PageShell
      crumbs={[{ name: "Upcoming", href: "/upcoming" }]}
      title="The next stage of our teaching."
      lead="We are planning additional ways to study and broader professional preparation. Each offering will have a defined scope, fee and launch date before enrollment opens."
    >
      <PageSection>
        <ul className="grid gap-6 md:grid-cols-2">
          {upcomingPrograms.map((u) => (
            <li key={u.slug} className="rounded-lg border border-border bg-surface p-6 lg:p-8">
              <p className="inline-block rounded-xs bg-surface-2 px-2 py-0.5 text-[13px] font-medium text-muted-foreground">
                Coming soon
              </p>
              <h2 className="mt-3 font-sans text-xl">{u.name}</h2>
              <p className="mt-2 text-[17px] text-muted-foreground">{u.summary}</p>
              <p className="mt-4 text-sm text-muted-foreground">Planned. Join the list to hear first.</p>
            </li>
          ))}
        </ul>
        <div id="notify" className="mt-12 scroll-mt-28 border-t border-border pt-8">
          <h2 className="font-sans text-2xl">Notify me</h2>
          <LeadForm kind="interest" sourcePath="/upcoming" className="mt-5" />
        </div>
      </PageSection>
    </PageShell>
  );
}
