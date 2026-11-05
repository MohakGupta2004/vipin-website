import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"

import { MediaSlot } from "@/components/course/page-shell"
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

const pill =
  "group/link inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-[0.9375rem] font-medium whitespace-nowrap text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] motion-reduce:transition-none"
const nudge = "size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 motion-reduce:transition-none"
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
            Teaching that makes the subject clearer.
          </h1>
          <p {...rise(2)} className="vg-rise text-lead mt-6 max-w-[46ch]">
            Vipin Garg Finance Coaching brings live instruction to Canadian financial examination preparation, with an
            emphasis on understanding concepts and their application.
          </p>
          <div {...rise(3)} className="vg-rise mt-9 flex flex-col gap-x-8 gap-y-3 sm:flex-row sm:items-center">
            <Link href="/courses" className={pill}>
              Explore the programmes
              <ArrowRight aria-hidden="true" strokeWidth={2} className={nudge} />
            </Link>
            <Link
              href="/find-my-course"
              className="group/link inline-flex min-h-11 items-center gap-0.5 text-[1.0625rem] font-medium text-link transition-opacity hover:opacity-75 max-sm:justify-center"
            >
              Find my course
              <ChevronRight aria-hidden="true" strokeWidth={2} className={nudge} />
            </Link>
          </div>
        </div>

        {photo ? (
          <div className="lg:col-span-6">
            <figure className="vg-rise relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-[2rem] bg-[#f5f5f7] shadow-[0_40px_80px_-48px_rgb(16_42_66/0.55)] lg:mr-0 lg:ml-auto" style={{ animationDelay: "120ms" }}>
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
              {/* Name plate: frosted material, solid white if blur is unavailable or transparency is reduced. */}
              <figcaption className="absolute right-4 bottom-4 left-4 rounded-2xl bg-white/75 px-5 py-4 shadow-[0_0_0_1px_rgb(255_255_255/0.6),0_12px_32px_-12px_rgb(16_42_66/0.35)] backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-white sm:right-auto sm:max-w-[16rem] [@media(prefers-reduced-transparency:reduce)]:bg-white">
                <p className="font-heading text-[1.1875rem] leading-tight font-semibold tracking-[-0.02em] text-heading">
                  {siteConfig.instructor.name}
                </p>
                <p className="mt-0.5 text-sm text-heading/65">{siteConfig.instructor.role}</p>
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
                className="aspect-video w-full rounded-[1.75rem] shadow-[0_40px_80px_-48px_rgb(16_42_66/0.45)]"
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
                  <div className="h-full rounded-[1.75rem] bg-[#f5f5f7] p-7 sm:p-8">
                    <span
                      aria-hidden="true"
                      className="flex size-9 items-center justify-center rounded-full bg-primary font-heading text-[0.9375rem] font-semibold tabular-nums text-white"
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
            <div className="grid gap-8 rounded-[2rem] bg-surface-inverse p-8 text-inverse-fg sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-16">
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
                <Link
                  href="/find-my-course"
                  className="group/link inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-white px-6 text-[0.9375rem] font-medium text-heading transition-[background-color,transform] duration-150 ease-out hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverse-link active:scale-[0.97] motion-reduce:transition-none max-sm:w-full"
                >
                  Find my course
                  <ArrowRight aria-hidden="true" strokeWidth={2} className={nudge} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
