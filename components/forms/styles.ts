/**
 * Shared class strings for forms and the finder. Token names follow
 * DESIGN-DIRECTION §2.2 (surface, surface-2, border-strong, link, cta, teal-tint…).
 * Tailwind merges these over the base `components/ui` variants.
 */

/** 2px ring + 2px offset focus style (§5.13, §5.17). */
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-0";

const btn =
  "h-11 rounded-md px-5 text-[15px] font-semibold active:translate-y-px disabled:cursor-not-allowed";

/** The one orange conversion button per view. */
export const ctaButton = `${btn} bg-cta text-cta-foreground hover:bg-cta-hover ${focusRing}`;
export const primaryButton = `${btn} ${focusRing}`;
export const secondaryButton = `${btn} border-border-strong bg-surface text-heading hover:bg-accent ${focusRing}`;
export const textLink = `inline-flex min-h-11 items-center gap-1 rounded-sm font-medium text-link underline-offset-4 hover:underline ${focusRing}`;

/** Text input, select and textarea. 48px tall, 16px text. */
export const controlBase =
  "w-full min-w-0 rounded-sm border border-border-strong bg-surface px-3 text-base md:text-base text-foreground placeholder:text-placeholder outline-none transition-colors focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0 disabled:opacity-50";
export const controlHeight = "h-12";
