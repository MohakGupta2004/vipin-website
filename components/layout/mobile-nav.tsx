"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import type { ExternalLink, MegaMenuGroup, NavLink } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

type Props = { groups: MegaMenuGroup[]; links: NavLink[]; app: ExternalLink }

export function MobileNav({ groups, links, app }: Props) {
  const [open, setOpen] = React.useState(false)
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const [lastPath, setLastPath] = React.useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  const close = () => setOpen(false)
  const iconBtn =
    "-mr-2 inline-flex size-11 items-center justify-center rounded-full text-heading outline-hidden transition-[background-color,transform] duration-150 ease-out hover:bg-black/[0.04] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
  // Top-level rows: large type, like a native app's primary navigation.
  const bigRow =
    "flex min-h-14 w-full items-center justify-between gap-3 font-heading text-[1.125rem] leading-tight font-semibold tracking-[-0.01em] text-heading outline-hidden transition-opacity active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring motion-reduce:transition-none"
  const rowIcon =
    "inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted-foreground transition-[transform,background-color,color] duration-200 ease-out motion-reduce:transition-none"
  // Staggered entrance; reduced motion falls back to a plain fade (globals.css).
  const enter = (i: number) => ({ className: "vg-enter-up", style: { animationDelay: `${40 + i * 35}ms` } })

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen} modal>
      <DialogPrimitive.Trigger aria-label="Open menu" className={cn(iconBtn, "lg:hidden")}>
        <Menu aria-hidden="true" strokeWidth={2} className="size-[1.125rem]" />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Popup
          initialFocus={closeRef}
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-surface text-foreground outline-hidden transition-opacity duration-200 ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
        >
          <DialogPrimitive.Title className="sr-only">Site menu</DialogPrimitive.Title>
          <div className="flex h-(--header-h) shrink-0 items-center justify-between border-b border-border/70 px-4 sm:px-8">
            <Link href="/" onClick={close} aria-label="Vipin Garg, home" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-full"
              />
              <span className="font-heading text-[1.0625rem] font-semibold tracking-[-0.02em] text-heading">Vipin Garg</span>
            </Link>
            <DialogPrimitive.Close ref={closeRef} aria-label="Close menu" className={iconBtn}>
              <X aria-hidden="true" strokeWidth={2} className="size-[1.125rem]" />
            </DialogPrimitive.Close>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-2 pb-8 sm:px-8">
            {/* hidden until courses live in app
            <Link href="/courses" onClick={close} className={cn(buttonVariants({ variant: "secondary" }), "my-4 w-full")}>
              Browse all courses
            </Link> */}
            <AccordionPrimitive.Root>
              {groups.map((g, gi) => (
                <AccordionPrimitive.Item key={g.id} value={g.id} {...enter(gi)}>
                  <AccordionPrimitive.Header className="m-0 border-b border-border/70">
                    <AccordionPrimitive.Trigger className={cn(bigRow, "group/t text-left")}>
                      {g.label}
                      <span
                        aria-hidden="true"
                        className={cn(rowIcon, "group-data-[panel-open]/t:rotate-180 group-data-[panel-open]/t:bg-accent group-data-[panel-open]/t:text-primary")}
                      >
                        <ChevronDown strokeWidth={2.25} className="size-4" />
                      </span>
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Panel className="overflow-hidden">
                    <ul className="my-3 rounded-2xl border border-border/70 bg-surface-2/70 p-1.5">
                      {g.sections.flatMap((s) => s.links).map((l) => {
                        const upcoming = l.label === "See what is coming"
                        return (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={close}
                              className="flex min-h-12 flex-col items-start justify-center rounded-xl px-3.5 py-2.5 outline-hidden transition-colors duration-150 active:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                            >
                              <span className="tabular text-[0.9375rem] leading-snug font-semibold text-heading">
                                {upcoming ? "Upcoming programmes" : l.label}
                              </span>
                              {!upcoming && l.description ? (
                                <span className="text-[0.8125rem] leading-snug text-muted-foreground">{l.description}</span>
                              ) : null}
                            </Link>
                          </li>
                        )
                      })}
                      <li className="mt-1 border-t border-border/70 pt-1">
                        <Link
                          href={g.href}
                          onClick={close}
                          className="flex min-h-12 items-center justify-between rounded-xl px-3.5 text-[0.9375rem] font-semibold text-link outline-hidden active:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                        >
                          All {g.label.toLowerCase()}
                          <ChevronRight aria-hidden="true" strokeWidth={2.25} className="size-4" />
                        </Link>
                      </li>
                    </ul>
                  </AccordionPrimitive.Panel>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>

            <ul>
              {[...links, { label: "For firms", href: "/for-firms" as const }].map((l, i) => {
                const active = pathname === l.href
                return (
                  <li key={l.href} {...enter(groups.length + i)}>
                    <Link
                      href={l.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(bigRow, "border-b border-border/70", active && "text-link")}
                    >
                      <span className="inline-flex items-center gap-2.5">
                        {l.label}
                        {active ? <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" /> : null}
                      </span>
                      <span aria-hidden="true" className={rowIcon}>
                        <ChevronRight strokeWidth={2.25} className="size-4" />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="shrink-0 border-t border-border/70 bg-surface px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgb(16_42_66/0.2)] sm:px-8">
            <a href={app.href} rel="noopener" className={cn(buttonVariants({ size: "lg" }), "w-full gap-1.5 rounded-full")}>
              {app.label}
              <ArrowUpRight aria-hidden="true" strokeWidth={2.25} className="size-4" />
            </a>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
