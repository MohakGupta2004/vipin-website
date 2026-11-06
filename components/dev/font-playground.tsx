"use client"

import * as React from "react"

type FontOption = { id: string; label: string; family: string }

const FONTS: FontOption[] = [
  { id: "manrope", label: "Manrope", family: "var(--font-manrope)" },
  { id: "inter", label: "Inter", family: "var(--font-inter)" },
  { id: "inter-tight", label: "Inter Tight", family: "var(--font-inter-tight)" },
  { id: "geist", label: "Geist", family: "var(--font-geist)" },
  { id: "hanken", label: "Hanken Grotesk", family: "var(--font-hanken)" },
  { id: "familjen", label: "Familjen Grotesk", family: "var(--font-familjen)" },
  { id: "instrument", label: "Instrument Sans", family: "var(--font-instrument)" },
  { id: "figtree", label: "Figtree", family: "var(--font-figtree)" },
  { id: "system", label: "System (SF Pro)", family: "system-ui, -apple-system, sans-serif" },
]

const WEIGHTS = ["350", "450", "600"]

const DEFAULT_FONT = "manrope"
const DEFAULT_WEIGHT = "600"
const STORAGE_KEY = "vg-font-playground"

function applyToPage(font: string, weight: string) {
  const html = document.documentElement
  html.setAttribute("data-font", font)
  // 600 is how headings are coded, so no attribute means "leave them alone".
  if (weight === DEFAULT_WEIGHT) {
    html.removeAttribute("data-display-weight")
  } else {
    html.setAttribute("data-display-weight", weight)
  }
}

const CHANGE_EVENT = "vg-font-playground-change"

function saveChoice(font: string, weight: string) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ font, weight }))
  } catch {
    // Storage can be blocked; the choice still applies for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function readSavedText(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || ""
  } catch {
    return ""
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

function parseChoice(text: string): { font: string; weight: string } {
  const fallback = { font: DEFAULT_FONT, weight: DEFAULT_WEIGHT }
  if (!text) return fallback
  try {
    const saved = JSON.parse(text)
    const fontKnown = FONTS.some((f) => f.id === saved.font)
    const weightKnown = WEIGHTS.includes(saved.weight)
    return {
      font: fontKnown ? saved.font : DEFAULT_FONT,
      weight: weightKnown ? saved.weight : DEFAULT_WEIGHT,
    }
  } catch {
    return fallback
  }
}

/** Testing tool: pick the main (headline) font and weight live. Shown in development or when the flag is on. */
export function FontPlayground() {
  const [open, setOpen] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  // The saved choice lives in localStorage; the server snapshot is the default so hydration matches.
  const savedText = React.useSyncExternalStore(subscribe, readSavedText, () => "")
  const { font, weight } = parseChoice(savedText)

  React.useEffect(() => {
    applyToPage(font, weight)
  }, [font, weight])

  function closePanel() {
    setOpen(false)
    buttonRef.current?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape" && open) {
      event.stopPropagation()
      closePanel()
    }
  }

  function chooseFont(id: string) {
    saveChoice(id, weight)
  }

  function chooseWeight(value: string) {
    saveChoice(font, value)
  }

  function reset() {
    saveChoice(DEFAULT_FONT, DEFAULT_WEIGHT)
  }

  return (
    <div
      onKeyDown={onKeyDown}
      className="fixed left-[max(1rem,env(safe-area-inset-left))] bottom-[max(5rem,calc(env(safe-area-inset-bottom)+4rem))] z-40"
    >
      {open ? (
        <section
          id="font-playground-panel"
          aria-labelledby="font-playground-title"
          className="glass-control vg-pop absolute bottom-14 left-0 max-h-[70dvh] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl p-4 text-heading"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 id="font-playground-title" className="text-base! tracking-normal! leading-6!">
              Font playground
            </h2>
            <button
              type="button"
              onClick={reset}
              className="min-h-11 rounded-full px-3 text-sm text-primary hover:underline"
            >
              Reset
            </button>
          </div>

          <fieldset className="mt-2">
            <legend className="text-sm text-muted-foreground">Main font</legend>
            <div className="mt-1 flex flex-col">
              {FONTS.map((option) => (
                <label
                  key={option.id}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 has-checked:bg-white/70 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
                >
                  <input
                    type="radio"
                    name="main-font"
                    value={option.id}
                    checked={font === option.id}
                    onChange={() => chooseFont(option.id)}
                    className="size-4 accent-primary"
                  />
                  <span style={{ fontFamily: option.family }} className="text-base">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-4">
            <legend className="text-sm text-muted-foreground">Headline weight</legend>
            <div className="mt-1 grid grid-cols-3 gap-1 rounded-full bg-black/5 p-1">
              {WEIGHTS.map((value) => (
                <label
                  key={value}
                  className="flex min-h-11 cursor-pointer items-center justify-center rounded-full text-sm tabular-nums has-checked:bg-white has-checked:shadow-[0_0_0_0.5px_rgb(0_0_0/0.11)] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
                >
                  <input
                    type="radio"
                    name="headline-weight"
                    value={value}
                    checked={weight === value}
                    onChange={() => chooseWeight(value)}
                    className="sr-only"
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>
        </section>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="font-playground-panel"
        aria-label="Font playground"
        onClick={() => setOpen(!open)}
        className="glass-control inline-flex size-11 items-center justify-center rounded-full text-base font-semibold text-heading transition-transform duration-150 ease-out active:scale-95 motion-reduce:transition-none"
      >
        Aa
      </button>
    </div>
  )
}
