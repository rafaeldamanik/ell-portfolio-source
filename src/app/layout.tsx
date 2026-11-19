import type { Metadata, Viewport } from "next"

import "@fontsource/instrument-serif/400.css"
import "@fontsource/instrument-serif/400-italic.css"
import "@fontsource/space-grotesk/300.css"
import "@fontsource/space-grotesk/400.css"
import "@fontsource/space-grotesk/500.css"
import "@fontsource/space-grotesk/700.css"
import "./globals.css"
import "@/styles/global.css"

/**
 * SEO — update SITE_URL to the final GitHub Pages URL
 * (e.g. https://rafaeldamanik.github.io/ell/) once deployed.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rafaeldamanik.github.io/ell"

const TITLE = "ell. — Rafael Damanik | Graphic Designer & Video Editor"
const DESCRIPTION =
  "Portfolio of Rafael Damanik (ell.) — independent graphic designer and video editor based in Indonesia. Graphic design, social media design, video editing and photography."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — ell.",
  },
  description: DESCRIPTION,
  keywords: [
    "Rafael Damanik",
    "ell",
    "graphic designer",
    "video editor",
    "portfolio",
    "social media design",
    "photography",
    "freelance",
  ],
  authors: [{ name: "Rafael Damanik" }],
  creator: "Rafael Damanik",
  icons: {
    icon: "/favicon.svg",
    apple: "/assets/images/apple-touch-icon.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "ell.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ell. — Rafael Damanik, Graphic Designer & Video Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3EFE6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
