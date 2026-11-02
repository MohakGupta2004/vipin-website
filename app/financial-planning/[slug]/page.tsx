import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CoursePage } from "@/components/course/course-page";
import { getCourse, staticParamsFor } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticParamsFor("financial-planning");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || course.area !== "financial-planning") return {};
  return buildMetadata({
    title: course.seo.title,
    description: course.seo.description,
    path: course.route,
  });
}

export default async function FinancialPlanningCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || course.area !== "financial-planning") notFound();
  return <CoursePage course={course} />;
}
