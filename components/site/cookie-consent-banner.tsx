"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  CONSENT_COOKIE,
  COOKIE_DAYS,
  FINGERPRINT_KEY,
  VISITOR_COOKIE,
  type ConsentState,
  buildFingerprint,
  notifyConsentChanged,
  readConsentState,
  readCookie,
  writeCookie,
} from "@/lib/tracking";

export function CookieConsentBanner() {
  const [mounted, setMounted] = React.useState(false);
  const [consent, setConsent] = React.useState<ConsentState>("unknown");

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the cookie after mount, so the server HTML and the first client render match
    setMounted(true);
    setConsent(readConsentState());
  }, []);

  if (!mounted || consent !== "unknown") {
    return null;
  }

  return (
    <section
      aria-live="polite"
      className="fixed right-[6.25rem] bottom-[calc(env(safe-area-inset-bottom)_+_0.75rem)] left-3 z-50 max-w-sm rounded-panel border border-border bg-white p-4 text-sm text-foreground shadow-float sm:left-4 sm:right-auto sm:w-[22rem] lg:left-6"
    >
      <p className="text-sm leading-6">
        We use cookies for consented website analytics so we can improve the site.
      </p>
      <div className="mt-3 flex gap-2">
        <Button type="button" size="sm" className="h-9" onClick={handleAccept}>
          Accept
        </Button>
        <Button type="button" size="sm" variant="outline" className="h-9" onClick={handleDecline}>
          Decline
        </Button>
      </div>
    </section>
  );

  async function handleAccept() {
    writeCookie(CONSENT_COOKIE, "granted", COOKIE_DAYS);

    let visitorId = readCookie(VISITOR_COOKIE);
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      writeCookie(VISITOR_COOKIE, visitorId, COOKIE_DAYS);
    }

    const fingerprint = await buildFingerprint();
    if (fingerprint) {
      sessionStorage.setItem(FINGERPRINT_KEY, fingerprint);
    }

    setConsent("granted");
    notifyConsentChanged("granted");
  }

  function handleDecline() {
    writeCookie(CONSENT_COOKIE, "denied", COOKIE_DAYS);
    setConsent("denied");
    notifyConsentChanged("denied");
  }
}
