import { ExamFinder } from "@/components/finder/exam-finder"

export function FinderSection() {
  return (
    <section id="find-my-course" className="container-site scroll-mt-24 py-16 md:py-20">
      <div className="grid gap-6 rounded-lg sm:gap-8 sm:bg-surface-2 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="lg:col-span-4 lg:pt-1">
          <h2>Not Sure Which Exam Is Right for You?</h2>
          <p className="mt-4 text-muted-foreground">
            Whether you're entering financial services or advancing your career, find the licensing and certification exams that align with your professional goals.
            <br/>
            <br/>
            <b>Answer three quick questions to explore your options.</b>
          </p>
        </div>
        <div className="lg:col-span-8">
          <ExamFinder heading={null} />
        </div>
      </div>
    </section>
  )
}
