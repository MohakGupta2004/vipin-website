import type { Metadata } from "next"

import { siteConfig } from "@/lib/site-config"

// Production domain placeholder lives in lib/site-config.ts (siteConfig.url).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url
export const SITE_NAME = siteConfig.shortName
export const SITE_TAGLINE = "Live exam prep for Canadian finance professionals"
export const DEFAULT_DESCRIPTION =
  "Live online coaching from Vipin Garg for IFC, CSC, CIRE, RSE, LLQP and financial planning exams in Canada. Practise between classes and know you're ready before you book."

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString()
}

type BuildMetadataInput = {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  type?: "website" | "article"
}

/** Per-page metadata. Title is combined with the root template "%s | Vipin Garg". */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex,
  type = "website",
}: BuildMetadataInput): Metadata {
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_CA",
      type,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
    ...(noindex && { robots: { index: false, follow: false } }),
  }
}
