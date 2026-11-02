/**
 * Career pathways, role → exam map, LLQP licensing steps and the exam finder.
 * Pathway wording follows the reference site. Always send learners to the
 * official requirements: accepted exams depend on role, employer and
 * approval category.
 */

import { getCourse } from "./courses";

/* ------------------------------------------------------------------ */
/* Career pathways (home + /licensing-pathways)                        */
/* ------------------------------------------------------------------ */

export type CareerPathway = {
  id: string;
  title: string;
  /** Course codes shown as chips. */
  courseCodes: string[];
  summary: string;
  /** Plain step chain, as in the reference site. */
  steps: string[];
  href: string;
  linkLabel: string;
};

/** The four areas shown on the home page. */
export const careerPathways: CareerPathway[] = [
  {
    id: "banking-mutual-funds",
    title: "Banking & mutual funds",
    courseCodes: ["IFC", "CSC"],
    summary:
      "IFC and CSC build the product and market knowledge used in banking and investment-service roles. The accepted proficiency and registration requirements depend on the role and employer.",
    steps: [
      "Review the role requirements",
      "Choose accepted education",
      "Complete any registration and employer requirements",
    ],
    href: "/securities/ifc",
    linkLabel: "Explore IFC coaching",
  },
  {
    id: "securities-investment-advice",
    title: "Securities & investment advice",
    courseCodes: ["CIRE", "RSE", "ISE"],
    summary:
      "Under CIRO's investment-dealer framework, exam requirements depend on the approval category and the business you intend to conduct. The CIRE, RSE, ISE and other role-specific exams serve different purposes.",
    steps: [
      "Identify the approval category",
      "Confirm applicable exams and prerequisites",
      "Complete dealer and regulatory requirements",
    ],
    href: "/securities",
    linkLabel: "Explore securities exams",
  },
  {
    id: "wealth-financial-planning",
    title: "Wealth & financial planning",
    courseCodes: ["WME", "FP1", "FP2", "AFP"],
    summary:
      "WME, FP1, FP2 and AFP are the planning courses. Designation pathways such as the PFP, CFP and QAFP have their own education, experience and exam requirements.",
    steps: [
      "Confirm your target designation",
      "Complete the required courses and exams",
      "Meet experience and professional requirements",
    ],
    href: "/financial-planning",
    linkLabel: "Explore planning exams",
  },
  {
    id: "insurance",
    title: "Insurance",
    courseCodes: ["LLQP"],
    summary:
      "LLQP preparation supports your understanding of insurance products, client needs and professional practice. Approved education, provider certification, provincial exams and licensing are distinct requirements.",
    steps: [
      "Complete approved education and certification",
      "Pass the applicable provincial exams",
      "Satisfy provincial licensing requirements",
    ],
    href: "/insurance/llqp",
    linkLabel: "Explore LLQP coaching",
  },
];

export type DesignationPathway = {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  officialUrl: string;
  officialLabel: string;
  /** Internal course slug to link, when we coach toward it. */
  courseSlug?: string;
};

/** Designations from the reference site's pathways page. */
export const designationPathways: DesignationPathway[] = [
  {
    id: "pfp",
    title: "PFP designation",
    summary:
      "The Personal Financial Planner pathway combines approved education, the AFP examinations and professional requirements. CSI specifies three years of relevant experience within the past seven years.",
    steps: [
      "Approved education",
      "AFP examinations",
      "Qualifying experience",
      "Application and professional obligations",
    ],
    officialUrl: "https://www.csi.ca/en/learning/courses/afp",
    officialLabel: "Official PFP requirements",
    courseSlug: "afp",
  },
  {
    id: "cim",
    title: "CIM designation",
    summary:
      "The Chartered Investment Manager pathway includes approved education and relevant experience. CSI specifies two years of relevant experience within five years. Portfolio-management registration has additional requirements.",
    steps: [
      "Approved education",
      "Relevant experience",
      "Application and ongoing professional obligations",
    ],
    // PLACEHOLDER: official CIM requirements URL — "https://www.csi.ca/en/learning/designations/cim"
    officialUrl: "https://www.csi.ca/en/learning/course-catalogue",
    officialLabel: "Official CIM requirements",
  },
  {
    id: "cfp-qafp",
    title: "CFP & QAFP certifications",
    summary:
      "FP Canada sets education, examination, experience and ethics requirements for each certification. Postsecondary requirements and exemptions depend on the applicable pathway.",
    steps: [
      "Confirm your pathway",
      "Complete required education and exam",
      "Meet experience, ethics and certification requirements",
    ],
    officialUrl: "https://www.fpcanada.ca",
    officialLabel: "Explore FP Canada requirements",
    courseSlug: "cfp",
  },
  {
    id: "cfa",
    title: "CFA charter",
    summary:
      "The CFA charter combines the CFA Program with qualifying work experience and membership requirements. Our CFA coaching is planned; programme levels and launch dates have not been announced.",
    steps: [
      "CFA Program",
      "Qualifying experience",
      "Membership and charter requirements",
    ],
    // PLACEHOLDER: official CFA requirements URL — "https://www.cfainstitute.org/programs/cfa-program"
    officialUrl: "https://www.cfainstitute.org",
    officialLabel: "Official CFA requirements",
  },
];

/* ------------------------------------------------------------------ */
/* Role → exam map                                                     */
/* ------------------------------------------------------------------ */

export type RoleId =
  | "mutual-fund-rep"
  | "banking"
  | "investment-rep"
  | "registered-rep"
  | "institutional-rep"
  | "life-agent"
  | "planner"
  | "supervisor"
  | "trader"
  | "executive";

export type RolePathway = {
  id: RoleId;
  /** Label for the "I want to be a…" selector. */
  label: string;
  /** Best first course (slug). */
  primary: string;
  /** Other courses on the same route, in study order after `primary`. */
  alsoConsider: string[];
  /** One plain-English sentence on how this role is reached. */
  explanation: string;
  /** Always shown. Requirements vary by employer and approval category. */
  caveat: string;
  officialUrl: string;
};

const ROLE_CAVEAT =
  "Accepted exams depend on your role, employer and approval category. Confirm them with the official organization before you pay for a course.";

// PLACEHOLDER: Vipin to confirm each role → exam mapping and study order — e.g. "Investment Representative: CSC → CIRE; Registered Representative (retail): CIRE → RSE"
export const rolePathways: RolePathway[] = [
  {
    id: "mutual-fund-rep",
    label: "Mutual fund representative",
    primary: "ifc",
    alsoConsider: ["csc-1", "csc-2"],
    explanation:
      "Mutual fund dealing roles use IFC knowledge, subject to registration and employer requirements.",
    caveat: ROLE_CAVEAT,
    officialUrl: "https://www.csi.ca/en/learning/courses/ifc/exam-credits",
  },
  {
    id: "banking",
    label: "Banking or investment-services associate",
    primary: "csc-1",
    alsoConsider: ["ifc", "csc-2"],
    explanation:
      "CSC and IFC give foundational market and product knowledge for banking and investment-service roles.",
    caveat: ROLE_CAVEAT,
    officialUrl: "https://www.csi.ca/en/learning/courses/csc/exam-credits",
  },
  {
    id: "investment-rep",
    label: "Investment representative (IR)",
    primary: "cire",
    alsoConsider: ["csc-1", "csc-2"],
    explanation:
      "The CIRE forms part of the applicable investment representative pathways under CIRO's investment-dealer framework.",
    caveat: ROLE_CAVEAT,
    officialUrl: "https://www.ciro.ca/registered-individuals/proficiency/exam-hub",
  },
  {
    id: "registered-rep",
    label: "Registered representative (retail)",
    primary: "cire",
    alsoConsider: ["rse"],
    explanation:
      "The CIRE and the RSE both appear on the retail Registered Representative pathway, alongside other approval requirements.",
    caveat: ROLE_CAVEAT,
    officialUrl: "https://www.ciro.ca/registered-individuals/proficiency/exam-hub",
  },
  {
    id: "institutional-rep",
    label: "Institutional representative",
    primary: "ise",
    alsoConsider: ["cire", "derivatives"],
    explanation:
      "The ISE covers institutional securities roles and applicable institutional representative pathways.",
    caveat: ROLE_CAVEAT,
    officialUrl: "https://www.ciro.ca/registered-individuals/proficiency/exam-hub",
  },
  {
    id: "life-agent",
    label: "Life insurance agent",
    primary: "llqp",
    alsoConsider: [],
    explanation:
      "Licensing combines approved education, provider certification, provincial exams and your provincial regulator's requirements. LLQP coaching helps you prepare.",
    caveat:
      "Licensing is set by your provincial insurance regulator. Confirm the steps for your province.",
    officialUrl: "https://www.csi.ca/en/learning/course-catalogue",
  },
  {
    id: "planner",
    label: "Financial planner",
    primary: "fp1",
    alsoConsider: ["wme", "fp2", "afp", "cfp", "qafp"],
    explanation:
      "Planning courses lead toward designations such as the PFP (through the AFP), CFP or QAFP. Each has its own education, experience and exam rules.",
    caveat:
      "CFP and QAFP coaching is not confirmed yet. Designation requirements are set by CSI and FP Canada.",
    officialUrl: "https://www.fpcanada.ca",
  },
  {
    id: "supervisor",
    label: "Supervisor or branch manager",
    primary: "supervisor",
    alsoConsider: ["rse"],
    explanation:
      "The Supervisor Exam covers investment-dealer supervision and oversight responsibilities.",
    caveat: ROLE_CAVEAT,
    officialUrl: "https://www.ciro.ca/registered-individuals/proficiency/exam-hub",
  },
  {
    id: "trader",
    label: "Trader",
    primary: "trader",
    alsoConsider: ["derivatives"],
    explanation:
      "The Trader Exam covers trading and trade-desk roles. The Derivatives Exam may also apply to your approval category.",
    caveat: ROLE_CAVEAT,
    officialUrl: "https://www.ciro.ca/registered-individuals/proficiency/exam-hub",
  },
  {
    id: "executive",
    label: "Director, executive, CCO or CFO",
    primary: "director-executive",
    alsoConsider: ["ciro-cco", "ciro-cfo"],
    explanation:
      "Separate CIRO exams cover directors and executives, chief compliance officers and chief financial officers.",
    caveat: ROLE_CAVEAT,
    officialUrl: "https://www.ciro.ca/registered-individuals/proficiency/exam-hub",
  },
];

export const getRole = (id: RoleId): RolePathway | undefined =>
  rolePathways.find((r) => r.id === id);

/* ------------------------------------------------------------------ */
/* LLQP licensing process (5 steps)                                    */
/* ------------------------------------------------------------------ */

export type LicensingStep = {
  step: number;
  title: string;
  description: string;
  /** True where Vipin's coaching fits. */
  coachingHelps: boolean;
  // PLACEHOLDER: typical time for this step — "2–4 weeks"
  typicalTime: string | null;
};

export const llqpSteps: LicensingStep[] = [
  {
    step: 1,
    title: "Choose your province",
    description:
      "Licensing rules come from your provincial insurance regulator. Check its requirements first, because they decide which education and exams apply to you.",
    coachingHelps: false,
    typicalTime: null,
  },
  {
    step: 2,
    title: "Complete approved LLQP education",
    description:
      "Take the LLQP education from an approved provider. This is separate from coaching. Coaching explains the same material live and helps it stick.",
    coachingHelps: true,
    typicalTime: null,
  },
  {
    step: 3,
    title: "Get your provider certification",
    description:
      "Your approved provider certifies that you completed the education. Provider certification is a separate requirement from provincial exams and licensing.",
    coachingHelps: false,
    typicalTime: null,
  },
  {
    step: 4,
    title: "Pass the provincial exams",
    description:
      "The LLQP is assessed in modules: life insurance, accident and sickness insurance, segregated funds and annuities, and ethics. Requirements depend on province and provider.",
    coachingHelps: true,
    typicalTime: null,
  },
  {
    step: 5,
    title: "Meet the regulator's licensing requirements",
    description:
      "Apply to your provincial insurance regulator and meet the other licensing requirements it sets.",
    coachingHelps: false,
    typicalTime: null,
  },
];

export type LlqpModule = {
  id: "life" | "accident-sickness" | "segregated-funds" | "ethics";
  name: string;
  summary: string;
};

/** Module matrix for /insurance/llqp (rows). */
export const llqpModules: LlqpModule[] = [
  {
    id: "life",
    name: "Life insurance",
    summary: "Life insurance products, needs and professional practice.",
  },
  {
    id: "accident-sickness",
    name: "Accident and sickness insurance",
    summary: "Accident and sickness (health) insurance products and client needs.",
  },
  {
    id: "segregated-funds",
    name: "Segregated funds and annuities",
    summary: "Segregated funds and annuities as insurance-based investments.",
  },
  {
    id: "ethics",
    name: "Ethics and professional practice",
    summary: "Professional conduct and ethical practice in insurance.",
  },
];

export type LlqpRegion = {
  id: "common-law" | "quebec";
  label: string;
  offered: boolean;
  note: string;
};

export const llqpRegions: LlqpRegion[] = [
  {
    id: "common-law",
    label: "Common Law provinces",
    offered: true,
    // PLACEHOLDER: confirm which provinces the LLQP coaching serves — "BC, Alberta, Ontario and the Atlantic provinces"
    note: "Live LLQP preparation is available. Confirm your province's licensing steps with your regulator.",
  },
  {
    id: "quebec",
    label: "Quebec",
    offered: false,
    note: "Quebec is not offered yet. Register your interest and we will tell you if that changes.",
  },
];

/* ------------------------------------------------------------------ */
/* Exam finder                                                         */
/* ------------------------------------------------------------------ */

export type FinderGoal = RoleId | "not-sure";
export type FinderProvince = "bc" | "ab" | "on" | "qc" | "other";
export type FinderTiming = "under-1-month" | "1-3-months" | "over-3-months" | "no-date";

export type FinderAnswers = {
  goal: FinderGoal;
  province: FinderProvince;
  timing: FinderTiming;
};

export type FinderOption<T extends string> = {
  value: T;
  label: string;
  hint?: string;
};

export type FinderQuestion =
  | { id: "goal"; prompt: string; options: FinderOption<FinderGoal>[] }
  | { id: "province"; prompt: string; options: FinderOption<FinderProvince>[] }
  | { id: "timing"; prompt: string; options: FinderOption<FinderTiming>[] };

export const finderQuestions: FinderQuestion[] = [
  {
    id: "goal",
    prompt: "What role are you aiming for?",
    options: [
      ...rolePathways.map((r) => ({ value: r.id as FinderGoal, label: r.label })),
      { value: "not-sure" as FinderGoal, label: "I’m not sure yet" },
    ],
  },
  {
    id: "province",
    prompt: "Where will you work or be licensed?",
    options: [
      { value: "bc", label: "British Columbia" },
      { value: "ab", label: "Alberta" },
      { value: "on", label: "Ontario" },
      { value: "qc", label: "Quebec" },
      { value: "other", label: "Another province or territory" },
    ],
  },
  {
    id: "timing",
    prompt: "When do you plan to take the exam?",
    options: [
      { value: "under-1-month", label: "Within a month" },
      { value: "1-3-months", label: "In 1 to 3 months" },
      { value: "over-3-months", label: "In more than 3 months" },
      { value: "no-date", label: "I haven’t booked a date" },
    ],
  },
];

export type FinderLink = { label: string; href: string };

export type Recommendation = {
  status: "match" | "unavailable" | "unsure";
  /** Primary course slug; null for unsure/unavailable. */
  primary: string | null;
  alsoConsider: string[];
  headline: string;
  reason: string;
  caveats: string[];
  /** Ordered next steps. First is the main CTA. */
  next: FinderLink[];
};

const TIMING_CAVEAT: Record<FinderTiming, string | null> = {
  "under-1-month":
    "With an exam inside a month, check the schedule now. Classes may not fit your date, so ask us what is realistic.",
  "1-3-months":
    "With 1 to 3 months to go, check the schedule for a class that finishes before your exam.",
  "over-3-months": null,
  "no-date":
    "Book your exam date with the official provider first. It helps you pick a class that finishes in time.",
};

/**
 * Pure recommendation logic for the finder. No side effects, safe on server
 * or client. Never invents dates or prices: next steps point to pages that
 * show an honest state when data is missing.
 */
export function recommendCourse(answers: FinderAnswers): Recommendation {
  const { goal, province, timing } = answers;
  const timingCaveat = TIMING_CAVEAT[timing];

  if (goal === "not-sure") {
    return {
      status: "unsure",
      primary: null,
      alsoConsider: [],
      headline: "Start with the licensing pathways",
      reason:
        "The right exam depends on the role, your employer and the approval category. The pathways page shows which exams lead to which roles.",
      caveats: timingCaveat ? [timingCaveat] : [],
      next: [
        { label: "See licensing pathways", href: "/licensing-pathways" },
        { label: "Join a free masterclass", href: "/masterclass" },
        { label: "Ask us a question", href: "/contact" },
      ],
    };
  }

  const role = getRole(goal);
  if (!role) {
    return recommendCourse({ ...answers, goal: "not-sure" });
  }

  // Quebec LLQP is not offered yet.
  if (goal === "life-agent" && province === "qc") {
    return {
      status: "unavailable",
      primary: null,
      alsoConsider: [],
      headline: "LLQP for Quebec is not offered yet",
      reason:
        "We do not offer Quebec preparation at the moment. Register your interest and we will tell you if that changes.",
      caveats: ["Confirm Quebec licensing requirements with your regulator."],
      next: [
        { label: "Register interest", href: "/insurance/llqp" },
        { label: "See licensing pathways", href: "/licensing-pathways" },
      ],
    };
  }

  const primary = getCourse(role.primary);
  const alsoConsider = role.alsoConsider.filter((slug) => getCourse(slug));
  const caveats = [role.caveat];
  if (timingCaveat) caveats.push(timingCaveat);

  const next: FinderLink[] = [];
  if (primary) next.push({ label: `View ${primary.code} course`, href: primary.route });
  next.push(
    timing === "under-1-month" || timing === "1-3-months"
      ? { label: "Check the schedule", href: "/schedule" }
      : { label: "Join a free masterclass", href: "/masterclass" },
  );
  next.push({ label: "Try the free diagnostic", href: "/free-diagnostic" });

  return {
    status: "match",
    primary: primary?.slug ?? null,
    alsoConsider,
    headline: primary
      ? `Start with ${primary.code}: ${primary.name}`
      : "See the licensing pathways",
    reason: role.explanation,
    caveats,
    next,
  };
}
