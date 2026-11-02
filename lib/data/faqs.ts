/**
 * Site-wide FAQs (home and /faq). Answers use only facts from the reference
 * site and the redesign plan. No prices, dates, pass rates or counts that the
 * client has not confirmed.
 */

export type FaqTopic =
  | "courses"
  | "pathways"
  | "enrolling"
  | "learning"
  | "licensing"
  | "firms";

export type SiteFaq = {
  id: string;
  topic: FaqTopic;
  question: string;
  answer: string;
  /** Optional follow-up link shown under the answer. */
  link?: { label: string; href: string };
  /** Show on the home page (8–10 of the 12). */
  home: boolean;
};

export const siteFaqs: SiteFaq[] = [
  {
    id: "which-exams",
    topic: "courses",
    question: "Which exams do you teach live?",
    answer:
      "Live group classes cover six programmes: IFC, CSC Exam 1, CSC Exam 2, CIRE, RSE and LLQP. Vipin Garg teaches them online.",
    link: { label: "See all courses", href: "/courses" },
    home: true,
  },
  {
    id: "other-exams",
    topic: "courses",
    question: "Do you coach any other exams?",
    answer:
      "Yes. Exam coaching also covers the other CIRO proficiency exams (ISE, Derivatives, Supervisor, Trader, Director and Executive, CCO and CFO), wealth and planning courses (WME, FP1, FP2, AFP) and professional courses (EXMP, CPH). Ask about your exam before you enroll.",
    link: { label: "Browse the catalogue", href: "/courses" },
    home: false,
  },
  {
    id: "which-course",
    topic: "pathways",
    question: "How do I choose between IFC, CSC and the CIRO exams?",
    answer:
      "Each exam serves a different purpose. IFC and CSC build product and market knowledge for banking and investment-service roles. CIRO exams such as the CIRE and RSE depend on the approval category for your role. The accepted requirements depend on your role and employer, so check them before you pay for any course.",
    link: { label: "Find my course", href: "/find-my-course" },
    home: true,
  },
  {
    id: "cire-vs-rse",
    topic: "pathways",
    question: "What is the difference between the CIRE and the RSE?",
    answer:
      "The CIRE forms part of the applicable investment representative and registered representative pathways under CIRO's investment-dealer framework. The RSE is the retail Registered Representative exam. Which you need depends on your approval category, so confirm with CIRO and your dealer.",
    link: { label: "See licensing pathways", href: "/licensing-pathways" },
    home: true,
  },
  {
    id: "classes-live",
    topic: "learning",
    question: "Are the classes really live?",
    answer:
      "Yes. Vipin Garg teaches live online, explains the reasoning behind each answer, works through examples and takes your questions. Class dates, time zone and session length are confirmed before you enroll.",
    link: { label: "See upcoming classes", href: "/schedule" },
    home: true,
  },
  {
    id: "recordings-practice",
    topic: "learning",
    question: "Are recordings and practice tests included?",
    answer:
      "Recorded courses are planned. Original practice tests and exam simulations are in development, starting with IFC, CSC Exam 1, CSC Exam 2 and CIRE. They are not yet included across all programmes. Your coaching offer lists exactly what you receive.",
    link: { label: "See what is coming", href: "/upcoming" },
    home: true,
  },
  {
    id: "registration-included",
    topic: "enrolling",
    question: "Is official course or exam registration included?",
    answer:
      "No, unless your coaching offer says so in writing. Coaching and official registration are separate. Register with the relevant provider, confirm its requirements and pay its fees directly.",
    home: true,
  },
  {
    id: "how-to-enroll",
    topic: "enrolling",
    question: "How do I enroll, and what do I pay?",
    answer:
      "Choose your programme, share your exam, target exam date and availability, then confirm the schedule, total fee, included resources and cancellation terms before you pay. Browsing this site does not enroll you or create a payment obligation.",
    link: { label: "Contact us to enroll", href: "/contact" },
    home: true,
  },
  {
    id: "student-login",
    topic: "enrolling",
    question: "Where do students log in?",
    answer:
      "Enrolled students use the learning app at app.vipingarg.com for their account, courses and available resources. This website helps you explore your options.",
    home: false,
  },
  {
    id: "licensed-after",
    topic: "licensing",
    question: "Will coaching make me licensed or registered?",
    answer:
      "No. Coaching helps you understand the material and prepare for the exam. Registration, licensing, experience and employer requirements are separate and are set by the official organizations, such as CIRO, CSI, FP Canada and provincial insurance regulators.",
    home: true,
  },
  {
    id: "llqp-covers",
    topic: "licensing",
    question: "What does LLQP preparation cover, and is Quebec included?",
    answer:
      "LLQP preparation covers life insurance, accident and sickness insurance, segregated funds and annuities, and ethics and professional practice. Quebec is not offered yet. Becoming licensed also needs approved education, provider certification, provincial exams and regulator requirements.",
    link: { label: "LLQP licensing steps", href: "/licensing-pathways" },
    home: true,
  },
  {
    id: "for-firms",
    topic: "firms",
    question: "Can my firm train a team with you?",
    answer:
      "Employers can ask about group cohorts through the For Firms page. Scope, schedule and pricing are confirmed for each request.",
    link: { label: "For firms", href: "/for-firms" },
    home: false,
  },
];

export const homeFaqs: SiteFaq[] = siteFaqs.filter((f) => f.home);
