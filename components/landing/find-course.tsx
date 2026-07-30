import { ArrowRight } from 'lucide-react'

export function Card({ accent, title, desc, route }: { accent: string; title: string; desc: string; route: string }) {
  return (
    <div className="bg-card rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow">
      <div className="h-1 w-10 rounded-full mb-5 sm:mb-6" style={{ backgroundColor: accent }} />
      <h3 className="text-xl font-bold text-foreground mb-3 sm:mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-pretty mb-6 sm:mb-8">{desc}</p>
      <a
        href={route}
        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium group"
        style={{ color: accent }}
      >
        Learn more
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  )
}

const links = [
  { accent: "#219ebc", title: "Securities", desc: "Prepare for CIRO securities exams with confidence. CIRE and RSE Exam Prep are live on ReadyEngine™. Know when you're ready to pass before you book.", route: "/securities" },
  { accent: "#023047", title: "Insurance", desc: "Get licensed with confidence through our LLQP and Accident & Sickness (A&S) insurance courses. Build a rewarding career in life, health, or general insurance while helping clients protect what matters most.", route: "/insurance" },
  { accent: "#ffb703", title: "Financial Planning", desc: "Level up your career in the financial services sector with our CFP or QAFP Exam Prep programs. Become a trusted expert and help your clients plan for a bright future.", route: "/financial-planning" },
  { accent: "#fb8500", title: "Digital Assets", desc: "With the new Certified Digital Asset Advisor (CDAA) designation you will gain the knowledge to guide Canadians through the world of digital assets and cryptocurrency.", route: "/certified-digital-asset-advisor-designation" },
]

export default function ChooseSuccessPath() {
  return (
    <section className="py-14 px-4 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-balance text-foreground mb-3 sm:mb-4">Choose Your Path to Success</h1>
      <p className="text-center text-gray-500 mb-8 sm:mb-12">Find the course that&apos;s right for you.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {links.map((link, index) => (
          <Card key={index} {...link} />
        ))}
      </div>
    </section>
  )
}
