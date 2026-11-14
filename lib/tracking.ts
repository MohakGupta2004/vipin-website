/**
 * Shared helpers for cookie consent and website tracking.
 * Client-safe: every function checks that a browser is present before it touches the DOM.
 */

export type ConsentState = "unknown" | "granted" | "denied";

export const CONSENT_COOKIE = "vg_consent";
export const VISITOR_COOKIE = "vg_vid";
export const SESSION_COOKIE = "vg_sid";
export const SESSION_LAST_AT = "vg_sid_last_at";
export const FINGERPRINT_KEY = "vg_fingerprint";

export const COOKIE_DAYS = 365;
export const SESSION_IDLE_MS = 30 * 60 * 1000;

export function readCookie(name: string): string {
  if (typeof document === "undefined") {
    return "";
  }

  const list = document.cookie.split(";");
  for (const item of list) {
    const [rawName, ...rest] = item.trim().split("=");
    if (rawName !== name) continue;
    return decodeURIComponent(rest.join("="));
  }
  return "";
}

export function writeCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") {
    return;
  }

  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Expires=${expiresAt.toUTCString()}; SameSite=Lax${secure}`;
}

export function readConsentState(): ConsentState {
  const value = readCookie(CONSENT_COOKIE);
  if (value === "granted") return "granted";
  if (value === "denied") return "denied";
  return "unknown";
}

export function notifyConsentChanged(value: "granted" | "denied"): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent("vg-consent-change", { detail: value }));
}

/** SHA-256 hex of the browser traits, so the same person looks the same across sessions. */
export async function buildFingerprint(): Promise<string> {
  if (typeof window === "undefined") {
    return "";
  }

  const userAgent = navigator.userAgent || "";
  const language = navigator.language || "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const screen = `${window.screen.width}x${window.screen.height}`;
  const platform = navigator.platform || "";
  const cores = String(navigator.hardwareConcurrency || "");
  const memory = String((navigator as Navigator & { deviceMemory?: number }).deviceMemory || "");
  const combined = [userAgent, language, timezone, screen, platform, cores, memory].join("|");

  return sha256Hex(combined);
}

export async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  const list = Array.from(new Uint8Array(hash));

  let hex = "";
  for (const value of list) {
    hex += value.toString(16).padStart(2, "0");
  }
  return hex;
}
