/**
 * Shared class strings for forms and the finder. Token names follow
 * DESIGN-DIRECTION §2.2 (surface, surface-2, border-strong, link, cta, teal-tint…).
 * Tailwind merges these over the base `components/ui` variants.
 */

/** 2px ring + 2px offset focus style (§5.13, §5.17). */
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-0";

// 48px pills that press down slightly (feedback on press, not on release).
// max-sm:rounded-full beats the max-sm:rounded-xl in buttonVariants.
const btn =
  "h-12 rounded-full px-6 text-[15px] font-semibold transition-[background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none max-sm:rounded-full disabled:cursor-not-allowed";

/** The one blue conversion button per view (sign up, enrol, book). */
export const ctaButton = `${btn} bg-cta text-cta-foreground hover:bg-cta-hover ${focusRing}`;

/** Blue pill (with buttonVariants() default bg-primary). Main action in finders, forms, steppers. */
export const primaryButton = `${btn} ${focusRing}`;

/** Second action on light backgrounds. Works on <Button variant="outline"> and a plain <Link>. */
export const secondaryButton = `${btn} border-transparent bg-surface text-heading shadow-[0_0_0_1px_rgb(0_0_0/0.12)] hover:bg-[#f5f5f7] ${focusRing}`;

/** Solid white pill for navy bands (same as the hero's first pill). Not for light backgrounds. */
export const onDarkButton = `${btn} border-transparent bg-white text-heading hover:bg-white/90 ${focusRing}`;

/** Inline text link inside body copy. For standalone "go somewhere" links use <ArrowLink>. */
export const textLink = `inline-flex min-h-11 items-center gap-1 rounded-sm font-medium text-link underline-offset-4 hover:underline pointer-coarse:transition-opacity pointer-coarse:active:opacity-60 ${focusRing}`;

/** Text input, select and textarea. 48px tall, 16px text. */
export const controlBase =
  "w-full min-w-0 rounded-xl border border-border-strong bg-surface px-3 text-base md:text-base text-foreground placeholder:text-placeholder outline-hidden transition-colors focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0 disabled:opacity-50";
export const controlHeight = "h-12";
