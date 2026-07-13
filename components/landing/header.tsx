import "@fontsource/jost"

export default function Header() {
  return (
    <section
      className="relative flex min-h-[500px] items-center bg-cover bg-center"
      style={{ backgroundImage: "url(/hero.jpg)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1533]/90 via-[#0f1f4c]/70 to-[#0f1f4c]/30" />
      <div className="relative pl-8 sm:pl-12 lg:pl-16">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        style={{ fontFamily: "Jost, sans-serif" }}>
          Build a career in{" "}
          <span className="text-[#3b82f6]">Financial Services</span>,{" "}
          <span className="text-[#3b82f6]">Insurance</span> or{" "}
          <span className="text-[#3b82f6]">Securities</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
          Licensing, exam prep, and designation pathways trusted by Canadian
          professionals for over 25 years.
        </p>
      </div>
    </section>
  )
}
