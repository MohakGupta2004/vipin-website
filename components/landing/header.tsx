import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import "@fontsource/jost"

import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <section className="relative overflow-hidden bg-[#fdf9ec]">
      {/* Coral blob, top right */}
      <div className="pointer-events-none absolute -top-24 right-24 z-20 hidden size-72 rounded-full bg-[#f4795b] lg:block" />
      {/* Amber wedge, right edge */}
      <div className="pointer-events-none absolute -top-10 -right-16 z-20 hidden size-64 rounded-full bg-[#ffb703] lg:block" />
      {/* Teal wave, bottom right */}
      <div className="pointer-events-none absolute -right-32 -bottom-40 hidden size-[38rem] rounded-full bg-[#8ecae6]/70 lg:block" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 pb-20 sm:gap-12 sm:px-6 sm:pt-16 sm:pb-24 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <div className="relative">
          <h1
            className="max-w-xl text-3xl font-bold leading-[1.15] tracking-tight text-balance text-foreground sm:text-5xl sm:leading-[1.1] lg:text-6xl"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            Build a career in{" "}
            <span className="text-primary">Financial Services</span>,{" "}
            <span className="text-primary">Insurance</span>, or{" "}
            <span className="text-primary">Securities</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-foreground/70 sm:mt-6 sm:text-lg">
            Licensing, exam prep, and designation pathways trusted by Canadian
            professionals for over 25 years.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              size="lg"
              className="h-13 w-full rounded-lg px-8 text-base font-semibold sm:w-auto"
              nativeButton={false}
              render={<Link href="/exam-prep-programs" />}
            >
              Explore Courses
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 w-full rounded-lg border-primary/40 bg-transparent px-8 text-base font-semibold text-primary hover:bg-primary/5 hover:text-primary sm:w-auto"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Book a Consultation
              <ArrowRight data-icon="inline-end" className="ml-2 size-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* Dotted grid, top left of image */}
          <div
            className="pointer-events-none absolute -top-8 -left-10 hidden size-28 lg:block"
            style={{
              backgroundImage: "radial-gradient(#8ecae6 2px, transparent 2px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/hero.jpg"
              alt="Two financial professionals reviewing documents together"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Teal wave sweeping across the bottom */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-[#8ecae6] sm:h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 96c240 0 360-64 720-64s480 64 720 64v24H0z"
        />
      </svg>
    </section>
  )
}
