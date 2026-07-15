import { ArrowRight } from 'lucide-react'

const cards = [
  {
    title: "Prepare for CIRO proficiency and registration exams with certainty.",
    route: "/securities",
    className: "bg-[#2c7d9e] hover:bg-[#256b88] text-white"
  },
  {
    title: "Discover BCC's industry-leading CFP® and QAFP™ Exam Prep Programs.",
    route: "/financial-planning",
    className: "bg-[#7cc4cd] hover:bg-[#68b4bf] text-white"
  },
  {
    title: "Accelerate your growth with BCC's LLQP and GLQP Programs.",
    route: "/insurance",
    className: "bg-[#fbe8bc] hover:bg-[#f7dda3] text-[#1e2a4a]"
  },
  {
    title: "Stay ahead in the future of finance with digital asset expertise.",
    route: "/digital-assets",
    className: "bg-[#e05a4f] hover:bg-[#cc4c42] text-white"
  }
]

export default function LearnMore() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.route}
            className={`group p-10 transition-colors ${card.className}`}
          >
            <h3 className="text-base leading-relaxed mb-6">{card.title}</h3>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>Learn more</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
