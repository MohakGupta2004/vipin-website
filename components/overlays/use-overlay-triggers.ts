"use client"

import { useEffect } from "react"

type ScrollOrTimeOptions = {
  onTrigger: () => void
  enabled?: boolean
  /** 0..1 of scrollable height. Default 0.5. */
  scrollRatio?: number
  /** Milliseconds on page. Default 45000. */
  delayMs?: number
}

/** Fires once: after the visitor scrolls past `scrollRatio` or after `delayMs`, whichever is first. */
export function useScrollOrTimeTrigger({
  onTrigger,
  enabled = true,
  scrollRatio = 0.5,
  delayMs = 45_000,
}: ScrollOrTimeOptions) {
  useEffect(() => {
    if (!enabled) return
    let fired = false
    const fire = () => {
      if (fired) return
      fired = true
      cleanup()
      onTrigger()
    }
    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      if (window.scrollY / scrollable >= scrollRatio) fire()
    }
    const timer = window.setTimeout(fire, delayMs)
    function cleanup() {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return cleanup
  }, [enabled, onTrigger, scrollRatio, delayMs])
}

type ExitIntentOptions = {
  onTrigger: () => void
  enabled?: boolean
  /** Ignore the first N ms after mount to avoid instant fires. Default 5000. */
  graceMs?: number
}

/**
 * Desktop exit intent: pointer leaves the viewport through the top edge.
 * Skipped on touch-first devices (no hover or coarse pointer). Fires once.
 */
export function useExitIntent({ onTrigger, enabled = true, graceMs = 5000 }: ExitIntentOptions) {
  useEffect(() => {
    if (!enabled || !window.matchMedia) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const start = Date.now()
    let fired = false
    const onLeave = (e: MouseEvent) => {
      if (fired || e.relatedTarget !== null || e.clientY > 0) return
      if (Date.now() - start < graceMs) return
      fired = true
      document.removeEventListener("mouseleave", onLeave)
      onTrigger()
    }
    document.addEventListener("mouseleave", onLeave)
    return () => document.removeEventListener("mouseleave", onLeave)
  }, [enabled, onTrigger, graceMs])
}
