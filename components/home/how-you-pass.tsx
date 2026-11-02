const steps = [
  {
    title: "Live class",
    text: "Learn each topic with Vipin in a live online group, and ask questions as you go.",
  },
  {
    title: "Practise",
    text: "Work through exam-style questions between sessions. Original practice tests are in development.",
  },
  {
    title: "Readiness check",
    text: "A free diagnostic will show where you stand. It is launching soon, so join the waitlist.",
  },
  {
    title: "Book and write the exam",
    text: "You register with the official exam provider. We help you decide when you are ready.",
  },
]

export function HowYouPass() {
  return (
    <section className="bg-surface-2 py-16 md:py-20 lg:py-24">
      <div className="container-site">
        <h2 className="max-w-[24ch]">How you&apos;ll pass</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 md:block">
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-teal bg-surface-2 font-serif text-base font-semibold text-heading">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-8 bottom-[-2rem] left-4 w-px bg-brand-teal md:top-4 md:right-[-1.5rem] md:bottom-auto md:left-8 md:h-px md:w-auto"
                />
              )}
              <div className="md:mt-4">
                <h3 className="font-sans text-lg!">{s.title}</h3>
                <p className="mt-2 max-w-[32ch] text-[0.9375rem] text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
