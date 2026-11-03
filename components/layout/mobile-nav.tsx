"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDown, Lock, Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import type { ExternalLink, MegaMenuGroup, NavLink } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"

type Props = { groups: MegaMenuGroup[]; links: NavLink[]; signup: ExternalLink; login: ExternalLink }

export function MobileNav({ groups, links, signup, login }: Props) {
  const [open, setOpen] = React.useState(false)
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const [lastPath, setLastPath] = React.useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  const close = () => setOpen(false)
  const rowLink =
    "flex min-h-12 items-center text-base font-medium text-foreground outline-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
  // Top-level rows: large type, like a native app's primary navigation.
  const bigRow =
    "flex min-h-12 w-full items-center justify-between font-heading text-[1.1875rem] leading-tight font-semibold tracking-[-0.01em] text-heading outline-hidden transition-opacity active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring motion-reduce:transition-none"
  // Staggered entrance; reduced motion falls back to a plain fade (globals.css).
  const enter = (i: number) => ({ className: "vg-enter-up", style: { animationDelay: `${40 + i * 35}ms` } })

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen} modal>
      <DialogPrimitive.Trigger
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center rounded-md text-foreground outline-hidden hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
      >
        <Menu aria-hidden="true" strokeWidth={1.75} className="size-6" />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Popup
          initialFocus={closeRef}
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-surface text-foreground outline-hidden transition-opacity duration-200 ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
        >
          <DialogPrimitive.Title className="sr-only">Site menu</DialogPrimitive.Title>
          <div className="flex h-15 shrink-0 items-center justify-between px-5">
            <Link href="/" onClick={close} aria-label="Vipin Garg, home" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={36} height={36} className="size-9" />
              <span className="font-heading text-xl font-semibold text-heading">Vipin Garg</span>
            </Link>
            <div className="-mr-2 flex items-center">
              <DialogPrimitive.Close
                ref={closeRef}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X aria-hidden="true" strokeWidth={1.75} className="size-6" />
              </DialogPrimitive.Close>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-2 pb-6 sm:px-8">
            {/* hidden until courses live in app
            <Link href="/courses" onClick={close} className={cn(buttonVariants({ variant: "secondary" }), "my-4 w-full")}>
              Browse all courses
            </Link> */}
            <AccordionPrimitive.Root>
              {groups.map((g, gi) => (
                <AccordionPrimitive.Item key={g.id} value={g.id} {...enter(gi)}>
                  <AccordionPrimitive.Header className="m-0">
                    <AccordionPrimitive.Trigger className={cn(bigRow, "group/t text-left")}>
                      {g.label}
                      <ChevronDown
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="size-4.5 text-muted-foreground transition-transform duration-200 group-data-[panel-open]/t:rotate-180 motion-reduce:transition-none"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Panel className="overflow-hidden">
                    <ul className="mt-1 mb-3 rounded-2xl bg-surface-2 px-4 py-1">
                      {g.sections.flatMap((s) => s.links).map((l) => {
                        const upcoming = l.label === "See what is coming"
                        return (
                          <li key={l.href} className="border-b border-border/70">
                            <Link
                              href={l.href}
                              onClick={close}
                              className={cn(rowLink, "flex-col items-start justify-center py-2.5 transition-opacity active:opacity-60")}
                            >
                              <span className="tabular text-[0.9375rem] leading-snug font-semibold text-heading">
                                {upcoming ? "Upcoming programmes" : l.label}
                              </span>
                              {!upcoming && l.description ? (
                                <span className="text-sm leading-snug font-normal text-muted-foreground">{l.description}</span>
                              ) : null}
                            </Link>
                          </li>
                        )
                      })}
                      <li>
                        <Link href={g.href} onClick={close} className={cn(rowLink, "text-[0.9375rem] font-semibold text-link")}>
                          All {g.label.toLowerCase()}
                        </Link>
                      </li>
                    </ul>
                  </AccordionPrimitive.Panel>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>

            <ul>
              {[...links, { label: "For firms", href: "/for-firms" as const }].map((l, i) => (
                <li key={l.href} {...enter(groups.length + i)}>
                  <Link href={l.href} onClick={close} className={bigRow}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={login.href}
              rel="noopener"
              {...enter(groups.length + links.length + 1)}
              className={cn(rowLink, "vg-enter-up mt-5 gap-2 border-t border-border pt-2 text-[0.9375rem] text-muted-foreground")}
            >
              <Lock aria-hidden="true" strokeWidth={1.75} className="size-4" />
              {login.label}
            </a>
          </div>

          <div className="shrink-0 bg-surface px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
            <a href={signup.href} rel="noopener" className={cn(buttonVariants({ size: "lg" }), "w-full rounded-xl")}>
              {signup.label}
            </a>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
