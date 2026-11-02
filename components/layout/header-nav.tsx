"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import type { MegaMenuGroup, NavLink } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

const navItem =
  "relative inline-flex h-11 items-center gap-1 px-3 text-[0.9375rem] font-medium text-foreground hover:text-link outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"

function ActiveBar({ active }: { active: boolean }) {
  return active ? <span aria-hidden="true" className="absolute inset-x-3 -bottom-px h-0.5 bg-brand-teal" /> : null
}

export function HeaderNav({ groups, links }: { groups: MegaMenuGroup[]; links: NavLink[] }) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const hoverTimer = React.useRef<number | undefined>(undefined)

  // Border appears after 8px scroll.
  React.useEffect(() => {
    const header = document.getElementById("site-header")
    const onScroll = () => header?.setAttribute("data-scrolled", String(window.scrollY > 8))
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close on route change, outside click, Escape.
  const [lastPath, setLastPath] = React.useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  React.useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setOpen(true), 150)
  }
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => setOpen(false), 150)
  }

  const inCourses = groups.some((g) => pathname === g.href || pathname.startsWith(g.href + "/")) || pathname === "/courses"
  const allLinks: NavLink[] = [...links, { label: "For firms", href: "/for-firms" }]
  const securities = groups.find((g) => g.id === "securities")
  const insurance = groups.find((g) => g.id === "insurance")
  const planning = groups.find((g) => g.id === "financial-planning")
  const upcoming = groups.find((g) => g.id === "upcoming")

  return (
    <div ref={rootRef} className="hidden flex-1 lg:block" onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
      <nav aria-label="Main" className="flex items-center">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="mega-menu"
          onClick={() => setOpen((v) => !v)}
          className={navItem}
        >
          Courses
          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.75}
            className={cn("size-4 transition-transform duration-150 motion-reduce:transition-none", open && "rotate-180")}
          />
          <ActiveBar active={inCourses} />
        </button>
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

      {open && (
        <div
          id="mega-menu"
          className="vg-enter-up absolute inset-x-0 top-full z-30 border-b border-border bg-surface shadow-float"
        >
          <div className="container-wide grid grid-cols-[2.2fr_1.2fr_1.2fr_14rem] gap-8 py-8">
            {securities && <Column group={securities} wide />}
            <div className="flex flex-col gap-8">
              {insurance && <Column group={insurance} />}
              {upcoming && (
                <div>
                  <p className="text-eyebrow mb-3">Upcoming</p>
                  <MenuLink href="/upcoming" code="" name="CFA prep, AI & Finance and more" />
                </div>
              )}
            </div>
            {planning && <Column group={planning} />}
            <aside className="-my-8 bg-surface-2 p-6">
              <p className="text-base font-semibold text-heading">Not sure which exam you need?</p>
              <p className="mt-2 text-sm text-muted-foreground">Answer 3 quick questions.</p>
              <Link href="/find-my-course" className={cn(buttonVariants({ variant: "secondary" }), "mt-4 w-full")}>
                Start the finder
              </Link>
              <Link href="/courses" className="mt-4 inline-block text-sm font-medium text-link underline underline-offset-3 hover:decoration-2">
                Browse all courses
              </Link>
            </aside>
          </div>
        </div>
      )}
    </div>
  )
}

function Column({ group, wide }: { group: MegaMenuGroup; wide?: boolean }) {
  return (
    <div>
      <p className="text-eyebrow mb-3">{group.label}</p>
      <div className={cn("flex flex-col gap-4", wide && "grid grid-cols-2 gap-x-8")}>
        {group.sections.map((s) => (
          <ul key={s.title} className="flex flex-col">
            {group.sections.length > 1 && (
              <li className="pb-1 text-[0.8125rem] font-medium text-muted-foreground">{s.title}</li>
            )}
            {s.links.map((l) => (
              <li key={l.href}>
                <MenuLink href={l.href} code={l.label} name={l.description ?? ""} stack={s.title === "Oversight & leadership"} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <Link href={group.href} className="mt-3 inline-block text-sm font-medium text-link underline underline-offset-3 hover:decoration-2">
        View all in {group.label}
      </Link>
    </div>
  )
}

function MenuLink({ href, code, name, stack }: { href: string; code: string; name: string; stack?: boolean }) {
  const long = stack || code.length > 6
  return (
    <Link
      href={href}
      className={cn(
        "-mx-2 flex min-h-9 gap-x-3 rounded-sm px-2 py-1.5 hover:bg-accent",
        long ? "flex-col" : "items-baseline"
      )}
    >
      {code && (
        <span className={cn("tabular text-[0.9375rem] font-semibold text-link", !long && "w-14 shrink-0")}>{code}</span>
      )}
      <span className={cn("leading-snug", long ? "text-sm text-muted-foreground" : "text-[0.9375rem] text-foreground")}>
        {name}
      </span>
    </Link>
  )
}
