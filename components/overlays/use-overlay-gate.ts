"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { DAY_MS, readStorage, writeStorage } from "./storage"

const SESSION_KEY = "vg:overlay-shown"
const dismissKey = (id: string) => `vg:overlay-dismissed:${id}`

export type OverlayGateOptions = {
  /** Stable overlay id, e.g. "diagnostic-slide-in". */
  id: string
  /** Days to stay hidden after the visitor closes it. */
  suppressDays: number
  /** Set false on routes where overlays must never show (contact, legal). */
  enabled?: boolean
}

/** True when this overlay may be shown now: not suppressed, and no other overlay shown this session. */
export function canShowOverlay(id: string, suppressDays: number): boolean {
  if (readStorage("session", SESSION_KEY)) return false
  const raw = readStorage("local", dismissKey(id))
  if (raw) {
    const at = Number(raw)
    if (Number.isFinite(at) && Date.now() - at < suppressDays * DAY_MS) return false
  }
  return true
}

/**
 * Gate for lead-capture overlays. One overlay per session; per-overlay suppression after close.
 * `open()` re-checks the gate at call time, so a trigger that fires late cannot double-show.
 */
export function useOverlayGate({ id, suppressDays, enabled = true }: OverlayGateOptions) {
  const [isOpen, setIsOpen] = useState(false)
  const opened = useRef(false)

  const open = useCallback(() => {
    if (!enabled || opened.current || !canShowOverlay(id, suppressDays)) return false
    opened.current = true
    writeStorage("session", SESSION_KEY, id)
    setIsOpen(true)
    return true
  }, [enabled, id, suppressDays])

  const close = useCallback(() => {
    writeStorage("local", dismissKey(id), String(Date.now()))
    setIsOpen(false)
  }, [id])

  return { isOpen, open, close, enabled }
}

/** Convenience: whether the user prefers reduced motion (read once at call time, SSR-safe). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Hook form so overlay UI can switch off transitions reactively. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}
