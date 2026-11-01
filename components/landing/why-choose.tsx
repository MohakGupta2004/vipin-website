const features = [
  {
    title: "Exam-aligned preparation for regulated industries",
    desc: "Our programs are built around real exam requirements and regulatory standards to ensure you are test-ready.",
    color: "#219ebc"
  },
  {
    title: "Structured learning with clear outcomes",
    desc: "We offer live classes, assignments, mock exams, and practical insights designed with a clear goal.",
    color: "#ffd28c"
  },
  {
    title: "Built for credibility that lasts",
    desc: "We focus on long-term professional readiness and confidence, not quick wins or shortcuts.",
    color: "#f45b4e"
  }
]

export default function WhyChooseUs() {
  return (
    <section className="bg-muted py-14 px-4 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a7f99] dark:text-primary leading-tight text-balance mb-5 sm:mb-6">
            Why choose
            <br className="hidden sm:inline" />{" "}
            Vipin Garg
          </h2>
          <p className="text-foreground/70 leading-relaxed text-pretty mb-7 sm:mb-8 max-w-md">
            I am a CFA Charterholder, finance educator, and industry professional with over a decade of experience teaching finance subjects, mentoring certification candidates, and helping students and professionals understand capital markets, tax planning, and investment strategies.
          </p>
          <a
            href="/about"
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center bg-[#219ebc] text-white px-7 rounded-lg hover:bg-[#1a7f99] active:bg-[#1a7f99] transition-colors font-semibold text-sm"
          >
            About Us
          </a>
        </div>

        <div className="relative">
          <div className="absolute left-[7px] top-3 bottom-3 border-l-2 border-dotted border-border" />
          <div className="space-y-10 sm:space-y-12">
            {features.map((feature, index) => (
              <div key={index} className="relative flex gap-5 sm:gap-8">
                <span
                  className="relative z-10 flex-shrink-0 w-4 h-4 rounded-full mt-1.5"
                  style={{ backgroundColor: feature.color }}
                />
                <div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
