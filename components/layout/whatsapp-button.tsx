"use client"

import * as React from "react"

import { readStorage, writeStorage } from "@/components/overlays/storage"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { floatingButton } from "./floating-control"

/** Accepts either a full wa.me URL or a bare number and always returns a wa.me URL. */
function whatsappHref(value: string): string {
  if (/^https?:\/\//i.test(value)) return value
  return `https://wa.me/${value.replace(/\D/g, "")}`
}

const FIRST_RIPPLE_KEY = "vg-wa-ripple-load"
const SCROLL_RIPPLE_KEY = "vg-wa-ripple-scroll"
const FIRST_RIPPLE_DELAY_MS = 2500
const LABEL_VISIBLE_MS = 4000
const RING_COUNT = 3
const RING_DURATION_MS = 1600
const RING_STAGGER_MS = 400

/**
 * Floating WhatsApp CTA, fixed bottom-right: solid brand green with a lift shadow.
 * It draws attention twice per session at most (a few soft rings, opacity + scale only):
 * once shortly after load, and once the first time the visitor scrolls past the first screen.
 * On phones the "Chat with Vipin" label slides out with the first ripple, then collapses.
 * Reduced motion: no ripple, no slide. The calendar button sits above this one.
 */
export function WhatsAppButton() {
  const { whatsapp } = siteConfig.contact
  const [showLabel, setShowLabel] = React.useState(false)
  const ringRefs = React.useRef<(HTMLSpanElement | null)[]>([])

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const playRipple = () => {
      for (let i = 0; i < ringRefs.current.length; i++) {
        const ring = ringRefs.current[i]
        if (!ring) continue
        ring.animate(
          [
            { transform: "scale(1)", opacity: 0.45 },
            { transform: "scale(1.9)", opacity: 0 },
          ],
          { duration: RING_DURATION_MS, delay: i * RING_STAGGER_MS, easing: "cubic-bezier(0.2, 0, 0, 1)" }
        )
      }
    }

    let labelTimer: number | undefined
    let firstTimer: number | undefined

    if (!readStorage("session", FIRST_RIPPLE_KEY)) {
      firstTimer = window.setTimeout(() => {
        writeStorage("session", FIRST_RIPPLE_KEY, "1")
        playRipple()
        setShowLabel(true)
        labelTimer = window.setTimeout(() => setShowLabel(false), LABEL_VISIBLE_MS)
      }, FIRST_RIPPLE_DELAY_MS)
    }

    const onScroll = () => {
      if (window.scrollY < window.innerHeight) return
      window.removeEventListener("scroll", onScroll)
      writeStorage("session", SCROLL_RIPPLE_KEY, "1")
      playRipple()
    }
    if (!readStorage("session", SCROLL_RIPPLE_KEY)) {
      window.addEventListener("scroll", onScroll, { passive: true })
    }

    return () => {
      window.clearTimeout(firstTimer)
      window.clearTimeout(labelTimer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  if (!whatsapp) return null

  return (
    <a
      href={whatsappHref(whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        floatingButton,
        "size-12 bg-[#25D366] text-white shadow-[0_8px_24px_-8px_rgb(37_211_102/0.55)] hover:bg-[#1EBE5A] sm:size-14",
        "right-4 bottom-[calc(env(safe-area-inset-bottom)_+_5.5rem)] lg:right-6 lg:bottom-6"
      )}
    >
      {Array.from({ length: RING_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el
          }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-0"
        />
      ))}
      {/* Label pill: always on desktop; on phones it slides out once, then collapses. */}
      <span
        className={cn(
          "glass-control pointer-events-none absolute right-full mr-3 rounded-full px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-foreground transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none lg:[visibility:inherit] lg:translate-x-0 lg:opacity-100",
          showLabel ? "visible translate-x-0 opacity-100" : "invisible translate-x-2 opacity-0"
        )}
      >
        Chat with Vipin
      </span>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="relative size-6 sm:size-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    </a>
  )
}
