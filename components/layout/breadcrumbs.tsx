import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { JsonLd, breadcrumbLd, type Crumb } from "@/components/seo/json-ld"

/** Pass crumbs after Home; Home is prepended. Last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...items]
  const parent = all.length > 1 ? all[all.length - 2] : null
  return (
    <>
      <nav aria-label="Breadcrumb" className="container-site pt-6 text-[0.8125rem] max-sm:pt-2 max-sm:text-[0.9375rem] lg:pt-8">
        {parent && (
          <Link
            href={parent.href}
            className="-ml-1 inline-flex min-h-11 items-center gap-0.5 font-medium text-link sm:hidden"
          >
            <ChevronRight aria-hidden="true" strokeWidth={2} className="size-5 rotate-180" />
            {parent.name}
          </Link>
        )}
        <ol className="hidden flex-wrap items-center gap-x-2 gap-y-1 sm:flex">
          {all.map((item, i) => {
            const last = i === all.length - 1
            return (
              <li key={item.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-heading">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="text-muted-foreground transition-colors hover:text-heading">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden="true" strokeWidth={2} className="size-3 text-muted-foreground/70" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  )
}
