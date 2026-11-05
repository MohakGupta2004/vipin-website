import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { LeadForm } from "@/components/forms/lead-form"
import { footerColumns, type FooterColumn } from "@/lib/data/navigation"
import { siteConfig } from "@/lib/site-config"

/**
 * Footer, apple.com style: light grey ground, hairlines, small dense type.
 * Brand + newsletter on top, four link columns (fold-out sections on phones), then the small print.
 */

// 13px links: quiet at rest, full ink on hover (hover is pointer-only in Tailwind v4).
const linkClass =
  "inline-flex min-h-10 items-center rounded-sm text-[0.8125rem] leading-snug text-heading/75 transition-colors duration-150 hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-8"

function FooterLink({ link }: { link: FooterColumn["links"][number] }) {
  return "external" in link ? (
    <a href={link.href} rel="noopener" className={linkClass}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const social = Object.entries(siteConfig.social).filter(([, url]) => url) as [string, string][]
  return (
    <footer className="border-t border-black/[0.06] bg-[#f5f5f7] text-heading">
      <div className="container-wide pt-14 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:pt-20 sm:pb-10">
        {/* Brand + newsletter */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div>
            <Link
              href="/"
              aria-label={`${siteConfig.shortName}, home`}
              className="inline-flex items-center gap-3 rounded-md outline-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Image src="/logo.png" alt="" width={40} height={40} className="size-10 rounded-full" />
              <span className="font-heading text-[1.375rem] font-semibold tracking-[-0.025em] text-heading">
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="mt-4 max-w-[30ch] font-heading text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-heading/90 sm:text-[2rem]">
              Live exam coaching for Canadian finance licences.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-base! leading-snug font-semibold tracking-[-0.01em] text-heading">
              Get exam tips and new cohort dates
            </h2>
            <LeadForm kind="newsletter" sourcePath="footer" className="mt-5 max-w-none gap-4" />
          </div>
        </div>

        {/* Phones: one fold-out section per column, so the footer stays short. */}
        <nav aria-label="Footer" className="mt-14 border-t border-black/[0.08] sm:hidden">
          {footerColumns.map((col) => (
            <details key={col.title} className="vg-details group border-b border-black/[0.08]">
              <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-[0.9375rem] font-semibold text-heading focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                {col.title}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={2}
                  className="size-4 shrink-0 text-heading/50 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <ul className="flex flex-col pb-4">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink link={l} />
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>

        <nav
          aria-label="Footer"
          className="mt-16 hidden grid-cols-2 gap-x-8 gap-y-10 border-t border-black/[0.08] pt-10 sm:grid md:grid-cols-4"
        >
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans text-[0.8125rem]! leading-snug font-semibold text-heading">{col.title}</h3>
              <ul className="mt-3 flex flex-col">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink link={l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {social.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-x-6">
            {social.map(([name, url]) => (
              <li key={name}>
                <a href={url} rel="noopener" className={linkClass}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Small print */}
        <div className="mt-10 border-t border-black/[0.08] pt-6 max-sm:mt-8 max-sm:border-t-0 max-sm:pt-0">
          <p className="max-w-[110ch] text-xs leading-relaxed text-heading/70">
            {siteConfig.trademarkNotice} {siteConfig.disclaimer}
          </p>
          <p className="mt-4 text-xs text-heading/70">
            {/* PLACEHOLDER: registered legal name — see lib/site-config.ts legalName */}
            © {year} {siteConfig.legalName}
          </p>
        </div>
      </div>
    </footer>
  )
}
