"use client";

import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { ctaButton } from "@/components/forms/styles";
import { cn } from "@/lib/utils";

/**
 * Bottom bar on small screens. Hidden while the inline price box is visible
 * (IntersectionObserver on #price-box, not scroll position).
 */
export function MobileCourseBar({ code, feeLabel, signupHref }: { code: string; feeLabel: string; signupHref: string }) {
  const [boxVisible, setBoxVisible] = React.useState(true);

  React.useEffect(() => {
    const el = document.getElementById("price-box");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setBoxVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      hidden={boxVisible}
      className="vg-enter-up glass-capsule fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-20 mx-3 flex h-14 items-center justify-between gap-3 rounded-full py-2 pr-2 pl-5 lg:hidden"
    >
      <p className="min-w-0 truncate text-[0.9375rem] tabular-nums">
        <span className="font-semibold text-heading">{code}</span>
        <span className="text-muted-foreground"> · {feeLabel}</span>
      </p>
      <a
        href={signupHref}
        rel="noopener"
        className={cn(buttonVariants(), ctaButton, "h-11 shrink-0 px-5")}
      >
        Sign up free
      </a>
    </div>
  );
}
