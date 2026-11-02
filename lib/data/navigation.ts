/**
 * Header mega menu and footer columns. Every internal href is typed against
 * the route list in PLAN §3, so a typo or a `#` link fails typecheck.
 * Course links are generated from `courses.ts` so they cannot drift.
 */

import { appUrl } from "@/lib/app-links";
import { courses, type Course } from "./courses";

export type StaticRoute =
  | "/"
  | "/courses"
  | "/securities"
  | "/insurance"
  | "/insurance/llqp"
  | "/financial-planning"
  | "/upcoming"
  | "/find-my-course"
  | "/licensing-pathways"
  | "/schedule"
  | "/masterclass"
  | "/free-diagnostic"
  | "/guarantee"
  | "/for-firms"
  | "/about"
  | "/results"
  | "/faq"
  | "/contact"
  | "/terms"
  | "/privacy"
  | "/refund-policy";

export type Route =
  | StaticRoute
  | `/securities/${string}`
  | `/financial-planning/${string}`;

export type NavLink = {
  label: string;
  href: Route;
  /** One-line descriptor shown in the mega menu. */
  description?: string;
  /** Small tag, e.g. "Live group". */
  badge?: string;
};

export type ExternalLink = { label: string; href: string };

export type MegaMenuGroup = {
  id: string;
  label: string;
  /** Hub page for the group. */
  href: Route;
  description: string;
  /** Sub-sections inside the panel. */
  sections: { title: string; links: NavLink[] }[];
};

const toLink = (c: Course): NavLink => ({
  label: `${c.code}`,
  href: c.route as Route,
  description: c.name,
  badge: c.status === "live-group" ? "Live group" : undefined,
});

const bySlugs = (slugs: string[]): Course[] =>
  slugs
    .map((s) => courses.find((c) => c.slug === s))
    .filter((c): c is Course => c !== undefined);

export const megaMenu: MegaMenuGroup[] = [
  {
    id: "securities",
    label: "Securities & CIRO",
    href: "/securities",
    description: "Mutual funds, the CSC and CIRO proficiency exams.",
    sections: [
      {
        title: "Mutual funds & CSC",
        links: bySlugs(["ifc", "csc-1", "csc-2"]).map(toLink),
      },
      {
        title: "CIRO exams",
        links: bySlugs(["cire", "rse", "ise", "derivatives"]).map(toLink),
      },
      {
        title: "Oversight & leadership",
        links: bySlugs([
          "supervisor",
          "trader",
          "director-executive",
          "ciro-cco",
          "ciro-cfo",
        ]).map(toLink),
      },
      {
        title: "Professional",
        links: bySlugs(["exmp", "cph"]).map(toLink),
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    href: "/insurance",
    description: "Prepare for the Life Licence Qualification Program.",
    sections: [{ title: "Life licence", links: bySlugs(["llqp"]).map(toLink) }],
  },
  {
    id: "financial-planning",
    label: "Financial planning",
    href: "/financial-planning",
    description: "Wealth management and financial planning exams.",
    sections: [
      {
        title: "Planning exams",
        links: bySlugs(["wme", "fp1", "fp2", "afp"]).map(toLink),
      },
      {
        title: "Certifications",
        links: bySlugs(["cfp", "qafp"]).map((c) => ({
          ...toLink(c),
          badge: "Register interest",
        })),
      },
    ],
  },
  {
    id: "upcoming",
    label: "Upcoming",
    href: "/upcoming",
    description: "Practice tests, recorded courses, AI & Finance, CFA and more.",
    sections: [
      {
        title: "In development",
        links: [
          {
            label: "See what is coming",
            href: "/upcoming",
            description: "Planned programmes and how to hear first.",
          },
        ],
      },
    ],
  },
];

/** Simple top-level links beside the mega menu. */
export const primaryLinks: NavLink[] = [
  { label: "About", href: "/about" },
];

/** "Log in" to the learning app. */
export const studentLogin: ExternalLink = {
  label: "Log in",
  href: appUrl("login", { campaign: "header" }),
};

/** Primary header button: create an account in the learning app. */
export const headerSignup: ExternalLink = {
  label: "Sign up free",
  href: appUrl("signup", { campaign: "header" }),
};

export const headerCta: NavLink = {
  label: "Find my course",
  href: "/find-my-course",
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export type FooterColumn = {
  title: string;
  links: (NavLink | { label: string; href: string; external: true })[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Courses",
    links: [
      { label: "IFC", href: "/securities/ifc" },
      { label: "CSC Exam 1", href: "/securities/csc-1" },
      { label: "CSC Exam 2", href: "/securities/csc-2" },
      { label: "CIRE", href: "/securities/cire" },
      { label: "RSE", href: "/securities/rse" },
      { label: "LLQP", href: "/insurance/llqp" },
      { label: "All courses", href: "/courses" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Find my course", href: "/find-my-course" },
      { label: "Licensing pathways", href: "/licensing-pathways" },
          { label: "Schedule", href: "/schedule" },
      { label: "Free masterclass", href: "/masterclass" },
      { label: "Free diagnostic", href: "/free-diagnostic" },
      { label: "Upcoming programmes", href: "/upcoming" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Vipin", href: "/about" },
      { label: "Guarantee", href: "/guarantee" },
      { label: "Results", href: "/results" },
      { label: "For firms", href: "/for-firms" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      {
        label: "Log in",
        href: appUrl("login", { campaign: "footer" }),
        external: true,
      },
      {
        label: "Create account",
        href: appUrl("signup", { campaign: "footer" }),
        external: true,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Refund policy", href: "/refund-policy" },
    ],
  },
];
