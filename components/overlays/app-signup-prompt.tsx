"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { appUrl } from "@/components/layout/app-links"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { DAY_MS, readStorage, writeStorage } from "./storage"
import { isAnyOverlayOpen, markOverlayOpen } from "./use-overlay-gate"

export type AppSignupPromptConfig = {
  enabled: boolean
  /** Seconds on a page before the prompt shows. */
  delaySeconds: number
  /** Minutes to wait after a dismissal before it can show again. */
  cooldownMinutes: number
  /** Dismissals after which the prompt stops being closable. */
  maxDismissals: number
  afterMaxDismissals: "block" | "sticky-bar"
  excludePaths: string[]
}

const STATE_KEY = "vg-app-prompt"
const VISITED_KEY = "vg-app-visited"
const SESSION_KEY = "vg:overlay-shown"
const VISITED_DAYS = 30
const RETRY_MS = 5000

type State = { dismissals: number; lastDismissedAt: number }

// In-memory mirror: if storage is blocked we behave like a first visit (never block),
// but still avoid re-showing within the same tab session.
let memory: State = { dismissals: 0, lastDismissedAt: 0 }
let storageWorks: boolean | null = null

function checkStorage(): boolean {
  if (storageWorks !== null) return storageWorks
  try {
    writeStorage("local", "vg-storage-test", "1")
    storageWorks = readStorage("local", "vg-storage-test") === "1"
  } catch {
    storageWorks = false
  }
  return storageWorks
}

function readState(): State {
  if (!checkStorage()) return memory
  try {
    const raw = readStorage("local", STATE_KEY)
    if (!raw) return memory
    const v = JSON.parse(raw) as Partial<State>
    return {
      dismissals: Number.isFinite(v.dismissals) ? Number(v.dismissals) : 0,
      lastDismissedAt: Number.isFinite(v.lastDismissedAt) ? Number(v.lastDismissedAt) : 0,
    }
  } catch {
    return memory
  }
}

function writeState(s: State) {
  memory = s
  if (checkStorage()) writeStorage("local", STATE_KEY, JSON.stringify(s))
}

function recentlyVisited(): boolean {
  const raw = readStorage("local", VISITED_KEY)
  const at = raw ? Number(raw) : 0
  return Number.isFinite(at) && at > 0 && Date.now() - at < VISITED_DAYS * DAY_MS
}

type Mode = "closed" | "modal" | "block" | "bar"

/**
 * App sign-up prompt: the priority overlay. Sends visitors to app.vipingarg.com.
 * Rendered once from OverlayHost. See PLAN "App traffic goal".
 */
export function AppSignupPrompt({ config }: { config: AppSignupPromptConfig }) {
  const pathname = usePathname()
  const [mode, setMode] = React.useState<Mode>("closed")
  const excluded = config.excludePaths.some((p) => pathname === p || pathname.startsWith(p + "/"))

  // Schedule on each page view (route change re-runs this effect).
  React.useEffect(() => {
    if (!config.enabled || excluded) return
    let timer: number | undefined
    let cancelled = false

    const attempt = () => {
      if (cancelled) return
      if (recentlyVisited()) return
      const state = readState()
      const capped = state.dismissals >= config.maxDismissals
      if (!capped && state.dismissals > 0 && Date.now() - state.lastDismissedAt < config.cooldownMinutes * 60_000) return
      if (isAnyOverlayOpen()) {
        timer = window.setTimeout(attempt, RETRY_MS)
        return
      }
      // Exit-intent and slide-in share this session key, so they stay quiet once we show.
      writeStorage("session", SESSION_KEY, "app-signup-prompt")
      markOverlayOpen("app-signup-prompt")
      setMode(capped ? (config.afterMaxDismissals === "sticky-bar" ? "bar" : "block") : "modal")
    }

    timer = window.setTimeout(attempt, config.delaySeconds * 1000)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      // Navigating away clears the prompt; a blocked visitor sees it again on the next page.
      setMode((m) => {
        if (m !== "closed") markOverlayOpen(null)
        return "closed"
      })
    }
  }, [config, excluded, pathname])

  const dismiss = () => {
    const s = readState()
    writeState({ dismissals: s.dismissals + 1, lastDismissedAt: Date.now() })
    markOverlayOpen(null)
    setMode("closed")
  }

  const markVisited = () => writeStorage("local", VISITED_KEY, String(Date.now()))

  if (mode === "closed") return null
  const signup = appUrl("signup", { campaign: "app-prompt", content: mode })
  const login = appUrl("login", { campaign: "app-prompt", content: mode })
  // hidden until courses live in app: const browse = appUrl("courses", { campaign: "app-prompt", content: mode })

  const actions = (
    <div className={cn("flex flex-col gap-3", mode === "bar" && "sm:flex-row sm:items-center")}>
      <a href={signup} onClick={markVisited} className={cn(buttonVariants({ variant: "cta", size: "lg" }))}>
        Create free account
      </a>
      <a href={login} onClick={markVisited} className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
        Log in
      </a>
    </div>
  )

  if (mode === "bar") {
    return (
      <div
        role="region"
        aria-label="Create your free account"
        className="vg-enter-up fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-float"
      >
        <div className="container-site flex flex-col gap-3 !px-0 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9375rem] font-semibold text-heading">
            Live classes with Vipin, practice between classes, all courses in one app.
          </p>
          {actions}
        </div>
      </div>
    )
  }

  const blocking = mode === "block"
  return (
    <DialogPrimitive.Root
      open
      modal
      disablePointerDismissal={blocking}
      onOpenChange={(open, details) => {
        if (open) return
        if (blocking) {
          details.cancel()
          return
        }
        dismiss()
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="vg-enter-fade fixed inset-0 z-40 bg-[var(--scrim)]" />
        <DialogPrimitive.Popup
          className="vg-enter-up fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-120 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-surface p-6 text-foreground shadow-modal outline-hidden vg-sheet max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-t-[1.75rem] max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0 max-sm:px-5 max-sm:pt-3 max-sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8"
        >
          {/* Grabber: reads as a sheet on phones. */}
          <div aria-hidden="true" className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border-strong/60 sm:hidden" />
          <DialogPrimitive.Title className="pr-8 font-heading text-2xl leading-tight font-semibold text-heading max-sm:pr-10 max-sm:text-[1.375rem] max-sm:tracking-[-0.015em]">
            Create your free account
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-3 text-[1.0625rem] text-muted-foreground max-sm:mt-2 max-sm:text-base">
            Live classes with Vipin, practice between classes, and all courses in one app.
          </DialogPrimitive.Description>
          <div className="mt-6 max-sm:mt-5">{actions}</div>
          <div className="mt-4 flex items-center justify-between gap-4 max-sm:mt-1 max-sm:justify-center">
            {/* hidden until courses live in app
            <a
              href={browse}
              onClick={markVisited}
              className="inline-flex min-h-11 items-center text-[0.9375rem] font-semibold text-link underline underline-offset-3 hover:decoration-2"
            >
              Browse courses
            </a>
            */}
            {!blocking && (
              <DialogPrimitive.Close className="inline-flex min-h-11 items-center px-1 text-[0.9375rem] font-medium text-foreground underline underline-offset-3 hover:decoration-2 max-sm:text-muted-foreground max-sm:no-underline">
                Not now
              </DialogPrimitive.Close>
            )}
          </div>
          {!blocking && (
            <DialogPrimitive.Close
              aria-label="Close"
              className="absolute top-2 right-2 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground max-sm:top-4 max-sm:right-3 max-sm:rounded-full"
            >
              <X aria-hidden="true" strokeWidth={1.75} className="size-5" />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
