"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  /** "icon" is the compact navbar button, "switch" is a labelled row for menus. */
  variant?: "icon" | "switch"
  className?: string
}

/** next-themes writes the theme to `<html class>`, so watch that directly. */
function subscribeToThemeClass(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })

  return () => observer.disconnect()
}

function getIsDark() {
  return document.documentElement.classList.contains("dark")
}

/**
 * Light/dark switch. Everything visible is driven by the `.dark` class (via
 * `dark:` variants) so it is correct on first paint — no hydration flash. The
 * class is also the source of truth for the label, read through
 * `useSyncExternalStore` so assistive tech announces the real current state.
 */
export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { setTheme } = useTheme()
  const isDark = React.useSyncExternalStore(
    subscribeToThemeClass,
    getIsDark,
    () => false
  )

  const label = isDark ? "Switch to light theme" : "Switch to dark theme"
  const toggle = () => setTheme(isDark ? "light" : "dark")

  if (variant === "switch") {
    return (
      <button
        type="button"
        onClick={toggle}
        role="switch"
        aria-checked={isDark}
        aria-label="Dark mode"
        className={cn(
          "flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-[15px] font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
          className
        )}
      >
        <span className="flex items-center gap-3">
          <span className="relative flex size-5 items-center justify-center text-primary">
            <Sun className="absolute size-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 motion-reduce:transition-none" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 motion-reduce:transition-none" />
          </span>
          Dark mode
        </span>

        <span
          aria-hidden="true"
          className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-input transition-colors duration-300 dark:bg-primary motion-reduce:transition-none"
        >
          <span className="inline-block size-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out dark:translate-x-[1.375rem] motion-reduce:transition-none" />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={`${label} (D)`}
      className={cn(
        "relative inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring active:scale-95 motion-reduce:active:scale-100",
        className
      )}
    >
      <span className="relative flex size-5 items-center justify-center">
        <Sun className="absolute size-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 motion-reduce:transition-none" />
        <Moon className="absolute size-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 motion-reduce:transition-none" />
      </span>
    </button>
  )
}
