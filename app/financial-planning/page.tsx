import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Data Structures ---
const PATHWAYS = [
  {
    program: 'QAFP™ Program',
    title: 'Become a Qualified Associate Financial Planner™',
    description:
      'QAFP® certification lets employers and clients know you are an ethical professional with a broad knowledge of financial planning strategies, skills, and solutions.',
    linkText: 'Learn more',
    route: '/qualified-associate-financial-planner',
    accent: '#219ebc',
  },
  {
    program: 'CFP® Program',
    title: 'Become a Certified Financial Planner®',
    description:
      'CFP® certification is an international standard for financial planning. CFP® professionals are highly desired by employers and clients alike, and the certification is widely recognized by institutions and regulatory bodies.',
    linkText: 'Learn more',
    route: '/certified-financial-planner',
    accent: '#fb8500',
  },
];

const WHY_CHOOSE_US = {
  title: 'Why choose Vipin Garg’s Exam Prep Program',
  subtitle:
    'As the leader in financial services education, Vipin Garg offers expert instruction and flexible options to prepare for your exam without the stress.',
  points: [
    'High exam pass rates',
    'Industry-leading Program',
    'Decades of Educational Expertise',
    'Student Success Team',
  ],
};

const DESIGNATION_BENEFITS = [
  'Earning a Certified Financial Planner (CFP) or Qualified Associate Financial Planner (QAFP) designation can significantly elevate your career progression, earnings, and seniority. These credentials represent a high level of expertise, professionalism, and dedication to the field of financial planning.',
  'With a CFP or QAFP designation, professionals gain a comprehensive understanding of various financial aspects, including investment planning, tax management, retirement planning, and estate planning. This knowledge and expertise instills confidence in clients, as they trust that their financial affairs are in the hands of a qualified and competent advisor.',
  'Obtaining these designations involves rigorous education, examinations, and ongoing professional development. This commitment to continuous learning ensures that CFPs and QAFPs stay up to date with the latest industry trends and best practices, allowing them to offer cutting-edge advice and solutions to their clients.',
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
    route: '/financial-planning',
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
        CFP® &middot; QAFP™ Exam Prep
      </span>
      <h1
        className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        Financial Planning Courses
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-foreground/70 sm:mt-6 sm:text-lg">
        Level up your financial services career with a CFP® or QAFP™ designation.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
        <Button
          size="lg"
          className="h-13 w-full rounded-lg px-8 text-base font-semibold sm:w-auto"
          nativeButton={false}
          render={<a href="#pathways" />}
        >
          Explore Pathways
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

const Pathways = () => (
  <section id="pathways" className="scroll-mt-24 px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Let&apos;s Level Up Your Career
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          style={HEADING_FONT}
        >
          Pathways to achieving your CFP or QAFP
        </h2>
      </div>

      <div className="mt-10 grid sm:mt-14 grid-cols-1 gap-6 md:grid-cols-2">
        {PATHWAYS.map((path) => (
          <article
            key={path.program}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10 transition-shadow duration-300 hover:shadow-lg"
          >
            <span
              className="inline-block self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: path.accent }}
            >
              {path.program}
            </span>
            <h3 className="mt-6 text-2xl font-bold leading-snug text-foreground" style={HEADING_FONT}>
              {path.title}
            </h3>
            <p className="mt-4 flex-1 leading-relaxed text-foreground/60">{path.description}</p>
            <Link
              href={path.route}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: path.accent }}
            >
              {path.linkText}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
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
        <Button
          size="lg"
          className="mt-8 h-13 w-full rounded-lg bg-[#fb8500] px-8 sm:w-auto text-base font-semibold text-white hover:bg-[#fb8500]/90"
          nativeButton={false}
          render={<Link href="/exam-prep-programs" />}
        >
          Explore Exam Prep
          <ArrowRight data-icon="inline-end" className="ml-2 size-5" />
        </Button>
      </div>
      <ul className="grid gap-4 self-center">
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

const Designations = () => (
  <section className="bg-[#eaf5fa] px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <h2
        className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        style={HEADING_FONT}
      >
        Designations can help you level your career
      </h2>
      <div className="mt-8 space-y-6">
        {DESIGNATION_BENEFITS.map((paragraph, idx) => (
          <p key={idx} className="text-lg leading-relaxed text-pretty text-foreground/70">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </section>
);

const ContactCta = () => (
  <section className="px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl bg-[#023047] px-6 py-10 text-center text-white sm:flex-row sm:justify-between sm:px-14 sm:py-14 sm:text-left">
      <p className="max-w-xl text-xl font-semibold leading-snug" style={HEADING_FONT}>
        If you have any questions, please reach out. We&rsquo;re here to help!
      </p>
      <Button
        size="lg"
        className="h-13 w-full shrink-0 rounded-lg bg-[#fb8500] px-8 sm:w-auto text-base font-semibold text-white hover:bg-[#fb8500]/90"
        nativeButton={false}
        render={<Link href="/contact" />}
      >
        Contact Us
        <ArrowRight data-icon="inline-end" className="ml-2 size-5" />
      </Button>
    </div>
  </section>
);

const MarketingBanners = () => (
  <section className="px-4 pb-20 sm:px-6 lg:px-8">
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

const FinancialPlanningPage = () => (
  <main>
    <Hero />
    <Pathways />
    <WhyChooseUs />
    <Designations />
    <ContactCta />
    <MarketingBanners />
  </main>
);

export default FinancialPlanningPage;
