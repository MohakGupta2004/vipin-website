/**
 * Single source of truth for brand, contact and "business fact" values.
 * Anything the client has not confirmed is a neutral placeholder with a
 * `PLACEHOLDER:` comment. `grep -rn "PLACEHOLDER:" lib app components` lists
 * everything the client must supply.
 *
 * Rule: UI must treat `null` as "not known yet" and render an honest state
 * ("Dates announced soon"), never a made-up value.
 */

export type SocialLinks = {
  youtube: string | null;
  instagram: string | null;
  linkedin: string | null;
  facebook: string | null;
  trustpilot: string | null;
};

export type Announcement = {
  /** Short text shown in the sticky bar. */
  text: string;
  href: string;
  linkLabel: string;
  /** ISO date after which the bar stops rendering. */
  expiresOn?: string;
} | null;

export type Masterclass = {
  title: string;
  /** ISO 8601 with offset, e.g. 2026-12-10T18:00:00-08:00 */
  startsAt: string;
  durationMinutes: number;
  topic: string;
} | null;

export type Guarantee = {
  headline: string;
  summary: string;
  /** Full plain-English terms, approved by the client. */
  terms: string[];
} | null;

export type FounderVideo = {
  /** Absolute URL or /public path to the video file or embed URL. */
  src: string;
  poster: string;
  captionsUrl?: string;
} | null;

export const siteConfig = {
  /** Display brand (from reference site). */
  name: "Vipin Garg Finance Coaching",
  shortName: "Vipin Garg",
  tagline: "Canadian finance exam preparation. Taught live.",
  description:
    "Live online coaching for Canadian financial exams: IFC, CSC, CIRE, RSE and LLQP, taught by Vipin Garg.",

  /** Legal entity shown in the footer, terms, privacy and refund pages. */
  // PLACEHOLDER: registered legal name of the business — "Vipin Garg Finance Coaching Inc."
  legalName: "Vipin Garg Finance Coaching",

  // PLACEHOLDER: production domain — "https://vipingarg.com"
  url: "https://vipingarg.com",

  locale: "en-CA",
  country: "CA",

  instructor: {
    name: "Vipin Garg",
    role: "Founder & Instructor",
    // PLACEHOLDER: approved biography (2–3 paragraphs) — "Vipin has taught Canadian securities exams since …"
    bio: null as string | null,
    // PLACEHOLDER: verified credentials, only if client confirms — ["CFA charterholder", "CFP®"]
    credentials: [] as string[],
    // PLACEHOLDER: portrait for hero and About page — "/images/vipin-garg.jpg"
    portrait: null as string | null,
  },

  contact: {
    // PLACEHOLDER: public enquiries email — "hello@vipingarg.com"
    email: "info@vipingarg.com",
    // PLACEHOLDER: public phone number — "+1 604 555 0123"
    phone: null as string | null,
    // PLACEHOLDER: WhatsApp number or wa.me link — "https://wa.me/16045550123"
    whatsapp: null as string | null,
    // PLACEHOLDER: reply-time promise the client can keep — "We reply within one business day."
    responseTime: null as string | null,
  },

  address: {
    // PLACEHOLDER: business mailing address, or keep null for online-only — "123 West Hastings St, Vancouver, BC V6B 1H6"
    street: null as string | null,
    locality: null as string | null,
    region: null as string | null,
    postalCode: null as string | null,
    country: "Canada",
  },

  // PLACEHOLDER: timezone for class times — "America/Vancouver" (BC) or "America/Toronto"
  timezone: "America/Vancouver",

  /** Student learning app. Verified in reference site (all "Student login" links). */
  studentLoginUrl: "https://app.vipingarg.com",

  /** Empty in reference `media.json` → null → hidden in the UI. */
  social: {
    youtube: null,
    instagram: null,
    linkedin: null,
    facebook: null,
    trustpilot: null,
  } as SocialLinks,

  /** Founder introduction video. Reference `media.json` has no video yet. */
  // PLACEHOLDER: founder video + poster — { src: "/media/founder.mp4", poster: "/media/founder.jpg" }
  founderVideo: null as FounderVideo,

  /** Sticky announcement bar. `null` hides the bar. */
  // PLACEHOLDER: next intake or masterclass announcement — { text: "Next CIRE cohort starts 12 January", href: "/schedule", linkLabel: "See dates" }
  announcement: null as Announcement,

  /** Next free live masterclass. `null` shows "dates announced soon". */
  // PLACEHOLDER: masterclass date and topic — { title: "5 CIRE traps that fail people", startsAt: "2026-12-10T18:00:00-08:00", durationMinutes: 45, topic: "CIRE" }
  masterclass: null as Masterclass,

  /** Conditional pass guarantee. Terms must be written and approved by the client. */
  // PLACEHOLDER: client-approved guarantee terms — { headline: "…", summary: "…", terms: ["Attend 80% of live classes", "…"] }
  guarantee: null as Guarantee,

  /** Trust-strip facts that are true today. Add numbers only when verified. */
  trustFacts: [
    "Live online classes",
    "Taught by Vipin Garg",
    "Instructor guidance between classes",
  ],

  /**
   * Verified proof points. All unknown, so all null. UI hides any null value.
   * Never default these to a number.
   */
  proof: {
    // PLACEHOLDER: first-attempt pass rate with the method and period — "87% of 2025 CIRE students passed on the first attempt"
    passRate: null as string | null,
    // PLACEHOLDER: number of students taught, if client can document it — "1,200+"
    studentsTaught: null as string | null,
    // PLACEHOLDER: years teaching, if verified — "10"
    yearsTeaching: null as string | null,
    // PLACEHOLDER: independent review score and source — { score: "4.8", count: 120, source: "Trustpilot" }
    reviewScore: null as { score: string; count: number; source: string } | null,
    // PLACEHOLDER: CFA charter, only if confirmed — "CFA charterholder"
    cfaCharter: null as string | null,
  },

  /** Flip to true once a lawyer has approved terms, privacy and refund pages. While false they are noindex and show a draft notice. */
  // PLACEHOLDER: lawyer sign-off on terms, privacy and refund policy — set to true once reviewed
  legalReviewed: false,

  /** Sent with every footer. Wording follows the reference site. */
  disclaimer:
    "Independent examination preparation. Official course registration, examinations, licensing and designations are administered by their respective organizations.",
  // PLACEHOLDER: lawyer-approved trademark notice — "CSI, CSC®, IFC® and CPH are trademarks of CSI Global Education Inc. CIRO and CIRE are marks of CIRO. This site is not affiliated with CSI or CIRO."
  trademarkNotice:
    "CSC, IFC, CPH and other course names are trademarks of their owners. CIRO exam names belong to CIRO. This site is not affiliated with or endorsed by CSI or CIRO.",
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL for a path on this site. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

/** True only when a real masterclass date is set and still in the future. */
export function hasUpcomingMasterclass(now: Date = new Date()): boolean {
  const m = siteConfig.masterclass;
  return !!m && new Date(m.startsAt).getTime() > now.getTime();
}
