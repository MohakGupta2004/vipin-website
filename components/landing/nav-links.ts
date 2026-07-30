export type NavLinkItem = { name: string; route: string }

export type NavGroup = { label: string; items: NavLinkItem[] }

export const securitiesLinks: NavLinkItem[] = [
  { name: "Securities Courses", route: "/securities" },
]

export const insuranceLinks: NavLinkItem[] = [
  { name: "Insurance Overview", route: "/insurance" },
  { name: "LLQP", route: "/life-license-qualification-program" },
  { name: "PQAL", route: "/programme-de-qualification-en-assurance-de-personnes" },
  { name: "GLQP", route: "/general-level-1-insurance-qualification-program" },
]

export const financialPlanningLinks: NavLinkItem[] = [
  { name: "Financial Planning Overview", route: "/financial-planning" },
  { name: "CFP Exam Prep", route: "/certified-financial-planner" },
  { name: "QAFP", route: "/qualified-associate-financial-planner" },
]

export const digitalAssetsLinks: NavLinkItem[] = [
  { name: "CDAA Designation", route: "/certified-digital-asset-advisor-designation" },
  { name: "CDAA for Advisors", route: "/digital-asset-financial-advisor" },
  { name: "CDAA for Enterprise", route: "/digital-asset-corporate-training" },
]

export const navGroups: NavGroup[] = [
  { label: "Securities", items: securitiesLinks },
  { label: "Insurance", items: insuranceLinks },
  { label: "Financial Planning", items: financialPlanningLinks },
  { label: "Digital Assets", items: digitalAssetsLinks },
]
