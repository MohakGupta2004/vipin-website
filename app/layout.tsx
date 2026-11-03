import type { Metadata, Viewport } from "next"
import { Arimo, Manrope } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { SiteAnnouncement } from "@/components/layout/site-announcement";
import { OverlayHost } from "@/components/overlays/overlay-host";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JsonLd, organizationLd, personLd, websiteLd } from "@/components/seo/json-ld";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";

// Body matches the learning app (app.vipingarg.com uses Arimo); headings use Manrope.
const bodyFont = Arimo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const displayFont = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1622" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("antialiased font-sans", bodyFont.variable, displayFont.variable)}
    >
      <body className="min-h-dvh overflow-x-clip">
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  )
}
