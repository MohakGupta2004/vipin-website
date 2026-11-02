import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CoursePage } from "@/components/course/course-page";
import { getCourse, staticParamsFor } from "@/lib/data/courses";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticParamsFor("securities");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || course.area !== "securities") return {};
  return buildMetadata({
    title: course.seo.title,
    description: course.seo.description,
    path: course.route,
  });
}

export default async function SecuritiesCoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || course.area !== "securities") notFound();
  return <CoursePage course={course} />;
}
