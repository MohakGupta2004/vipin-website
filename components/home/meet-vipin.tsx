import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { siteConfig } from "@/lib/site-config"

const points = [
  "Clear explanations of complex material",
  "Live discussion and guided examples",
  "Preparation shaped around your exam",
]

export function MeetVipin() {
  const { name, bio, portrait } = siteConfig.instructor
  const video = siteConfig.founderVideo
  return (
    <section className="container-site grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
      <div className="lg:col-span-5">
        {/* PLACEHOLDER: portrait of Vipin Garg (4:5) — set siteConfig.instructor.portrait */}
        <div
          role="img"
          aria-label={portrait ? `Portrait of ${name}` : "Photo of Vipin Garg coming soon"}
          className="flex aspect-[4/5] max-h-[420px] w-full flex-col items-center justify-center rounded-lg border border-border bg-surface-2 lg:max-h-none"
        >
          <span aria-hidden="true" className="font-heading text-[6rem] leading-none font-semibold text-border-strong">VG</span>
          <span className="mt-3 text-sm text-muted-foreground">Photo coming soon</span>
        </div>
      </div>
      <div className="lg:col-span-7 lg:pt-4">
        <h2>Meet your instructor</h2>
        <p className="text-lead mt-4 max-w-[60ch]">
          {bio ?? "Work through financial ideas with Vipin Garg, from the underlying principles to their application in exam scenarios."}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <Check aria-hidden="true" strokeWidth={1.75} className="mt-1 size-4 shrink-0 text-link" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/about"
          className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold text-link"
        >
          About Vipin
          <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </Link>
        {video ? (
          <video controls preload="none" poster={video.poster} className="mt-8 aspect-video w-full rounded-lg border border-border bg-surface-inverse">
            <source src={video.src} />
            {video.captionsUrl && <track kind="captions" src={video.captionsUrl} default />}
          </video>
        ) : (
          <div className="mt-8 flex aspect-video w-full items-center justify-center rounded-lg bg-surface-inverse text-sm text-inverse-muted">
            Introduction video coming soon
          </div>
        )}
      </div>
    </section>
  )
}
