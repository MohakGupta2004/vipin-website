import type { Metadata } from "next";

import { PageSection, PageShell } from "@/components/course/page-shell";
import { LeadForm } from "@/components/forms/lead-form";
import { upcomingPrograms } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Upcoming Programmes: CFA, AI & Finance, More",
  description:
    "Practice tests, AI & Finance, CFA preparation and British Columbia licensing programmes are planned. Join the list to hear first when each opens.",
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
            <li key={u.slug} className="rounded-panel bg-[#f5f5f7] p-6 sm:rounded-section sm:p-7 lg:p-9">
              <p className="inline-block rounded-full bg-white px-2.5 py-1 text-xs font-medium text-muted-foreground">
                Coming soon
              </p>
              <h2 className="mt-3 text-[1.375rem]">{u.name}</h2>
              <p className="mt-2 text-[17px] text-muted-foreground">{u.summary}</p>
              <p className="mt-4 text-sm text-muted-foreground">Planned. Join the list to hear first.</p>
            </li>
          ))}
        </ul>
        <div id="notify" className="mt-12 scroll-mt-28 border-t border-border pt-8">
          <h2 className="text-[1.75rem] sm:text-[2rem]">Notify me</h2>
          <LeadForm kind="interest" sourcePath="/upcoming" className="mt-5" />
        </div>
      </PageSection>
    </PageShell>
  );
}
