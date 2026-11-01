'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Drawer } from "@base-ui/react/drawer"
import { ArrowRight, Menu, X } from "lucide-react"

import { navGroups } from "@/components/landing/nav-links"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger
        aria-label="Open menu"
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors active:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring lg:hidden"
      >
        <Menu className="size-6" />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-[90] min-h-dvh bg-black/40 opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />

        <Drawer.Viewport className="fixed inset-0 z-[95] flex items-stretch justify-end">
          <Drawer.Popup className="flex h-full w-[min(20rem,85vw)] flex-col overflow-y-auto overscroll-contain border-l border-border bg-background text-foreground shadow-2xl outline-none touch-auto [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-starting-style:[transform:translateX(100%)] data-ending-style:[transform:translateX(100%)] motion-reduce:transition-none">
            <div className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border px-5">
              <Drawer.Title
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                Vipin<span className="text-primary">G</span>arg
              </Drawer.Title>
              <Drawer.Close
                aria-label="Close menu"
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors active:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring"
              >
                <X className="size-5" />
              </Drawer.Close>
            </div>

            <Drawer.Description className="sr-only">
              Site navigation. Swipe right to close.
            </Drawer.Description>

            <Drawer.Content className="flex-1 px-5 py-6">
              <nav aria-label="Mobile">
                {navGroups.map((group) => (
                  <div key={group.label} className="mb-7 last:mb-0">
                    <p className="mb-2 text-xs font-bold tracking-[0.14em] text-foreground/45 uppercase">
                      {group.label}
                    </p>
                    <ul className="flex list-none flex-col">
                      {group.items.map((item) => {
                        const active = pathname === item.route
                        return (
                          <li key={item.route} className="flex">
                            <Drawer.Close
                              nativeButton={false}
                              render={<Link href={item.route} />}
                              aria-current={active ? "page" : undefined}
                              className={`-mx-3 flex min-h-12 w-[calc(100%+1.5rem)] items-center rounded-lg px-3 text-left text-[15px] font-semibold transition-colors active:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring ${
                                active ? "bg-muted text-primary" : "text-foreground"
                              }`}
                            >
                              {item.name}
                            </Drawer.Close>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </Drawer.Content>

            <div className="sticky bottom-0 shrink-0 border-t border-border bg-background px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <ThemeToggle variant="switch" className="mb-3" />
              <Drawer.Close
                nativeButton={false}
                render={<Link href="/contact" />}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[15px] font-semibold text-primary-foreground transition-colors active:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Contact Us
                <ArrowRight className="size-4" />
              </Drawer.Close>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
