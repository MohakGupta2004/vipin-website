import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck, Quote } from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Data ---

const CRYPTO_BENEFITS = [
  'Gain tools and frameworks needed to evaluate cryptocurrency and digital assets to determine suitability for individual client profiles.',
  'Meet financial planning and legal frameworks required to fully implement cryptocurrency advice, following compliance guidelines and standards.',
  'Understand blockchain implementation patterns, cryptocurrency ecosystems, and transaction lifecycles on the network.',
  'Validate your knowledge with an industry-recognized certification program focused strictly on financial advising rules.',
  'High quality course materials designed by top financial professionals and regulatory security experts.',
];

const STATISTICS = [
  { metric: '1 in 8', description: 'Canadian professionals who report having already invested or currently own cryptocurrency assets.' },
  { metric: '76%', description: 'Financial consumers who believe advice on digital assets should be provided alongside standard planning portfolio assets.' },
  { metric: '#1', description: 'Cryptocurrency continues to stand as the most common individual non-traditional investment vehicle across Canada.' },
  { metric: '7 / 10', description: 'Most Canadian advisors state they lack standard professional resources to advise on digital currencies.' },
];

const PROCESS_STEPS = [
  { step: 1, text: 'Complete the CDAA online video modules covering cryptocurrency and digital assets.', accent: '#219ebc' },
  { step: 2, text: 'Pass the corresponding online evaluation exam.', accent: '#fb8500' },
  { step: 3, text: 'Get your Certified Digital Asset Advisor designation to build trust with your clients and expand your operations.', accent: '#023047' },
];

const TESTIMONIALS = [
  {
    author: 'Danielle M.',
    role: 'Financial Advisor',
    text: 'The program highlights critical infrastructure points that traditional tools overlook. It gives me a massive performance bump when managing standard high net worth asset allocations alongside alternative digital assets.',
  },
  {
    author: 'Marc-Antoine L.',
    role: 'Wealth Manager',
    text: 'The core framework details absolute compliance rules clearly. It helps reduce professional risk while maximizing my advisory platform coverage over volatile emerging cryptocurrency markets.',
  },
  {
    author: 'Sarah J.',
    role: 'Portfolio Manager',
    text: 'Exceptional presentation formatting and highly detailed modules. My entire advisory platform has gained structured methods to handle blockchain investment queries with high accuracy and confidence.',
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
        Certified Digital Asset Advisor
      </span>
      <h1
        className="mt-6 max-w-4xl text-balance text-3xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        Get your Certified Digital Asset Advisor Designation
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-foreground/70">
        Acquire advanced knowledge on digital assets to guide your clients effectively into the future of
        decentralized finance platforms.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
        <Button
          size="lg"
          className="h-13 w-full rounded-lg px-8 text-base font-semibold sm:w-auto"
          nativeButton={false}
          render={<a href="#process" />}
        >
          View the Course
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

const Benefits = () => (
  <section className="px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
      <div>
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">The Opportunity</p>
        <h2
          className="mt-3 text-balance text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          Cryptocurrency is set to change Canadians&rsquo; investments and private wealth.
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-pretty text-foreground/65">
          The CDAA program equips you to advise with confidence across an emerging asset class your clients are
          already holding.
        </p>
      </div>
      <ul className="grid gap-4">
        {CRYPTO_BENEFITS.map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-4" strokeWidth={3} />
            </span>
            <span className="leading-relaxed text-foreground/70">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Statistics = () => (
  <section className="bg-[#023047] px-4 py-14 sm:py-20 lg:py-24 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.18em] text-[#8ecae6] uppercase">By the Numbers</p>
        <h2
          className="mt-3 text-balance text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
          style={HEADING_FONT}
        >
          Your clients expect you to advise them on cryptocurrency
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-white/70">
          Provide reliable guidance by matching digital asset allocations with traditional investment strategies.
        </p>
      </div>

      <dl className="mt-10 grid sm:mt-16 grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {STATISTICS.map((stat, idx) => (
          <div key={idx} className="border-t border-white/15 pt-6">
            <dt
              className="text-5xl font-bold tracking-tight text-[#ffb703] lg:text-6xl"
              style={HEADING_FONT}
            >
              {stat.metric}
            </dt>
            <dd className="mt-4 leading-relaxed text-white/70">{stat.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

const Process = () => (
  <section id="process" className="scroll-mt-24 bg-[#eaf5fa] px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Three Steps</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          How to become a Certified Digital Asset Advisor
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-foreground/60">
          Follow a structured curriculum path to complete your education requirements and claim your professional
          credentials.
        </p>
      </div>

      <ol className="mt-10 grid sm:mt-14 grid-cols-1 gap-6 md:grid-cols-3">
        {PROCESS_STEPS.map((item) => (
          <li
            key={item.step}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <span
              className="flex size-12 items-center justify-center rounded-2xl text-lg font-bold text-white"
              style={{ backgroundColor: item.accent, fontFamily: 'Jost, sans-serif' }}
            >
              {item.step}
            </span>
            <p className="mt-6 leading-relaxed text-foreground/70">{item.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 text-center">
        <Button
          size="lg"
          className="h-13 w-full rounded-lg px-8 text-base font-semibold sm:w-auto"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          View the Course
          <ArrowRight data-icon="inline-end" className="ml-2 size-5" />
        </Button>
      </div>
    </div>
  </section>
);

const EditorialQuote = () => (
  <section className="px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-4xl">
      <Quote className="size-12 text-[#8ecae6]" aria-hidden="true" />
      <h2 className="sr-only">Be ready with your best advice as cryptocurrency adoption grows</h2>
      <blockquote
        className="mt-6 text-2xl leading-snug font-semibold text-balance text-foreground sm:text-3xl"
        style={HEADING_FONT}
      >
        &ldquo;As the global financial system undergoes digital transformations, financial planners require an
        established framework to analyze security elements, technical patterns, and asset interactions securely.
        Preparing your operational methods today will ensure client retention tomorrow.&rdquo;
      </blockquote>
      <cite className="mt-6 block text-sm font-semibold text-primary not-italic">— Advisor Review Board</cite>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="bg-[#eaf5fa] px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Advisor Stories</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          What advisors are saying
        </h2>
      </div>

      <div className="mt-10 grid sm:mt-14 grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.author} className="flex flex-col rounded-2xl bg-card p-6 shadow-sm sm:p-8">
            <Quote className="size-8 text-[#8ecae6]" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 leading-relaxed text-foreground/70">{t.text}</blockquote>
            <figcaption className="mt-6 border-t border-border pt-5">
              <span className="block font-bold text-foreground" style={HEADING_FONT}>
                {t.author}
              </span>
              <span className="mt-0.5 block text-sm font-medium text-foreground/50">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const NextStep = () => (
  <section className="px-4 py-14 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl rounded-3xl bg-[#023047] px-6 py-12 text-center text-white sm:px-14 sm:py-20">
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl" style={HEADING_FONT}>
        Ready to take the next step?
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-white/70">
        Our Certified Digital Asset Advisor module is ready to help you navigate modern alternative ecosystems
        safely and build deep authority in your business domain right away.
      </p>
      <Button
        size="lg"
        className="mt-10 h-13 w-full rounded-lg bg-[#fb8500] px-8 sm:w-auto text-base font-semibold text-white hover:bg-[#fb8500]/90"
        nativeButton={false}
        render={<Link href="/contact" />}
      >
        Get Started Today
        <ArrowRight data-icon="inline-end" className="ml-2 size-5" />
      </Button>
    </div>
  </section>
);

const MarketingBanners = () => (
  <section className="bg-[#eaf5fa] px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
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

const CdaaProgramPage = () => (
  <main>
    <Hero />
    <Benefits />
    <Statistics />
    <Process />
    <EditorialQuote />
    <Testimonials />
    <NextStep />
    <MarketingBanners />
  </main>
);

export default CdaaProgramPage;
