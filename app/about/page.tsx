import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { MediaSlot } from "@/components/course/page-shell"
import { ArrowLink } from "@/components/ui/arrow-link"
import { ctaButton, onDarkButton } from "@/components/forms/styles"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { Reveal } from "@/components/motion/reveal"
import { buildMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export const metadata: Metadata = buildMetadata({
  title: "About Vipin Garg: Live Finance Exam Coach",
  description:
    "Meet Vipin Garg, founder and instructor. Live online coaching for Canadian financial exams, with a focus on understanding concepts and how they apply.",
  path: "/about",
})

const approach = [
  {
    title: "Build the foundation",
    text: "Work through the terminology and underlying concepts before moving to more demanding material.",
  },
  {
    title: "Apply the knowledge",
    text: "Discuss examples, interpret scenarios and understand why an answer is appropriate.",
  },
  {
    title: "Prepare deliberately",
    text: "Identify the topics that need attention and organize your preparation around the examination you are taking.",
  },
]

const pillLayout = "group inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
const nudge =
  "size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
const rise = (i: number) => ({ className: "vg-rise", style: { animationDelay: `${40 + i * 70}ms` } })

export default function AboutPage() {
  const video = siteConfig.founderVideo
  const photo = siteConfig.instructor.photo
  return (
    <div>
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

      {/* Hero: the title on the left, a large portrait on the right. */}
      <header className="container-site grid items-center gap-12 pt-10 pb-16 max-sm:pt-4 lg:grid-cols-12 lg:gap-16 lg:pt-16 lg:pb-24">
        <div className={cn(photo ? "lg:col-span-6" : "lg:col-span-9")}>
          <p {...rise(0)} className="vg-rise text-eyebrow">
            {siteConfig.instructor.name} · {siteConfig.instructor.role}
          </p>
          <h1 {...rise(1)} className="vg-rise mt-3">
            Teaching that makes <span className="text-[#86868b]">the subject clearer.</span>
          </h1>
          <p {...rise(2)} className="vg-rise text-lead mt-6 max-w-[46ch]">
            Vipin Garg Finance Coaching brings live instruction to Canadian financial examination preparation, with an
            emphasis on understanding concepts and their application.
          </p>
          <div {...rise(3)} className="vg-rise mt-9 flex flex-col gap-x-8 gap-y-3 sm:flex-row sm:items-center">
            <Link href="/courses" className={cn(ctaButton, pillLayout, "max-sm:w-full")}>
              Explore the programmes
              <ArrowUpRight aria-hidden="true" strokeWidth={2} className={nudge} />
            </Link>
            <ArrowLink href="/find-my-course" className="max-sm:justify-center">
              Find my course
            </ArrowLink>
          </div>
        </div>

        {photo ? (
          <div className="lg:col-span-6">
            <figure className="vg-rise relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-section bg-[#f5f5f7] shadow-[0_40px_80px_-48px_rgb(16_42_66/0.55)] max-sm:rounded-panel lg:mr-0 lg:ml-auto" style={{ animationDelay: "120ms" }}>
              <div className="vg-settle absolute inset-0">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
              {/* Marquee scrim: a soft navy fade at the bottom, then a dark glass tag so white text reads on any part of the photo. */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#102a42]/55 to-transparent" />
              <figcaption className="glass-control-dark absolute right-4 bottom-4 left-4 rounded-2xl px-5 py-4 sm:right-auto sm:max-w-[16rem]">
                <p className="font-heading text-[1.1875rem] leading-tight font-semibold tracking-[-0.02em] text-white">
                  {siteConfig.instructor.name}
                </p>
                <p className="mt-0.5 text-sm text-white/70">{siteConfig.instructor.role}</p>
              </figcaption>
            </figure>
          </div>
        ) : null}
      </header>

      {/* Personal approach + video */}
      <section aria-labelledby="personal-h" className="bg-[#f5f5f7] py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 id="personal-h">A personal approach to professional education.</h2>
            <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">
              {siteConfig.instructor.bio ??
                "The purpose of coaching is to make demanding material easier to work through: explain the reasoning, connect related ideas and give learners an opportunity to ask questions."}
            </p>
            <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">
              Live group programmes cover IFC, CSC Exam 1, CSC Exam 2, CIRE, RSE and LLQP. Additional coaching covers
              CIRO proficiency examinations, wealth management and financial planning subjects.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={80}>
            {video ? (
              <video
                controls
                poster={video.poster}
                className="aspect-video w-full rounded-section shadow-[0_40px_80px_-48px_rgb(16_42_66/0.45)] max-sm:rounded-panel"
                src={video.src}
              >
                {video.captionsUrl ? <track kind="captions" src={video.captionsUrl} default /> : null}
              </video>
            ) : (
              <MediaSlot label="Introduction video coming soon" />
            )}
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" aria-labelledby="approach-h" className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <h2 id="approach-h">Understand the reasoning behind the answer.</h2>
            <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">
              A definition is easier to remember when you understand how it works. Coaching connects financial concepts
              to the calculations, client situations and professional decisions you may encounter in your studies.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-6">
            {approach.map((a, i) => (
              <li key={a.title}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="h-full rounded-panel bg-[#f5f5f7] p-6 sm:p-8">
                    <span
                      aria-hidden="true"
                      className="flex size-9 items-center justify-center rounded-full bg-white font-heading text-[0.9375rem] font-semibold tabular-nums text-heading shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-[1.375rem]">{a.title}</h3>
                    <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted-foreground">{a.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Next step */}
      <section id="next" aria-labelledby="next-h" className="pb-20 sm:pb-28">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-8 rounded-section bg-surface-inverse p-6 text-inverse-fg max-sm:rounded-panel sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-16">
              <div className="lg:col-span-8">
                <h2 id="next-h" className="text-inverse-fg">
                  Find the preparation that fits your goals.
                </h2>
                <p className="mt-4 max-w-[52ch] text-lg leading-[1.55] text-inverse-muted">
                  Explore your course, understand the requirements and confirm your coaching arrangements before you
                  enroll.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link href="/find-my-course" className={cn(onDarkButton, pillLayout, "max-sm:w-full")}>
                  Find my course
                  <ArrowUpRight aria-hidden="true" strokeWidth={2} className={nudge} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
