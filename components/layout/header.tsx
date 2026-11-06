import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { megaMenu, primaryLinks } from "@/lib/data/navigation"
import { siteConfig } from "@/lib/site-config"

import { appUrl } from "@/lib/app-links"
import { HeaderNav } from "./header-nav"
import { MobileNav } from "./mobile-nav"

/**
 * Site header, apple.com style: a compact full-width bar in the shared `glass-nav` material.
 * The glass is static (never transitions). HeaderNav still sets data-scrolled for anyone who wants it.
 */
export function Header() {
  return (
    <header
      id="site-header"
      className="glass-nav sticky top-0 z-20"
    >
      <div className="container-wide flex h-(--header-h) items-center justify-between gap-6 xl:gap-10">
        <Link
          href="/"
          aria-label={`${siteConfig.shortName}, home`}
          className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-md leading-none whitespace-nowrap outline-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image src="/logo.png" alt="" width={36} height={36} priority className="size-8 rounded-full lg:size-9" />
          <span className="flex flex-col justify-center">
            <span className="font-heading text-[1.0625rem] font-semibold tracking-[-0.02em] text-heading lg:text-lg">
              {siteConfig.shortName}
            </span>
            <span className="mt-0.5 hidden text-xs text-muted-foreground lg:block">Finance coach</span>
          </span>
        </Link>

        <HeaderNav groups={megaMenu} links={primaryLinks} />

        <div className="flex shrink-0 items-center gap-1 lg:gap-5">
          <a
            href={appUrl("base", { campaign: "header" })}
            rel="noopener"
            className="group/app hidden h-9 items-center gap-1 rounded-full bg-primary px-4 text-sm font-semibold whitespace-nowrap text-primary-foreground outline-hidden transition-[background-color,transform] duration-150 ease-out hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] motion-reduce:transition-none lg:inline-flex"
          >
            Learning App
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={2.25}
              className="size-3.5 transition-transform duration-200 ease-out group-hover/app:translate-x-0.5 group-hover/app:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
          <MobileNav
            groups={megaMenu}
            links={primaryLinks}
            app={{ label: "Learning App", href: appUrl("base", { campaign: "mobile-menu" }) }}
          />
        </div>
      </div>
    </header>
  )
}
