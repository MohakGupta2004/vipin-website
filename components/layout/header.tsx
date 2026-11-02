import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { headerCta, megaMenu, primaryLinks, studentLogin } from "@/lib/data/navigation"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

import { HeaderNav } from "./header-nav"
import { MobileNav } from "./mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-transparent bg-surface data-[scrolled=true]:border-border" id="site-header">
      <div className="container-wide flex h-(--header-h) items-center justify-between gap-6">
        <Link href="/" className="group flex flex-col leading-none" aria-label={`${siteConfig.shortName}, home`}>
          <span className="font-serif text-xl font-semibold text-heading">{siteConfig.shortName}</span>
          <span className="mt-1 hidden text-xs font-medium text-muted-foreground lg:block">Exam coaching</span>
        </Link>

        <HeaderNav groups={megaMenu} links={primaryLinks} />

        <div className="flex items-center gap-1 lg:gap-2">
          <ThemeToggle className="hidden lg:inline-flex" />
          <a
            href={studentLogin.href}
            rel="noopener"
            className="hidden h-11 items-center px-3 text-[0.9375rem] font-medium text-foreground hover:text-link lg:inline-flex"
          >
            {studentLogin.label}
          </a>
          <Link href={headerCta.href} className={cn(buttonVariants(), "hidden lg:inline-flex")}>
            {headerCta.label}
          </Link>
          <MobileNav groups={megaMenu} links={primaryLinks} cta={headerCta} login={studentLogin} />
        </div>
      </div>
    </header>
  )
}
