/**
 * Typed, validated loader for `config/feature-flags.json`.
 *
 * The owner edits the JSON by hand. A typo or missing field must never break
 * the site, so every value is checked at load time and falls back to a safe
 * default. In development a console warning says what was wrong.
 *
 * Safe defaults:
 * - announcementBar: hidden (a half-filled bar must not show).
 * - appSignupPrompt: OFF when missing or not an object. Individual bad numbers use the defaults below.
 *   `afterMaxDismissals` defaults to "sticky-bar" (never "block") so a typo cannot lock visitors out.
 * - every other flag: enabled (a missing flag keeps the site working as designed).
 */

import raw from "@/config/feature-flags.json";

export type AnnouncementBarFlag = {
  enabled: boolean;
  /**
   * "manual" (default): show the text below as written.
   * "cohorts": build the bar from lib/data/batches.ts. It names a cohort only when it is published, open and
   * starts in the future; otherwise it shows the neutral "Upcoming Batches · Explore Group Classes & Start Dates".
   */
  source: "manual" | "cohorts";
  /** Visitors who dismissed a bar with this id do not see it again. Change the id to show it to everyone. */
  id: string;
  message: string;
  /** Optional short tag shown before the message, e.g. "New". */
  badge?: string;
  /** Optional bold lead-in before the message, e.g. "IFC Group Class". */
  title?: string;
  linkLabel?: string;
  /** Internal path starting with "/" or a full https:// URL. */
  linkHref?: string;
  dismissible: boolean;
};

/** Flags that are a plain on/off switch. */
export type ToggleName =
  | "homeCourseSearch"
  | "examFinder"
  | "exitIntentPopup"
  | "diagnosticSlideIn"
  | "masterclassSignup";

export type AppSignupPromptFlag = {
  enabled: boolean;
  /** Seconds on a page before the prompt appears. */
  delaySeconds: number;
  /** After a dismissal, minutes before it can appear again on a later page view. */
  cooldownMinutes: number;
  /** After this many dismissals the prompt stops being closable. */
  maxDismissals: number;
  /** "block": full modal that cannot be closed. "sticky-bar": slim bottom bar that cannot be closed. */
  afterMaxDismissals: "block" | "sticky-bar";
  /** Paths where the prompt never shows. A path ending in "/*" matches everything below it. */
  excludePaths: string[];
};

export type FeatureFlags = {
  announcementBar: AnnouncementBarFlag;
  appSignupPrompt: AppSignupPromptFlag;
  homeCourseSearch: { enabled: boolean };
  examFinder: { enabled: boolean };
  exitIntentPopup: { enabled: boolean };
  diagnosticSlideIn: { enabled: boolean };
  masterclassSignup: { enabled: boolean };
};

const TOGGLES: ToggleName[] = [
  "homeCourseSearch",
  "examFinder",
  "exitIntentPopup",
  "diagnosticSlideIn",
  "masterclassSignup",
];

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const isDev = process.env.NODE_ENV !== "production";

function parseFlags(input: unknown): { flags: FeatureFlags; warnings: string[] } {
  const warnings: string[] = [];
  const warn = (m: string) => warnings.push(m);
  const root = isRecord(input) ? input : {};
  if (!isRecord(input)) warn("feature-flags.json must be a JSON object. Using defaults.");

  // Plain toggles: default ON.
  const toggles = {} as Record<ToggleName, { enabled: boolean }>;
  for (const name of TOGGLES) {
    const v = root[name];
    if (isRecord(v) && typeof v.enabled === "boolean") {
      toggles[name] = { enabled: v.enabled };
    } else {
      if (v !== undefined) warn(`"${name}" must look like { "enabled": true } (or false). Using ON.`);
      else warn(`"${name}" is missing. Using ON.`);
      toggles[name] = { enabled: true };
    }
  }

  // Announcement bar: default OFF.
  const off: AnnouncementBarFlag = { enabled: false, source: "manual", id: "", message: "", dismissible: true };
  let bar = off;
  const a = root.announcementBar;
  if (!isRecord(a)) {
    warn(`"announcementBar" is missing or not an object. The bar is hidden.`);
  } else if (a.enabled !== true) {
    if (typeof a.enabled !== "boolean") warn(`"announcementBar.enabled" must be true or false. The bar is hidden.`);
  } else if (a.source === "cohorts") {
    if (a.dismissible !== undefined && typeof a.dismissible !== "boolean")
      warn(`"announcementBar.dismissible" must be true or false. Using true.`);
    bar = {
      enabled: true,
      source: "cohorts",
      id: "",
      message: "",
      dismissible: typeof a.dismissible === "boolean" ? a.dismissible : true,
    };
  } else {
    if (a.source !== undefined && a.source !== "manual")
      warn(`"announcementBar.source" must be "manual" or "cohorts". Using "manual".`);
    const id = typeof a.id === "string" ? a.id.trim() : "";
    const message = typeof a.message === "string" ? a.message.trim() : "";
    if (!id) warn(`"announcementBar.id" is required when the bar is on. The bar is hidden.`);
    if (!message) warn(`"announcementBar.message" is required when the bar is on. The bar is hidden.`);
    if (id && message) {
      let linkHref: string | undefined;
      if (typeof a.linkHref === "string" && a.linkHref.trim()) {
        const h = a.linkHref.trim();
        if (h.startsWith("/") || h.startsWith("https://")) linkHref = h;
        else warn(`"announcementBar.linkHref" must start with "/" or "https://". The link is dropped.`);
      }
      const linkLabel = typeof a.linkLabel === "string" && a.linkLabel.trim() ? a.linkLabel.trim() : undefined;
      let badge: string | undefined;
      if (typeof a.badge === "string" && a.badge.trim()) {
        if (a.badge.trim().length <= 28) badge = a.badge.trim();
        else warn(`"announcementBar.badge" must be 28 characters or fewer. The badge is dropped.`);
      }
      let title: string | undefined;
      if (typeof a.title === "string" && a.title.trim()) {
        if (a.title.trim().length <= 40) title = a.title.trim();
        else warn(`"announcementBar.title" must be 40 characters or fewer. The title is dropped.`);
      }
      if (linkHref && !linkLabel) warn(`"announcementBar.linkLabel" is missing. The link will read "Learn more".`);
      if (a.dismissible !== undefined && typeof a.dismissible !== "boolean")
        warn(`"announcementBar.dismissible" must be true or false. Using true.`);
      bar = {
        enabled: true,
        source: "manual",
        id,
        message,
        badge,
        title,
        linkLabel,
        linkHref,
        dismissible: typeof a.dismissible === "boolean" ? a.dismissible : true,
      };
    }
  }

  // App signup prompt: default OFF when missing.
  const promptDefaults: AppSignupPromptFlag = {
    enabled: false,
    delaySeconds: 20,
    cooldownMinutes: 30,
    maxDismissals: 3,
    afterMaxDismissals: "sticky-bar",
    excludePaths: [],
  };
  let prompt = promptDefaults;
  const p = root.appSignupPrompt;
  if (!isRecord(p)) {
    warn(`"appSignupPrompt" is missing or not an object. The prompt is off.`);
  } else {
    const num = (key: "delaySeconds" | "cooldownMinutes" | "maxDismissals", min: number, max: number) => {
      const v = p[key];
      if (v === undefined) return promptDefaults[key];
      if (typeof v === "number" && Number.isFinite(v) && v >= min && v <= max) return Math.round(v);
      warn(`"appSignupPrompt.${key}" must be a number from ${min} to ${max}. Using ${promptDefaults[key]}.`);
      return promptDefaults[key];
    };
    let after: AppSignupPromptFlag["afterMaxDismissals"] = "sticky-bar";
    if (p.afterMaxDismissals === "block" || p.afterMaxDismissals === "sticky-bar") after = p.afterMaxDismissals;
    else if (p.afterMaxDismissals !== undefined)
      warn(`"appSignupPrompt.afterMaxDismissals" must be "block" or "sticky-bar". Using "sticky-bar".`);
    let excludePaths: string[] = [];
    if (Array.isArray(p.excludePaths)) {
      excludePaths = p.excludePaths.filter((x): x is string => typeof x === "string" && x.startsWith("/"));
      if (excludePaths.length !== p.excludePaths.length)
        warn(`"appSignupPrompt.excludePaths" entries must be text starting with "/". Bad entries were ignored.`);
    } else if (p.excludePaths !== undefined) warn(`"appSignupPrompt.excludePaths" must be a list. Ignored.`);
    if (typeof p.enabled !== "boolean") warn(`"appSignupPrompt.enabled" must be true or false. The prompt is off.`);
    prompt = {
      enabled: p.enabled === true,
      delaySeconds: num("delaySeconds", 0, 600),
      cooldownMinutes: num("cooldownMinutes", 0, 10080),
      maxDismissals: num("maxDismissals", 1, 20),
      afterMaxDismissals: after,
      excludePaths,
    };
  }

  return { flags: { announcementBar: bar, appSignupPrompt: prompt, ...toggles }, warnings };
}

const parsed = parseFlags(raw);

if (isDev && parsed.warnings.length > 0) {
  console.warn(
    `[feature-flags] config/feature-flags.json has problems:\n - ${parsed.warnings.join("\n - ")}`,
  );
}

/** All flags, validated. Safe to call from server and client components. */
export function getFlags(): FeatureFlags {
  return parsed.flags;
}

/** True when the named on/off flag is enabled. */
export function isEnabled(name: ToggleName): boolean {
  return parsed.flags[name].enabled;
}

export type AnnouncementData = {
  source: "manual" | "cohorts";
  id: string;
  message: string;
  badge?: string;
  title?: string;
  href?: string;
  linkLabel?: string;
  dismissible: boolean;
};

/** The announcement bar content, or null when it is off or invalid. */
export function getAnnouncement(): AnnouncementData | null {
  const b = parsed.flags.announcementBar;
  if (!b.enabled) return null;
  return {
    source: b.source,
    id: b.id,
    message: b.message,
    badge: b.badge,
    title: b.title,
    href: b.linkHref,
    linkLabel: b.linkLabel,
    dismissible: b.dismissible,
  };
}

/** The app signup prompt settings, or null when it is off. */
export function getAppSignupPrompt(): AppSignupPromptFlag | null {
  return parsed.flags.appSignupPrompt.enabled ? parsed.flags.appSignupPrompt : null;
}

/** True when `pathname` is on the prompt's exclude list ("/x" exact, "/x/*" prefix). */
export function isPromptExcluded(pathname: string, excludePaths: string[]): boolean {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return excludePaths.some((rule) =>
    rule.endsWith("/*") ? clean === rule.slice(0, -2) || clean.startsWith(rule.slice(0, -1)) : clean === rule.replace(/\/+$/, ""),
  );
}
