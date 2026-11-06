/**
 * Shared behaviour of the floating WhatsApp / calendar buttons: fixed bottom-right, press shrinks to 96%,
 * and they hide while a modal or the nav curtain is open, so no more than three blurred surfaces are on screen.
 */
export const floatingButton =
  "fixed z-20 inline-flex items-center justify-center rounded-full outline-hidden transition-[transform,box-shadow,background-color,opacity,visibility] duration-150 ease-out active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none data-[base-ui-inert]:invisible data-[base-ui-inert]:opacity-0 [html[data-nav-open]_&]:invisible [html[data-nav-open]_&]:opacity-0"

/** Glass look for a floating control, with a slightly stronger hairline on hover. */
export const floatingGlass =
  "glass-control hover:shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.22),0_4px_8px_rgb(0_0_0/0.05)]"
