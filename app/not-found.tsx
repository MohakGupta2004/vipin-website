import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { ctaButton } from "@/components/forms/styles"
import { ArrowLink } from "@/components/ui/arrow-link"
import { cn } from "@/lib/utils"

export const metadata = { title: "Page not found", robots: { index: false, follow: true } }

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60svh] flex-col items-center justify-center py-20 text-center sm:py-28">
      <h1 className="text-balance">We couldn&apos;t find that page</h1>
      <p className="text-lead mx-auto mt-4 max-w-[42ch] text-pretty">
        The link may be old or mistyped. Head back home, or browse the live programmes.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
        <Link href="/" className={cn(ctaButton, "group inline-flex items-center justify-center gap-1.5 max-sm:w-full")}>
          Back to home
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={2}
            className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </Link>
        <ArrowLink href="/courses">Browse courses</ArrowLink>
      </div>
    </div>
  )
}
