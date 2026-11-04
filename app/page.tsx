import { CareerPathways } from "@/components/home/career-pathways"
import { FinderSection } from "@/components/home/finder-section"
import { FirmsTeaser } from "@/components/home/firms-teaser"
import { GuaranteeTeaser } from "@/components/home/guarantee-teaser"
import { Hero } from "@/components/home/hero"
import { HomeFaq } from "@/components/home/home-faq"
import { MasterclassBand } from "@/components/home/masterclass-band"
import { MeetVipin } from "@/components/home/meet-vipin"
import { Programmes } from "@/components/home/programmes"
import { isEnabled } from "@/lib/feature-flags"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Live Canadian finance exam prep",
  description:
    "Live online exam prep for IFC, CSC, CIRE, RSE and LLQP in Canada, taught by Vipin Garg. Practise between classes and check your readiness before you book.",
  path: "/",
})

// Reviews / pass wall (PLAN §5 #9) is intentionally not rendered until real reviews exist.
export default function HomePage() {
  return (
    <>
      <Hero />
      {isEnabled("examFinder") && <FinderSection />}
      {isEnabled("homeCourseSearch") && <Programmes />}
      <MeetVipin />
      <GuaranteeTeaser />
      {/* <CareerPathways /> */}
      {isEnabled("masterclassSignup") && <MasterclassBand />}
      <HomeFaq />
      <FirmsTeaser />
    </>
  )
}
