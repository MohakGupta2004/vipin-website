import type { Metadata } from "next";

import { HubPage } from "@/components/course/hub-page";
import { getCoursesByArea } from "@/lib/data/courses";
import { siteFaqs } from "@/lib/data/faqs";
import { careerPathways, designationPathways } from "@/lib/data/pathways";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Financial Planning Exam Prep in Canada",
  description:
    "Exam coaching for WME, FP1, FP2 and AFP with Vipin Garg. See how the courses lead to PFP, CFP and QAFP, and compare exam formats before you enroll.",
  path: "/financial-planning",
});

const faqIds = ["which-course", "registration-included", "recordings-practice", "licensed-after"];

export default function FinancialPlanningHubPage() {
  const planning = getCoursesByArea("financial-planning");
  const wealth = careerPathways.find((p) => p.id === "wealth-financial-planning");
  const pfp = designationPathways.find((d) => d.id === "pfp");
  const cfp = designationPathways.find((d) => d.id === "cfp-qafp");
  return (
    <HubPage
      crumb={{ name: "Financial planning", href: "/financial-planning" }}
      h1="Financial planning exam prep"
      intro="Financial planning exams build from wealth management essentials to applied planning. WME, FP1, FP2 and the AFP lead toward designations such as the PFP, while FP Canada certifies the CFP and QAFP. Vipin Garg offers exam coaching for WME, FP1, FP2 and AFP. CFP and QAFP coaching is not confirmed yet."
      flows={[wealth, pfp, cfp]
        .filter((p): p is NonNullable<typeof p> => !!p)
        .map((p) => ({ title: p.title, summary: p.summary, steps: p.steps }))}
      groups={[
        {
          title: "Exam coaching",
          courses: planning.filter((c) => c.offerConfirmed),
        },
        {
          title: "Certifications",
          description: "Requirements are set by FP Canada. Register interest to hear when coaching is confirmed.",
          courses: planning.filter((c) => !c.offerConfirmed),
        },
      ]}
      faqs={siteFaqs.filter((f) => faqIds.includes(f.id))}
      faqTitle="Common questions about planning exams"
    />
  );
}
