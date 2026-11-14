import { getPool } from "@/lib/db";
import {
  type FieldErrors,
  type LeadKind,
  type LeadPayloadMap,
  validateLead,
} from "@/lib/forms";
import { hitRateLimit, isOriginAllowed, readClientIp, readText, toUuidOrEmpty } from "@/lib/api-security";

export const runtime = "nodejs";

const LEADS_RATE_LIMIT = 10;
const LEADS_RATE_WINDOW_MS = 10 * 60 * 1000;

const MAX_NAME = 120;
const MAX_COMPANY = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_MESSAGE = 2000;
const MAX_SOURCE_PATH = 300;
const MAX_TEAM_SIZE = 40;
const MAX_EXAM_DATE = 80;
const MAX_SLUG_LEN = 80;
const MAX_SLUGS = 10;

type LeadBody = {
  kind?: unknown;
  visitorId?: unknown;
  website?: unknown;
} & Record<string, unknown>;

export async function POST(request: Request): Promise<Response> {
  if (!isOriginAllowed(request)) {
    return Response.json({ ok: false }, { status: 403 });
  }

  const ip = readClientIp(request);
  if (hitRateLimit(`leads:${ip}`, LEADS_RATE_LIMIT, LEADS_RATE_WINDOW_MS)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!isLeadKind(body.kind)) {
    return Response.json({ ok: false, errors: { kind: "Invalid lead kind." } }, { status: 400 });
  }

  const kind = body.kind;

  const errors = validateServerLead(kind, body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const website = readText(body.website, 200);
  if (website.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const mapped = mapLead(kind, body);
  const visitorId = toUuidOrEmpty(body.visitorId);

  try {
    await getPool().query(
      `
      INSERT INTO site_leads (
        kind,
        name,
        email,
        phone,
        course_slugs,
        company_name,
        team_size,
        exam_date,
        message,
        casl_consent,
        source_path,
        visitor_id
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
      )
      `,
      [
        kind,
        mapped.name,
        mapped.email,
        mapped.phone,
        mapped.courseSlugs,
        mapped.companyName,
        mapped.teamSize,
        mapped.examDate,
        mapped.message,
        mapped.caslConsent,
        mapped.sourcePath,
        visitorId || null,
      ],
    );

    if (visitorId) {
      const exists = await getPool().query(
        "SELECT 1 FROM site_visitors WHERE visitor_id = $1 LIMIT 1",
        [visitorId],
      );
      if (exists.rowCount && exists.rowCount > 0) {
        await getPool().query(
          `
          INSERT INTO site_events (visitor_id, session_id, event_type, path, label, target)
          VALUES ($1, '', 'form_submit', $2, $3, '')
          `,
          [visitorId, mapped.sourcePath, kind],
        );
      }
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/leads failed", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}

function validateServerLead(kind: LeadKind, body: LeadBody): FieldErrors {
  switch (kind) {
    case "masterclass":
      return validateLead("masterclass", body as Partial<LeadPayloadMap["masterclass"]>);
    case "diagnostic":
      return validateLead("diagnostic", body as Partial<LeadPayloadMap["diagnostic"]>);
    case "contact":
      return validateLead("contact", body as Partial<LeadPayloadMap["contact"]>);
    case "firms":
      return validateLead("firms", body as Partial<LeadPayloadMap["firms"]>);
    case "newsletter":
      return validateLead("newsletter", body as Partial<LeadPayloadMap["newsletter"]>);
    case "interest":
      return validateLead("interest", body as Partial<LeadPayloadMap["interest"]>);
  }
}

function mapLead(kind: LeadKind, body: LeadBody) {
  const sourcePath = readText(body.sourcePath, MAX_SOURCE_PATH);
  const caslConsent = body.caslConsent === true;

  let name = "";
  const email = cleanEmail(body.email);
  const phone = readText(body.phone, MAX_PHONE);
  let courseSlugs: string[] = [];
  let companyName = "";
  let teamSize = "";
  let examDate = "";
  let message = "";

  if (kind === "masterclass") {
    name = readText(body.name, MAX_NAME);
    courseSlugs = readSlugList([body.courseSlug]);
  }

  if (kind === "diagnostic") {
    name = readText(body.name, MAX_NAME);
    courseSlugs = readSlugList([body.courseSlug]);
    examDate = readText(body.examDate, MAX_EXAM_DATE);
  }

  if (kind === "contact") {
    name = readText(body.name, MAX_NAME);
    courseSlugs = readSlugList([body.courseSlug]);
    message = readText(body.message, MAX_MESSAGE);
  }

  if (kind === "firms") {
    name = readText(body.contactName, MAX_NAME);
    companyName = readText(body.companyName, MAX_COMPANY);
    teamSize = readText(body.teamSize, MAX_TEAM_SIZE);
    courseSlugs = readSlugList(readArray(body.courseSlugs));
    message = readText(body.message, MAX_MESSAGE);
  }

  if (kind === "newsletter") {
    // nothing else
  }

  if (kind === "interest") {
    name = readText(body.name, MAX_NAME);
    courseSlugs = readSlugList([body.programSlug]);
  }

  return {
    name,
    email,
    phone,
    courseSlugs,
    companyName,
    teamSize,
    examDate,
    message,
    caslConsent,
    sourcePath,
  };
}

function isLeadKind(value: unknown): value is LeadKind {
  return (
    value === "masterclass" ||
    value === "diagnostic" ||
    value === "contact" ||
    value === "firms" ||
    value === "newsletter" ||
    value === "interest"
  );
}

function cleanEmail(value: unknown): string {
  return readText(value, MAX_EMAIL).toLowerCase();
}

function readSlugList(rawValues: unknown[]): string[] {
  const items: string[] = [];
  for (const raw of rawValues) {
    const slug = readText(raw, MAX_SLUG_LEN);
    if (!slug) {
      continue;
    }
    items.push(slug);
    if (items.length >= MAX_SLUGS) {
      break;
    }
  }
  return items;
}

function readArray(value: unknown): unknown[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value;
}
