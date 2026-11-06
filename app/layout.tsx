import type { Metadata, Viewport } from "next"
import {
  Familjen_Grotesk,
  Figtree,
  Geist,
  Hanken_Grotesk,
  Inter,
  Inter_Tight,
  Instrument_Sans,
  Manrope,
} from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils";
import { SiteAnnouncement } from "@/components/layout/site-announcement";
import { OverlayHost } from "@/components/overlays/overlay-host";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { ScheduleButton } from "@/components/layout/schedule-button";
import { FontPlayground } from "@/components/dev/font-playground";
import { getFlags } from "@/lib/feature-flags";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JsonLd, organizationLd, personLd, websiteLd } from "@/components/seo/json-ld";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";

// Main font candidates. Only Manrope (the default) is preloaded; the others download when picked in the
// font playground. The body uses the system-ui stack, so it needs no font file.
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false })
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap", preload: false })
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap", preload: false })
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap", preload: false })
const familjen = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-familjen", display: "swap", preload: false })
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap", preload: false })
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap", preload: false })

const fontVariables = [
  manrope.variable,
  inter.variable,
  interTight.variable,
  geist.variable,
  hanken.variable,
  familjen.variable,
  instrument.variable,
  figtree.variable,
]

export const metadata: Metadata = {
  // PLACEHOLDER: production domain — set NEXT_PUBLIC_SITE_URL or edit SITE_URL in lib/seo.ts
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_CA",
    type: "website",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const showFontPlayground =
    process.env.NODE_ENV !== "production" || getFlags().fontPlayground.enabled

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-font="manrope"
      className={cn("antialiased font-sans", fontVariables)}
    >
      <body className="min-h-dvh overflow-x-clip">
        <JsonLd data={[organizationLd(), personLd(), websiteLd()]} />
        <TooltipProvider>
          <a
            href="#main"
            className="sr-only z-60 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
          >
            Skip to content
          </a>
          <SiteAnnouncement />
          <Header />
          <main id="main" tabIndex={-1} className="outline-hidden">{children}</main>
          <OverlayHost />
        </TooltipProvider>
        <Footer />
        <WhatsAppButton />
        <ScheduleButton />
        {showFontPlayground ? <FontPlayground /> : null}
      </body>
    </html>
  )
}
