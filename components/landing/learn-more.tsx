import { ArrowRight } from 'lucide-react'

const cards = [
  {
    category: "SECURITIES",
    title: "Prepare for CIRO proficiency and registration exams with certainty.",
    route: "/securities"
  },
  {
    category: "FINANCIAL PLANNING",
    title: "Discover BCC's industry-leading CFP® and QAFP™ Exam Prep Programs.",
    route: "/financial-planning"
  },
  {
    category: "INSURANCE",
    title: "Accelerate your growth with BCC's LLQP and GLQP Programs.",
    route: "/insurance"
  }
]

export default function LearnMore() {
  return (
    <section className="bg-[#2563eb] py-0">
      <div className="grid grid-cols-3">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.route}
            className="p-12 text-white hover:bg-[#1d4ed8] transition-colors group"
          >
            <p className="text-sm font-medium tracking-wider mb-4 opacity-90">{card.category}</p>
            <h3 className="text-2xl font-light mb-8 leading-relaxed">{card.title}</h3>
            <div className="flex items-center gap-3 group-hover:gap-4 transition-all">
              <span className="font-medium">Learn more</span>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-[#2563eb] transition-colors">
                <ArrowRight size={16} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
