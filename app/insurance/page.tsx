import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Content ---

const coursesData = [
  {
    id: 'llqp',
    title: 'LLQP',
    subtitle: 'Life License Qualification Program',
    description:
      'Get licensed to sell life insurance in Canada with our comprehensive, industry preferred course.',
    link: '/life-license-qualification-program',
    accent: '#219ebc',
  },
  {
    id: 'pqap',
    title: 'PQAP',
    subtitle: 'Programme de Qualification en Assurance de Personnes',
    description:
      'Our LLQP course materials are also available in French, alongside the additional modules to allow you to practice in Quebec.',
    link: '/programme-de-qualification-en-assurance-de-personnes',
    accent: '#fb8500',
  },
  {
    id: 'glqp',
    title: 'GLQP',
    subtitle: 'Alberta General Level 1 Insurance Qualification Program',
    description:
      'Get licensed to sell general (property and casualty) insurance in Alberta with this expert-designed and fully accredited course.',
    link: '/general-level-1-insurance-qualification-program',
    accent: '#023047',
  },
];

const benefitParagraphs = [
  'Completing one of the courses above can help you build a successful insurance business, while also helping your clients build peace of mind. With BCC courses, you’ll be incredibly well-prepared to both pass your licensing exams, and build a thriving practice based on trust and expertise.',
  'Licensed insurance professionals have the competency and knowledge to advise clients on making the best decisions to protect their futures. You’ll be able to attract a strong client base that trusts you with all of their insurance needs, and an ever-growing network of potential new clients.',
];

const navBlocks = [
  {
    id: 'securities',
    category: 'Securities',
    headline: 'Prepare for CIRO proficiency and registration exams with certainty.',
    route: '/securities',
    accent: '#219ebc',
  },
  {
    id: 'financial-planning',
    category: 'Financial Planning',
    headline: "Discover BCC's industry-leading CFP® and QAFP™ Exam Prep Programs.",
    route: '/financial-planning',
    accent: '#ffb703',
  },
  {
    id: 'insurance',
    category: 'Insurance',
    headline: "Accelerate your growth with BCC's LLQP and GLQP Programs.",
    route: '/insurance',
    accent: '#fb8500',
  },
];

// --- Sections ---

const Hero = () => (
  <section className="relative overflow-hidden bg-[#fdf9ec]">
    {/* Coral blob, top right */}
    <div className="pointer-events-none absolute -top-24 right-24 z-20 hidden size-72 rounded-full bg-[#f4795b] lg:block" />
    {/* Amber wedge, right edge */}
    <div className="pointer-events-none absolute -top-10 -right-16 z-20 hidden size-64 rounded-full bg-[#ffb703] lg:block" />
    {/* Teal wash, bottom right */}
    <div className="pointer-events-none absolute -right-32 -bottom-40 hidden size-[38rem] rounded-full bg-[#8ecae6]/70 lg:block" />
    {/* Dotted grid, left */}
    <div
      className="pointer-events-none absolute bottom-16 left-8 hidden size-28 lg:block"
      style={{ backgroundImage: 'radial-gradient(#8ecae6 2px, transparent 2px)', backgroundSize: '22px 22px' }}
    />

    <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
        <ShieldCheck className="size-4" />
        LLQP &middot; PQAP &middot; GLQP
      </span>
      <h1
        className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={{ fontFamily: 'Jost, sans-serif' }}
      >
        Insurance Training Courses
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-foreground/70">
        Earn your GLQP, LLQP and beyond with our industry-leading online courses.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          size="lg"
          className="h-13 rounded-lg px-8 text-base font-semibold"
          nativeButton={false}
          render={<a href="#courses" />}
        >
          Choose Your Course
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-13 rounded-lg border-primary/40 bg-transparent px-8 text-base font-semibold text-primary hover:bg-primary/5 hover:text-primary"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Talk to an Advisor
          <ArrowRight data-icon="inline-end" className="ml-2 size-5" />
        </Button>
      </div>
    </div>

    {/* Teal wave sweeping across the bottom */}
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-[#8ecae6]"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="currentColor" d="M0 96c240 0 360-64 720-64s480 64 720 64v24H0z" />
    </svg>
  </section>
);

const Courses = () => (
  <section id="courses" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Let&apos;s Level Up Your Career
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          style={{ fontFamily: 'Jost, sans-serif' }}
        >
          Choose Your Courses
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coursesData.map((course) => (
          <article
            key={course.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: course.accent }} />
            <h3 className="mt-6 text-2xl font-bold text-foreground" style={{ fontFamily: 'Jost, sans-serif' }}>
              {course.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-foreground/50">{course.subtitle}</p>
            <p className="mt-4 flex-1 leading-relaxed text-foreground/60">{course.description}</p>
            <Link
              href={course.link}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: course.accent }}
            >
              Learn more
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section className="bg-[#023047] px-4 py-24 text-white sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <div>
        <h2
          className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          style={{ fontFamily: 'Jost, sans-serif' }}
        >
          Here&rsquo;s how our courses can help you level up your career.
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#8ecae6]">Life</span>
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#8ecae6]">Health</span>
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#8ecae6]">General</span>
        </div>
      </div>
      <div className="space-y-6">
        {benefitParagraphs.map((p, idx) => (
          <p key={idx} className="max-w-[68ch] text-lg leading-relaxed text-pretty text-white/70">
            {p}
          </p>
        ))}
      </div>
    </div>
  </section>
);

const NavBlocks = () => (
  <section className="bg-[#eaf5fa] px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <h2
        className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        style={{ fontFamily: 'Jost, sans-serif' }}
      >
        Keep building your credentials
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {navBlocks.map((block) => (
          <Link
            key={block.id}
            href={block.route}
            className="group flex flex-col justify-between rounded-2xl bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: block.accent }}
              >
                {block.category}
              </span>
              <p className="mt-6 text-xl font-bold leading-snug text-foreground">{block.headline}</p>
            </div>
            <span
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: block.accent }}
            >
              Learn more
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// --- Page ---

const InsuranceCourses = () => (
  <main>
    <Hero />
    <Courses />
    <Benefits />
    <NavBlocks />
  </main>
);

export default InsuranceCourses;
