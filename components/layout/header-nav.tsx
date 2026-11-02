"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import type { MegaMenuGroup, NavLink } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

const navItem =
  "relative inline-flex h-11 items-center gap-1 whitespace-nowrap rounded-md px-2.5 text-[0.9375rem] font-semibold text-heading hover:text-link outline-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring xl:px-3"

/** Short trigger labels, BCC-style ("Securities", not "Securities & CIRO"). */
const shortLabel: Record<string, string> = {
  securities: "Securities",
  insurance: "Insurance",
  "financial-planning": "Financial Planning",
}

function ActiveBar({ active }: { active: boolean }) {
  return active ? <span aria-hidden="true" className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-primary" /> : null
}

/**
 * Desktop navigation: one small dropdown per course area (Securities, Insurance, Financial Planning),
 * a divider, then plain links. Only one dropdown is open at a time. A dropdown closes on outside press,
 * Escape (focus returns to its trigger), focus leaving it, clicking a link, or a route change.
 */
export function HeaderNav({ groups, links }: { groups: MegaMenuGroup[]; links: NavLink[] }) {
  const pathname = usePathname()
  const [openId, setOpenId] = React.useState<string | null>(null)
  const rootRef = React.useRef<HTMLElement>(null)
  const hoverTimer = React.useRef<number | undefined>(undefined)
  const pinned = React.useRef(false)

  // Border appears after 8px scroll.
  React.useEffect(() => {
    const header = document.getElementById("site-header")
    const onScroll = () => header?.setAttribute("data-scrolled", String(window.scrollY > 8))
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close on route change.
  const [lastPath, setLastPath] = React.useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpenId(null)
  }

  const close = React.useCallback(() => {
    window.clearTimeout(hoverTimer.current)
    pinned.current = false
    setOpenId(null)
  }, [])

  React.useEffect(() => {
    if (!openId) return
    const onDown = (e: Event) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      const trigger = document.getElementById(`nav-trigger-${openId}`)
      close()
      trigger?.focus()
    }
    document.addEventListener("pointerdown", onDown, true)
    document.addEventListener("keydown", onKey)
    window.addEventListener("blur", close)
    window.addEventListener("resize", close)
    return () => {
      document.removeEventListener("pointerdown", onDown, true)
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("blur", close)
      window.removeEventListener("resize", close)
    }
  }, [openId, close])

  const hoverOpen = (id: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || pinned.current) return
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setOpenId(id), openId ? 0 : 120)
  }
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || pinned.current) return
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setOpenId(null), 200)
  }
  const toggle = (id: string) => {
    window.clearTimeout(hoverTimer.current)
    if (openId === id && pinned.current) {
      close()
    } else {
      pinned.current = true
      setOpenId(id)
    }
  }

  const courseGroups = groups.filter((g) => g.id in shortLabel)
  const allLinks: NavLink[] = [{ label: "For Firms", href: "/for-firms" }, ...links]

  return (
    <div className="hidden flex-1 justify-end lg:flex">
      <nav ref={rootRef} aria-label="Main" className="flex items-center gap-0.5">
        {courseGroups.map((g) => {
          const isOpen = openId === g.id
          const active = pathname === g.href || pathname.startsWith(g.href + "/")
          const panelId = `nav-panel-${g.id}`
          return (
            <div
              key={g.id}
              className="relative"
              onPointerEnter={hoverOpen(g.id)}
              onPointerLeave={hoverClose}
              onBlur={(e) => {
                if (isOpen && !e.currentTarget.contains(e.relatedTarget as Node | null)) close()
              }}
            >
              <button
                id={`nav-trigger-${g.id}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(g.id)}
                className={navItem}
              >
                {shortLabel[g.id]}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={2}
                  className={cn("size-4 text-muted-foreground transition-transform duration-150 motion-reduce:transition-none", isOpen && "rotate-180")}
                />
                <ActiveBar active={active} />
              </button>
              {isOpen && <Dropdown id={panelId} group={g} onNavigate={close} />}
            </div>
          )
        })}

        <span aria-hidden="true" className="mx-2 h-6 w-px bg-border-strong/60 xl:mx-3" />

        {allLinks.map((l) => {
          const active = pathname === l.href
          return (
            <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={navItem}>
              {l.label}
              <ActiveBar active={active} />
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function Dropdown({ id, group, onNavigate }: { id: string; group: MegaMenuGroup; onNavigate: () => void }) {
  const links = group.sections.flatMap((s) => s.links)
  const wide = links.length > 6
  return (
    <div
      id={id}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) onNavigate()
      }}
      className={cn(
        "vg-enter-up absolute top-full left-0 z-30 mt-2 max-h-[calc(100dvh-var(--header-h)-1.5rem)] overflow-y-auto overscroll-contain rounded-xl border border-border bg-surface p-2 shadow-float",
        wide ? "w-[40rem]" : "w-[20rem]"
      )}
    >
      <p className="px-3 pt-2 pb-1 text-sm text-muted-foreground">{group.description}</p>
      <ul className={cn("grid", wide && "grid-cols-2")}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              title={l.description}
              className={cn(
                "flex min-h-11 rounded-lg px-3 outline-hidden hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring",
                wide ? "items-center gap-2" : "flex-col justify-center py-2"
              )}
            >
              <span className={cn("font-semibold text-heading", wide ? "shrink-0 text-[0.9375rem]" : "text-[0.9375rem]")}>{l.label}</span>
              {l.description && (
                <span className={cn("text-sm text-muted-foreground", wide ? "truncate" : "leading-snug")}>{l.description}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-1 flex items-center justify-between gap-4 border-t border-border px-3 pt-3 pb-2 text-sm font-semibold">
        <Link href={group.href} className="text-link hover:underline">
          View all {shortLabel[group.id] ?? group.label}
        </Link>
        <Link href="/find-my-course" className="text-muted-foreground hover:text-link">
          Not sure? Take the quiz
        </Link>
      </div>
    </div>
  )
}
