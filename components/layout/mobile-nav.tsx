"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDown, Lock, Menu, X } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
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
          className="fixed inset-0 z-50 flex flex-col bg-surface text-foreground outline-hidden transition-[opacity,translate] duration-[180ms] ease-out data-[ending-style]:translate-x-2 data-[ending-style]:opacity-0 data-[starting-style]:translate-x-2 data-[starting-style]:opacity-0 motion-reduce:transition-opacity motion-reduce:data-[starting-style]:translate-x-0"
        >
          <DialogPrimitive.Title className="sr-only">Site menu</DialogPrimitive.Title>
          <div className="flex h-15 shrink-0 items-center justify-between border-b border-border px-5">
            <span className="font-heading text-xl font-semibold text-heading">Vipin Garg</span>
            <div className="-mr-2 flex items-center">
              <ThemeToggle />
              <DialogPrimitive.Close
                ref={closeRef}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X aria-hidden="true" strokeWidth={1.75} className="size-6" />
              </DialogPrimitive.Close>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6">
            <Link href="/courses" onClick={close} className={cn(buttonVariants({ variant: "secondary" }), "my-4 w-full")}>
              Browse all courses
            </Link>
            <AccordionPrimitive.Root className="border-b border-border">
              {groups.map((g) => (
                <AccordionPrimitive.Item key={g.id} value={g.id} className="border-t border-border">
                  <AccordionPrimitive.Header className="m-0">
                    <AccordionPrimitive.Trigger className="group/t flex min-h-14 w-full items-center justify-between text-left text-base font-semibold text-heading outline-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring">
                      {g.label}
                      <ChevronDown
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="size-5 text-muted-foreground transition-transform duration-150 group-data-[panel-open]/t:rotate-180 motion-reduce:transition-none"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Panel className="overflow-hidden">
                    <ul className="pb-3">
                      {g.sections.flatMap((s) => s.links).map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={close}
                            className={cn(
                              rowLink,
                              "gap-x-3 text-[0.9375rem] font-normal",
                              l.label.length > 6 && l.label !== "See what is coming" ? "flex-col items-start justify-center py-2" : ""
                            )}
                          >
                            {l.label !== "See what is coming" && (
                              <span className={cn("tabular font-semibold text-link", l.label.length <= 6 && "w-14 shrink-0")}>{l.label}</span>
                            )}
                            <span className={l.label.length > 6 && l.label !== "See what is coming" ? "text-sm text-muted-foreground" : ""}>
                              {l.label === "See what is coming" ? "Upcoming programmes" : l.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href={g.href} onClick={close} className={cn(rowLink, "text-[0.9375rem] text-link underline underline-offset-3")}>
                          All {g.label.toLowerCase()}
                        </Link>
                      </li>
                    </ul>
                  </AccordionPrimitive.Panel>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>

            <ul className="mt-2">
              {[...links, { label: "For firms", href: "/for-firms" as const }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className={rowLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={login.href} rel="noopener" className={cn(rowLink, "gap-2")}>
                  <Lock aria-hidden="true" strokeWidth={1.75} className="size-4" />
                  {login.label}
                </a>
              </li>
            </ul>
          </div>

          <div className="shrink-0 border-t border-border bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <a href={signup.href} rel="noopener" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
              {signup.label}
            </a>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
