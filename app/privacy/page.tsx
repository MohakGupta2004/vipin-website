import type { Metadata } from "next";

import { LegalPage } from "@/components/course/legal-page";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "What personal information the forms on this site collect, why we collect it, how consent for email works under CASL, and how to ask for access or removal.",
  path: "/privacy",
  noindex: !siteConfig.legalReviewed,
});

export default function PrivacyPage() {
  const { email } = siteConfig.contact;
  return (
    <LegalPage
      path="/privacy"
      title="Privacy Policy"
      lead={`How ${siteConfig.legalName} handles personal information collected on this website.`}
      updated="2026-11-02"
      sections={[
        {
          heading: "What we collect",
          body: (
            <p>
              The forms on this site ask for your name, email address, and, depending on the form, your phone number,
              company, the course you are interested in, your exam date and your message. Browsing the site does not
              require you to give us any of this.
            </p>
          ),
        },
        {
          heading: "Why we collect it",
          body: (
            <p>
              We use it to reply to your question, confirm a masterclass or waitlist spot and arrange coaching. We email
              you about classes, masterclasses and course updates only if you tick the optional consent box.
            </p>
          ),
        },
        {
          heading: "Email consent and unsubscribing",
          body: (
            <p>
              Consent to marketing email is optional, unticked by default and separate from sending a form. You can
              withdraw it at any time by using the unsubscribe link in any email or by writing to {email}.
            </p>
          ),
        },
        {
          // PLACEHOLDER: name the email/CRM provider, where data is stored and retention period — "ConvertKit (US), kept 24 months after last contact"
          heading: "Where information is stored",
          body: <p>Forms are not connected to a storage or email service yet. This section will name the service and the retention period before launch.</p>,
        },
        {
          // PLACEHOLDER: lawyer-reviewed PIPEDA wording — access, correction, complaint process, privacy officer name
          heading: "Your rights",
          body: (
            <p>
              You can ask to see the personal information we hold about you, correct it or have it deleted. Write to{" "}
              {email}.
            </p>
          ),
        },
        {
          heading: "Cookies and analytics",
          body: (
            <p>
              If you accept cookies, we store a random visitor ID and collect basic website analytics such as pageviews,
              button/link clicks, browser and device type, language/timezone, rough location from hosting headers
              (country/region/city), referrer host and UTM tags. If you decline, we only count anonymous pageviews.
            </p>
          ),
        },
      ]}
    />
  );
}
