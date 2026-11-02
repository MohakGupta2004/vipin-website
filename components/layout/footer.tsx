import Link from "next/link"

import { LeadForm } from "@/components/forms/lead-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { footerColumns } from "@/lib/data/navigation"
import { siteConfig } from "@/lib/site-config"

const linkClass =
  "-mx-1 inline-flex min-h-11 items-center lg:min-h-9 px-1 text-sm text-inverse-muted hover:text-inverse-fg hover:underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-inverse-link"

export function Footer() {
  const year = new Date().getFullYear()
  const social = Object.entries(siteConfig.social).filter(([, url]) => url) as [string, string][]
  return (
    <footer className="bg-surface-inverse text-inverse-fg dark:border-t dark:border-border">
      <div className="container-wide pt-16 pb-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_28rem] lg:gap-16">
          <div>
            <p className="font-heading text-2xl font-semibold text-inverse-fg">{siteConfig.shortName}</p>
            <p className="mt-2 max-w-sm text-sm text-inverse-muted">
              Live exam coaching for Canadian finance licences.
            </p>
          </div>
          <div>
            <h2 className="font-sans text-base! font-semibold text-inverse-fg">
              Get exam tips and new cohort dates
            </h2>
            <div className="mt-4 rounded-lg bg-surface p-5 text-foreground">
              <LeadForm kind="newsletter" sourcePath="footer" className="gap-4" />
            </div>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-inverse-muted/25 pt-10 md:grid-cols-4">
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
          <ul className="mt-8 flex flex-wrap gap-x-6 text-sm">
            {social.map(([name, url]) => (
              <li key={name}>
                <a href={url} rel="noopener" className={linkClass}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 border-t border-inverse-muted/25 pt-6">
          <p className="max-w-[90ch] text-[0.8125rem] leading-snug text-inverse-muted">
            {siteConfig.trademarkNotice} {siteConfig.disclaimer}
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-[0.8125rem] text-inverse-muted">
              {/* PLACEHOLDER: registered legal name — see lib/site-config.ts legalName */}
              © {year} {siteConfig.legalName}
            </p>
            <ThemeToggle className="text-inverse-fg hover:bg-white/10 hover:text-inverse-fg" />
          </div>
        </div>
      </div>
    </footer>
  )
}
