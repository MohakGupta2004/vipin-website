"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counts a stat like "2000+" up from 0 once, on load.
 * - Server and no-JS render the final value, so nothing is wrong if the script never runs.
 * - An invisible copy of the final value holds the width, so the line never jitters as digits grow.
 * - Strong ease-out (fast start, long soft landing), no overshoot. Reduced motion: shows the final value.
 * Non-numeric values (e.g. "CFA Charterholder") render as plain text.
 */
export function CountUp({
  value,
  duration = 1900,
  delay = 450,
}: {
  value: string
  duration?: number
  delay?: number
}) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ""
  const [n, setN] = useState<number | null>(null) // null = show final (server / reduced motion)
  const raf = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (target === null) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now
      const t = Math.min((now - start) / duration, 1)
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) // easeOutExpo
      setN(Math.round(target * eased))
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else setN(null)
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start from 0 only after mount, so the server HTML keeps the final value
    setN(0)
    const timer = window.setTimeout(() => {
      raf.current = requestAnimationFrame(tick)
    }, delay)
    return () => {
      window.clearTimeout(timer)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, duration, delay])

  if (target === null) return <>{value}</>

  return (
    <span className="relative inline-block tabular-nums">
      <span className="invisible">{value}</span>
      <span aria-hidden="true" className="absolute inset-0 text-center">
        {n === null ? target : n}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
