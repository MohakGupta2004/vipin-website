import type { ComponentProps } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { focusRing } from "@/components/forms/styles"
import { cn } from "@/lib/utils"

/**
 * Standalone "go somewhere" text link with a north-east arrow (same as the hero links).
 * Use tone="dark" on navy or photo backgrounds.
 */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
  ...anchorProps
}: ComponentProps<typeof Link> & { href: string; tone?: "light" | "dark" }) {
  const isExternal = href.startsWith("http")

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
      className={cn(
        "group inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium transition-opacity duration-150 hover:opacity-75",
        tone === "dark" ? "text-white" : "text-link",
        focusRing,
        className
      )}
      {...anchorProps}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={2}
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
      {isExternal ? <span className="sr-only">(opens in a new tab)</span> : null}
    </Link>
  )
}
