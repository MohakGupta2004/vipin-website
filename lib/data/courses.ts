/**
 * Course catalogue. Facts (topics, exam format, career use, official URLs) come
 * from the reference site's `course_data.py`. Coaching details that the client
 * has not confirmed (prices, cohorts, seats) are empty/null on purpose.
 *
 * Exam formats are as stated in the reference site. They should be checked
 * against the official provider pages before launch (see officialUrl).
 */

export type CourseArea = "securities" | "insurance" | "financial-planning";
export type CourseStatus = "live-group" | "coaching" | "upcoming";
/** Study-area label used for catalogue filters (from the reference site). */
export type CourseCategory =
  | "Mutual funds"
  | "Securities"
  | "CIRO"
  | "Insurance"
  | "Planning & wealth"
  | "Professional";

export type CourseFaq = { question: string; answer: string };

export type ExamFormat = {
  /** e.g. "100 multiple-choice questions". Null when not confirmed. */
  questions: string | null;
  /** e.g. "3 hours". Null when not confirmed. */
  duration: string | null;
  notes?: string;
};

export type PriceTier = {
  id: "live" | "on-demand";
  label: string;
  description: string;
  /** CAD, whole dollars. Null = not announced. */
  price: number | null;
  /** False = tier is not offered yet (shown as "coming soon"). */
  available: boolean;
};

export type Cohort = {
  id: string;
  /** ISO date, e.g. 2027-01-12 */
  startDate: string;
  endDate?: string;
  /** e.g. "Tuesdays and Thursdays, 6–8 pm PT" */
  schedule: string;
  seatsTotal?: number;
  seatsLeft?: number;
  /** Tier ids this cohort includes. */
  tiers?: PriceTier["id"][];
};

export type Ciro2026Note = {
  text: string;
  linkLabel: string;
  href: string;
};

export type Course = {
  slug: string;
  code: string;
  name: string;
  area: CourseArea;
  category: CourseCategory;
  /** Canonical route (PLAN §3). */
  route: string;
  status: CourseStatus;
  /** False = shown, but the client still has to confirm they offer it. */
  offerConfirmed: boolean;
  tagline: string;
  /** One-sentence card description (reference site wording). */
  blurb: string | null;
  /** 40–60 words, answer-first, for GEO/AI answer engines. */
  summary: string;
  whoFor: string[];
  /** Syllabus overview. Not the complete examinable content. */
  topics: string[];
  examFormat: ExamFormat;
  officialUrl: string;
  /** Where the knowledge applies (reference site wording). */
  careerUse: string;
  ciro2026Note?: Ciro2026Note;
  /** Whether original practice tests are planned for this course (zip). */
  practiceTests: "in-development" | "not-planned-yet";
  faqs: CourseFaq[];
  /** Cross-sell slugs ("Taking RSE next?"). */
  siblings: string[];
  seo: {
    /** Without the " | Vipin Garg" suffix. Max 47 chars so full title ≤ 60. */
    title: string;
    /** 140–160 characters. */
    description: string;
    primaryKeyword: string;
  };
  // PLACEHOLDER: real cohorts (start date, schedule, seats) per course — { id: "cire-2027-01", startDate: "2027-01-12", schedule: "Tue/Thu 6–8 pm PT", seatsTotal: 25, seatsLeft: 9 }
  cohorts: Cohort[];
  pricing: { currency: "CAD"; tiers: PriceTier[] };
  /** ISO date this page's facts were last checked. */
  lastReviewed: string;
};

export type UpcomingProgram = {
  slug: string;
  name: string;
  kind: "practice-tools" | "recorded" | "new-programme";
  status: "upcoming";
  summary: string;
  /** Course slugs this relates to. */
  relatedCourses: string[];
  // PLACEHOLDER: launch date or quarter per programme — "Q2 2027"
  launch: string | null;
  seo: { title: string; description: string };
};

/* ------------------------------------------------------------------ */
/* Shared constants and helpers                                        */
/* ------------------------------------------------------------------ */

export const LAST_REVIEWED = "2026-11-02";
export const CIRO_EXAM_HUB =
  "https://www.ciro.ca/registered-individuals/proficiency/exam-hub";
const FP_CANADA = "https://www.fpcanada.ca";

const ciro2026: Ciro2026Note = {
  text: "CIRO introduced a new investment-dealer proficiency model in 2026. Confirm whether this CSI course is required for your specific pathway or whether you need CIRO examinations.",
  linkLabel: "Check CIRO requirements",
  href: CIRO_EXAM_HUB,
};

function pricing(): Course["pricing"] {
  // PLACEHOLDER: coaching fee per tier in CAD — Live and On-demand fees (client sets real prices)
  return {
    currency: "CAD",
    tiers: [
      {
        id: "live",
        label: "Live",
        description: "Live online classes with Vipin Garg.",
        price: null,
        available: true,
      },
      {
        id: "on-demand",
        label: "On-demand",
        description:
          "Study on your own schedule with on-demand lessons. Your offer confirms what is included.",
        price: null,
        available: true,
      },
    ],
  };
}

const faq = (question: string, answer: string): CourseFaq => ({
  question,
  answer,
});

const REGISTRATION_ANSWER =
  "Coaching and official registration are separate. Register with the relevant provider and confirm its requirements. An official registration or exam fee is included only if expressly stated in your coaching offer.";

const registrationFaq = (code: string): CourseFaq =>
  faq(`Is official ${code} registration included in the coaching fee?`, REGISTRATION_ANSWER);

const PRACTICE_ANSWER =
  "Dedicated practice tests and simulations are being developed first for IFC, CSC Exam 1, CSC Exam 2 and CIRE. They are not yet included across all programmes.";

const INCLUDES_ANSWER =
  "Your coaching offer will confirm the teaching sessions, schedule, available materials, support period and total fee. Resources vary by programme.";

const includesFaq = (code: string): CourseFaq =>
  faq(`What does ${code} coaching include?`, INCLUDES_ANSWER);

const practiceFaq = (code: string): CourseFaq =>
  faq(`Are practice tests included with ${code} coaching?`, PRACTICE_ANSWER);

/** Generated FAQs for coaching-only courses (facts come from the course itself). */
function coachingFaqs(
  c: Pick<Course, "code" | "topics" | "examFormat">,
): CourseFaq[] {
  const out: CourseFaq[] = [];
  if (c.examFormat.questions && c.examFormat.duration) {
    out.push(
      faq(
        `What is the ${c.code} exam format?`,
        `${c.examFormat.questions}, ${c.examFormat.duration}. ${c.examFormat.notes ?? ""}`.trim(),
      ),
    );
  }
  if (c.topics.length) {
    out.push(
      faq(
        `What topics does the ${c.code} cover?`,
        `${c.topics.join(", ")}. This is an overview. The official provider's syllabus lists the complete examinable content.`,
      ),
    );
  }
  out.push(includesFaq(c.code), registrationFaq(c.code));
  return out;
}

/* ------------------------------------------------------------------ */
/* Courses                                                             */
/* ------------------------------------------------------------------ */

const ifc: Course = {
  slug: "ifc",
  code: "IFC",
  name: "Investment Funds in Canada",
  area: "securities",
  category: "Mutual funds",
  route: "/securities/ifc",
  status: "live-group",
  offerConfirmed: true,
  tagline: "Understand mutual funds. Start with the client.",
  blurb: "Build a practical understanding of mutual funds, investment products and the responsibilities involved in serving clients.",
  summary:
    "The IFC (Investment Funds in Canada) is a CSI course and exam on mutual funds. It covers the mutual fund marketplace, knowing your client, investment products and portfolios, fund analysis and selection, and ethics and suitability. The exam has 100 multiple-choice questions and lasts 3 hours. Vipin Garg teaches IFC in live online group classes.",
  whoFor: [
    "Learners preparing for the IFC examination, including those exploring mutual fund and banking roles.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Mutual fund marketplace",
    "Knowing your client",
    "Investment products and portfolios",
    "Fund analysis and selection",
    "Ethics and suitability",
  ],
  examFormat: { questions: "100 multiple-choice questions", duration: "3 hours" },
  officialUrl: "https://www.csi.ca/en/learning/courses/ifc/exam-credits",
  careerUse:
    "The subject matter is relevant to mutual fund dealing and client-service roles in banking and investment services. Confirm the accepted proficiency and registration requirements with your intended employer.",
  practiceTests: "in-development",
  faqs: [
    faq(
      "What is the IFC exam?",
      "The IFC is the exam for the Investment Funds in Canada course from CSI. It tests your understanding of mutual funds, client needs, fund selection, ethics and suitability.",
    ),
    faq(
      "How many questions are on the IFC exam, and how long is it?",
      "The IFC exam has 100 multiple-choice questions and lasts 3 hours. That is about 1 minute 48 seconds per question.",
    ),
    includesFaq("IFC"),
    registrationFaq("IFC"),
    practiceFaq("IFC"),
  ],
  siblings: ["csc-1", "csc-2"],
  seo: {
    title: "IFC Course Canada: Live Online Exam Prep",
    description:
      "Prepare for the IFC exam with live online classes taught by Vipin Garg. See the topics, the 100-question exam format and the next steps to enroll.",
    primaryKeyword: "IFC course Canada",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const csc1: Course = {
  slug: "csc-1",
  code: "CSC 1",
  name: "Canadian Securities Course — Exam 1",
  area: "securities",
  category: "Securities",
  route: "/securities/csc-1",
  status: "live-group",
  offerConfirmed: true,
  tagline: "Make sense of the markets, one concept at a time.",
  blurb: "Develop the market, economic and product knowledge examined in the first part of the Canadian Securities Course.",
  summary:
    "CSC Exam 1 is the first of two exams in the Canadian Securities Course (CSC), a CSI course. It covers Canadian financial markets, economics, fixed income and equities, derivatives and financial statements. The exam has 100 multiple-choice questions and lasts 2 hours. Vipin Garg teaches CSC Exam 1 in live online group classes.",
  whoFor: [
    "Learners beginning the CSC or seeking a structured foundation in Canadian securities markets.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Canadian financial markets",
    "Economics",
    "Fixed income and equities",
    "Derivatives",
    "Financial statements",
  ],
  examFormat: { questions: "100 multiple-choice questions", duration: "2 hours" },
  officialUrl: "https://www.csi.ca/en/learning/courses/csc/exam-credits",
  careerUse:
    "Exam 1 develops market and product knowledge relevant to banking, investment services and further financial education. It is the first of the two examinations required to complete the CSC.",
  ciro2026Note: ciro2026,
  practiceTests: "in-development",
  faqs: [
    faq(
      "What is CSC Exam 1?",
      "CSC Exam 1 is the first of the two exams that make up the Canadian Securities Course. It tests Canadian financial markets, economics, fixed income and equities, derivatives and financial statements.",
    ),
    faq(
      "How many questions are on CSC Exam 1, and how long is it?",
      "CSC Exam 1 has 100 multiple-choice questions and lasts 2 hours. That is 1 minute 12 seconds per question.",
    ),
    faq(
      "Do I need both CSC exams?",
      "Both exams are needed to complete the CSC. Exam 1 covers markets, economics and products. Exam 2 covers investment analysis, portfolios, taxation and client relationships.",
    ),
    faq(
      "Is the CSC still required for investment-dealer roles?",
      "It depends on your role and employer. CIRO introduced a new investment-dealer proficiency model in 2026, so confirm whether the CSC or a CIRO exam applies to your pathway before you enroll.",
    ),
    registrationFaq("CSC"),
  ],
  siblings: ["csc-2", "ifc", "cire"],
  seo: {
    title: "CSC Exam 1 Prep: Live Online Classes",
    description:
      "Live CSC Exam 1 classes online with Vipin Garg. Study markets, economics, fixed income, equities and derivatives, and see the 100-question exam format.",
    primaryKeyword: "CSC exam 1 prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const csc2: Course = {
  slug: "csc-2",
  code: "CSC 2",
  name: "Canadian Securities Course — Exam 2",
  area: "securities",
  category: "Securities",
  route: "/securities/csc-2",
  status: "live-group",
  offerConfirmed: true,
  tagline: "Turn investment knowledge into a broader perspective.",
  blurb: "Apply investment knowledge to portfolio analysis, managed products, taxation and client relationships.",
  summary:
    "CSC Exam 2 is the second exam in the Canadian Securities Course (CSC), a CSI course. It covers investment analysis, portfolio analysis, mutual funds and ETFs, alternative investments, taxation and client relationships. The exam has 100 multiple-choice questions and lasts 2 hours. Vipin Garg teaches CSC Exam 2 in live online group classes.",
  whoFor: [
    "Learners preparing for the second CSC examination and developing their understanding of investment analysis.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Investment analysis",
    "Portfolio analysis",
    "Mutual funds and ETFs",
    "Alternative investments",
    "Taxation and client relationships",
  ],
  examFormat: { questions: "100 multiple-choice questions", duration: "2 hours" },
  officialUrl: "https://www.csi.ca/en/learning/courses/csc/exam-credits",
  careerUse:
    "Exam 2 develops the analytical and client-focused knowledge used in investment and wealth-management settings. Both examinations are required to complete the CSC; the qualification requirements for a particular role must be checked separately.",
  ciro2026Note: ciro2026,
  practiceTests: "in-development",
  faqs: [
    faq(
      "What is CSC Exam 2?",
      "CSC Exam 2 is the second exam in the Canadian Securities Course. It tests investment analysis, portfolio analysis, mutual funds and ETFs, alternative investments, taxation and client relationships.",
    ),
    faq(
      "How many questions are on CSC Exam 2, and how long is it?",
      "CSC Exam 2 has 100 multiple-choice questions and lasts 2 hours.",
    ),
    faq(
      "Should I study CSC Exam 1 before Exam 2?",
      "Both exams are needed to complete the CSC. Exam 1 covers markets, economics and products. Exam 2 covers analysis, portfolios, taxation and clients. Confirm any sequencing rules with CSI.",
    ),
    faq(
      "Is the CSC still required for investment-dealer roles?",
      "It depends on your role and employer. CIRO introduced a new investment-dealer proficiency model in 2026, so confirm whether the CSC or a CIRO exam applies to your pathway before you enroll.",
    ),
    registrationFaq("CSC"),
  ],
  siblings: ["csc-1", "wme", "cire"],
  seo: {
    title: "CSC Exam 2 Prep: Live Online Classes",
    description:
      "Live CSC Exam 2 classes online with Vipin Garg. Cover investment and portfolio analysis, ETFs, alternatives and taxation, and see the exam format.",
    primaryKeyword: "CSC exam 2 prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const cire: Course = {
  slug: "cire",
  code: "CIRE",
  name: "Canadian Investment Regulatory Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/cire",
  status: "live-group",
  offerConfirmed: true,
  tagline: "Build a strong foundation in Canadian securities regulation.",
  blurb: "Study the Canadian regulatory framework, professional conduct and core investment knowledge in the CIRE syllabus.",
  summary:
    "The CIRE (Canadian Investment Regulatory Exam) is a CIRO proficiency exam on securities regulation and professional conduct. It covers the regulatory framework, client relationships, complaints and ethics, investment products, and trade execution and market integrity. The exam has 110 multiple-choice questions and lasts 2 hours. Vipin Garg teaches the CIRE in live online group classes.",
  whoFor: [
    "Candidates preparing for the CIRE under CIRO’s investment-dealer proficiency framework.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Regulatory framework",
    "Client relationships",
    "Complaints and ethics",
    "Investment products",
    "Trade execution and market integrity",
  ],
  examFormat: { questions: "110 multiple-choice questions", duration: "2 hours" },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "The CIRE forms part of applicable investment representative and registered representative pathways under CIRO’s investment-dealer framework. The complete route depends on the approval category, applicable exemptions and dealer requirements.",
  practiceTests: "in-development",
  faqs: [
    faq(
      "What is the CIRE exam?",
      "The CIRE is a CIRO proficiency exam. It tests the Canadian regulatory framework, client relationships, complaints and ethics, investment products, and trade execution and market integrity.",
    ),
    faq(
      "How many questions are on the CIRE, and how long is it?",
      "The CIRE has 110 multiple-choice questions and lasts 2 hours. That is about 65 seconds per question.",
    ),
    faq(
      "CIRE vs RSE: which one do I need?",
      "The CIRE forms part of applicable investment representative and registered representative pathways. The RSE is the retail Registered Representative exam. Which you need depends on your approval category, exemptions and dealer requirements, so confirm with CIRO and your employer.",
    ),
    registrationFaq("CIRE"),
    practiceFaq("CIRE"),
  ],
  siblings: ["rse", "ise", "derivatives"],
  seo: {
    title: "CIRE Exam Prep: Live Online Classes",
    description:
      "Prepare for the CIRO CIRE exam with live online classes taught by Vipin Garg. See the topics, the 110-question format and how the CIRE fits your pathway.",
    primaryKeyword: "CIRE exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const rse: Course = {
  slug: "rse",
  code: "RSE",
  name: "Retail Securities Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/rse",
  status: "live-group",
  offerConfirmed: true,
  tagline: "Connect investment decisions with real client needs.",
  blurb: "Prepare for the retail securities syllabus, from client assessment and suitability to portfolio construction and recommendations.",
  summary:
    "The RSE (Retail Securities Exam) is a CIRO proficiency exam for the retail Registered Representative pathway. It covers KYC and suitability, fixed income and equities, securities analysis, portfolio construction, and recommendations and monitoring. The exam has 120 multiple-choice questions and lasts 3 hours. Vipin Garg teaches the RSE in live online group classes.",
  whoFor: [
    "Candidates preparing for the RSE as part of an applicable retail securities approval pathway.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "KYC and suitability",
    "Fixed income and equities",
    "Securities analysis",
    "Portfolio construction",
    "Recommendations and monitoring",
  ],
  examFormat: { questions: "120 multiple-choice questions", duration: "3 hours" },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "The RSE is relevant to the retail registered representative pathway. Its subject matter connects securities knowledge with client assessment, suitability and investment recommendations. Additional proficiency and approval requirements apply.",
  practiceTests: "not-planned-yet",
  faqs: [
    faq(
      "What is the RSE exam?",
      "The RSE is a CIRO proficiency exam for the retail Registered Representative pathway. It tests KYC and suitability, fixed income and equities, securities analysis, portfolio construction, and recommendations and monitoring.",
    ),
    faq(
      "How many questions are on the RSE, and how long is it?",
      "The RSE has 120 multiple-choice questions and lasts 3 hours. That is 1 minute 30 seconds per question.",
    ),
    faq(
      "Do I need the CIRE before the RSE?",
      "The CIRE and RSE both appear on applicable CIRO pathways. The order and prerequisites depend on your approval category, so confirm them with CIRO and your dealer before you book.",
    ),
    registrationFaq("RSE"),
    practiceFaq("RSE"),
  ],
  siblings: ["cire", "ise", "supervisor"],
  seo: {
    title: "RSE Exam Prep: Live Online Classes",
    description:
      "Live RSE exam prep with Vipin Garg. Cover KYC, suitability, securities analysis and portfolio construction, and see the 120-question CIRO exam format.",
    primaryKeyword: "RSE exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const llqp: Course = {
  slug: "llqp",
  code: "LLQP",
  name: "Life Licence Qualification Program Preparation",
  area: "insurance",
  category: "Insurance",
  route: "/insurance/llqp",
  status: "live-group",
  offerConfirmed: true,
  tagline: "Understand protection. Prepare to serve with confidence.",
  blurb: "Prepare for the life insurance, accident and sickness, segregated funds and ethics components of the LLQP.",
  summary:
    "The LLQP (Life Licence Qualification Program) is the education and examination route to a life insurance licence in Canada. Preparation covers life insurance, accident and sickness insurance, segregated funds and annuities, ethics and professional practice, and client needs. Approved education, certification, provincial exams and licensing are separate. Vipin Garg teaches LLQP preparation in live online classes.",
  whoFor: [
    "Learners preparing for LLQP assessments alongside their approved provider’s education and certification requirements.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Life insurance",
    "Accident and sickness insurance",
    "Segregated funds and annuities",
    "Ethics and professional practice",
    "Client needs",
  ],
  examFormat: {
    questions: "Modular examinations",
    duration: "Requirements depend on province and provider",
    notes:
      "Confirm exam format and provincial requirements with your approved education provider and insurance regulator.",
  },
  officialUrl: "https://www.csi.ca/en/learning/course-catalogue",
  careerUse:
    "LLQP knowledge supports preparation for life and health insurance careers. Becoming licensed involves approved education, provider certification, applicable provincial examinations and the requirements of the provincial insurance regulator.",
  practiceTests: "not-planned-yet",
  faqs: [
    faq(
      "What is the LLQP?",
      "The LLQP is the Life Licence Qualification Program. It prepares you for a life insurance licence by covering life insurance, accident and sickness insurance, segregated funds and annuities, and ethics.",
    ),
    faq(
      "Does LLQP coaching make me licensed?",
      "No. Becoming licensed involves approved education, provider certification, applicable provincial examinations and the requirements of your provincial insurance regulator. Coaching supports your understanding of the material.",
    ),
    faq(
      "Do you teach LLQP for Quebec?",
      "Not yet. Quebec is not offered at the moment. Register your interest and we will tell you if that changes.",
    ),
    includesFaq("LLQP"),
    registrationFaq("LLQP"),
  ],
  siblings: ["ifc", "wme"],
  seo: {
    title: "LLQP Exam Prep: Live Online Classes",
    description:
      "Prepare for the LLQP with live online classes by Vipin Garg. Cover life, accident and sickness, segregated funds and ethics, and see how licensing works.",
    primaryKeyword: "LLQP exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const ise: Course = {
  slug: "ise",
  code: "ISE",
  name: "Institutional Securities Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/ise",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Understand securities in an institutional setting.",
  blurb: "Explore institutional client relationships, securities products, execution and the obligations of institutional representatives.",
  summary:
    "The ISE (Institutional Securities Exam) is a CIRO proficiency exam for institutional securities roles. It covers institutional client relationships, fixed income and equities, investment theory, managed products, and execution and market integrity. The exam has 100 multiple-choice questions and lasts 2.5 hours. Vipin Garg offers exam coaching for the ISE.",
  whoFor: [
    "Candidates pursuing an institutional securities role that requires the ISE.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Institutional client relationships",
    "Fixed income and equities",
    "Investment theory",
    "Managed products",
    "Execution and market integrity",
  ],
  examFormat: { questions: "100 multiple-choice questions", duration: "2.5 hours" },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "The ISE is relevant to applicable institutional representative pathways. Its subject matter supports work involving institutional clients, securities products and market execution within an investment dealer.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["cire", "rse", "derivatives"],
  seo: {
    title: "ISE Exam Prep: CIRO Institutional Securities",
    description:
      "Exam coaching for the CIRO Institutional Securities Exam (ISE) with Vipin Garg. See the topics, the 100-question format and who needs this exam.",
    primaryKeyword: "ISE exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const derivatives: Course = {
  slug: "derivatives",
  code: "Derivatives",
  name: "Derivatives Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/derivatives",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Connect pricing, products and strategies.",
  blurb: "Work through derivative products, pricing, trading and risk, connecting contract mechanics to hedging and investment strategies.",
  summary:
    "The Derivatives Exam is a CIRO proficiency exam for roles that involve derivatives. It covers derivative features, pricing, trading and settlement, hedging and speculation, and client obligations. The exam has 120 multiple-choice questions and lasts 3 hours. Whether you need it depends on your approval category. Vipin Garg offers exam coaching for the Derivatives Exam.",
  whoFor: [
    "Candidates whose intended investment-dealer role requires the CIRO Derivatives Exam.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Derivative features",
    "Pricing",
    "Trading and settlement",
    "Hedging and speculation",
    "Client obligations",
  ],
  examFormat: { questions: "120 multiple-choice questions", duration: "3 hours" },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "This examination is relevant to approval categories involving derivatives. The underlying knowledge supports an understanding of product risk, trading mechanics, hedging and client obligations.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["cire", "ise", "trader"],
  seo: {
    title: "CIRO Derivatives Exam Prep Coaching",
    description:
      "Exam coaching for the CIRO Derivatives Exam with Vipin Garg. Study pricing, trading, hedging and client obligations, and see the 120-question format.",
    primaryKeyword: "CIRO derivatives exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const supervisor: Course = {
  slug: "supervisor",
  code: "Supervisor",
  name: "Supervisor Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/supervisor",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Build the judgment behind effective oversight.",
  blurb: "Develop your understanding of supervisory responsibilities, account oversight, communications and trading controls.",
  summary:
    "The Supervisor Exam is a CIRO proficiency exam for investment-dealer supervision and oversight roles. It covers supervisory structures, account approvals, account activity, trading rules, and communications and risk. The exam has 90 questions, 60 standard and 30 item-set, and lasts 3 hours. Vipin Garg offers exam coaching for the Supervisor Exam.",
  whoFor: [
    "Candidates preparing for supervisory responsibilities and the applicable CIRO examination.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Supervisory structures",
    "Account approvals",
    "Account activity",
    "Trading rules",
    "Communications and risk",
  ],
  examFormat: {
    questions: "90 questions: 60 standard and 30 item-set",
    duration: "3 hours",
  },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "The examination addresses knowledge relevant to supervisory responsibilities at investment dealers. This includes oversight of accounts, trading activity, communications and internal controls.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["director-executive", "ciro-cco", "rse"],
  seo: {
    title: "CIRO Supervisor Exam Prep Coaching",
    description:
      "Exam coaching for the CIRO Supervisor Exam with Vipin Garg. Cover account approvals, trading rules, communications and risk, and see the 90-question format.",
    primaryKeyword: "CIRO supervisor exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const trader: Course = {
  slug: "trader",
  code: "Trader",
  name: "Trader Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/trader",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Understand the decisions behind every trade.",
  blurb: "Study market structure, order execution and trading obligations, with attention to the rules governing trading activity.",
  summary:
    "The Trader Exam is a CIRO proficiency exam for trading and trade-desk roles. It covers marketplaces, execution methods, trading rules, desk operations, and clearing and settlement. The exam has 100 multiple-choice questions and lasts 2 hours. Vipin Garg offers exam coaching for the Trader Exam.",
  whoFor: [
    "Candidates preparing for the CIRO Trader Exam and roles involving trade execution.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Marketplaces",
    "Execution methods",
    "Trading rules",
    "Desk operations",
    "Clearing and settlement",
  ],
  examFormat: { questions: "100 multiple-choice questions", duration: "2 hours" },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "The examination is relevant to applicable trading approval requirements. Its subject matter supports work involving order handling, execution, marketplace rules and trading-desk responsibilities.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["derivatives", "ise", "supervisor"],
  seo: {
    title: "CIRO Trader Exam Prep Coaching",
    description:
      "Exam coaching for the CIRO Trader Exam with Vipin Garg. Study marketplaces, execution methods, trading rules and settlement, and see the exam format.",
    primaryKeyword: "CIRO trader exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const directorExecutive: Course = {
  slug: "director-executive",
  code: "Director & Executive",
  name: "Director and Executive Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/director-executive",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Prepare for the responsibilities of leadership.",
  blurb: "Examine governance, accountability and risk oversight in the context of investment-dealer leadership.",
  summary:
    "The Director and Executive Exam is a CIRO proficiency exam for director, executive and senior oversight roles within investment dealers. It covers governance and ethics, dealer business models, duties and liabilities, internal controls, and risk management. The exam has 75 questions, 50 standard and 25 item-set, and lasts 2.5 hours. Vipin Garg offers exam coaching for it.",
  whoFor: [
    "Candidates preparing for investment-dealer director or executive responsibilities.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Governance and ethics",
    "Dealer business models",
    "Duties and liabilities",
    "Internal controls",
    "Risk management",
  ],
  examFormat: {
    questions: "75 questions: 50 standard and 25 item-set",
    duration: "2.5 hours",
  },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "The examination addresses responsibilities associated with investment-dealer directors and executives. It connects governance, risk management and accountability to the oversight of a regulated business.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["supervisor", "ciro-cco", "ciro-cfo"],
  seo: {
    title: "CIRO Director & Executive Exam Prep",
    description:
      "Exam coaching for the CIRO Director and Executive Exam with Vipin Garg. Cover governance, duties, internal controls and risk, plus the 75-question format.",
    primaryKeyword: "CIRO director and executive exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const cirocco: Course = {
  slug: "ciro-cco",
  code: "CIRO CCO",
  name: "Chief Compliance Officer Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/ciro-cco",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Bring clarity to compliance leadership.",
  blurb: "Prepare for compliance leadership topics, including governance, internal controls, regulatory obligations and compliance risk.",
  summary:
    "The CIRO Chief Compliance Officer (CCO) Exam is a proficiency exam for senior compliance roles at investment dealers. It covers compliance operations, governance, regulatory reporting, internal controls and compliance risks. The exam has 90 questions, 60 standard and 30 item-set, and lasts 3 hours. Vipin Garg offers exam coaching for the CIRO CCO Exam.",
  whoFor: [
    "Candidates preparing for CIRO chief compliance officer responsibilities.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Compliance operations",
    "Governance",
    "Regulatory reporting",
    "Internal controls",
    "Compliance risks",
  ],
  examFormat: {
    questions: "90 questions: 60 standard and 30 item-set",
    duration: "3 hours",
  },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "The examination addresses the knowledge relevant to chief compliance officer responsibilities within the CIRO framework. Its focus is the organization and oversight of a dealer’s compliance function.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["supervisor", "director-executive", "ciro-cfo"],
  seo: {
    title: "CIRO CCO Exam Prep Coaching",
    description:
      "Exam coaching for the CIRO Chief Compliance Officer Exam with Vipin Garg. Study governance, reporting, controls and compliance risk, and the exam format.",
    primaryKeyword: "CIRO CCO exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const cirocfo: Course = {
  slug: "ciro-cfo",
  code: "CIRO CFO",
  name: "Chief Financial Officer Exam",
  area: "securities",
  category: "CIRO",
  route: "/securities/ciro-cfo",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Understand the financial controls that protect a dealer.",
  blurb: "Study the financial controls, reporting obligations and capital requirements relevant to an investment-dealer CFO.",
  summary:
    "The CIRO Chief Financial Officer (CFO) Exam is a proficiency exam for senior financial-control roles at investment dealers. It covers capital adequacy, financial records, reporting, credit risk and protection of assets. The exam has 90 questions, 60 standard and 30 item-set, and lasts 3 hours. Vipin Garg offers exam coaching for the CIRO CFO Exam.",
  whoFor: [
    "Candidates preparing for CIRO chief financial officer responsibilities.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Capital adequacy",
    "Financial records",
    "Reporting",
    "Credit risk",
    "Protection of assets",
  ],
  examFormat: {
    questions: "90 questions: 60 standard and 30 item-set",
    duration: "3 hours",
  },
  officialUrl: CIRO_EXAM_HUB,
  careerUse:
    "The examination addresses the knowledge relevant to chief financial officer responsibilities within the CIRO framework. Its focus includes financial reporting, capital adequacy, risk and the protection of assets.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["ciro-cco", "director-executive", "supervisor"],
  seo: {
    title: "CIRO CFO Exam Prep Coaching",
    description:
      "Exam coaching for the CIRO Chief Financial Officer Exam with Vipin Garg. Cover capital adequacy, reporting, credit risk and asset protection.",
    primaryKeyword: "CIRO CFO exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const exmp: Course = {
  slug: "exmp",
  code: "EXMP",
  name: "Exempt Market Proficiency",
  area: "securities",
  category: "Professional",
  route: "/securities/exmp",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Understand private markets and professional responsibilities.",
  blurb: "Study exempt-market products, private placements and the professional responsibilities involved in assessing client suitability.",
  summary:
    "Exempt Market Proficiency (EXMP) is a CSI course on private markets and the professional responsibilities that come with them. It covers capital markets, private placements, issuer structures, investment risks, and KYC and suitability. The exam has 100 multiple-choice questions and lasts 3 hours. Vipin Garg offers exam coaching for EXMP.",
  whoFor: [
    "Learners preparing for the EXMP examination and exploring exempt-market responsibilities.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Capital markets",
    "Private placements",
    "Issuer structures",
    "Investment risks",
    "KYC and suitability",
  ],
  examFormat: { questions: "100 multiple-choice questions", duration: "3 hours" },
  officialUrl: "https://www.csi.ca/en/learning/courses/exmp/exam-credits",
  careerUse:
    "EXMP subject matter is relevant to exempt-market dealing and related responsibilities. Registration requirements depend on the intended role and applicable regulatory framework.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["csc-2", "wme"],
  seo: {
    title: "EXMP Exam Prep: Exempt Market Proficiency",
    description:
      "Exam coaching for Exempt Market Proficiency (EXMP) with Vipin Garg. Study private placements, issuer structures and suitability, plus the exam format.",
    primaryKeyword: "EXMP exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const cph: Course = {
  slug: "cph",
  code: "CPH",
  name: "Conduct and Practices Handbook",
  area: "securities",
  category: "Professional",
  route: "/securities/cph",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Put professional judgment into practice.",
  blurb: "Examine professional conduct, regulatory responsibilities and the ethical decisions involved in client relationships.",
  summary:
    "The Conduct and Practices Handbook (CPH) is a CSI course on ethical conduct and professional responsibilities in the securities industry. It covers ethical conduct, regulation, account opening, product due diligence and client relationships. The exam has 100 multiple-choice questions and lasts 3 hours. Vipin Garg offers CPH coaching for learners whose pathway requires it.",
  whoFor: [
    "Learners whose existing education, employer or transition pathway specifically requires the CPH.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Ethical conduct",
    "Regulation",
    "Account opening",
    "Product due diligence",
    "Client relationships",
  ],
  examFormat: { questions: "100 multiple-choice questions", duration: "3 hours" },
  officialUrl: "https://www.csi.ca/en/learning/courses/cph/exam-credits",
  careerUse:
    "CPH provides knowledge of ethical conduct and professional responsibilities in the securities industry. Coaching is intended for learners whose specific education, employer or transition pathway requires this course.",
  ciro2026Note: ciro2026,
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["csc-1", "cire"],
  seo: {
    title: "CPH Exam Prep: Conduct and Practices Handbook",
    description:
      "Exam coaching for the Conduct and Practices Handbook (CPH) with Vipin Garg. Cover ethics, regulation, account opening and due diligence, plus the format.",
    primaryKeyword: "CPH exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const wme: Course = {
  slug: "wme",
  code: "WME",
  name: "Wealth Management Essentials",
  area: "financial-planning",
  category: "Planning & wealth",
  route: "/financial-planning/wme",
  status: "coaching",
  offerConfirmed: true,
  tagline: "See the whole picture of a client’s wealth.",
  blurb: "Connect investment knowledge with the broader financial decisions involved in managing a client’s wealth.",
  summary:
    "Wealth Management Essentials (WME) is a CSI course on the wider financial decisions involved in managing a client's wealth. It covers financial assessment, tax and risk management, retirement, estate planning and portfolio decisions. It has two 3-hour exams: 100 multiple-choice questions, then 65 case-based questions. Vipin Garg offers exam coaching for WME.",
  whoFor: [
    "Learners preparing for the WME examinations or building on their existing investment knowledge.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Financial assessment",
    "Tax and risk management",
    "Retirement",
    "Estate planning",
    "Portfolio decisions",
  ],
  examFormat: {
    questions: "Exam 1: 100 multiple-choice questions. Exam 2: 65 case-based multiple-choice questions",
    duration: "Two 3-hour exams",
  },
  officialUrl: "https://www.csi.ca/en/learning/courses/wme/exam-credits",
  careerUse:
    "WME develops knowledge relevant to wealth-management discussions and further professional education. Confirm whether it is required within your existing employer, designation or transition pathway.",
  ciro2026Note: ciro2026,
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["fp1", "csc-2", "afp"],
  seo: {
    title: "WME Exam Prep: Wealth Management Essentials",
    description:
      "Exam coaching for Wealth Management Essentials (WME) with Vipin Garg. Study assessment, tax, retirement and estate planning, and see the two-exam format.",
    primaryKeyword: "WME exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const fp1: Course = {
  slug: "fp1",
  code: "FP1",
  name: "Financial Planning I",
  area: "financial-planning",
  category: "Planning & wealth",
  route: "/financial-planning/fp1",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Lay the groundwork for thoughtful financial planning.",
  blurb: "Build a foundation in the financial planning process, covering cash flow, credit, taxation, retirement and risk.",
  summary:
    "Financial Planning I (FP1) is a CSI course that lays the groundwork for financial planning. It covers the planning process, budgeting and borrowing, taxation, investments and retirement, and insurance and estate considerations. The exam has 80 multiple-choice questions and lasts 3 hours. Vipin Garg offers exam coaching for FP1.",
  whoFor: [
    "Learners beginning financial planning studies or strengthening their financial-services knowledge.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Planning process",
    "Budgeting and borrowing",
    "Taxation",
    "Investments and retirement",
    "Insurance and estate considerations",
  ],
  examFormat: { questions: "80 multiple-choice questions", duration: "3 hours" },
  officialUrl: "https://www.csi.ca/en/learning/courses/fp1/exam-credits",
  careerUse:
    "FP1 provides a foundation for further financial planning education and financial-services advice. Its relevance to a designation depends on the approved education pathway you follow.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["fp2", "wme", "afp"],
  seo: {
    title: "FP1 Exam Prep: Financial Planning I Coaching",
    description:
      "Exam coaching for Financial Planning I (FP1) with Vipin Garg. Study the planning process, tax, retirement and estate topics, and see the exam format.",
    primaryKeyword: "FP1 exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const fp2: Course = {
  slug: "fp2",
  code: "FP2",
  name: "Financial Planning II",
  area: "financial-planning",
  category: "Planning & wealth",
  route: "/financial-planning/fp2",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Connect the moving parts of a financial plan.",
  blurb: "Develop a more integrated approach to financial planning across investment, tax, retirement, business and estate considerations.",
  summary:
    "Financial Planning II (FP2) is a CSI course on advanced financial planning. It covers debt and savings, tax and investments, retirement, small-business planning, and family law and estates. The exam has 60 multiple-choice questions and lasts 3 hours. Vipin Garg offers exam coaching for FP2.",
  whoFor: [
    "Learners progressing in financial planning studies and preparing for the FP2 examination.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Debt and savings",
    "Tax and investments",
    "Retirement",
    "Small-business planning",
    "Family law and estates",
  ],
  examFormat: { questions: "60 multiple-choice questions", duration: "3 hours" },
  officialUrl: "https://www.csi.ca/en/learning/courses/fp2/exam-credits",
  careerUse:
    "FP2 develops knowledge used to assess interconnected financial planning needs. It can form part of applicable financial planning education pathways; confirm the complete route with the designation provider.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["fp1", "afp", "wme"],
  seo: {
    title: "FP2 Exam Prep: Financial Planning II Coaching",
    description:
      "Exam coaching for Financial Planning II (FP2) with Vipin Garg. Cover debt, tax, retirement, small-business and estate planning, plus the exam format.",
    primaryKeyword: "FP2 exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

const afp: Course = {
  slug: "afp",
  code: "AFP",
  name: "Applied Financial Planning Certification Examination",
  area: "financial-planning",
  category: "Planning & wealth",
  route: "/financial-planning/afp",
  status: "coaching",
  offerConfirmed: true,
  tagline: "Apply your knowledge to the client in front of you.",
  blurb: "Prepare to analyse client information, identify planning priorities and develop recommendations in an applied examination setting.",
  summary:
    "The Applied Financial Planning Certification Examination (AFP) is part of the PFP designation pathway. It covers integrated client analysis, planning priorities, recommendations, case interpretation and written responses. It has two exams of up to 3 hours each: 105 multiple-choice questions, then four written-response cases. Vipin Garg offers exam coaching for the AFP.",
  whoFor: [
    "Candidates preparing for the AFP examinations within their applicable PFP designation pathway.",
    "Learners who want to understand the reasoning behind each answer, not only the definitions",
  ],
  topics: [
    "Integrated client analysis",
    "Planning priorities",
    "Recommendations",
    "Case interpretation",
    "Written responses",
  ],
  examFormat: {
    questions: "Exam 1: 105 multiple-choice questions. Exam 2: four written-response cases",
    duration: "Two exams, up to 3 hours each",
  },
  officialUrl: "https://www.csi.ca/en/learning/courses/afp",
  careerUse:
    "The AFP examinations form part of the Personal Financial Planner designation pathway. Approved education, qualifying experience, application and professional obligations must also be satisfied.",
  practiceTests: "not-planned-yet",
  faqs: [],
  siblings: ["fp2", "fp1", "cfp"],
  seo: {
    title: "AFP Exam Prep: Applied Financial Planning",
    description:
      "Exam coaching for the Applied Financial Planning Certification Examination (AFP) with Vipin Garg. Practise case analysis and written responses.",
    primaryKeyword: "AFP exam prep",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

// PLACEHOLDER: confirm client offers this — CFP coaching (yes/no, start date, scope)
const cfp: Course = {
  slug: "cfp",
  code: "CFP",
  name: "Certified Financial Planner",
  area: "financial-planning",
  category: "Planning & wealth",
  route: "/financial-planning/cfp",
  status: "coaching",
  offerConfirmed: false,
  tagline: "Understand the certification before you commit to the exam.",
  blurb: null,
  summary:
    "The CFP (Certified Financial Planner) certification is set by FP Canada, which defines the education, examination, experience and ethics requirements. Postsecondary requirements and exemptions depend on your pathway. Vipin Garg's CFP coaching is not confirmed yet. Register your interest to hear first when the programme details are announced.",
  whoFor: [
    "Planners considering the CFP certification",
    "Learners comparing the CFP with the QAFP and the PFP designation",
  ],
  // PLACEHOLDER: CFP syllabus overview from FP Canada — ["Professional ethics", "Risk management and insurance", "Investment planning", "Tax planning", "Retirement planning", "Estate planning"]
  topics: [],
  // PLACEHOLDER: CFP exam format from FP Canada — { questions: "…", duration: "…" }
  examFormat: { questions: null, duration: null },
  officialUrl: FP_CANADA,
  careerUse:
    "FP Canada sets education, examination, experience and ethics requirements for each certification. Confirm your pathway with FP Canada.",
  practiceTests: "not-planned-yet",
  faqs: [
    faq(
      "Who sets the requirements for the CFP certification?",
      "FP Canada sets the education, examination, experience and ethics requirements. Postsecondary requirements and exemptions depend on the pathway you follow.",
    ),
    faq(
      "Do you offer CFP coaching?",
      "CFP coaching is not confirmed yet. Register your interest and we will contact you when the details are announced.",
    ),
  ],
  siblings: ["qafp", "afp", "fp2"],
  seo: {
    title: "CFP Certification Prep in Canada",
    description:
      "Learn how the CFP certification works in Canada and register interest in CFP exam coaching with Vipin Garg. Requirements are set by FP Canada.",
    primaryKeyword: "CFP exam prep Canada",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

// PLACEHOLDER: confirm client offers this — QAFP coaching (yes/no, start date, scope)
const qafp: Course = {
  slug: "qafp",
  code: "QAFP",
  name: "Qualified Associate Financial Planner",
  area: "financial-planning",
  category: "Planning & wealth",
  route: "/financial-planning/qafp",
  status: "coaching",
  offerConfirmed: false,
  tagline: "Understand the certification before you commit to the exam.",
  blurb: null,
  summary:
    "The QAFP (Qualified Associate Financial Planner) certification is set by FP Canada, which defines the education, examination, experience and ethics requirements. Postsecondary requirements and exemptions depend on your pathway. Vipin Garg's QAFP coaching is not confirmed yet. Register your interest to hear first when the programme details are announced.",
  whoFor: [
    "Planners considering the QAFP certification",
    "Learners comparing the QAFP with the CFP and the PFP designation",
  ],
  // PLACEHOLDER: QAFP syllabus overview from FP Canada — ["Financial planning process", "Insurance and risk", "Investments", "Tax", "Retirement", "Estate"]
  topics: [],
  // PLACEHOLDER: QAFP exam format from FP Canada — { questions: "…", duration: "…" }
  examFormat: { questions: null, duration: null },
  officialUrl: FP_CANADA,
  careerUse:
    "FP Canada sets education, examination, experience and ethics requirements for each certification. Confirm your pathway with FP Canada.",
  practiceTests: "not-planned-yet",
  faqs: [
    faq(
      "Who sets the requirements for the QAFP certification?",
      "FP Canada sets the education, examination, experience and ethics requirements. Postsecondary requirements and exemptions depend on the pathway you follow.",
    ),
    faq(
      "Do you offer QAFP coaching?",
      "QAFP coaching is not confirmed yet. Register your interest and we will contact you when the details are announced.",
    ),
  ],
  siblings: ["cfp", "afp", "fp1"],
  seo: {
    title: "QAFP Certification Prep in Canada",
    description:
      "Learn how the QAFP certification works in Canada and register interest in QAFP exam coaching with Vipin Garg. Requirements are set by FP Canada.",
    primaryKeyword: "QAFP exam prep Canada",
  },
  cohorts: [],
  pricing: pricing(),
  lastReviewed: LAST_REVIEWED,
};

/* ------------------------------------------------------------------ */
/* Exports                                                             */
/* ------------------------------------------------------------------ */

const rawCourses: Course[] = [
  ifc,
  csc1,
  csc2,
  cire,
  rse,
  llqp,
  ise,
  derivatives,
  supervisor,
  trader,
  directorExecutive,
  cirocco,
  cirocfo,
  exmp,
  cph,
  wme,
  fp1,
  fp2,
  afp,
  cfp,
  qafp,
];

/** Coaching-only courses with no hand-written FAQs get generated ones. */
export const courses: Course[] = rawCourses.map((c) =>
  c.faqs.length ? c : { ...c, faqs: coachingFaqs(c) },
);

export const upcomingPrograms: UpcomingProgram[] = [
  {
    slug: "practice-tests",
    name: "Practice tests and exam simulations",
    kind: "practice-tools",
    status: "upcoming",
    summary:
      "Original practice questions, mock examinations and timed simulations are planned first for IFC, CSC Exam 1, CSC Exam 2 and CIRE. These are independently developed learning tools, separate from the official examinations.",
    relatedCourses: ["ifc", "csc-1", "csc-2", "cire"],
    launch: null,
    seo: {
      title: "Practice Tests for Canadian Finance Exams",
      description:
        "Original practice tests and timed exam simulations are planned for IFC, CSC and CIRE. Register your interest to hear when they launch and what they include.",
    },
  },
  {
    slug: "ai-and-finance",
    name: "AI & Finance",
    kind: "new-programme",
    status: "upcoming",
    summary:
      "A practical programme on how AI can support financial research, spreadsheet work and communication, with an emphasis on checking results and handling information responsibly. The syllabus is still being developed.",
    relatedCourses: [],
    launch: null,
    seo: {
      title: "AI & Finance Programme for Finance Learners",
      description:
        "A practical AI & Finance programme is in development. Learn how AI can support research and spreadsheets, and register interest for updates.",
    },
  },
  {
    slug: "cfa",
    name: "CFA exam preparation",
    kind: "new-programme",
    status: "upcoming",
    summary:
      "Planned coaching for candidates pursuing the CFA Program. Levels, teaching format and curriculum coverage will be confirmed before enrollment opens.",
    relatedCourses: [],
    launch: null,
    seo: {
      title: "CFA Exam Preparation Coaching: Coming Soon",
      description:
        "CFA exam coaching is planned. Levels, format and coverage are not confirmed yet. Register your interest to hear first when enrollment opens.",
    },
  },
  {
    slug: "bc-real-estate",
    name: "British Columbia real estate licensing",
    kind: "new-programme",
    status: "upcoming",
    summary:
      "Planned preparation for learners pursuing real estate licensing in British Columbia. The specific programme, teaching scope and launch date will be announced after development.",
    relatedCourses: [],
    launch: null,
    seo: {
      title: "BC Real Estate Licensing Prep: Coming Soon",
      description:
        "Preparation for British Columbia real estate licensing is planned. Scope and launch date are not confirmed yet. Register your interest for updates.",
    },
  },
  {
    slug: "bc-mortgage",
    name: "British Columbia mortgage licensing",
    kind: "new-programme",
    status: "upcoming",
    summary:
      "Planned coaching in mortgage concepts, calculations and examination preparation for the British Columbia licensing pathway. Programme details and launch dates are not yet confirmed.",
    relatedCourses: [],
    launch: null,
    seo: {
      title: "BC Mortgage Licensing Prep: Coming Soon",
      description:
        "Coaching for the British Columbia mortgage licensing pathway is planned. Details and dates are not confirmed. Register interest for updates.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Selectors (pure, safe in Server Components)                         */
/* ------------------------------------------------------------------ */

export const getCourse = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug);

export const getCoursesByArea = (area: CourseArea): Course[] =>
  courses.filter((c) => c.area === area);

export const liveGroupCourses: Course[] = courses.filter(
  (c) => c.status === "live-group",
);

export const getSiblings = (course: Course): Course[] =>
  course.siblings
    .map((s) => getCourse(s))
    .filter((c): c is Course => c !== undefined);

/** Slugs for `generateStaticParams`, per route folder. */
export const staticParamsFor = (area: CourseArea): { slug: string }[] =>
  // Insurance has one static route (/insurance/llqp), so no dynamic params.
  area === "insurance" ? [] : getCoursesByArea(area).map((c) => ({ slug: c.slug }));

export const getUpcoming = (slug: string): UpcomingProgram | undefined =>
  upcomingPrograms.find((u) => u.slug === slug);

/** Counts for the trust strip. Derived, so they cannot drift from the catalogue. */
export const courseCounts = {
  liveGroup: liveGroupCourses.length,
  /** Courses where the client has confirmed they offer coaching. */
  coaching: courses.filter((c) => c.offerConfirmed).length,
};

/** First cohort that has not started yet, or undefined. */
export function nextCohort(course: Course, now: Date = new Date()): Cohort | undefined {
  return course.cohorts
    .filter((c) => new Date(c.startDate).getTime() >= now.getTime())
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
}
