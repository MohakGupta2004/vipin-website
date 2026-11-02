import type { Metadata } from "next";

import { HubPage } from "@/components/course/hub-page";
import { getCoursesByArea } from "@/lib/data/courses";
import { siteFaqs } from "@/lib/data/faqs";
import { llqpSteps } from "@/lib/data/pathways";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "LLQP Insurance Licence Exam Prep in Canada",
  description:
    "Live online LLQP preparation with Vipin Garg. See the five licensing steps, the four modules and where coaching fits before you enroll.",
  path: "/insurance",
});

const faqIds = ["llqp-covers", "licensed-after", "registration-included", "recordings-practice"];

export default function InsuranceHubPage() {
  return (
    <HubPage
      crumb={{ name: "Insurance", href: "/insurance" }}
      h1="Insurance licensing exam prep"
      intro="The LLQP (Life Licence Qualification Program) is the education and examination route to a life insurance licence in Canada. Licensing combines approved education, provider certification, provincial exams and your regulator’s requirements. Vipin Garg teaches LLQP preparation live online. Quebec is not offered yet."
      flows={[
        {
          title: "How LLQP licensing works",
          summary: "Five steps from choosing a province to meeting the regulator’s requirements.",
          steps: llqpSteps.map((s) => s.title),
        },
      ]}
      groups={[{ title: "Live group programme", courses: getCoursesByArea("insurance") }]}
      faqs={siteFaqs.filter((f) => faqIds.includes(f.id))}
      faqTitle="Common questions about the LLQP"
      footerLink={{ label: "See each licensing step in detail", href: "/licensing-pathways" }}
    />
  );
}
