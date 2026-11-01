'use client'

import Link from "next/link"
import { NavigationMenu } from "@base-ui/react/navigation-menu"

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import MobileNav from "@/components/landing/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  digitalAssetsLinks,
  financialPlanningLinks,
  insuranceLinks,
  securitiesLinks,
} from "@/components/landing/nav-links"

function NavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <NavigationMenu.Link
      closeOnClick
      render={<Link href={href} />}
      className={className}
    >
      {children}
    </NavigationMenu.Link>
  )
}

function DropdownItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <NavLink
        href={href}
        className="block rounded-lg px-4 py-2 text-sm text-foreground hover:bg-muted data-popup-open:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring"
      >
        {children}
      </NavLink>
    </li>
  )
}

function DropdownMenu({ label, items }: { label: string; items: { name: string; route: string }[] }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger className="flex h-10 items-center gap-1.5 px-3 text-[15px] font-semibold text-foreground hover:text-primary data-popup-open:text-primary focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring">
        {label}
        <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4.5l3 3 3-3" />
          </svg>
        </NavigationMenu.Icon>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="min-w-52 rounded-xl border border-border bg-popover p-1.5 shadow-lg data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-ease transition-[opacity,transform,width,height] duration-200 ease-out origin-[var(--transform-origin)]">
        <ul className="m-0 flex list-none flex-col gap-0 p-0">
          {items.map((item) => (
            <DropdownItem key={item.route} href={item.route}>
              {item.name}
            </DropdownItem>
          ))}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:gap-8 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          style={{ fontFamily: "Jost, sans-serif" }}
        >
          Vipin<span className="text-primary">G</span>arg
        </Link>

        <NavigationMenu.Root className="hidden min-w-max lg:block">
          <NavigationMenu.List className="relative flex items-center gap-2">
            <DropdownMenu label="Securities" items={securitiesLinks} />
            <DropdownMenu label="Insurance" items={insuranceLinks} />
            <DropdownMenu label="Financial Planning" items={financialPlanningLinks} />
            <DropdownMenu label="Digital Assets" items={digitalAssetsLinks} />
          </NavigationMenu.List>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner
              sideOffset={8}
              collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
              className="z-[100] transition-[top,left,right,bottom] duration-200 ease-out before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:top-[-8px] data-[side=bottom]:before:left-0 data-[side=bottom]:before:right-0 data-[side=bottom]:before:h-2"
            >
              <NavigationMenu.Popup className="relative origin-[var(--transform-origin)] data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-ease transition-[opacity,transform,width,height] duration-200 ease-out">
                <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden rounded-xl" />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {pathname !== "/contact" && (
            <Button
              size="lg"
              className="hidden h-11 rounded-lg px-6 text-[15px] font-semibold sm:inline-flex"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              <>Contact Us</>
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
