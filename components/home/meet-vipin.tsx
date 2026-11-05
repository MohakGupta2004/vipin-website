import Link from "next/link"
import { ChevronRight, Play } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/lib/site-config"

import { SectionIntro } from "./section-intro"

// Same copy as before, split into its title and description.
const points = [
  { title: "Understand Better", text: "Complex concepts made simple" },
  { title: "Learn Practically", text: "Connect theory with real-world examples" },
  { title: "Prepare Smarter", text: "Focus on what matters for your exam" },
]

/** Meet Vipin: founder introduction video beside a short intro. Video only (no portrait here). */
export function MeetVipin() {
  const { bio } = siteConfig.instructor
  const video = siteConfig.founderVideo
  return (
    <section aria-labelledby="instructor-heading" className="bg-[#f5f5f7] py-20 sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionIntro
            id="instructor-heading"
            size="md"
            title="Meet your instructor"
            lead={
              bio ??
              "Gain a deeper understanding of financial concepts and develop the skills to approach your exams with confidence."
            }
          />
          <ul className="mt-10 divide-y divide-black/[0.08] border-y border-black/[0.08]">
            {points.map((p) => (
              <li key={p.title} className="py-5">
                <p className="font-heading text-[1.125rem] leading-snug font-semibold tracking-[-0.015em] text-heading">
                  {p.title}
                </p>
                <p className="mt-1 text-[0.9375rem] text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="group/link mt-6 inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium text-link transition-opacity hover:opacity-75"
          >
            About Vipin
            <ChevronRight
              aria-hidden="true"
              strokeWidth={2}
              className="size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={80}>
          {video ? (
            <video
              controls
              preload="none"
              poster={video.poster}
              className="aspect-video w-full rounded-[2rem] bg-surface-inverse shadow-[0_40px_80px_-48px_rgb(16_42_66/0.6)] max-sm:rounded-2xl"
            >
              <source src={video.src} />
              {video.captionsUrl && <track kind="captions" src={video.captionsUrl} default />}
            </video>
          ) : (
            // PLACEHOLDER: founder introduction video — set siteConfig.founderVideo { src: "/media/vipin-intro.mp4", poster, captionsUrl }
            <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_90%_at_25%_0%,#1f3d5c_0%,#102a42_55%)] text-center shadow-[0_40px_80px_-48px_rgb(16_42_66/0.6)] max-sm:rounded-2xl">
              <span
                aria-hidden="true"
                className="flex size-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-md sm:size-20"
              >
                <Play strokeWidth={1.75} className="ml-1 size-7 text-white/85 sm:size-8" />
              </span>
              <div>
                <p className="font-heading text-lg font-semibold tracking-[-0.015em] text-inverse-fg sm:text-xl">
                  A short introduction from Vipin
                </p>
                <p className="mt-1 text-sm text-inverse-muted">Video coming soon</p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
