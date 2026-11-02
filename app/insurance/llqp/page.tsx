import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CoursePage } from "@/components/course/course-page";
import { LlqpRegionMatrix } from "@/components/course/llqp-region";
import { textLink } from "@/components/forms/styles";
import { getCourse } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
            <Link href="/licensing-pathways" className={cn(textLink, "mt-4")}>
              See the 5 licensing steps <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      }
    />
  );
}
