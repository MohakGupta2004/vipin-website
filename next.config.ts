import type { NextConfig } from "next"

const permanent = (source: string, destination: string) => ({
  source,
  destination,
  permanent: true,
})

const nextConfig: NextConfig = {
  async redirects() {
    return [
      permanent("/exam-prep-programs", "/courses"),
      permanent("/life-license-qualification-program", "/insurance/llqp"),
      permanent("/certified-financial-planner", "/financial-planning/cfp"),
      permanent("/qualified-associate-financial-planner", "/financial-planning/qafp"),
      permanent("/programme-de-qualification-en-assurance-de-personnes", "/insurance"),
      permanent("/general-level-1-insurance-qualification-program", "/insurance"),
      permanent("/certified-digital-asset-advisor-designation", "/courses"),
      permanent("/digital-asset-financial-advisor", "/courses"),
      permanent("/digital-asset-corporate-training", "/courses"),
      permanent("/digital-assets", "/courses"),
      permanent("/events", "/masterclass"),
    ]
  },
}

export default nextConfig
