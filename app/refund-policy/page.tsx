import type { Metadata } from "next";

import { LegalPage } from "@/components/course/legal-page";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Refund and Cancellation Policy",
  description:
    "What to confirm about fees, cancellation and refunds before you pay for coaching with Vipin Garg. Final terms are set out in each coaching offer.",
  path: "/refund-policy",
  noindex: !siteConfig.legalReviewed,
});

export default function RefundPolicyPage() {
  return (
    <LegalPage
      path="/refund-policy"
      title="Refund and Cancellation Policy"
      lead="Know the cancellation terms before you pay."
      updated="2026-11-02"
      sections={[
        {
          heading: "Before you pay",
          body: (
            <p>
              Review the schedule, total fee, included resources and cancellation terms before making a payment. Browsing
              this website does not enroll you or create a payment obligation.
            </p>
          ),
        },
        {
          heading: "Official fees are separate",
          body: (
            <p>
              Coaching and official registration are separate. An official registration or exam fee is included only if
              expressly stated in your coaching offer.
            </p>
          ),
        },
        {
          // PLACEHOLDER: refund and cancellation terms approved by client — "Full refund up to 7 days before the first class; none after attendance begins"
          heading: "Refunds and cancellations",
          body: <p>The refund and cancellation terms have not been published yet. They will be stated here and in each coaching offer.</p>,
        },
        {
          heading: "Contact",
          body: <p>Questions about a fee or a refund: {siteConfig.contact.email}.</p>,
        },
      ]}
    />
  );
}
