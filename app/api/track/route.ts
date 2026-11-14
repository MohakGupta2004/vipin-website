import { getPool } from "@/lib/db";
import {
  hitRateLimit,
  isOriginAllowed,
  readClientIp,
  readText,
  toUuidOrEmpty,
} from "@/lib/api-security";

export const runtime = "nodejs";

const TRACK_RATE_LIMIT = 120;
const TRACK_WINDOW_MS = 60 * 1000;
const MAX_BODY_BYTES = 4096;
const MAX_PATH = 300;
const MAX_SESSION_ID = 80;
const MAX_LABEL = 80;
const MAX_TARGET = 300;
const MAX_TRAIT_TEXT = 120;
const MAX_FINGERPRINT = 128;

type TrackType = "pageview" | "click";

type TrackBody = {
  type?: unknown;
  path?: unknown;
  sessionId?: unknown;
  visitorId?: unknown;
  label?: unknown;
  target?: unknown;
  traits?: unknown;
};

type Traits = {
  fingerprint: string;
  language: string;
  timezone: string;
  screen: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

export async function POST(request: Request): Promise<Response> {
  if (!isOriginAllowed(request)) {
    return new Response(null, { status: 403 });
  }

  const ip = readClientIp(request);
  if (hitRateLimit(`track:${ip}`, TRACK_RATE_LIMIT, TRACK_WINDOW_MS)) {
    return new Response(null, { status: 429 });
  }

  const textBody = await request.text();
  if (textBody.length > MAX_BODY_BYTES) {
    return new Response(null, { status: 413 });
  }

  let body: TrackBody;
  try {
    body = JSON.parse(textBody) as TrackBody;
  } catch {
    return new Response(null, { status: 400 });
  }

  if (!isTrackType(body.type)) {
    return new Response(null, { status: 400 });
  }

  const type = body.type;
  const path = readText(body.path, MAX_PATH);
  const sessionId = readText(body.sessionId, MAX_SESSION_ID);
  const visitorId = toUuidOrEmpty(body.visitorId);

  if (!visitorId) {
    if (type === "pageview") {
      try {
        await getPool().query(
          `
          INSERT INTO site_events (visitor_id, session_id, event_type, path, label, target)
          VALUES (NULL, $1, 'pageview', $2, '', '')
          `,
          [sessionId, path],
        );
      } catch (error) {
        console.error("POST /api/track anonymous pageview failed", error);
      }
    }
    return new Response(null, { status: 204 });
  }

  const userAgent = request.headers.get("user-agent") || "";
  const device = detectDeviceType(userAgent);
  const browser = detectBrowser(userAgent);
  const os = detectOs(userAgent);

  const country = decodeHeader(request.headers.get("x-vercel-ip-country"));
  const region = decodeHeader(request.headers.get("x-vercel-ip-country-region"));
  const city = decodeHeader(request.headers.get("x-vercel-ip-city"));

  const traits = readTraits(body.traits);
  const referrerHost = readReferrerHost(traits.referrer, request);

  const label = type === "click" ? readText(body.label, MAX_LABEL) : "";
  const target = type === "click" ? readText(body.target, MAX_TARGET) : "";
  const isPageview = type === "pageview";

  try {
    await getPool().query(
      `
      INSERT INTO site_visitors (
        visitor_id,
        fingerprint,
        first_seen_at,
        last_seen_at,
        visit_count,
        last_session_id,
        pageviews,
        device_type,
        browser,
        os,
        language,
        timezone,
        screen,
        country,
        region,
        city,
        first_referrer,
        first_landing,
        utm_source,
        utm_medium,
        utm_campaign
      ) VALUES (
        $1, $2, now(), now(), 1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
      )
      ON CONFLICT (visitor_id) DO UPDATE SET
        last_seen_at = now(),
        visit_count = CASE
          WHEN site_visitors.last_session_id IS DISTINCT FROM EXCLUDED.last_session_id
            AND EXCLUDED.last_session_id <> ''
          THEN site_visitors.visit_count + 1
          ELSE site_visitors.visit_count
        END,
        last_session_id = CASE
          WHEN site_visitors.last_session_id IS DISTINCT FROM EXCLUDED.last_session_id
            AND EXCLUDED.last_session_id <> ''
          THEN EXCLUDED.last_session_id
          ELSE site_visitors.last_session_id
        END,
        pageviews = site_visitors.pageviews + CASE WHEN $19 THEN 1 ELSE 0 END,
        fingerprint = CASE WHEN site_visitors.fingerprint = '' THEN EXCLUDED.fingerprint ELSE site_visitors.fingerprint END,
        device_type = CASE WHEN site_visitors.device_type = '' THEN EXCLUDED.device_type ELSE site_visitors.device_type END,
        browser = CASE WHEN site_visitors.browser = '' THEN EXCLUDED.browser ELSE site_visitors.browser END,
        os = CASE WHEN site_visitors.os = '' THEN EXCLUDED.os ELSE site_visitors.os END,
        language = CASE WHEN site_visitors.language = '' THEN EXCLUDED.language ELSE site_visitors.language END,
        timezone = CASE WHEN site_visitors.timezone = '' THEN EXCLUDED.timezone ELSE site_visitors.timezone END,
        screen = CASE WHEN site_visitors.screen = '' THEN EXCLUDED.screen ELSE site_visitors.screen END,
        country = CASE WHEN site_visitors.country = '' THEN EXCLUDED.country ELSE site_visitors.country END,
        region = CASE WHEN site_visitors.region = '' THEN EXCLUDED.region ELSE site_visitors.region END,
        city = CASE WHEN site_visitors.city = '' THEN EXCLUDED.city ELSE site_visitors.city END,
        first_referrer = CASE WHEN site_visitors.first_referrer = '' THEN EXCLUDED.first_referrer ELSE site_visitors.first_referrer END,
        first_landing = CASE WHEN site_visitors.first_landing = '' THEN EXCLUDED.first_landing ELSE site_visitors.first_landing END,
        utm_source = CASE WHEN site_visitors.utm_source = '' THEN EXCLUDED.utm_source ELSE site_visitors.utm_source END,
        utm_medium = CASE WHEN site_visitors.utm_medium = '' THEN EXCLUDED.utm_medium ELSE site_visitors.utm_medium END,
        utm_campaign = CASE WHEN site_visitors.utm_campaign = '' THEN EXCLUDED.utm_campaign ELSE site_visitors.utm_campaign END
      `,
      [
        visitorId,
        traits.fingerprint,
        sessionId,
        isPageview ? 1 : 0,
        device,
        browser,
        os,
        traits.language,
        traits.timezone,
        traits.screen,
        country,
        region,
        city,
        referrerHost,
        path,
        traits.utmSource,
        traits.utmMedium,
        traits.utmCampaign,
        isPageview,
      ],
    );

    await getPool().query(
      `
      INSERT INTO site_events (visitor_id, session_id, event_type, path, label, target)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [visitorId, sessionId, type, path, label, target],
    );

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("POST /api/track failed", error);
    return new Response(null, { status: 500 });
  }
}

function isTrackType(value: unknown): value is TrackType {
  return value === "pageview" || value === "click";
}

function decodeHeader(value: string | null): string {
  if (!value) {
    return "";
  }
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function detectDeviceType(ua: string): string {
  const text = ua.toLowerCase();
  if (text.includes("ipad") || text.includes("tablet")) {
    return "tablet";
  }
  if (text.includes("mobile") || text.includes("iphone") || text.includes("android")) {
    return "mobile";
  }
  return "desktop";
}

function detectBrowser(ua: string): string {
  const text = ua.toLowerCase();
  if (text.includes("edg/")) {
    return "Edge";
  }
  if (text.includes("firefox/")) {
    return "Firefox";
  }
  if (text.includes("chrome/") && !text.includes("edg/")) {
    return "Chrome";
  }
  if (text.includes("safari/") && !text.includes("chrome/")) {
    return "Safari";
  }
  return "Other";
}

function detectOs(ua: string): string {
  const text = ua.toLowerCase();
  if (text.includes("iphone") || text.includes("ipad") || text.includes("ios")) {
    return "iOS";
  }
  if (text.includes("android")) {
    return "Android";
  }
  if (text.includes("windows")) {
    return "Windows";
  }
  if (text.includes("mac os") || text.includes("macintosh")) {
    return "macOS";
  }
  if (text.includes("linux")) {
    return "Linux";
  }
  return "Other";
}

function readTraits(value: unknown): Traits {
  if (!value || typeof value !== "object") {
    return emptyTraits();
  }

  const data = value as Record<string, unknown>;
  return {
    fingerprint: readText(data.fingerprint, MAX_FINGERPRINT),
    language: readText(data.language, MAX_TRAIT_TEXT),
    timezone: readText(data.timezone, MAX_TRAIT_TEXT),
    screen: readText(data.screen, MAX_TRAIT_TEXT),
    referrer: readText(data.referrer, MAX_TARGET),
    utmSource: readText(data.utmSource, MAX_TRAIT_TEXT),
    utmMedium: readText(data.utmMedium, MAX_TRAIT_TEXT),
    utmCampaign: readText(data.utmCampaign, MAX_TRAIT_TEXT),
  };
}

function emptyTraits(): Traits {
  return {
    fingerprint: "",
    language: "",
    timezone: "",
    screen: "",
    referrer: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  };
}

function readReferrerHost(referrer: string, request: Request): string {
  if (!referrer) {
    return "";
  }

  let host = "";
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return "";
  }

  // Navigating inside our own site is not a referrer.
  if (host === readOwnHost(request)) {
    return "";
  }

  return host.slice(0, MAX_TRAIT_TEXT);
}

/** Host of the site itself, so internal navigation is not stored as a referrer. */
function readOwnHost(request: Request): string {
  try {
    const requestHost = new URL(request.url).hostname.toLowerCase();
    if (requestHost) {
      return requestHost;
    }
  } catch {
    // Fall through to the configured site url.
  }

  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || "").hostname.toLowerCase();
  } catch {
    return "";
  }
}
