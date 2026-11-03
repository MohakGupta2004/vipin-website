import type { Metadata } from "next";

import { FaqList } from "@/components/course/faq-list";
import { PageSection, PageShell } from "@/components/course/page-shell";
import { siteFaqs } from "@/lib/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ: Live Finance Exam Coaching in Canada",
  description:
    "Answers about live classes, exam registration, on-demand study, practice tests, enrollment and licensing for IFC, CSC, CIRE, RSE and LLQP coaching with Vipin Garg.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <PageShell
      crumbs={[{ name: "FAQ", href: "/faq" }]}
      title="Your questions, answered."
      lead="Straight answers about classes, registration, resources and licensing. Still unsure? Ask Vipin."
    >
      <PageSection>
        <FaqList items={siteFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      </PageSection>
    </PageShell>
  );
}
