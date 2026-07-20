import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, User, Building2 } from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Data ---

const STREAMS = [
  {
    id: 'advisor',
    icon: User,
    title: 'Advisor',
    description:
      'Are you a practicing professional looking to level up your crypto expertise? Get started on your CDAA today.',
    buttonText: 'Learn More',
    route: '/digital-asset-financial-advisor',
    accent: '#219ebc',
  },
  {
    id: 'enterprise',
    icon: Building2,
    title: 'Enterprise',
    description:
      'Are you leading a team, department or organization that needs crypto and DeFi expertise? We can help.',
    buttonText: 'Learn More',
    route: '/digital-asset-corporate-training',
    accent: '#fb8500',
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

    <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
        <ShieldCheck className="size-4" />
        The Future is Here
      </span>
      <h1
        className="mt-6 max-w-4xl text-balance text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        Certified Digital Asset Advisor (CDAA) Designation
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-foreground/70">
        Cryptocurrency is changing how Canadians invest. Gain the knowledge to guide them through the world of
        digital assets and decentralized finance.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          size="lg"
          className="h-13 rounded-lg px-8 text-base font-semibold"
          nativeButton={false}
          render={<a href="#streams" />}
        >
          Choose Your Stream
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

const Intro = () => (
  <section className="px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Why It Matters</p>
      <h2
        className="mt-3 text-balance text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl"
        style={HEADING_FONT}
      >
        Cryptocurrency is changing how Canadians invest.
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-pretty text-foreground/70">
        Decentralized finance (DeFi) is driving fundamental changes in the financial landscape. Crypto assets are
        being adopted by the mass market and integrated into the broader financial ecosystem. Financial
        institutions need to adapt. If you provide financial planning, accounting, legal, or estate services,
        staying knowledgeable about cryptocurrency is essential.
      </p>
    </div>
  </section>
);

const Streams = () => (
  <section id="streams" className="scroll-mt-24 bg-[#eaf5fa] px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Two Paths</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          Choose your stream
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {STREAMS.map((stream) => {
          const Icon = stream.icon;
          return (
            <Link
              key={stream.id}
              href={stream.route}
              className="group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-10"
            >
              <span
                className="flex size-14 items-center justify-center rounded-2xl text-white shadow-sm"
                style={{ backgroundColor: stream.accent }}
              >
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-foreground" style={HEADING_FONT}>
                {stream.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-foreground/60">{stream.description}</p>
              <span
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: stream.accent }}
              >
                {stream.buttonText}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

const MarketingBanners = () => (
  <section className="px-4 py-24 sm:px-6 lg:px-8">
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

const CdaaDesignationPage = () => (
  <main>
    <Hero />
    <Intro />
    <Streams />
    <MarketingBanners />
  </main>
);

export default CdaaDesignationPage;
