import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Users, BookOpen, Wallet, TrendingUp } from 'lucide-react';

import '@fontsource/jost';

import { Button } from '@/components/ui/button';

// --- Data ---

const CORE_DIFFERENCES = [
  {
    icon: Users,
    title: 'Expert instructors',
    desc: 'Our courses were designed by expert instructors with decades of experience in the financial services and insurance fields. They are passionate about sharing this expertise and helping students succeed.',
    accent: '#219ebc',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive courses',
    desc: 'Recognized by the relevant licensing bodies in Alberta, our courses cover everything students need to pass their exams with confidence — and set you up for success long after, with scenario-based learning that proves invaluable in real-world practice.',
    accent: '#fb8500',
  },
  {
    icon: Wallet,
    title: 'Flexible, affordable tuition',
    desc: 'We believe everyone should have access to quality education, which is why we offer flexible payment options and convenient subscription packages.',
    accent: '#ffb703',
  },
  {
    icon: TrendingUp,
    title: 'High return on investment',
    desc: 'Our students are employed in high-paying, rewarding careers where they get to help people gain peace of mind and achieve their financial goals.',
    accent: '#023047',
  },
];

const STATS = [
  { metric: '1997', label: 'Educating professionals since' },
  { metric: '25+', label: 'Years as an industry leader' },
  { metric: '100%', label: 'Online, flexible learning' },
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
        About Us
      </span>
      <h1
        className="mt-6 max-w-3xl text-balance text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={HEADING_FONT}
      >
        Canada&rsquo;s leader in financial services and insurance education
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-foreground/70">
        Since 1997, Vipin Garg has helped professionals across Canada earn their designations and build rewarding
        careers.
      </p>
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

const Story = () => (
  <section className="px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <div>
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Our Story</p>
        <h2
          className="mt-3 text-balance text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          The Vipin Garg story
        </h2>
        <dl className="mt-10 grid grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div key={stat.metric} className="border-t-2 border-primary/20 pt-4">
              <dt className="text-3xl font-bold text-foreground sm:text-4xl" style={HEADING_FONT}>
                {stat.metric}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-foreground/55">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-pretty text-foreground/70">
          Since 1997, Vipin Garg has been providing high-quality courses and continuing education that are valued
          by employers and clients alike. We&rsquo;re one of Canada&rsquo;s largest providers of financial services
          and insurance education, and we&rsquo;ve been the industry leader for over two decades.
        </p>
        <p className="text-lg leading-relaxed text-pretty text-foreground/70">
          Our students are at the heart of everything we do, and we&rsquo;re committed to providing the best
          learning experience possible. We offer expert instruction, flexible payment plans, collocated learning
          options, and 100% online learning.
        </p>
        <p className="text-lg leading-relaxed text-pretty text-foreground/70">
          From our beginnings in Alberta to providing pre-designation courses to students across Canada, we have
          remained on the leading edge of financial services and insurance education.
        </p>
      </div>
    </div>
  </section>
);

const Expert = () => (
  <section className="bg-[#023047] px-4 py-24 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.18em] text-[#8ecae6] uppercase">Meet the Team</p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl" style={HEADING_FONT}>
          Our subject-matter expert
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-white/70">
          Our expert instructor has decades of industry experience — and is singularly dedicated to helping
          students succeed.
        </p>
      </div>

      <div className="mt-14 grid gap-8 rounded-3xl bg-white/5 p-8 sm:p-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
          <span
            className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-[#fb8500] text-3xl font-bold text-white"
            style={HEADING_FONT}
            aria-hidden="true"
          >
            JW
          </span>
          <div>
            <h3 className="text-2xl font-bold" style={HEADING_FONT}>
              Jason Watt
            </h3>
            <p className="mt-1 text-sm font-semibold tracking-wider text-[#8ecae6] uppercase">
              Subject-Matter Expert, Professional Services
            </p>
          </div>
        </div>
        <p className="max-w-[64ch] text-lg leading-relaxed text-pretty text-white/75">
          As our lead instructor and subject-matter expert, Jason is passionate about helping Vipin Garg students
          level up their careers. His goal is to deliver the best possible financial services and insurance
          training, and transform these industries by providing high-quality education to emerging professionals.
          Jason also provides industry-leading continuing education for designation holders, and is reimagining the
          CE landscape for financial services and insurance.
        </p>
      </div>
    </div>
  </section>
);

const WhyChoose = () => (
  <section className="bg-[#eaf5fa] px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">Why Choose Us</p>
        <h2
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          style={HEADING_FONT}
        >
          The Vipin Garg difference
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-foreground/60">
          Alberta&rsquo;s leading institution for financial services and insurance education. Since 1997, a trusted
          provider of industry-leading courses, exam prep, and continuing education — with student success at the
          centre of everything we do.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {CORE_DIFFERENCES.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="flex gap-5 rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                style={{ backgroundColor: item.accent }}
              >
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-foreground" style={HEADING_FONT}>
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-foreground/60">{item.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const ContactCta = () => (
  <section className="px-4 py-24 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl bg-[#023047] px-8 py-14 text-center text-white sm:flex-row sm:justify-between sm:px-14 sm:text-left">
      <p className="max-w-xl text-xl leading-snug font-semibold" style={HEADING_FONT}>
        Ready to level up your career? We&rsquo;re here to help you get started.
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

const AboutPage = () => (
  <main>
    <Hero />
    <Story />
    <Expert />
    <WhyChoose />
    <ContactCta />
    <MarketingBanners />
  </main>
);

export default AboutPage;
