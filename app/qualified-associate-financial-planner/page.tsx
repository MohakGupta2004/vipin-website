import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Target,
  Award,
  RefreshCw,
} from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Data ---

const EXAM_PREP_PROGRAM = {
  tagline: 'Pass Your Exam With Confidence',
  title: 'QAFP™ Exam Prep',
  subtitle:
    'Accelerate your financial services career with specialized exam preparation modules built for the way you study.',
  courses: [
    {
      id: 'qafp-live',
      name: 'QAFP™ Exam Prep: Live Instruction',
      description: 'An interactive QAFP™ exam prep module with scheduled live sessions and direct instructor support.',
      price: '680.00',
      badge: 'Most Popular',
      featured: true,
      accent: '#219ebc',
      features: ['Live instructor-led sessions', 'Structured study timeline', 'Practice exams & materials'],
    },
    {
      id: 'qafp-ondemand',
      name: 'QAFP™ Exam Prep: On-Demand',
      description: 'Study anywhere, anytime with on-demand classes, learning materials, and practice exams.',
      price: '375.00',
      badge: null,
      featured: false,
      accent: '#fb8500',
      features: ['Learn at your own pace', 'Lifetime course access', 'Practice exams & materials'],
    },
  ],
};

const HOW_TO_BECOME_STEPS = [
  {
    step: 1,
    icon: Briefcase,
    title: 'Work Experience',
    description: 'Complete the practical work experience requirement to establish your path.',
    accent: '#219ebc',
  },
  {
    step: 2,
    icon: BookOpen,
    title: 'QAFP® Course',
    description:
      'Complete the necessary approved coursework covering fundamental financial planning strategies in Canada.',
    accent: '#8ecae6',
  },
  {
    step: 3,
    icon: Target,
    title: 'Exam Prep',
    description:
      'This is where Vipin Garg shines. We provide the best instruction programs with the tools and materials you need to build your confidence to excel on your financial planning professional exams.',
    buttonText: 'See options',
    buttonHref: '#courses',
    accent: '#fb8500',
  },
  {
    step: 4,
    icon: Award,
    title: 'QAFP® Exam',
    description:
      'Challenge and pass the QAFP® exam, the leading standard evaluation of your financial planning competence and knowledge.',
    accent: '#ffb703',
  },
  {
    step: 5,
    icon: RefreshCw,
    title: 'Maintenance',
    description: 'Maintain your designation with ongoing requirements via our Continuing Education programs.',
    buttonText: 'See the programs',
    buttonHref: '/exam-prep-programs',
    accent: '#023047',
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
    'Online Study Options',
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

    <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
        <ShieldCheck className="size-4" />
        QAFP™ Exam Prep
      </span>
      <h1
        className="mt-6 max-w-3xl text-balance text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        Qualified Associate Financial Planner™
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-foreground/70">
        Accelerate your financial services career with our QAFP™ exam prep system.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          size="lg"
          className="h-13 rounded-lg px-8 text-base font-semibold"
          nativeButton={false}
          render={<a href="#courses" />}
        >
          View Courses
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
  <section id="courses" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
          {EXAM_PREP_PROGRAM.tagline}
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          style={HEADING_FONT}
        >
          {EXAM_PREP_PROGRAM.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-foreground/60">
          {EXAM_PREP_PROGRAM.subtitle}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {EXAM_PREP_PROGRAM.courses.map((course) => (
          <article
            key={course.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-10"
            style={{ borderColor: course.featured ? course.accent : 'var(--border)' }}
          >
            <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: course.accent }} />
            {course.badge && (
              <span
                className="absolute top-8 right-8 rounded-full px-3 py-1 text-xs font-bold tracking-wider text-white uppercase sm:top-10 sm:right-10"
                style={{ backgroundColor: course.accent }}
              >
                {course.badge}
              </span>
            )}
            <h3 className="mt-6 text-2xl font-bold text-foreground" style={HEADING_FONT}>
              {course.name}
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/60">{course.description}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground" style={HEADING_FONT}>
                ${course.price}
              </span>
              <span className="text-sm font-semibold text-foreground/50">CAD</span>
            </div>

            <ul className="mt-6 space-y-3 border-t border-border pt-6">
              {course.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-foreground/70">
                  <span
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${course.accent}1a`, color: course.accent }}
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-1 flex-col justify-end gap-3">
              <Button
                size="lg"
                className="h-12 w-full rounded-lg text-base font-semibold text-white"
                style={{ backgroundColor: course.accent }}
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                Add to cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-lg border-border bg-transparent text-base font-semibold text-foreground hover:bg-muted"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                Course Details
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Roadmap = () => (
  <section className="bg-[#eaf5fa] px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Your Roadmap</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          How to become a Qualified Associate Financial Planner™
        </h2>
      </div>

      <ol className="mt-16 space-y-0">
        {HOW_TO_BECOME_STEPS.map((item, idx) => {
          const Icon = item.icon;
          const isLast = idx === HOW_TO_BECOME_STEPS.length - 1;
          return (
            <li key={item.step} className="relative flex gap-6 pb-12 last:pb-0">
              {!isLast && (
                <span
                  className="absolute top-14 left-7 -ml-px h-[calc(100%-2.5rem)] w-0.5"
                  style={{ backgroundColor: `${item.accent}33` }}
                  aria-hidden="true"
                />
              )}
              <div className="relative shrink-0">
                <span
                  className="flex size-14 items-center justify-center rounded-2xl text-white shadow-sm"
                  style={{ backgroundColor: item.accent }}
                >
                  <Icon className="size-6" />
                </span>
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold tracking-[0.18em] uppercase"
                    style={{ color: item.accent }}
                  >
                    Step {item.step}
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-foreground" style={HEADING_FONT}>
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-foreground/65">{item.description}</p>
                {item.buttonText && (
                  <Link
                    href={item.buttonHref ?? '#'}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: item.accent }}
                  >
                    {item.buttonText}
                    <ArrowRight size={16} className="transition-transform duration-300 hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section className="bg-[#023047] px-4 py-24 text-white sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
      <div>
        <p className="text-sm font-semibold tracking-[0.18em] text-[#8ecae6] uppercase">Why Vipin Garg</p>
        <h2
          className="mt-3 text-balance text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
          style={HEADING_FONT}
        >
          {WHY_CHOOSE_US.title}
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-pretty text-white/70">
          {WHY_CHOOSE_US.subtitle}
        </p>
        <Button
          size="lg"
          className="mt-8 h-13 rounded-lg bg-[#fb8500] px-8 text-base font-semibold text-white hover:bg-[#fb8500]/90"
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
  <section className="px-4 py-24 sm:px-6 lg:px-8">
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
  <section className="px-4 pb-20 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl bg-[#023047] px-8 py-14 text-center text-white sm:flex-row sm:justify-between sm:px-14 sm:text-left">
      <p className="max-w-xl text-xl leading-snug font-semibold" style={HEADING_FONT}>
        If you have any questions, please reach out. We&rsquo;re here to help!
      </p>
      <Button
        size="lg"
        className="h-13 shrink-0 rounded-lg bg-[#fb8500] px-8 text-base font-semibold text-white hover:bg-[#fb8500]/90"
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
  <section className="bg-[#eaf5fa] px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <h2
        className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        style={HEADING_FONT}
      >
        Keep building your credentials
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {MARKETING_BANNERS.map((banner) => (
          <Link
            key={banner.category}
            href={banner.route}
            className="group flex flex-col justify-between rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border transition-shadow duration-300 hover:shadow-lg"
          >
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider text-white uppercase"
                style={{ backgroundColor: banner.accent }}
              >
                {banner.category}
              </span>
              <p className="mt-6 text-xl leading-snug font-bold text-foreground">{banner.title}</p>
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

const QafpPrepPage = () => (
  <main>
    <Hero />
    <Courses />
    <Roadmap />
    <WhyChooseUs />
    <Designations />
    <ContactCta />
    <MarketingBanners />
  </main>
);

export default QafpPrepPage;
