import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FirmsTeaser() {
  return (
    <section className="container-site pb-16 md:pb-20 lg:pb-24">
      <div className="grid gap-5 rounded-lg border border-border p-5 max-sm:rounded-2xl max-sm:bg-surface-2 max-sm:border-transparent sm:gap-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-8">
          <h3>Training a team?</h3>
          <p className="mt-3 max-w-[60ch] text-muted-foreground">
            Firms can book group cohorts for licensing and proficiency exams. Tell us about your team and the exams they need.
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Link href="/for-firms" className={cn(buttonVariants({ variant: "secondary" }), "max-sm:w-full")}>
            Ask about group cohorts
          </Link>
        </div>
      </div>
    </section>
  )
}
