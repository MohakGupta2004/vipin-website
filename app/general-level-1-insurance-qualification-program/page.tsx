import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Check, Plus } from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Data Structures ---
const COURSE_PROGRAM = {
  title: 'General Level 1 Insurance Qualification Program',
  subtitle: 'Choose from the courses below to get licensed as a General Insurance Agent in Alberta.',
  courses: [
    {
      id: 'glqp-level1',
      name: 'Alberta General Level 1 Insurance Qualification Program',
      description:
        'Designed by experts to help you pass your Alberta General Level 1 exam with ease and build an insurance practice with a high level of knowledge and competence.',
      price: '$275.00 CAD',
      accent: '#219ebc',
    },
    {
      id: 'glqp-bundle',
      name: 'Alberta General Level 1 Insurance Qualification Program & Life Licence Qualification Program Bundle',
      description: 'Become a multi-line insurance agent – bundle the GLQP and LLQP courses and save.',
      price: '$500.00 CAD',
      accent: '#fb8500',
      badge: 'Best value',
    },
  ],
};

const WHY_CHOOSE_US = {
  title: 'Why Choose Vipin Garg for your General Level 1 Insurance Qualification Training',
  subtitle:
    'As the leader in insurance industry education, Vipin Garg offers expert instruction and flexible options to prepare you well for an exciting new career.',
  points: [
    'High exam pass rates',
    'Flexible course modules',
    'Recognized across Canada',
    'Practical, scenario-based learning',
    'Decades of industry expertise',
    'Student success team',
  ],
};

const FAQS = [
  {
    question: 'How long do I have to complete the course?',
    answer: 'Students will have 6 months from the date of purchase to complete the course.',
  },
  {
    question: 'Is there a textbook included?',
    answer:
      'It includes the Alberta Insurance Council\'s PDF textbook. It\'s available to download under the "Resources" section of the course.',
  },
  {
    question: 'Can I get CE credits',
    answer: 'No, the GLQP course does not qualify for CE credits.',
  },
  {
    question: 'How long does it take to complete this course',
    answer: 'The GLQP course generally takes about 80 hours to complete.',
  },
];

const MARKETING_BANNERS = [
  {
    category: 'SECURITIES',
    title: 'Prepare for CIRO proficiency and registration exams with certainty.',
    linkText: 'Learn more',
    route: '/securities',
    accent: '#219ebc',
  },
  {
    category: 'FINANCIAL PLANNING',
    title: "Discover Vipin Garg's industry-leading CFP® and QAFP™ Exam Prep Programs.",
    linkText: 'Learn more',
    route: '/certified-financial-planner',
    accent: '#ffb703',
  },
  {
    category: 'INSURANCE',
    title: "Accelerate your growth with Vipin Garg's LLQP and GLQP Programs.",
    linkText: 'Learn more',
    route: '/insurance',
    accent: '#fb8500',
  },
];

const HEADING_FONT = { fontFamily: 'Jost, sans-serif' } as const;

// --- Sections ---

const Hero = () => (
  <section className="relative overflow-hidden bg-[#fdf9ec]">
    <div className="pointer-events-none absolute -top-24 right-24 z-20 hidden size-72 rounded-full bg-[#f4795b] lg:block" />
    <div className="pointer-events-none absolute -top-10 -right-16 z-20 hidden size-64 rounded-full bg-[#ffb703] lg:block" />
    <div className="pointer-events-none absolute -right-32 -bottom-40 hidden size-[38rem] rounded-full bg-[#8ecae6]/70 lg:block" />
    <div
      className="pointer-events-none absolute bottom-16 left-8 hidden size-28 lg:block"
      style={{ backgroundImage: 'radial-gradient(#8ecae6 2px, transparent 2px)', backgroundSize: '22px 22px' }}
    />

    <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:py-20 sm:px-6 lg:px-8 lg:py-28">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
        <ShieldCheck className="size-4" />
        Alberta General Level 1 Insurance
      </span>
      <h1
        className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        GLQP Training
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-foreground/70 sm:mt-6 sm:text-lg">
        Build a rewarding and high-paying career selling property and casualty insurance.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
        <Button
          size="lg"
          className="h-13 w-full rounded-lg px-8 text-base font-semibold sm:w-auto"
          nativeButton={false}
          render={<a href="#courses" />}
        >
          Explore Courses
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-13 w-full rounded-lg border-primary/40 bg-transparent px-8 text-base font-semibold sm:w-auto text-primary hover:bg-primary/5 hover:text-primary"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Talk to an Advisor
          <ArrowRight data-icon="inline-end" className="ml-2 size-5" />
        </Button>
      </div>
    </div>

    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-[#8ecae6] sm:h-24"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="currentColor" d="M0 96c240 0 360-64 720-64s480 64 720 64v24H0z" />
    </svg>
  </section>
);

const Courses = () => (
  <section id="courses" className="scroll-mt-24 px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Course Catalog</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          style={HEADING_FONT}
        >
          {COURSE_PROGRAM.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-foreground/70">
          {COURSE_PROGRAM.subtitle}
        </p>
      </div>

      <div className="mt-10 grid sm:mt-14 grid-cols-1 gap-6 md:grid-cols-2">
        {COURSE_PROGRAM.courses.map((course) => (
          <article
            key={course.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: course.accent }} />
              {course.badge && (
                <span className="rounded-full bg-[#fb8500]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#fb8500]">
                  {course.badge}
                </span>
              )}
            </div>
            <h3 className="mt-6 text-xl font-bold leading-snug text-foreground" style={HEADING_FONT}>
              {course.name}
            </h3>
            <p className="mt-3 flex-1 leading-relaxed text-foreground/60">{course.description}</p>
            <p className="mt-6 text-2xl font-bold text-foreground" style={HEADING_FONT}>
              {course.price}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="rounded-lg border-primary/40 bg-transparent font-semibold text-primary hover:bg-primary/5 hover:text-primary"
              >
                Course Details
              </Button>
              <Button className="rounded-lg font-semibold">
                Add to cart
                <ArrowRight data-icon="inline-end" className="ml-1.5 size-4" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section className="bg-[#023047] px-4 py-14 sm:py-20 lg:py-24 text-white sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8ecae6]">
          Why Vipin Garg
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          style={HEADING_FONT}
        >
          {WHY_CHOOSE_US.title}
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-pretty text-white/70">
          {WHY_CHOOSE_US.subtitle}
        </p>
      </div>
      <ul className="grid gap-4 self-center sm:grid-cols-2">
        {WHY_CHOOSE_US.points.map((point) => (
          <li key={point} className="flex items-start gap-3 rounded-xl bg-white/5 p-5">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#fb8500]">
              <Check className="size-3.5 text-white" strokeWidth={3} />
            </span>
            <span className="leading-relaxed text-white/85">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Faqs = () => (
  <section className="bg-[#eaf5fa] px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">FAQs</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          GLQP FAQs
        </h2>
      </div>

      <div className="mt-12 space-y-4">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-border bg-card px-6 shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold text-foreground">
              {faq.question}
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-45">
                <Plus className="size-4" />
              </span>
            </summary>
            <p className="pb-5 leading-relaxed text-pretty text-foreground/65">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const MarketingBanners = () => (
  <section className="px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <h2
        className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        style={HEADING_FONT}
      >
        Keep building your credentials
      </h2>
      <div className="mt-8 grid sm:mt-12 grid-cols-1 gap-6 md:grid-cols-3">
        {MARKETING_BANNERS.map((banner) => (
          <Link
            key={banner.category}
            href={banner.route}
            className="group flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm sm:p-8 ring-1 ring-border transition-shadow duration-300 hover:shadow-lg"
          >
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: banner.accent }}
              >
                {banner.category}
              </span>
              <p className="mt-6 text-xl font-bold leading-snug text-foreground">{banner.title}</p>
            </div>
            <span
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: banner.accent }}
            >
              {banner.linkText}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// --- Page ---

const GlqpPage = () => (
  <main>
    <Hero />
    <Courses />
    <WhyChooseUs />
    <Faqs />
    <MarketingBanners />
  </main>
);

export default GlqpPage;
