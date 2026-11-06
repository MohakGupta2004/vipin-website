import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CoursePage } from "@/components/course/course-page";
import { LlqpRegionMatrix } from "@/components/course/llqp-region";
import { ArrowLink } from "@/components/ui/arrow-link";
import { getCourse } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";

const course = getCourse("llqp");

export const metadata: Metadata = course
  ? buildMetadata({
      title: course.seo.title,
      description: course.seo.description,
      path: course.route,
    })
  : {};

export default function LlqpPage() {
  if (!course) notFound();
  return (
    <CoursePage
      course={course}
      extras={
        <section id="modules" aria-labelledby="modules-h" className="scroll-mt-28">
          <h2 id="modules-h">Which LLQP modules does live preparation cover?</h2>
          <div className="mt-6 lg:mt-8">
            <LlqpRegionMatrix />
            <ArrowLink href="/licensing-pathways" className="mt-4">
              See the 5 licensing steps
            </ArrowLink>
          </div>
        </section>
      }
    />
  );
}
