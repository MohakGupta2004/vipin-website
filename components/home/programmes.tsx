import { CourseCatalogue } from "@/components/course/course-catalogue"

/** Home course search + filter. Section heading is owned here; cards use h3. */
export function Programmes() {
  return (
    <section className="container-site pb-16 md:pb-20 lg:pb-24">
      <div className="max-w-[56ch]">
        <h2>Explore Courses</h2>
        <p className="mt-3 text-muted-foreground sm:mt-4">
          Explore exam preparation courses tailored to your professional goals.
        </p>
      </div>
      <div className="mt-6 sm:mt-8 lg:mt-10">
        <CourseCatalogue id="courses" defaultArea="live-group" initialLimit={6} showSearch headingLevel="h3" />
      </div>
    </section>
  )
}
