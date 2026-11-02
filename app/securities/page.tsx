import type { Metadata } from "next";

import { HubPage } from "@/components/course/hub-page";
import { getCoursesByArea } from "@/lib/data/courses";
import { siteFaqs } from "@/lib/data/faqs";
import { careerPathways } from "@/lib/data/pathways";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Securities & CIRO Exam Prep in Canada",
  description:
    "Live online prep for IFC, CSC, CIRE, RSE and other CIRO exams with Vipin Garg. Compare courses, exam formats and licensing pathways in one place.",
  path: "/securities",
});

const securities = getCoursesByArea("securities");
const faqIds = ["which-course", "cire-vs-rse", "registration-included", "recordings-practice"];

export default function SecuritiesHubPage() {
  const live = securities.filter((c) => c.status === "live-group");
  const coaching = securities.filter((c) => c.status !== "live-group");
  return (
    <HubPage
      crumb={{ name: "Securities", href: "/securities" }}
      h1="Securities and CIRO exam prep"
      intro="Securities exams in Canada fall into two groups. IFC and the CSC build product and market knowledge for banking and investment-service roles. CIRO exams, such as the CIRE and RSE, cover investment-dealer roles by approval category. Vipin Garg teaches the IFC, CSC, CIRE and RSE live online."
      flows={careerPathways
        .filter((p) => p.id === "banking-mutual-funds" || p.id === "securities-investment-advice")
        .map((p) => ({ title: p.title, summary: p.summary, steps: p.steps }))}
      groups={[
        {
          title: "Live group programmes",
          description: "Taught live online by Vipin Garg.",
          courses: live,
        },
        {
          title: "Exam coaching",
          description: "Other CIRO and professional exams. Ask about your exam before you enroll.",
          courses: coaching,
        },
      ]}
      faqs={siteFaqs.filter((f) => faqIds.includes(f.id))}
      faqTitle="Common questions about securities exams"
      footerLink={{ label: "Compare roles and exams in the licensing pathways", href: "/licensing-pathways" }}
    />
  );
}
