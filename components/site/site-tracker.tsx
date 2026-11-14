"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import {
  FINGERPRINT_KEY,
  SESSION_COOKIE,
  SESSION_IDLE_MS,
  SESSION_LAST_AT,
  VISITOR_COOKIE,
  type ConsentState,
  readConsentState,
  readCookie,
  sha256Hex,
} from "@/lib/tracking";

type TrackPayload = {
  type: "pageview" | "click";
  path: string;
  sessionId: string;
  visitorId?: string;
  label?: string;
  target?: string;
  traits?: {
    fingerprint: string;
    language: string;
    timezone: string;
    screen: string;
    referrer: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
  };
};

const MAX_LABEL = 80;
const MAX_TARGET = 300;

export function SiteTracker() {
  const pathname = usePathname();
  const [consent, setConsent] = React.useState<ConsentState>("unknown");

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the cookie after mount, so the server HTML and the first client render match
    setConsent(readConsentState());

    const onConsentChange = (event: Event) => {
      const custom = event as CustomEvent<string>;
      if (custom.detail === "granted" || custom.detail === "denied") {
        setConsent(custom.detail);
      }
      // Creates the visitor row right away, so a form sent before the next page still links to it.
      if (custom.detail === "granted") {
        void sendPageview(window.location.pathname || "/", "granted");
      }
    };

    window.addEventListener("vg-consent-change", onConsentChange);
    return () => {
      window.removeEventListener("vg-consent-change", onConsentChange);
    };
  }, []);

  // Reads the cookie at send time: the `consent` state is still "unknown" on the first render,
  // which would send an extra anonymous pageview on every full page load.
  React.useEffect(() => {
    if (!pathname) return;
    void sendPageview(pathname, readConsentState());
  }, [pathname]);

  React.useEffect(() => {
    if (consent !== "granted") {
      return;
    }

    const onClick = (event: MouseEvent) => {
      const node = event.target as Element | null;
      if (!node) {
        return;
      }

      const action = node.closest("a,button");
      if (!action) {
        return;
      }

      const label = cleanLabel(action.textContent || "");
      const target = cleanTarget(action);
      const path = window.location.pathname || "/";

      void sendClick(path, label, target);
    };

    document.addEventListener("click", onClick, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [consent]);

  return null;
}

async function sendPageview(path: string, consent: ConsentState) {
  const payload: TrackPayload = {
    type: "pageview",
    path,
    sessionId: getSessionId(),
  };

  if (consent === "granted") {
    const visitorId = readCookie(VISITOR_COOKIE);
    if (visitorId) {
      payload.visitorId = visitorId;
      payload.traits = await buildTraits();
    }
  }

  sendTrack(payload);
}

async function sendClick(path: string, label: string, target: string) {
  const visitorId = readCookie(VISITOR_COOKIE);
  if (!visitorId) {
    return;
  }

  const payload: TrackPayload = {
    type: "click",
    path,
    sessionId: getSessionId(),
    visitorId,
    label,
    target,
    traits: await buildTraits(),
  };

  sendTrack(payload);
}

function sendTrack(payload: TrackPayload) {
  const json = JSON.stringify(payload);
  const blob = new Blob([json], { type: "text/plain" });

  if (navigator.sendBeacon("/api/track", blob)) {
    return;
  }

  void fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: json,
    keepalive: true,
  });
}

function getSessionId(): string {
  const now = Date.now();
  const existingId = sessionStorage.getItem(SESSION_COOKIE);
  const lastAtText = sessionStorage.getItem(SESSION_LAST_AT);
  const lastAt = Number(lastAtText || "0");

  if (!existingId || !lastAt || now - lastAt > SESSION_IDLE_MS) {
    const next = crypto.randomUUID();
    sessionStorage.setItem(SESSION_COOKIE, next);
    sessionStorage.setItem(SESSION_LAST_AT, String(now));
    return next;
  }

  sessionStorage.setItem(SESSION_LAST_AT, String(now));
  return existingId;
}

async function buildTraits() {
  const language = navigator.language || "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const screen = `${window.screen.width}x${window.screen.height}`;

  let fingerprint = sessionStorage.getItem(FINGERPRINT_KEY) || "";
  if (!fingerprint) {
    const userAgent = navigator.userAgent || "";
    const platform = navigator.platform || "";
    const cores = String(navigator.hardwareConcurrency || "");
    const memory = String((navigator as Navigator & { deviceMemory?: number }).deviceMemory || "");
    const combined = [userAgent, language, timezone, screen, platform, cores, memory].join("|");
    fingerprint = await sha256Hex(combined);
    sessionStorage.setItem(FINGERPRINT_KEY, fingerprint);
  }

  const params = new URLSearchParams(window.location.search);

  return {
    fingerprint,
    language,
    timezone,
    screen,
    referrer: document.referrer || "",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
}

function cleanLabel(value: string): string {
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed.slice(0, MAX_LABEL);
}

function cleanTarget(element: Element): string {
  if (!(element instanceof HTMLAnchorElement)) {
    return "";
  }

  const href = element.getAttribute("href") || element.href || "";
  return href.trim().slice(0, MAX_TARGET);
}
