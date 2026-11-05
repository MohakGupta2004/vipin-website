import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * One type scale for every home section (matches the hero and /upcoming-batches):
 * a large semibold headline with tight, size-specific tracking, and a soft grey lead.
 * Hierarchy comes from size and weight, not colour or decoration.
 */
export function SectionIntro({
  title,
  lead,
  align = "left",
  tone = "light",
  size = "lg",
  id,
  className,
  children,
}: {
  title: ReactNode
  lead?: ReactNode
  align?: "left" | "center"
  tone?: "light" | "dark"
  /** "md" for split layouts where the intro sits beside content. */
  size?: "lg" | "md"
  id?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      <h2
        id={id}
        className={cn(
          "font-heading text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] text-balance sm:text-5xl",
          size === "lg" ? "lg:text-[3.5rem]" : "lg:text-[2.75rem]",
          tone === "dark" ? "text-inverse-fg" : "text-heading"
        )}
      >
        {title}
      </h2>
      {lead ? (
        <div
          className={cn(
            "mt-5 text-lg leading-[1.55] text-pretty sm:text-xl",
            align === "center" && "mx-auto",
            "max-w-[46ch]",
            tone === "dark" ? "text-inverse-muted" : "text-muted-foreground"
          )}
        >
          {lead}
        </div>
      ) : null}
      {children}
    </div>
  )
}
