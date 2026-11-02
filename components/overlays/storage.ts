// SSR-safe, throw-safe storage helpers. Storage can be blocked or throw (private mode, cleared data).
type Kind = "local" | "session"

function store(kind: Kind): Storage | null {
  if (typeof window === "undefined") return null
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

export function readStorage(kind: Kind, key: string): string | null {
  try {
    return store(kind)?.getItem(key) ?? null
  } catch {
    return null
  }
}

export function writeStorage(kind: Kind, key: string, value: string): void {
  try {
    store(kind)?.setItem(key, value)
  } catch {
    /* ignore */
  }
}

export const DAY_MS = 24 * 60 * 60 * 1000
