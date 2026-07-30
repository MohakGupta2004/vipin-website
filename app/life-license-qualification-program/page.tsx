import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  CalendarClock,
  FlaskConical,
  Briefcase,
  Check,
  Plus,
} from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Content ---

const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Expert Instructors',
    description: 'Learn from industry veterans with years of practical experience.',
    accent: '#219ebc',
  },
  {
    icon: CalendarClock,
    title: 'Flexible Learning',
    description: 'Access course materials anytime, anywhere, fitting your busy schedule.',
    accent: '#fb8500',
  },
  {
    icon: FlaskConical,
    title: 'Practical Focus',
    description: 'Gain hands-on experience through real-world case studies and projects.',
    accent: '#ffb703',
  },
  {
    icon: Briefcase,
    title: 'Career Support',
    description: 'Receive guidance and resources to help you land your dream job.',
    accent: '#023047',
  },
];

const LEARNING_STEPS = [
  {
    id: 1,
    title: 'Getting Started: The Basics',
    description: 'Lay a solid foundation with introductory concepts and fundamental principles.',
    options: [],
  },
  {
    id: 2,
    title: 'Select a Specialized Track',
    description: 'Choose a focus area that aligns with your career goals and interests.',
    options: [
      { label: 'Option A: Core Specialization', text: 'Deep dive into primary methodologies and frameworks.' },
      { label: 'Option B: Advanced Technical', text: 'Focus on high-level technical implementation and architecture.' },
    ],
  },
  {
    id: 3,
    title: 'Hands-on Application',
    description: 'Apply your knowledge through practical exercises, labs, and interactive assignments.',
    options: [],
  },
  {
    id: 4,
    title: 'Validation and Assessment',
    description: 'Test your understanding with comprehensive quizzes and practice exams.',
    options: [],
  },
  {
    id: 5,
    title: 'Certification Preparation',
    description: 'Finalize your preparation with review sessions and official practice questions.',
    options: [],
  },
];

const COURSE_SECTIONS = [
  {
    sectionTitle: 'Core LLQP Courses',
    sectionDescription: 'Full licensing programs covering all necessary modules for life insurance qualification.',
    courses: [
      { id: 'c1', name: 'Full Life Insurance Certification', desc: 'Comprehensive training covering all life insurance modules.', price: '$799.00', accent: '#219ebc' },
      { id: 'c2', name: 'Accident & Sickness Certification', desc: 'Focused training on accident, sickness, and disability insurance.', price: '$499.00', accent: '#fb8500' },
    ],
  },
  {
    sectionTitle: 'Add-On Modules',
    sectionDescription: 'Specific modules to supplement existing knowledge or complete partial requirements.',
    courses: [
      { id: 'm1', name: 'Life Insurance Module', desc: 'Deep dive into life insurance products, underwriting, and claims.', price: '$299.00', accent: '#023047' },
      { id: 'm2', name: 'Segregated Funds & Annuities', desc: 'Understanding investment products, wealth management, and taxation.', price: '$299.00', accent: '#ffb703' },
      { id: 'm3', name: 'Ethics and Professional Practice', desc: 'Compliance, legal frameworks, and professional responsibilities.', price: '$199.00', accent: '#8ecae6' },
    ],
  },
];

const VALUE_PROPOSITIONS = [
  'High pass rates with proven study strategies',
  'Interactive practice questions and mock exams',
  'Dedicated student support available seven days a week',
  'Regularly updated content reflecting current exam standards',
];

const FAQS = [
  {
    question: 'What is the LLQP?',
    answer:
      'The Life License Qualification Program (LLQP) is the mandatory educational requirement for individuals seeking to become licensed life insurance agents in Canada.',
  },
  {
    question: 'How long does it take to complete?',
    answer:
      'Completion time varies based on your schedule, but most students finish within 4 to 8 weeks of dedicated study.',
  },
  {
    question: 'Are there prerequisites?',
    answer:
      'There are no formal educational prerequisites, but a good command of English or French is highly recommended.',
  },
  {
    question: 'How long is my certification valid?',
    answer:
      'Once you pass the provider exams, your certification is typically valid for one year to write the provincial licensing exams.',
  },
];

const HEADING_FONT = { fontFamily: 'Jost, sans-serif' } as const;

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

    <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:py-20 sm:px-6 lg:px-8 lg:py-28">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
        <ShieldCheck className="size-4" />
        Life License Qualification Program
      </span>
      <h1
        className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        Get licensed to sell life insurance in Canada.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-foreground/70 sm:mt-6 sm:text-lg">
        Advance your career with industry-recognized certifications and training programs, built to
        prepare you for exam day and a thriving practice.
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

    {/* Teal wave sweeping across the bottom */}
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

const Features = () => (
  <section className="px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Why Choose Us
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          style={HEADING_FONT}
        >
          Everything you need to pass with confidence
        </h2>
      </div>

      <div className="mt-10 grid sm:mt-14 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <span
                className="inline-flex size-12 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{ backgroundColor: feature.accent }}
              >
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground" style={HEADING_FONT}>
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground/60">{feature.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const LearningPaths = () => (
  <section className="bg-[#eaf5fa] px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-4xl">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Our Learning Paths
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          From beginner to certified, one step at a time
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-foreground/70">
          Explore our comprehensive paths designed to take you from beginner to expert.
        </p>
      </div>

      <ol className="mt-14 space-y-4">
        {LEARNING_STEPS.map((step, index) => {
          const isLast = index === LEARNING_STEPS.length - 1;
          return (
            <li key={step.id} className="relative flex gap-5 sm:gap-7">
              {/* Rail + node */}
              <div className="flex flex-col items-center">
                <span
                  className="z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-sm"
                  style={HEADING_FONT}
                >
                  {step.id}
                </span>
                {!isLast && <span className="mt-1 w-px flex-1 bg-primary/25" aria-hidden="true" />}
              </div>

              {/* Body */}
              <div className={isLast ? 'pb-0' : 'pb-6'}>
                <h3 className="text-xl font-bold text-foreground" style={HEADING_FONT}>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[60ch] leading-relaxed text-foreground/65">
                  {step.description}
                </p>
                {step.options.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {step.options.map((opt) => (
                      <div key={opt.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                        <h4 className="text-sm font-bold text-primary">{opt.label}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">{opt.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

const Courses = () => (
  <section id="courses" className="scroll-mt-24 px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Our Courses</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          style={HEADING_FONT}
        >
          Choose the path that fits your goals
        </h2>
      </div>

      <div className="mt-16 space-y-16">
        {COURSE_SECTIONS.map((section) => (
          <div key={section.sectionTitle}>
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-foreground" style={HEADING_FONT}>
                {section.sectionTitle}
              </h3>
              <p className="mt-2 leading-relaxed text-foreground/60">{section.sectionDescription}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.courses.map((course) => (
                <article
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 transition-shadow duration-300 hover:shadow-lg"
                >
                  <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: course.accent }} />
                  <h4 className="mt-6 text-xl font-bold text-foreground" style={HEADING_FONT}>
                    {course.name}
                  </h4>
                  <p className="mt-3 flex-1 leading-relaxed text-foreground/60">{course.desc}</p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground" style={HEADING_FONT}>
                      {course.price}
                    </span>
                    <Button
                      variant="outline"
                      className="rounded-lg border-primary/40 bg-transparent font-semibold text-primary hover:bg-primary/5 hover:text-primary"
                    >
                      View Details
                      <ArrowRight
                        data-icon="inline-end"
                        className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ValueProposition = () => (
  <section className="bg-[#023047] px-4 py-14 sm:py-20 lg:py-24 text-white sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8ecae6]">
          Why Choose BCC LLQP
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          style={HEADING_FONT}
        >
          Unparalleled support to ensure your success on exam day.
        </h2>
      </div>
      <ul className="grid gap-4 self-center sm:grid-cols-2">
        {VALUE_PROPOSITIONS.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-xl bg-white/5 p-5">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#fb8500]">
              <Check className="size-3.5 text-white" strokeWidth={3} />
            </span>
            <span className="leading-relaxed text-white/80">{item}</span>
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
          Frequently asked questions
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

const ContactCta = () => (
  <section className="px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#023047] px-6 py-12 text-center text-white sm:px-16 sm:py-16">
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl" style={HEADING_FONT}>
        Have questions? Let&rsquo;s talk.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-pretty text-white/70">
        Reach out to our support team for assistance and take the first step toward your life
        insurance license.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
        <Button
          size="lg"
          className="h-13 w-full rounded-lg bg-[#fb8500] px-8 sm:w-auto text-base font-semibold text-white hover:bg-[#fb8500]/90"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Contact Us
          <ArrowRight data-icon="inline-end" className="ml-2 size-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-13 w-full rounded-lg border-white/30 bg-transparent px-8 sm:w-auto text-base font-semibold text-white hover:bg-white/10 hover:text-white"
          nativeButton={false}
          render={<a href="#courses" />}
        >
          Browse Courses
        </Button>
      </div>
    </div>
  </section>
);

// --- Page ---

const LlqpPage = () => (
  <main>
    <Hero />
    <Features />
    <LearningPaths />
    <Courses />
    <ValueProposition />
    <Faqs />
    <ContactCta />
  </main>
);

export default LlqpPage;
