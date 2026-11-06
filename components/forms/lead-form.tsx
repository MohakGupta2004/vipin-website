"use client";

import * as React from "react";

import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { courses, upcomingPrograms } from "@/lib/data/courses";
import {
  submitLead,
  validateLead,
  type FieldErrors,
  type LeadKind,
  type LeadPayloadMap,
} from "@/lib/forms";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import {
  CheckboxGroupField,
  ConsentCheckbox,
  SelectField,
  TextAreaField,
  TextField,
  type SelectOption,
} from "./fields";
import { ctaButton, primaryButton } from "./styles";

type Status = "idle" | "submitting" | "success" | "error";

export type LeadFormProps<K extends LeadKind> = {
  kind: K;
  /** Pre-selects the course/programme (also used for hidden programSlug on `interest`). */
  courseSlug?: string;
  /** Page path recorded with the lead. */
  sourcePath?: string;
  submitLabel?: string;
  /** Replaces the default success text. */
  successTitle?: string;
  successMessage?: string;
  onSuccess?: () => void;
  className?: string;
};

const courseOptions: SelectOption[] = courses.map((c) => ({
  value: c.slug,
  label: `${c.code}: ${c.name}`,
}));

const interestOptions: SelectOption[] = [
  ...courseOptions,
  ...upcomingPrograms.map((u) => ({ value: u.slug, label: u.name })),
];

const DEFAULT_LABELS: Record<LeadKind, string> = {
  masterclass: "Reserve my seat",
  diagnostic: "Join the diagnostic waitlist",
  contact: "Send message",
  firms: "Send request",
  newsletter: "Subscribe",
  interest: "Register interest",
};

const DEFAULT_SUCCESS: Record<LeadKind, { title: string; message: string }> = {
  masterclass: {
    title: "You’re registered",
    message: "We have your details. We will email you the session information.",
  },
  diagnostic: {
    title: "You’re on the waitlist",
    message: "The diagnostic is not ready yet. We will email you when it opens.",
  },
  contact: {
    title: "Message sent",
    message: "Thank you. We will reply to the email address you gave us.",
  },
  firms: {
    title: "Request sent",
    message: "Thank you. We will contact you about group training.",
  },
  newsletter: {
    title: "You’re subscribed",
    message: "Thank you. Watch your inbox for the next update.",
  },
  interest: {
    title: "Interest registered",
    message: "Thank you. We will email you when there is news.",
  },
};

const SUBMITTING_LABELS: Partial<Record<LeadKind, string>> = {
  newsletter: "Subscribing…",
};

const str = (fd: FormData, key: string): string => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};
const opt = (fd: FormData, key: string): string | undefined =>
  str(fd, key) || undefined;

/** Reads the DOM form into a typed payload for the given kind. */
function readPayload<K extends LeadKind>(
  kind: K,
  fd: FormData,
  extra: { courseSlug?: string; sourcePath?: string },
): Partial<LeadPayloadMap[K]> {
  const base = {
    // Unchecked checkbox is absent from FormData, so this is always a real boolean.
    caslConsent: fd.get("caslConsent") === "on",
    sourcePath: extra.sourcePath,
  };
  const course = opt(fd, "courseSlug") ?? extra.courseSlug;

  let payload: unknown;
  switch (kind) {
    case "masterclass":
      payload = { ...base, name: str(fd, "name"), email: str(fd, "email"), courseSlug: course };
      break;
    case "diagnostic":
      payload = {
        ...base,
        name: str(fd, "name"),
        email: str(fd, "email"),
        courseSlug: course ?? "",
        examDate: opt(fd, "examDate"),
      };
      break;
    case "contact":
      payload = {
        ...base,
        name: str(fd, "name"),
        email: str(fd, "email"),
        phone: opt(fd, "phone"),
        courseSlug: course,
        message: str(fd, "message"),
      };
      break;
    case "firms":
      payload = {
        ...base,
        companyName: str(fd, "companyName"),
        contactName: str(fd, "contactName"),
        email: str(fd, "email"),
        phone: opt(fd, "phone"),
        teamSize: str(fd, "teamSize"),
        courseSlugs: fd.getAll("courseSlugs").map(String),
        message: opt(fd, "message"),
      };
      break;
    case "newsletter":
      payload = { ...base, email: str(fd, "email") };
      break;
    case "interest":
      payload = {
        ...base,
        name: opt(fd, "name"),
        email: str(fd, "email"),
        programSlug: opt(fd, "programSlug") ?? extra.courseSlug ?? "",
      };
      break;
  }
  return payload as Partial<LeadPayloadMap[K]>;
}

export function LeadForm<K extends LeadKind>({
  kind,
  courseSlug,
  sourcePath,
  submitLabel,
  successTitle,
  successMessage,
  onSuccess,
  className,
}: LeadFormProps<K>) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const payload = readPayload(kind, new FormData(form), { courseSlug, sourcePath });
    const found = validateLead(kind, payload);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      // Focus first invalid control after React paints aria-invalid.
      requestAnimationFrame(() => {
        const firstName = Object.keys(found)[0];
        const el =
          form.querySelector<HTMLElement>(`[name="${firstName}"]`) ??
          form.querySelector<HTMLElement>("[aria-invalid='true']");
        el?.focus();
      });
      return;
    }

    setStatus("submitting");
    try {
      await submitLead(kind, payload as LeadPayloadMap[K]);
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    const fallback = DEFAULT_SUCCESS[kind];
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={cn(
          "flex max-w-120 items-start gap-3 rounded-panel border border-success/30 bg-success-bg p-5 text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        )}
      >
        <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
        <div>
          <p className="text-base font-semibold text-heading">{successTitle ?? fallback.title}</p>
          <p className="mt-1 text-sm text-foreground">{successMessage ?? fallback.message}</p>
        </div>
      </div>
    );
  }

  const errorList = Object.values(errors);
  const submitting = status === "submitting";
  const showCourseHidden = courseSlug && kind === "interest";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-6", kind === "firms" ? "max-w-2xl" : "max-w-120", className)}
    >
      {kind === "masterclass" && (
        <>
          <TextField name="name" label="Name" required autoComplete="name" error={errors.name} />
          <TextField name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
          <SelectField
            name="courseSlug"
            label="Which exam are you preparing for?"
            options={courseOptions}
            defaultValue={courseSlug}
            error={errors.courseSlug}
          />
        </>
      )}

      {kind === "diagnostic" && (
        <>
          <TextField name="name" label="Name" required autoComplete="name" error={errors.name} />
          <TextField name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
          <SelectField
            name="courseSlug"
            label="Which exam are you preparing for?"
            required
            options={courseOptions}
            defaultValue={courseSlug}
            error={errors.courseSlug}
          />
          <TextField
            name="examDate"
            label="Exam date"
            hint="Roughly is fine."
            error={errors.examDate}
          />
        </>
      )}

      {kind === "contact" && (
        <>
          <TextField name="name" label="Name" required autoComplete="name" error={errors.name} />
          <TextField name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
          <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
          <SelectField
            name="courseSlug"
            label="Course you are asking about"
            options={courseOptions}
            defaultValue={courseSlug}
            error={errors.courseSlug}
          />
          <TextAreaField name="message" label="Message" required error={errors.message} />
        </>
      )}

      {kind === "firms" && (
        <>
          <TextField name="companyName" label="Company" required autoComplete="organization" error={errors.companyName} />
          <TextField name="contactName" label="Your name" required autoComplete="name" error={errors.contactName} />
          <TextField name="email" label="Work email" type="email" required autoComplete="email" error={errors.email} />
          <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
          <TextField
            name="teamSize"
            label="Number of people to train"
            required
            inputMode="numeric"
            error={errors.teamSize}
          />
          <CheckboxGroupField
            name="courseSlugs"
            legend="Which courses?"
            options={courseOptions}
            error={errors.courseSlugs}
          />
          <TextAreaField name="message" label="Anything else we should know?" rows={4} error={errors.message} />
        </>
      )}

      {kind === "newsletter" && (
        <TextField name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
      )}

      {kind === "interest" && (
        <>
          <TextField name="name" label="Name" autoComplete="name" error={errors.name} />
          <TextField name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
          {showCourseHidden ? (
            <input type="hidden" name="programSlug" value={courseSlug} />
          ) : (
            <SelectField
              name="programSlug"
              label="What are you interested in?"
              required
              options={interestOptions}
              error={errors.programSlug}
            />
          )}
        </>
      )}

      <ConsentCheckbox required={kind === "newsletter"} error={errors.caslConsent} />

      <div
        role="alert"
        className={errorList.length > 0 || status === "error" ? "" : "sr-only"}
      >
        {errorList.length > 1 ? (
          <div className="rounded-xl border border-destructive/40 bg-destructive-bg p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
              <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
              Fix {errorList.length} things to continue:
            </p>
            <ul className="mt-2 list-disc space-y-0.5 pl-9 text-sm text-foreground">
              {errorList.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {status === "error" ? (
          <p className="flex items-start gap-1.5 text-sm font-medium text-destructive">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            We could not send this. Check your connection and try again, or email{" "}
            {siteConfig.contact.email}.
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        aria-busy={submitting}
        className={cn(kind === "newsletter" ? primaryButton : ctaButton, "w-full gap-2 sm:w-auto sm:min-w-48")}
      >
        {submitting ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
            {SUBMITTING_LABELS[kind] ?? "Sending…"}
          </>
        ) : (
          (submitLabel ?? DEFAULT_LABELS[kind])
        )}
      </Button>
    </form>
  );
}
