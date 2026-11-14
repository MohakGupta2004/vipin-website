type RateEntry = {
  count: number;
  expiresAt: number;
};

const rateBuckets = new Map<string, RateEntry>();
const MAX_RATE_BUCKETS = 5000;

export function isOriginAllowed(request: Request): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) {
    return true;
  }

  const requestOrigin = normalizeOrigin(request.url);
  const allowed = new Set<string>();
  if (requestOrigin) {
    allowed.add(requestOrigin);
  }

  const envOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL || "");
  if (envOrigin) {
    allowed.add(envOrigin);
  }

  const incomingOrigin = normalizeOrigin(originHeader);
  if (!incomingOrigin) {
    return false;
  }

  return allowed.has(incomingOrigin);
}

export function readClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export function hitRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (rateBuckets.size > MAX_RATE_BUCKETS) {
    for (const [bucketKey, entry] of rateBuckets) {
      if (entry.expiresAt <= now) {
        rateBuckets.delete(bucketKey);
      }
    }
  }

  const current = rateBuckets.get(key);

  if (!current || current.expiresAt <= now) {
    rateBuckets.set(key, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  if (current.count >= limit) {
    return true;
  }

  current.count += 1;
  return false;
}

/** Trimmed text, cut to a maximum length. */
export function readText(value: unknown, maxLen: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maxLen);
}

/** The value when it is a UUID, otherwise an empty string. */
export function toUuidOrEmpty(value: unknown): string {
  const text = readText(value, 100);
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      text,
    );
  if (!isUuid) {
    return "";
  }
  return text;
}

function normalizeOrigin(value: string): string {
  try {
    return new URL(value).origin.toLowerCase();
  } catch {
    return "";
  }
}
