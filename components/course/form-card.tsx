import { cn } from "@/lib/utils"

/** White card for a form. Sits on a `#f5f5f7` band (PageSection tone="band"). */
export function FormCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-panel bg-white p-5 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_20px_40px_-32px_rgb(16_42_66/0.3)] sm:rounded-section sm:p-8",
        className
      )}
    >
      {children}
    </div>
  )
}
