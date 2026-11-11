"use client"

import * as React from "react"
import { Dialog } from "@base-ui/react/dialog"
import { ArrowUpRight, SendHorizontal, X } from "lucide-react"

import { VipinPhoto } from "@/components/course/vipin-photo"
import { markOverlayOpen, OVERLAY_ATTR } from "@/components/overlays/use-overlay-gate"
import { readStorage, writeStorage } from "@/components/overlays/storage"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { floatingButton } from "./floating-control"

/** Accepts either a full wa.me URL or a bare number and always returns a wa.me URL. */
function whatsappHref(value: string): string {
  if (/^https?:\/\//i.test(value)) return value
  return `https://wa.me/${value.replace(/\D/g, "")}`
}

/** wa.me link with the message already typed in the visitor's WhatsApp. */
function whatsappHrefWithText(value: string, text: string): string {
  const url = new URL(whatsappHref(value))
  url.searchParams.set("text", text)
  return url.toString()
}

const FIRST_RIPPLE_KEY = "vg-wa-ripple-load"
const SCROLL_RIPPLE_KEY = "vg-wa-ripple-scroll"
const FIRST_RIPPLE_DELAY_MS = 2500
const LABEL_VISIBLE_MS = 4000
const RING_COUNT = 3
const RING_DURATION_MS = 1600
const RING_STAGGER_MS = 400

// Chat popup: how long Vipin is "typing" before the message pops in, then when the quick replies follow.
const TYPING_MS = 1100
const REPLIES_DELAY_MS = 350
const OVERLAY_ID = "whatsapp-chat"

const quickReplies = [
  { label: "Securities · IFC, CSC & CIRE", message: "Hi Vipin, I'm preparing for a securities exam (IFC, CSC or CIRE)." },
  { label: "Financial planning", message: "Hi Vipin, I'm preparing for a financial planning exam." },
  { label: "Not sure which exam", message: "Hi Vipin, I'm not sure which exam I need. Can you help?" },
]

const whatsappIcon = (
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
)

function isReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Floating WhatsApp CTA, fixed bottom-right: solid brand green with a lift shadow.
 * It draws attention twice per session at most (a few soft rings, opacity + scale only):
 * once shortly after load, and once the first time the visitor scrolls past the first screen.
 * On phones the "Chat with Vipin" label slides out with the first ripple, then collapses.
 * Tapping it opens a small chat card at the bottom (see ChatPopup). The calendar button sits above this one.
 */
export function WhatsAppButton() {
  const { whatsapp } = siteConfig.contact
  const [showLabel, setShowLabel] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const ringRefs = React.useRef<(HTMLSpanElement | null)[]>([])

  React.useEffect(() => {
    if (isReducedMotion()) return

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

  // While the chat is open, tell the lead pop-ups (sign-up prompt, exit intent) to stay away.
  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (nextOpen) {
      setShowLabel(false)
      markOverlayOpen(OVERLAY_ID)
      return
    }
    if (document.documentElement.getAttribute(OVERLAY_ATTR) === OVERLAY_ID) {
      markOverlayOpen(null)
    }
  }

  if (!whatsapp) return null

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange} modal="trap-focus">
      <Dialog.Trigger
        aria-label="Chat on WhatsApp"
        className={cn(
          floatingButton,
          "size-12 cursor-pointer bg-[#25D366] text-white shadow-[0_8px_24px_-8px_rgb(37_211_102/0.55)] hover:bg-[#1EBE5A] sm:size-14",
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
          {whatsappIcon}
        </svg>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-[rgb(16_42_66/0.28)] transition-opacity duration-200 ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none lg:bg-transparent" />
        <ChatPopup whatsapp={whatsapp} onSent={() => handleOpenChange(false)} />
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/**
 * Small WhatsApp-style chat card. Phones: floats just above the bottom edge, full width minus a gutter.
 * Desktop: a 360px card above the button. Vipin "types", his message pops in, then quick replies.
 * Every reply opens WhatsApp with that message already written.
 */
function ChatPopup({ whatsapp, onSent }: { whatsapp: string; onSent: () => void }) {
  // The popup mounts fresh on every open, so the short "typing" moment replays each time.
  // Reduced motion: skip straight to the message and replies.
  const [stage, setStage] = React.useState<"typing" | "message" | "replies">(() =>
    isReducedMotion() ? "replies" : "typing"
  )
  const [draft, setDraft] = React.useState("")
  const closeRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (isReducedMotion()) return
    const messageTimer = window.setTimeout(() => setStage("message"), TYPING_MS)
    const repliesTimer = window.setTimeout(() => setStage("replies"), TYPING_MS + REPLIES_DELAY_MS)
    return () => {
      window.clearTimeout(messageTimer)
      window.clearTimeout(repliesTimer)
    }
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    window.open(whatsappHrefWithText(whatsapp, text), "_blank", "noopener,noreferrer")
    setDraft("")
    onSent()
  }

  return (
    <Dialog.Popup
      initialFocus={closeRef}
      className={cn(
        "fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)_+_0.75rem)] z-50 flex max-h-[min(34rem,calc(100dvh-6rem))] flex-col overflow-hidden rounded-[1.75rem] bg-white text-foreground shadow-[0_24px_64px_-16px_rgb(16_42_66/0.45),0_0_0_0.5px_rgb(0_0_0/0.08)] outline-hidden",
        "sm:right-4 sm:left-auto sm:w-[22.5rem] lg:right-6 lg:bottom-6",
        "origin-bottom transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:origin-bottom-right",
        "data-[starting-style]:translate-y-4 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:translate-y-2 data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[ending-style]:duration-150",
        "motion-reduce:transition-opacity motion-reduce:data-[starting-style]:transform-none"
      )}
    >
      {/* Header: WhatsApp-green band with Vipin's photo. */}
      <div className="flex items-center gap-3 bg-linear-to-br from-[#128C7E] to-[#075E54] px-4 py-3.5 text-white">
        <VipinPhoto size={44} round className="ring-2 ring-white/30" />
        <div className="min-w-0 flex-1">
          <Dialog.Title className="truncate text-[1.0625rem] leading-tight font-semibold text-white">Vipin Garg</Dialog.Title>
          <Dialog.Description className="mt-0.5 truncate text-[0.8125rem] text-white/80">
            {stage === "typing" ? "typing…" : "Finance exam coach · WhatsApp"}
          </Dialog.Description>
        </div>
        <Dialog.Close
          ref={closeRef}
          aria-label="Close chat"
          className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white outline-hidden transition-[transform,background-color] duration-150 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.94]"
        >
          <X aria-hidden="true" strokeWidth={2} className="size-5" />
        </Dialog.Close>
      </div>

      {/* Chat body on WhatsApp's beige wallpaper with a faint dot pattern. */}
      <div className="flex-1 overflow-y-auto bg-[#efeae2] bg-[radial-gradient(rgb(0_0_0/0.045)_1px,transparent_1px)] bg-size-[14px_14px] px-4 py-5">
        <p className="mx-auto mb-4 w-fit rounded-lg bg-white/80 px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide text-[#54656f] uppercase shadow-[0_1px_0.5px_rgb(0_0_0/0.08)]">
          Today
        </p>

        {stage === "typing" ? (
          <div className="vg-bubble inline-flex items-center gap-1 rounded-2xl rounded-tl-md bg-white px-4 py-3.5 shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]">
            <span className="vg-typing-dot size-2 rounded-full bg-[#8696a0]" />
            <span className="vg-typing-dot size-2 rounded-full bg-[#8696a0] [animation-delay:150ms]" />
            <span className="vg-typing-dot size-2 rounded-full bg-[#8696a0] [animation-delay:300ms]" />
            <span className="sr-only">Vipin is typing</span>
          </div>
        ) : (
          <div className="vg-bubble max-w-[85%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[0.9375rem] leading-[1.45] text-[#111b21] shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]">
            <p>Hi there 👋</p>
            <p className="mt-1">Which exam are you preparing for? Tap one below, or type your question.</p>
          </div>
        )}

        {stage === "replies" && (
          <ul className="mt-4 flex flex-col items-end gap-2">
            {quickReplies.map((reply, i) => (
              <li key={reply.label} className="vg-bubble [transform-origin:bottom_right]" style={{ animationDelay: `${i * 70}ms` }}>
                <a
                  href={whatsappHrefWithText(whatsapp, reply.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onSent}
                  className="group inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[0.875rem] font-semibold text-[#008069] shadow-[0_1px_0.5px_rgb(0_0_0/0.13),inset_0_0_0_1px_rgb(0_128_105/0.18)] outline-hidden transition-[background-color,transform] duration-150 hover:bg-[#d9fdd3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008069] active:scale-[0.97]"
                >
                  {reply.label}
                  <ArrowUpRight aria-hidden="true" strokeWidth={2.25} className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Composer: type a question, send opens WhatsApp with it. */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-black/5 bg-[#f0f2f5] px-3 py-2.5">
        <label htmlFor="wa-draft" className="sr-only">
          Your message
        </label>
        <input
          id="wa-draft"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message"
          autoComplete="off"
          enterKeyHint="send"
          className="h-11 min-w-0 flex-1 rounded-full bg-white px-4 text-base text-[#111b21] outline-hidden placeholder:text-[#8696a0] focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
        />
        <button
          type="submit"
          aria-label="Send on WhatsApp"
          disabled={!draft.trim()}
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_-4px_rgb(37_211_102/0.6)] outline-hidden transition-[transform,background-color,opacity] duration-150 hover:bg-[#1EBE5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008069] active:scale-[0.94] disabled:cursor-default disabled:opacity-50"
        >
          <SendHorizontal aria-hidden="true" strokeWidth={2} className="size-5" />
        </button>
      </form>
    </Dialog.Popup>
  )
}
