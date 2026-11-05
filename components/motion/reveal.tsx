"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Rises its children in once when they scroll into view.
 * Server HTML is fully visible (no-JS and crawlers see everything). After hydration, only blocks that are
 * still below the fold are hidden, so nothing on screen ever flashes. Reduced motion: no effect at all.
 */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return // already on screen

    el.dataset.reveal = "hidden"
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.style.transitionDelay = `${delay}ms`
        el.dataset.reveal = "shown"
        io.disconnect()
      },
      { rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={cn("vg-reveal", className)}>
      {children}
    </div>
  )
}
