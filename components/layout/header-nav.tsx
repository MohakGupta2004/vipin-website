"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"
import { ChevronDown } from "lucide-react"

import type { MegaMenuGroup, NavLink } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

// Plain text links, apple.com style: quiet at rest, full ink on hover, open or current. No fills, no pills.
const navItem =
  "relative inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-md px-2 text-sm text-heading/70 outline-hidden transition-colors duration-150 ease-out hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring aria-expanded:text-heading aria-[current=page]:font-medium aria-[current=page]:text-heading data-[active=true]:font-medium data-[active=true]:text-heading xl:px-3"

/** Short trigger labels, BCC-style ("Securities", not "Securities & CIRO"). */
const shortLabel: Record<string, string> = {
  securities: "Securities",
  insurance: "Insurance",
  "financial-planning": "Financial Planning",
}

/** Shorter link text between lg and xl, where the full bar would squeeze the logo. */
const compactLabel: Partial<Record<string, string>> = {
  "/upcoming-batches": "Batches",
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

  // The curtain lives in a portal on <body> (a blurred surface nested inside the glass header would
  // not blur the page). Portals only exist in the browser, so wait until mounted.
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  // Tell the floating buttons to step aside while a dropdown (and its curtain) is open.
  React.useEffect(() => {
    if (!openId) return
    document.documentElement.setAttribute("data-nav-open", "")
    return () => document.documentElement.removeAttribute("data-nav-open")
  }, [openId])

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
      {mounted &&
        createPortal(
          // Opacity + visibility only. The blur itself never animates. Clicking it closes the menu
          // (the outside-press listener above does the closing).
          <div
            aria-hidden="true"
            className={cn(
              "curtain fixed inset-x-0 top-(--header-h) bottom-0 z-19 transition-[opacity,visibility] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
              openId ? "visible opacity-100 duration-200" : "invisible opacity-0 duration-150"
            )}
          />,
          document.body
        )}
      <nav ref={rootRef} aria-label="Main" className="flex items-center gap-1 xl:gap-2">
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
                data-active={active}
                className={navItem}
              >
                {shortLabel[g.id]}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={2}
                  className={cn(
                    "-mr-0.5 size-3 opacity-50 transition-transform duration-200 ease-out motion-reduce:transition-none",
                    isOpen && "rotate-180 opacity-100"
                  )}
                />
              </button>
              {isOpen && <Dropdown id={panelId} group={g} onNavigate={close} />}
            </div>
          )
        })}


        {allLinks.map((l) => {
          const active = pathname === l.href
          return (
            <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={navItem}>
              {compactLabel[l.href] ? (
                <>
                  <span className="xl:hidden">{compactLabel[l.href]}</span>
                  <span className="hidden xl:inline">{l.label}</span>
                </>
              ) : (
                l.label
              )}
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
  // The card is content, not glass: solid white, soft shadow, and a hairline drawn on top by ::after
  // so the footer fill never hides it.
  return (
    <div
      id={id}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) onNavigate()
      }}
      // pt-3 is an invisible hover bridge from the trigger, so the panel never closes on the way down.
      className={cn("vg-pop absolute top-full -left-2 z-30 pt-3", wide ? "w-[42rem]" : "w-[22rem]")}
    >
      <div className="relative rounded-panel bg-white shadow-[0_4px_8px_rgb(0_0_0/0.05)] after:pointer-events-none after:absolute after:inset-0 after:rounded-panel after:shadow-[inset_0_0_0_1px_#eee]">
      <div className="max-h-[calc(100dvh-var(--header-h)-2rem)] overflow-y-auto overscroll-contain rounded-panel">
        <p className="px-5 pt-4 pb-2 text-xs font-semibold text-muted-foreground">
          {group.description}
        </p>
        <ul className={cn("grid gap-0.5 px-2 pb-2", wide && "grid-cols-2")}>
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                title={l.description}
                className="group/item flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 outline-hidden transition-colors duration-150 ease-out hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[0.9375rem] leading-tight font-semibold text-heading">
                    {l.label}
                  </span>
                  {l.description && (
                    <span className="mt-0.5 truncate text-[0.8125rem] leading-snug text-muted-foreground">{l.description}</span>
                  )}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={2.25}
                  className="size-3.5 shrink-0 -rotate-90 text-link opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover/item:translate-x-0.5 group-hover/item:opacity-100 group-focus-visible/item:opacity-100 motion-reduce:transition-none"
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-4 border-t border-border/70 bg-surface-2/70 px-5 py-3 text-[0.8125rem] font-semibold">
          <Link href={group.href} className="group/all inline-flex items-center gap-1 text-link">
            View all {shortLabel[group.id] ?? group.label}
            <ChevronDown aria-hidden="true" strokeWidth={2.25} className="size-3.5 -rotate-90 transition-transform duration-200 ease-out group-hover/all:translate-x-0.5" />
          </Link>
          <Link href="/find-my-course" className="text-muted-foreground transition-colors hover:text-heading">
            Not sure? Take the quiz
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}
