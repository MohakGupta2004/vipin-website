import Link from "next/link"
import { ArrowRight, BookOpen, CalendarClock, UserRound } from "lucide-react"

type Course = {
  status: string
  accent: string
  badgeBg: string
  badgeText: string
  title: string
  desc: string
  instructor: string
  framework: string
  due: string
  sessions: number
  price: string
  route: string
}

const courses: Course[] = [
  {
    status: "In progress",
    accent: "#219ebc",
    badgeBg: "#eaf5fa",
    badgeText: "#12657a",
    title: "CSC Level 1 & Level 2",
    desc: "Build a strong foundation in Canadian securities, financial markets, economics, fixed income, equities, derivatives, portfolio management, mutual funds, ETFs, taxation and client relationships.",
    instructor: "Vipin Garg",
    framework: "CSC Standard",
    due: "15 June, '26",
    sessions: 10,
    price: "$500",
    route: "/securities",
  },
  {
    status: "Available",
    accent: "#0f8a6a",
    badgeBg: "#e6f4ef",
    badgeText: "#0b6b52",
    title: "Investment Funds in Canada",
    desc: "Learn mutual funds, KYC, portfolio construction, investment products, mutual fund performance, fees, ethics, compliance and regulation.",
    instructor: "Vipin Garg",
    framework: "IFC Standard",
    due: "15 June, '26",
    sessions: 10,
    price: "$500",
    route: "/securities",
  },
  {
    status: "Regulatory",
    accent: "#fb8500",
    badgeBg: "#fff1e0",
    badgeText: "#8a4700",
    title: "Canadian Investment Regulatory Exam",
    desc: "Prepare for regulatory framework, client relationships, complaint handling, market analysis, trade execution, securities, derivatives, conflicts and ethics.",
    instructor: "Vipin Garg",
    framework: "CIRE Standard",
    due: "15 June, '26",
    sessions: 10,
    price: "$500",
    route: "/securities",
  },
  {
    status: "Licensing",
    accent: "#023047",
    badgeBg: "#e8eef2",
    badgeText: "#023047",
    title: "Life License Qualification Program",
    desc: "Prepare for life insurance licensing concepts including life insurance, accident and sickness insurance, segregated funds, annuities, ethics and client needs analysis.",
    instructor: "Vipin Garg",
    framework: "LLQP Standard",
    due: "15 June, '26",
    sessions: 10,
    price: "$500",
    route: "/life-license-qualification-program",
  },
]

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex w-[82vw] max-w-sm shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:shadow-xl sm:w-auto sm:max-w-none sm:p-6 sm:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span
        className="mb-5 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold sm:mb-6"
        style={{ backgroundColor: course.badgeBg, color: course.badgeText }}
      >
        {course.status}
      </span>

      <h3 className="text-xl font-bold leading-snug text-balance text-foreground">
        {course.title}
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-pretty text-foreground/60">
        {course.desc}
      </p>

      <dl className="mt-6 flex-1 space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <dt className="sr-only">Instructor</dt>
          <UserRound
            aria-hidden="true"
            className="size-4 shrink-0"
            style={{ color: course.accent }}
          />
          <dd className="text-foreground/75">Taught by {course.instructor}</dd>
        </div>
        <div className="flex items-center gap-3">
          <dt className="sr-only">Framework</dt>
          <BookOpen
            aria-hidden="true"
            className="size-4 shrink-0"
            style={{ color: course.accent }}
          />
          <dd className="text-foreground/75">{course.framework}</dd>
        </div>
        <div className="flex items-center gap-3">
          <dt className="sr-only">Next intake</dt>
          <CalendarClock
            aria-hidden="true"
            className="size-4 shrink-0"
            style={{ color: course.accent }}
          />
          <dd className="text-foreground/75">Starts {course.due}</dd>
        </div>
      </dl>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
        <div>
          <p className="text-2xl font-bold" style={{ color: course.accent }}>
            {course.sessions}
          </p>
          <p className="mt-0.5 text-[0.7rem] font-semibold tracking-wide text-foreground/60 uppercase">
            Sessions
          </p>
        </div>
        <div className="border-l border-border pl-4">
          <p className="text-2xl font-bold" style={{ color: course.accent }}>
            {course.price}
          </p>
          <p className="mt-0.5 text-[0.7rem] font-semibold tracking-wide text-foreground/60 uppercase">
            Plus taxes
          </p>
        </div>
      </div>

      <Link
        href={course.route}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold text-foreground transition-colors hover:border-transparent hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
      >
        Open course
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
        <span className="sr-only"> — {course.title}</span>
      </Link>
    </article>
  )
}

export default function PopularCourses() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
          <h2 className="max-w-2xl text-3xl font-bold text-balance text-foreground sm:text-4xl">
            Our most popular courses
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-pretty text-foreground/60 sm:mt-4">
            Live, instructor-led programs for the licensing and designation
            exams Canadian professionals sit most often.
          </p>

        </div>

        {/* Swipeable on touch, grid from sm up. */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl text-center sm:mt-12">
          <Link
            href="/exam-prep-programs"
            className="group/all inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            View all programs
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out group-hover/all:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
          </div>
    </section>
  )
}
