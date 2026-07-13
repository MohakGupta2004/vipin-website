import { GraduationCap, ShieldCheck, Wallet, Coins } from 'lucide-react'

export function Card({ icon, title, desc, route }: { icon: React.ReactNode; title: string; desc: string; route: string }) {
  return (
    <div className="border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4 text-[#e67e22]">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground uppercase mb-4">{title}</h3>
      <p className="text-gray-500 mb-6">{desc}</p>
      <a href={route} className="inline-block bg-[#e67e22] text-white px-6 py-2 rounded hover:bg-[#d35400] transition-colors">
        Learn more
      </a>
    </div>
  )
}

const links = [
  { icon: <GraduationCap size={64} />, title: "Securities", desc: "Prepare for CIRO securities exams with confidence. CIRE and RSE Exam Prep are live on ReadyEngine™. Know when you're ready to pass before you book.", route: "/securities" },
  { icon: <ShieldCheck size={64} />, title: "Insurance", desc: "Get licensed with confidence through our LLQP and Accident & Sickness (A&S) insurance courses. Build a rewarding career in life, health, or general insurance while helping clients protect what matters most.", route: "/insurance" },
  { icon: <Wallet size={64} />, title: "Financial Planning", desc: "Level up your career in the financial services sector with our CFP or QAFP Exam Prep programs. Become a trusted expert and help your clients plan for a bright future.", route: "/financial-planning" },
  { icon: <Coins size={64} />, title: "Digital Assets", desc: "With the new Certified Digital Asset Advisor (CDAA) designation you will gain the knowledge to guide Canadians through the world of digital assets and cryptocurrency.", route: "/digital-asset-financial-advisor" },
]

export default function ChooseSuccessPath() {
  return (
    <section className="py-16 px-4">
      <h1 className="text-4xl font-bold text-center text-foreground mb-4">Choose Your Path to Success</h1>
      <p className="text-center text-gray-500 mb-12">Find the course that's right for you.</p>
      <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
        {links.map((link, index) => (
          <Card key={index} {...link} />
        ))}
      </div>
    </section>
  )
}
