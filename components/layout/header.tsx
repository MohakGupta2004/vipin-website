import Image from "next/image"
import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { megaMenu, primaryLinks } from "@/lib/data/navigation"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

import { appUrl } from "./app-links"
import { HeaderNav } from "./header-nav"
import { MobileNav } from "./mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-transparent bg-surface data-[scrolled=true]:border-border" id="site-header">
      <div className="container-wide flex h-(--header-h) items-center justify-between gap-6">
        <Link href="/" className="group flex min-h-11 items-center gap-3 leading-none" aria-label={`${siteConfig.shortName}, home`}>
          <Image src="/logo.png" alt="" width={44} height={44} priority className="size-11" />
          <span className="flex flex-col justify-center">
            <span className="font-heading text-xl font-semibold text-heading">{siteConfig.shortName}</span>
            <span className="mt-1 hidden text-[0.8125rem] font-medium text-muted-foreground lg:block">Finance coach</span>
          </span>
        </Link>

        <HeaderNav groups={megaMenu} links={primaryLinks} />

        <div className="flex items-center gap-1 lg:gap-2">
          <ThemeToggle className="hidden lg:inline-flex" />
          <a
            href={appUrl("login", { campaign: "header" })}
            rel="noopener"
            className="hidden h-11 items-center px-3 text-[0.9375rem] font-medium text-foreground hover:text-link lg:inline-flex"
          >
            Log in
          </a>
          <a
            href={appUrl("signup", { campaign: "header" })}
            rel="noopener"
            className={cn(buttonVariants(), "hidden lg:inline-flex")}
          >
            Sign up free
          </a>
          <MobileNav
            groups={megaMenu}
            links={primaryLinks}
            signup={{ label: "Sign up free", href: appUrl("signup", { campaign: "mobile-menu" }) }}
            login={{ label: "Log in", href: appUrl("login", { campaign: "mobile-menu" }) }}
          />
        </div>
      </div>
    </header>
  )
}
