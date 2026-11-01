'use client'
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Plus, Sparkles } from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// Decoupled Content JSON Dataset
const PAGE_DATA = [
  {
    "type": "Hero",
    "heading": "Exam Prep Programs",
    "subheading": "Prepare for your exams with confidence through BCC's industry-leading programs."
  },
  {
    "type": "PrepStyles",
    "tagline": "PASS YOUR EXAMS WITH CONFIDENCE",
    "heading": "Choose Your Exam Prep Style",
    "options": [
      {
        "id": "live-cfp",
        "title": "Live CFP® Exam Prep",
        "description": "If you thrive in an interactive environment, our Live CFP® Exam Prep provides you with structured learning, direct instructor support, and real-time collaboration with peers."
      },
      {
        "id": "live-qafp",
        "title": "Live QAFP™ Exam Prep",
        "description": "Study with an expert instructor and your peers. Live QAFP™ Exam Prep offers scheduled interactive online learning sessions to help you manage your study timeline."
      },
      {
        "id": "ondemand-cfp",
        "title": "On-Demand CFP® Exam Prep",
        "description": "For individuals juggling busy schedules, On-Demand CFP® Exam Prep offers the ultimate flexibility to study at your own pace, anytime, anywhere, while still accessing comprehensive support."
      },
      {
        "id": "ondemand-qafp",
        "title": "On-Demand QAFP™ Exam Prep",
        "description": "Learn on your own schedule. On-Demand QAFP™ Exam Prep gives you access to comprehensive materials, videos, and practice exams whenever and wherever it works best for you."
      }
    ],
    "summary": "Our Exam Prep courses are designed to prepare you for the CFP® & QAFP™ Exams with confidence. Pick the study method that suits you and take a big step forward in your financial career. Which option will you choose to build your career, remain accountable, and be efficient? Our team is ready to help you stay on track with study tips."
  },
  {
    "type": "Benefits",
    "heading": "Here's how our designations can help you level up your career.",
    "paragraphs": [
      "Earning a designation will showcase your commitment, expertise, and dedication to your clients. Whether you choose to pursue the Certified Financial Planner (CFP®) or Qualified Associate Financial Planner (QAFP™) designation, you are demonstrating to the industry and clients that you meet the highest standards of professional competence and ethical conduct.",
      "As standard-setters for the profession, FP Canada ensures that individuals holding these designations possess the knowledge, skills, and attitudes required to provide high-quality financial planning advice. Choosing the right path depends on your career goals, experience level, and client focus. Let's look at how these paths can shape your future professional journey and client impact.",
      "Whatever path you choose, investing in your education and professional development will unlock new opportunities, increase your earning potential, and position you as a trusted advisor in the financial services industry."
    ]
  },
  {
    "type": "FAQs",
    "heading": "Exam Prep FAQs",
    "items": [
      { "id": "faq-1", "question": "Does my course expire?", "answer": "Exam prep courses do not expire, they will remain active indefinitely." },
      { "id": "faq-2", "question": "Can I purchase this now and join even if I'm not writing the upcoming exam session?", "answer": "Yes, absolutely! You can purchase the course at any time and begin studying at your own pace for the exam window that best suits your timeline." },
      { "id": "faq-3", "question": "When should I start studying for the QAFP/CFP Exam?", "answer": "We recommend starting studying as soon as possible, allowing for at least 3-4 months of comprehensive preparation." },
      { "id": "faq-4", "question": "Can I get CE credits?", "answer": "Yes, our exam prep courses are eligible for CE credits." },
      { "id": "faq-5", "question": "When can I register for the live sessions?", "answer": "Registration for live sessions is open up until the day before the first scheduled session, provided seats are still available." },
      { "id": "faq-6", "question": "When do the live sessions happen?", "answer": "The live sessions typically run on weekends leading up to the scheduled exam window." },
      { "id": "faq-7", "question": "What resources are included with the course?", "answer": "Courses include study guides, access to live or on-demand video lectures, practice quizzes, mock exams, discussion forums, and direct access to instructors for support. All materials are updated regularly to align with the latest exam blueprints." },
      { "id": "faq-8", "question": "Are there practice exams?", "answer": "Yes, standard courses include multiple full-length practice exams to gauge your readiness and identify areas for improvement." }
    ]
  },
  {
    "type": "Promos",
    "heading": "Keep building your credentials",
    "items": [
      { "id": "promo-1", "category": "LLQP / MFDA", "headline": "Prepare for CIRO proficiency and registration exams with certainty.", "route": "/life-license-qualification-program" },
      { "id": "promo-2", "category": "FINANCIAL PLANNING", "headline": "Discover BCC's industry-leading CFP® and QAFP™ Exam Prep Programs.", "route": "/certified-financial-planner" },
      { "id": "promo-3", "category": "CE COURSES", "headline": "Accelerate your growth with BCC's LLQP and GLQP Programs.", "route": "/general-level-1-insurance-qualification-program" }
    ]
  },
];

const OPTION_ACCENTS = ['#219ebc', '#fb8500', '#023047', '#f45b4e'];
const PROMO_ACCENTS = ['#219ebc', '#fb8500', '#023047'];

// --- Reusable Sub-Components ---

const Hero = ({ data }: { data: any }) => (
  <section className="relative overflow-hidden bg-hero">
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
        <Sparkles className="size-4" />
        CFP® &amp; QAFP™ Exam Prep
      </span>
      <h1
        className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={{ fontFamily: 'Jost, sans-serif' }}
      >
        {data.heading}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-foreground/70 sm:mt-6 sm:text-lg">
        {data.subheading}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
        <Button
          size="lg"
          className="h-13 w-full rounded-lg px-8 text-base font-semibold sm:w-auto"
          nativeButton={false}
          render={<a href="#prep-styles" />}
        >
          Explore Programs
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

const PrepStyles = ({ data }: { data: any }) => (
  <section id="prep-styles" className="scroll-mt-24 px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{data.tagline}</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          style={{ fontFamily: 'Jost, sans-serif' }}
        >
          {data.heading}
        </h2>
      </div>

      <div className="mt-10 grid sm:mt-14 grid-cols-1 gap-6 md:grid-cols-2">
        {data.options.map((opt: any, idx: number) => {
          const accent = OPTION_ACCENTS[idx % OPTION_ACCENTS.length];
          return (
            <article
              key={opt.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: accent }} />
              <h3 className="mt-6 text-xl font-bold text-foreground">{opt.title}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-foreground/60">{opt.description}</p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: accent }}
              >
                Learn More
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl bg-muted px-6 py-8 sm:px-10 sm:py-10">
        <p className="mx-auto max-w-4xl text-center text-lg leading-relaxed text-foreground/75">
          {data.summary}
        </p>
      </div>
    </div>
  </section>
);

const Benefits = ({ data }: { data: any }) => (
  <section className="bg-[#023047] px-4 py-14 sm:py-20 lg:py-24 text-white sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <div>
        <h2
          className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          style={{ fontFamily: 'Jost, sans-serif' }}
        >
          {data.heading}
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#8ecae6]">CFP®</span>
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#8ecae6]">QAFP™</span>
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#8ecae6]">FP Canada</span>
        </div>
      </div>
      <div className="space-y-6">
        {data.paragraphs.map((p: string, idx: number) => (
          <p key={idx} className="max-w-[68ch] text-lg leading-relaxed text-pretty text-white/70">
            {p}
          </p>
        ))}
      </div>
    </div>
  </section>
);

const FAQs = ({ data }: { data: any }) => (
  <section className="px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <h2
        className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        style={{ fontFamily: 'Jost, sans-serif' }}
      >
        {data.heading}
      </h2>
      <div className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {data.items.map((faq: any) => (
          <details key={faq.id} className="group px-6 py-5 open:bg-muted/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="grid size-8 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-45">
                <Plus className="size-4" />
              </span>
            </summary>
            <p className="mt-3 max-w-[68ch] leading-relaxed text-foreground/65">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const Promos = ({ data }: { data: any }) => (
  <section className="bg-muted px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <h2
        className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        style={{ fontFamily: 'Jost, sans-serif' }}
      >
        {data.heading}
      </h2>
      <div className="mt-8 grid sm:mt-12 grid-cols-1 gap-6 md:grid-cols-3">
        {data.items.map((promo: any, idx: number) => {
          const accent = PROMO_ACCENTS[idx % PROMO_ACCENTS.length];
          return (
            <Link
              key={promo.id}
              href={promo.route}
              className="group flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm sm:p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <div>
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: accent }}
                >
                  {promo.category}
                </span>
                <p className="mt-6 text-xl font-bold leading-snug text-foreground">{promo.headline}</p>
              </div>
              <span
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: accent }}
              >
                Explore
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

// --- Main Page Component ---

const ExamPrepPage = () => {
  return (
    <main>
      {PAGE_DATA.map((section, index) => {
        switch (section.type) {
          case 'Hero': return <Hero key={index} data={section} />;
          case 'PrepStyles': return <PrepStyles key={index} data={section} />;
          case 'Benefits': return <Benefits key={index} data={section} />;
          case 'FAQs': return <FAQs key={index} data={section} />;
          case 'Promos': return <Promos key={index} data={section} />;
          default: return null;
        }
      })}
    </main>
  );
};

export default ExamPrepPage;
