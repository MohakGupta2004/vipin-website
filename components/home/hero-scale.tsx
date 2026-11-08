"use client"

import { useLayoutEffect, useRef, useState } from "react"

/**
 * Renders children at a fixed design size (width x height) and scales the whole thing
 * down to the available width, like a thumbnail of the desktop layout.
 */
export function HeroScale({
  width,
  height,
  className,
  children,
}: {
  width: number
  height: number
  className?: string
  children: React.ReactNode
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  useLayoutEffect(() => {
    const outer = outerRef.current
    if (!outer) return
    const update = () => setScale(outer.clientWidth / width)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(outer)
    return () => observer.disconnect()
  }, [width])

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", aspectRatio: `${width} / ${height}` }}
    >
      <div
        style={{
          width,
          height,
          transformOrigin: "top left",
          transform: `scale(${scale ?? 0})`,
          visibility: scale === null ? "hidden" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}
