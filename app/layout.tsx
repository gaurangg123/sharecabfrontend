import type React from "react"
import "@/app/globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ShareCab - Subscription Cab Service",
    template: "%s | ShareCab",
  },
  description: "A subscription-based shared cab service for your daily commute",
  keywords: ["cab", "taxi", "ride-sharing", "subscription", "commute", "transportation"],
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
    description: "A subscription-based shared cab service for your daily commute",
    siteName: "ShareCab",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShareCab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShareCab - Subscription Cab Service",
    description: "A subscription-based shared cab service for your daily commute",
    images: ["/images/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
          <Navbar />
          <div className="flex-1 flex flex-col w-full max-w-full">{children}</div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
