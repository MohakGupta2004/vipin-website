import { ExamFinder } from "@/components/finder/exam-finder"

export function FinderSection() {
  return (
    <section id="find-my-course" className="container-site scroll-mt-24 py-16 md:py-20">
      <div className="grid gap-8 rounded-lg bg-surface-2 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="lg:col-span-4 lg:pt-1">
          <h2>Not sure which exam you need?</h2>
          <p className="mt-4 text-muted-foreground">
            Three questions about your role, province and timing. We suggest an exam and where to confirm the
            requirements.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ExamFinder heading={null} />
        </div>
      </div>
    </section>
  )
}
