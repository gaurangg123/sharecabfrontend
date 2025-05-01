import type React from "react"
import "@/app/globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Ensure text remains visible during webfont load
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "ShareCab - Subscription Cab Service",
    template: "%s | ShareCab",
  },
  description:
    "A subscription-based shared cab service for your daily commute. Safe, reliable, and affordable transportation.",
  keywords: ["cab", "taxi", "ride-sharing", "subscription", "commute", "transportation", "car service"],
  authors: [{ name: "ShareCab Team" }],
  creator: "ShareCab",
  publisher: "ShareCab",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sharecab.vercel.app",
    title: "ShareCab - Subscription Cab Service",
    description:
      "A subscription-based shared cab service for your daily commute. Safe, reliable, and affordable transportation.",
    siteName: "ShareCab",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShareCab - Subscription Cab Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShareCab - Subscription Cab Service",
    description:
      "A subscription-based shared cab service for your daily commute. Safe, reliable, and affordable transportation.",
    images: ["/images/twitter-image.png"],
    creator: "@sharecab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sharecab.vercel.app",
    languages: {
      "en-US": "https://sharecab.vercel.app/en-US",
    },
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-background focus:z-50"
          >
            Skip to main content
          </a>
          <Navbar />
          <div id="main-content" className="flex-1 flex flex-col w-full max-w-full">
            {children}
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
