import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Data Structures ---
const PATHWAY_CARDS = [
  {
    title: 'New Licensed PQAPs',
    description:
      "Vipin Garg's comprehensive LLQP course includes the certification necessary to take provincial licensing exams and to apply for life insurance and accident and health insurance licenses.",
    accent: '#219ebc',
  },
  {
    title: 'Accident & Illness Licensees',
    description:
      "Vipin Garg's Accident & Illness course includes the certification necessary to take provincial licensing exams and apply for accident and sickness insurance license.",
    accent: '#fb8500',
  },
  {
    title: 'Upgrade Accident & Illness Licensees',
    description:
      "Vipin Garg's \"Upgrading Accident & Illness Licensees\" course includes the certification necessary to take provincial licensing exams and to apply for a life insurance license for agents who already hold an accident and health insurance.",
    accent: '#023047',
  },
];

const COURSE_CATALOG = [
  {
    category: 'New Licensed PQAPs',
    subtitle: 'Choose from the options below if you want your comprehensive course in PQAP or Accident & Illness course below.',
    accent: '#219ebc',
    courses: [
      {
        id: 'pqap-complete',
        title: 'Complete PQAP course (Canada)',
        description: 'Get all PQAP modules, including Accident and Health Insurance (A&S).',
        price: '$350.00 CAD',
      },
    ],
  },
  {
    category: 'Accident & Illness Licensees',
    subtitle:
      "Choisissez parmi nos cours si vous recherchez uniquement une formation pour votre assurance accident et maladie (A&S). Ces cours seuls ne permettent pas aux étudiants d'obtenir la désignation complète du PQAP.",
    accent: '#fb8500',
    courses: [
      {
        id: 'pqap-as',
        title: "L'Accident & Maladie (Canada)",
        description: "Obtenez la version du cours d'assurance accident et maladie (A&S) qui vous permettra de pratiquer au Québec.",
        price: '$222.00 CAD',
      },
    ],
  },
  {
    category: "Mise-à-niveau L'Accident & Maladie Licenciés",
    subtitle:
      "Choisissez parmi nos cours si vous détenez déjà le cours d'assurance accident et maladie (A&S) et que vous souhaitez vous perfectionner pour obtenir la désignation complète du PQAP.",
    accent: '#ffb703',
    courses: [
      {
        id: 'pqap-upgrade',
        title: "Mise-à-niveau L'Accident & Maladie",
        description: 'Obtenez le cours de mise à niveau pour obtenir votre désignation complète au PQAP.',
        price: '$150.00 CAD',
      },
    ],
  },
];

const WHY_CHOOSE_US_FRENCH = {
  title: 'Pourquoi choisir Vipin Garg pour votre formation au Programme de Qualification en Assurance de Personnes (PQAP)',
  subtitle:
    "En tant que leader de la formation dans l'industrie de l'assurance, Vipin Garg propose des structures d'apprentissage flexibles adaptées pour vous accompagner idéalement vers la réussite professionnelle.",
  points: [
    'Taux de réussite élevés aux examens',
    "Options d'études en ligne",
    'Modules de cours flexibles',
    "Des décennies d'expertise dans l'industrie",
    'Reconnu à travers le Canada',
    'Équipe dédiée à la réussite des étudiants',
  ],
};

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
    title: "Accelerate your growth with Vipin Garg's LLQP and QAFP Programs.",
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
        Programme de Qualification en Assurance de Personnes
      </span>
      <h1
        className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        PQAP Training
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-foreground/70 sm:mt-6 sm:text-lg">
        Build a rewarding career program for selling life insurance.
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

const Pathways = () => (
  <section className="px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Your Pathway</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          style={HEADING_FONT}
        >
          Path to obtain your PQAP
        </h2>
      </div>

      <div className="mt-10 grid sm:mt-14 grid-cols-1 gap-6 md:grid-cols-3">
        {PATHWAY_CARDS.map((card) => (
          <article
            key={card.title}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 transition-shadow duration-300 hover:shadow-lg"
          >
            <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: card.accent }} />
            <h3 className="mt-6 text-xl font-bold text-foreground" style={HEADING_FONT}>
              {card.title}
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/60">{card.description}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl bg-[#eaf5fa] px-6 py-4 text-center">
        <p className="leading-relaxed text-foreground/70">
          Do you want to study for your PQAP in English? Take the LLQP course in English.
        </p>
        <Link
          href="/life-license-qualification-program"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Go to LLQP
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  </section>
);

const CourseCatalog = () => (
  <section id="courses" className="scroll-mt-24 bg-[#eaf5fa] px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Course Catalog</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          Choose the course that fits your goals
        </h2>
      </div>

      <div className="mt-14 space-y-14">
        {COURSE_CATALOG.map((section) => (
          <div key={section.category}>
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold text-foreground" style={HEADING_FONT}>
                {section.category}
              </h3>
              <p className="mt-2 leading-relaxed text-foreground/60">{section.subtitle}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {section.courses.map((course) => (
                <article
                  key={course.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
                >
                  <span className="h-1.5 w-12 rounded-full" style={{ backgroundColor: section.accent }} />
                  <h4 className="mt-6 text-xl font-bold text-foreground" style={HEADING_FONT}>
                    {course.title}
                  </h4>
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
          Pourquoi Vipin Garg
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          style={HEADING_FONT}
        >
          {WHY_CHOOSE_US_FRENCH.title}
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-pretty text-white/70">
          {WHY_CHOOSE_US_FRENCH.subtitle}
        </p>
      </div>
      <ul className="grid gap-4 self-center sm:grid-cols-2">
        {WHY_CHOOSE_US_FRENCH.points.map((point) => (
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

const PqapPage = () => (
  <main>
    <Hero />
    <Pathways />
    <CourseCatalog />
    <WhyChooseUs />
    <MarketingBanners />
  </main>
);

export default PqapPage;
