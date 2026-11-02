/**
 * Lead-form types, validation and the single submit stub.
 * Front-end only: nothing is stored or sent until a provider is connected.
 *
 * CASL: every payload carries `caslConsent`, an explicit boolean taken from an
 * unchecked-by-default checkbox. `false` is a valid answer (the person can
 * still send the form); it just means no marketing email.
 */

export type LeadKind =
  | "masterclass"
  | "diagnostic"
  | "contact"
  | "firms"
  | "newsletter"
  | "interest";

type WithConsent = {
  /** Explicit boolean from the consent checkbox. Never undefined. */
  caslConsent: boolean;
  /** Page the form was submitted from, e.g. "/securities/cire". */
  sourcePath?: string;
};

export type MasterclassLead = WithConsent & {
  name: string;
  email: string;
  /** Course slug the person cares about most. */
  courseSlug?: string;
};

export type DiagnosticLead = WithConsent & {
  name: string;
  email: string;
  courseSlug: string;
  /** Free text or ISO date. */
  examDate?: string;
};

export type ContactLead = WithConsent & {
  name: string;
  email: string;
  phone?: string;
  courseSlug?: string;
  message: string;
};

export type FirmsLead = WithConsent & {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  teamSize: string;
  courseSlugs: string[];
  message?: string;
};

export type NewsletterLead = WithConsent & {
  email: string;
};

export type InterestLead = WithConsent & {
  name?: string;
  email: string;
  /** Course or upcoming-programme slug. */
  programSlug: string;
};

export type LeadPayloadMap = {
  masterclass: MasterclassLead;
  diagnostic: DiagnosticLead;
  contact: ContactLead;
  firms: FirmsLead;
  newsletter: NewsletterLead;
  interest: InterestLead;
};

export type SubmitResult = { ok: true };

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isBlank = (v: unknown): boolean =>
  typeof v !== "string" || v.trim().length === 0;

/**
 * Client-side validation. Returns an object of `field -> message`; empty means valid.
 * Messages are plain English so they can be shown next to the field.
 */
export function validateLead<K extends LeadKind>(
  kind: K,
  payload: Partial<LeadPayloadMap[K]>,
): FieldErrors {
  const p = payload as Record<string, unknown>;
  const errors: FieldErrors = {};

  const requireText = (field: string, label: string) => {
    if (isBlank(p[field])) errors[field] = `Enter ${label}.`;
  };
  const requireEmail = () => {
    if (isBlank(p.email)) errors.email = "Enter your email address.";
    else if (!EMAIL_RE.test(String(p.email).trim()))
      errors.email = "Enter a valid email address, like name@example.com.";
  };

  if (typeof p.caslConsent !== "boolean") {
    errors.caslConsent = "Consent must be explicitly true or false.";
  }

  switch (kind) {
    case "masterclass":
      requireText("name", "your name");
      requireEmail();
      break;
    case "diagnostic":
      requireText("name", "your name");
      requireEmail();
      requireText("courseSlug", "the exam you are preparing for");
      break;
    case "contact":
      requireText("name", "your name");
      requireEmail();
      requireText("message", "a message");
      break;
    case "firms":
      requireText("companyName", "your company name");
      requireText("contactName", "a contact name");
      requireEmail();
      requireText("teamSize", "the size of your team");
      if (!Array.isArray(p.courseSlugs) || p.courseSlugs.length === 0)
        errors.courseSlugs = "Choose at least one course.";
      break;
    case "newsletter":
      requireEmail();
      break;
    case "interest":
      requireEmail();
      requireText("programSlug", "the programme you are interested in");
      break;
  }

  return errors;
}

/**
 * Single submit entry point for every lead form.
 */
// PLACEHOLDER: connect email/CRM provider (e.g. ConvertKit, Resend) — POST the payload to a Route Handler or Server Action that forwards it, and store `caslConsent` with the contact record.
export async function submitLead<K extends LeadKind>(
  kind: K,
  payload: LeadPayloadMap[K],
): Promise<SubmitResult> {
  void kind;
  void payload;
  // Short pause so the pending state is visible while there is no backend.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true };
}
