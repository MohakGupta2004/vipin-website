import { courses, upcomingPrograms } from "@/lib/data/courses";

import { examSummary } from "./format";

export type CatalogueItem = {
  key: string;
  kind: "course" | "upcoming";
  code: string;
  name: string;
  blurb: string;
  href: string;
  /** Study-area label used by the filter chips. */
  category: "Mutual funds" | "Securities" | "CIRO" | "Insurance" | "Planning & wealth" | "Professional" | null;
  type: "live-group" | "coaching" | "upcoming";
  exam: string | null;
  confirmed: boolean;
  /** Lowercased text used for search (code, name, blurb, category, topics). */
  haystack: string;
};

/** Every course and upcoming programme as a flat, serialisable item list. */
export const catalogueItems: CatalogueItem[] = [
  ...courses.map(
    (c): CatalogueItem => ({
      key: c.slug,
      kind: "course",
      code: c.code,
      name: c.name,
      blurb: c.blurb ?? c.tagline,
      href: c.route,
      category: c.category,
      type: c.status === "upcoming" ? "upcoming" : c.status,
      exam: examSummary(c),
      confirmed: c.offerConfirmed,
      haystack: [c.code, c.name, c.tagline, c.blurb ?? "", c.category, ...c.topics].join(" ").toLowerCase(),
    }),
  ),
  ...upcomingPrograms.map(
    (u): CatalogueItem => ({
      key: u.slug,
      kind: "upcoming",
      code: u.name,
      name: u.name,
      blurb: u.summary,
      href: "/upcoming",
      category: null,
      type: "upcoming",
      exam: null,
      confirmed: false,
      haystack: [u.name, u.summary].join(" ").toLowerCase(),
    }),
  ),
];
