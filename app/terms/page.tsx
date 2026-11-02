import type { Metadata } from "next";

import { LegalPage } from "@/components/course/legal-page";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms for using this website and for coaching enrollment with Vipin Garg Finance Coaching, including independence from exam providers and regulators.",
  path: "/terms",
  noindex: !siteConfig.legalReviewed,
});

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      title="Terms of Use"
      lead={`These terms cover your use of this website and enrollment in coaching with ${siteConfig.legalName}.`}
      updated="2026-11-02"
      sections={[
        {
          heading: "Independent examination preparation",
          body: <p>{siteConfig.disclaimer}</p>,
        },
        {
          heading: "Enrollment and payment",
          body: (
            <p>
              Enrollment and payment arrangements are confirmed separately. Browsing this website does not enroll you or
              create a payment obligation. Review the schedule, total fee, included resources and cancellation terms
              before making a payment.
            </p>
          ),
        },
        {
          heading: "Trademarks",
          body: <p>{siteConfig.trademarkNotice}</p>,
        },
        {
          // PLACEHOLDER: lawyer-written terms — governing law (province), liability limits, intellectual property, conduct in class
          heading: "Other terms",
          body: <p>More terms, including governing law and limits on liability, will be added after legal review.</p>,
        },
        {
          heading: "Contact",
          body: <p>Questions about these terms: {siteConfig.contact.email}.</p>,
        },
      ]}
    />
  );
}
