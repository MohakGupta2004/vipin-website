import type { Course, PriceTier } from "@/lib/data/courses";

/** "100 multiple-choice questions" + "3 hours" → "100 questions · 3 hours". */
export function examSummary(course: Pick<Course, "examFormat">): string | null {
  const { questions, duration } = course.examFormat;
  if (!questions || !duration) return null;
  return `${questions.replace("multiple-choice ", "")} · ${duration}`;
}

export function examBody(course: Pick<Course, "officialUrl">): string {
  const u = course.officialUrl;
  if (u.includes("ciro.ca")) return "CIRO";
  if (u.includes("csi.ca")) return "CSI";
  if (u.includes("fpcanada")) return "FP Canada";
  return "The exam provider";
}

export function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function areaLabel(area: Course["area"]): string {
  return area === "securities"
    ? "Securities"
    : area === "insurance"
      ? "Insurance"
      : "Financial planning";
}

/** Eyebrow above the H1: area and kind of exam. */
export function eyebrow(course: Course): string {
  const kind = course.category === "CIRO" ? "CIRO exam" : course.offerConfirmed ? "exam" : "certification";
  return `${areaLabel(course.area)} · ${kind}`;
}

export function courseH1(course: Course): string {
  return course.offerConfirmed ? `${course.code} exam prep` : `${course.code} certification`;
}

export function formatLabel(course: Course): string {
  return course.status === "live-group" ? "Live group classes" : "Instructor-led exam coaching";
}

export function formatCad(price: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Lowest real price across available tiers, or null. */
export function lowestPrice(course: Course): number | null {
  const prices = course.pricing.tiers
    .filter((t: PriceTier) => t.available && typeof t.price === "number")
    .map((t) => t.price as number);
  return prices.length ? Math.min(...prices) : null;
}

export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { dateStyle: "long" }).format(
      new Date(`${iso}T12:00:00`),
    );
  } catch {
    return iso;
  }
}

export function formatReviewed(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${iso}T12:00:00`));
  } catch {
    return iso;
  }
}
