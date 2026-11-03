import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { LeadForm } from "@/components/forms/lead-form"
import { footerColumns } from "@/lib/data/navigation"
import { siteConfig } from "@/lib/site-config"

const linkClass =
  "-mx-1 inline-flex min-h-11 items-center lg:min-h-9 px-1 text-sm text-inverse-muted hover:text-inverse-fg hover:underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-inverse-link"

export function Footer() {
  const year = new Date().getFullYear()
  const social = Object.entries(siteConfig.social).filter(([, url]) => url) as [string, string][]
  return (
    <footer className="bg-surface-inverse text-inverse-fg">
      <div className="container-wide pt-12 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:pt-16 sm:pb-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_28rem] lg:gap-16">
          <div>
            <p className="flex items-center gap-3 font-heading text-2xl font-semibold text-inverse-fg">
              <Image src="/logo.png" alt="" width={44} height={44} className="size-11" />
              {siteConfig.shortName}
            </p>
            <p className="mt-2 max-w-sm text-sm text-inverse-muted">
              Live exam coaching for Canadian finance licences.
            </p>
          </div>
          <div>
            <h2 className="font-sans text-base! font-semibold text-inverse-fg">
              Get exam tips and new cohort dates
            </h2>
            <div className="mt-4 rounded-lg bg-surface p-5 text-foreground max-sm:rounded-2xl">
              <LeadForm kind="newsletter" sourcePath="footer" className="gap-4" />
            </div>
          </div>
        </div>

        {/* Phones: one disclosure per column, so the footer stays short. */}
        <nav aria-label="Footer" className="mt-10 border-t border-inverse-muted/25 sm:hidden">
          {footerColumns.map((col) => (
            <details key={col.title} className="group border-b border-inverse-muted/25">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[0.9375rem] font-semibold text-inverse-fg focus-visible:outline-2 focus-visible:outline-inverse-link [&::-webkit-details-marker]:hidden">
                {col.title}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-4 shrink-0 text-inverse-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <ul className="-mt-1 flex flex-col pb-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l ? (
                      <a href={l.href} rel="noopener" className={linkClass}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>

        <nav aria-label="Footer" className="mt-12 hidden grid-cols-2 gap-x-6 gap-y-8 border-t border-inverse-muted/25 pt-10 sm:grid md:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans text-sm! font-semibold text-inverse-fg">{col.title}</h3>
              <ul className="mt-3 flex flex-col">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l ? (
                      <a href={l.href} rel="noopener" className={linkClass}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {social.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-6 text-sm sm:mt-8">
            {social.map(([name, url]) => (
              <li key={name}>
                <a href={url} rel="noopener" className={linkClass}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 border-t border-inverse-muted/25 pt-6 max-sm:border-t-0 max-sm:pt-0 sm:mt-10">
          <p className="max-w-[90ch] text-[0.8125rem] leading-snug text-inverse-muted">
            {siteConfig.trademarkNotice} {siteConfig.disclaimer}
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-[0.8125rem] text-inverse-muted">
              {/* PLACEHOLDER: registered legal name — see lib/site-config.ts legalName */}
              © {year} {siteConfig.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
