import { Check } from 'lucide-react'

const features = [
  {
    title: "Exam-aligned preparation for regulated industries",
    desc: "Our programs are built around real exam requirements and regulatory standards, so learners focus on what actually matters, not just what's available to study."
  },
  {
    title: "Structured learning with clear outcomes",
    desc: "We don't leave learners guessing. Each program is designed with a clear path, defined objectives, and practical milestones that support real progress."
  },
  {
    title: "Built for credibility that lasts",
    desc: "We focus on long-term professional readiness and confidence, not quick wins or surface-level completion."
  }
]

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f0f4f8] py-16 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Why choose Vipin Garg</h2>
          <p className="text-gray-600 mb-4">
            I am a CFA Charterholder, finance educator, and industry professional with over a decade of experience teaching finance subjects, mentoring certification candidates, and helping students and professionals understand capital markets, banking, investment products, regulatory frameworks and advisory practices.

My coaching style is practical, exam-focused and career-oriented. I help students understand not just what to study, but how concepts apply in real banking, wealth management, insurance and investment advisory roles.
          </p>
          <p className="text-gray-600 mb-8">
            We focus on clarity, structure, and readiness, so learners know what to focus on and can move forward with confidence.
          </p>
          <a href="/about" className="inline-block bg-[#e67e22] text-white px-8 py-3 rounded hover:bg-[#d35400] transition-colors font-medium">
            About Us
          </a>
        </div>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#e67e22] flex items-center justify-center text-[#e67e22]">
                <Check size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
