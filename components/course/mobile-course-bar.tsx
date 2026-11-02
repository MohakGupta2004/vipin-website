"use client";

import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { ctaButton } from "@/components/forms/styles";
import { cn } from "@/lib/utils";

/**
 * Bottom bar on small screens. Hidden while the inline price box is visible
 * (IntersectionObserver on #price-box, not scroll position).
 */
export function MobileCourseBar({ code, feeLabel }: { code: string; feeLabel: string }) {
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
      className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-float lg:hidden"
    >
      <div className="mx-auto flex max-w-(--container-site) items-center justify-between gap-3">
        <p className="min-w-0 text-sm">
          <span className="font-semibold tabular-nums text-heading">{code}</span>
          <span className="text-muted-foreground"> · {feeLabel}</span>
        </p>
        <a
          href="#register-interest"
          className={cn(buttonVariants(), ctaButton, "shrink-0 px-4")}
        >
          Register interest
        </a>
      </div>
    </div>
  );
}
