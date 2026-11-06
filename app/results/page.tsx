import type { Metadata } from "next";

import { ArrowLink } from "@/components/ui/arrow-link";
import { PageSection, PageShell } from "@/components/course/page-shell";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

// No real reviews or pass data yet: keep out of search until there is something to show.
export const metadata: Metadata = buildMetadata({
  title: "Student Feedback and Results",
  description:
    "A dedicated space for genuine student feedback on the coaching experience. Ratings and reviews appear here once they are collected from an independent source.",
  path: "/results",
  noindex: true,
});

const how = [
  "Invite students after they experience the coaching.",
  "Welcome honest feedback, including criticism.",
  "Retain the meaning of each student’s comments.",
  "Display ratings and verification labels only as supplied by the review platform.",
];

export default function ResultsPage() {
  const tp = siteConfig.social.trustpilot;
  return (
    <PageShell
      crumbs={[{ name: "Results", href: "/results" }]}
      title="Experiences, shared in students’ own words."
      lead="We are preparing a dedicated space for genuine feedback on the coaching experience."
    >
      <PageSection>
        {/* PLACEHOLDER: real reviews, pass wall and Trustpilot profile — render reviews here when supplied */}
        <div className="max-w-[68ch]">
          <h2 className="text-[1.75rem] sm:text-[2rem]">Independent feedback. A transparent source.</h2>
          <p className="mt-3 text-[17px]">
            {tp
              ? "Read our reviews on Trustpilot."
              : "Our Trustpilot profile and review collection have not yet been connected. When available, this page will link to the original review source and display feedback through the official integration."}
          </p>
          {tp ? (
            <ArrowLink href={tp} className="mt-1">
              Trustpilot profile
            </ArrowLink>
          ) : null}
          <h3 className="mt-10 text-[1.1875rem]">How feedback will be collected</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px]">
            {how.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </PageSection>
    </PageShell>
  );
}
