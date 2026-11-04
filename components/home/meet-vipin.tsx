import Link from "next/link"
import { ArrowRight, Check, Play } from "lucide-react"

import { siteConfig } from "@/lib/site-config"

const points = [
  "Understand Better Complex concepts made simple",
  "Learn Practically Connect theory with real-world examples",
  "Prepare Smarter Focus on what matters for your exam",
]

/** Meet Vipin: founder introduction video beside a short intro. Video only (no portrait here). */
export function MeetVipin() {
  const { bio } = siteConfig.instructor
  const video = siteConfig.founderVideo
  return (
    <section className="container-site grid items-center gap-8 pt-8 pb-16 sm:gap-10 sm:pt-16 md:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24 xl:py-28">
      <div className="lg:col-span-5">
        <h2>Meet your instructor</h2>
        <p className="text-lead mt-4 max-w-[52ch]">
          {bio ?? "Gain a deeper understanding of financial concepts and develop the skills to approach your exams with confidence."}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <Check aria-hidden="true" strokeWidth={2} className="mt-1 size-4 shrink-0 text-link" />
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
      </div>

      <div className="lg:col-span-7">
        {video ? (
          <video
            controls
            preload="none"
            poster={video.poster}
            className="aspect-video w-full rounded-2xl max-sm:rounded-xl bg-surface-inverse shadow-float"
          >
            <source src={video.src} />
            {video.captionsUrl && <track kind="captions" src={video.captionsUrl} default />}
          </video>
        ) : (
          // PLACEHOLDER: founder introduction video — set siteConfig.founderVideo { src: "/media/vipin-intro.mp4", poster, captionsUrl }
          <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-surface-inverse text-center shadow-float">
            <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <Play strokeWidth={1.75} className="ml-1 size-7 text-inverse-fg/80" />
            </span>
            <div>
              <p className="font-heading text-lg font-bold text-inverse-fg">A short introduction from Vipin</p>
              <p className="mt-1 text-sm text-inverse-muted">Video coming soon</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
