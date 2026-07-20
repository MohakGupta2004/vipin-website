import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  GraduationCap,
  ShieldAlert,
  Scale,
  MonitorPlay,
  BadgeCheck,
  Settings2,
} from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Data ---

const ADOPTION_POINTS = [
  'Citizens are ready to adopt crypto and decentralized tools. Daily transaction volume on network protocols continues to surge.',
  'Learn structural principles of digital asset architectures to prepare your operations methods for alternative tech ecosystems.',
  'Meet state and standard legal parameters clearly while managing asset portfolio mechanics under high security rules.',
  'Build a competitive planning framework that sets your corporate operations apart from classical financial advising services.',
];

const INTRO_CARDS = [
  {
    icon: GraduationCap,
    title: 'Build DeFi Knowledge + Skills',
    desc: 'Train your teams collectively to manage alternative digital asset assessment patterns.',
    accent: '#219ebc',
  },
  {
    icon: ShieldAlert,
    title: 'Framework Accuracy + Readiness',
    desc: 'Gain operational compliance toolkits designed to lower structural business risk across network transactions.',
    accent: '#fb8500',
  },
  {
    icon: Scale,
    title: 'Navigate Risk + Plan Portfolio Frameworks',
    desc: 'Match alternative digital asset allocations with standard client portfolio management goals under strict compliance rules.',
    accent: '#023047',
  },
];

const REALITY_PARAGRAPHS = [
  'Gain a clear strategic position in digital crypto environments. Forward-thinking entities are scaling up team proficiencies to catch consumer demand cycles early.',
  'Your customers expect a clear roadmap. Maintain deep professional authority by validating core methods with leading industry experts.',
];

const SERVICE_COLUMNS = [
  {
    icon: MonitorPlay,
    title: 'Online Education',
    desc: 'All programs run on scalable and easy-to-use platforms. Manage global learning schedules with intuitive dashboards and reporting structures.',
  },
  {
    icon: BadgeCheck,
    title: 'Deep Expertise',
    desc: 'Programs created by industry experts with growing DeFi community insights. Give your teams elite frameworks to minimize transaction failures.',
  },
  {
    icon: Settings2,
    title: 'Custom Curriculum',
    desc: 'Programs are customized to your needs and team professional development. Ensure your asset managers understand critical safety protocols securely.',
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
        CDAA for Enterprise
      </span>
      <h1
        className="mt-6 max-w-4xl text-balance text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        Decentralized finance is on the rise. Is your team ready?
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-foreground/70">
        Equip your organization with the frameworks, compliance toolkits, and expertise to advise on digital
        assets with confidence.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          size="lg"
          className="h-13 rounded-lg px-8 text-base font-semibold"
          nativeButton={false}
          render={<a href="#discovery" />}
        >
          Book a Discovery Call
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-13 rounded-lg border-primary/40 bg-transparent px-8 text-base font-semibold text-primary hover:bg-primary/5 hover:text-primary"
          nativeButton={false}
          render={<Link href="/certified-digital-asset-advisor-designation" />}
        >
          About the CDAA
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

const Adoption = () => (
  <section className="px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
      <div>
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">The Shift</p>
        <h2
          className="mt-3 text-balance text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          Widespread crypto adoption is coming. And Canada is leading the way.
        </h2>
      </div>
      <ul className="grid gap-4">
        {ADOPTION_POINTS.map((point) => (
          <li
            key={point}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-4" strokeWidth={3} />
            </span>
            <span className="leading-relaxed text-foreground/70">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Introducing = () => (
  <section className="bg-[#eaf5fa] px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Introducing</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          The Certified Digital Asset Advisor (CDAA)
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-foreground/60">
          An enterprise education program designed to align traditional advisory groups with modern digital
          finance setups seamlessly.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {INTRO_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
              <span
                className="flex size-12 items-center justify-center rounded-2xl text-white shadow-sm"
                style={{ backgroundColor: card.accent }}
              >
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold leading-snug text-foreground" style={HEADING_FONT}>
                {card.title}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground/60">{card.desc}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const MarketReality = () => (
  <section className="bg-[#023047] px-4 py-24 text-white sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
      <div>
        <p className="text-sm font-semibold tracking-[0.18em] text-[#8ecae6] uppercase">Market Reality</p>
        <h2
          className="mt-3 text-balance text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
          style={HEADING_FONT}
        >
          Many investors are already leaning into digital assets. Can your advisers afford not to?
        </h2>
      </div>
      <div className="space-y-6 self-center">
        {REALITY_PARAGRAPHS.map((text, idx) => (
          <p key={idx} className="max-w-[64ch] text-lg leading-relaxed text-pretty text-white/70">
            {text}
          </p>
        ))}
      </div>
    </div>
  </section>
);

const Partner = () => (
  <section className="px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
          Your Full-Service Education Partner
        </p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          Build a future-ready organization. Effortlessly.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-foreground/60">
          Our customizable learning solutions are designed to scale with your organization&rsquo;s digital asset
          advisory capabilities.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        {SERVICE_COLUMNS.map((col) => {
          const Icon = col.icon;
          return (
            <div key={col.title} className="flex flex-col">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground" style={HEADING_FONT}>
                {col.title}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground/60">{col.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const Discovery = () => (
  <section id="discovery" className="scroll-mt-24 px-4 pb-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl rounded-3xl bg-[#023047] px-8 py-16 text-center text-white sm:px-14 sm:py-20">
      <p className="text-sm font-semibold tracking-[0.18em] text-[#8ecae6] uppercase">
        Book a Discovery Call Today
      </p>
      <h2 className="mt-4 text-balance text-3xl leading-tight font-bold tracking-tight sm:text-4xl" style={HEADING_FONT}>
        Get VIP access to our industry experts
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-white/70">
        See how your team can get started on their path to becoming certified digital asset advisors. We work with
        standard advisory structures to ensure maximum client retention.
      </p>
      <Button
        size="lg"
        className="mt-10 h-13 rounded-lg bg-[#fb8500] px-8 text-base font-semibold text-white hover:bg-[#fb8500]/90"
        nativeButton={false}
        render={<Link href="/contact" />}
      >
        Book Now
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

const EnterpriseCdaaPage = () => (
  <main>
    <Hero />
    <Adoption />
    <Introducing />
    <MarketReality />
    <Partner />
    <Discovery />
    <MarketingBanners />
  </main>
);

export default EnterpriseCdaaPage;
