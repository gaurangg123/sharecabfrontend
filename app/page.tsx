"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MoveRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Animated background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>

        {/* Moving circles */}
        <div
          className="absolute rounded-full bg-primary/10 w-64 h-64 blur-3xl"
          style={{
            top: "10%",
            left: "10%",
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.02}px)`,
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        <div
          className="absolute rounded-full bg-blue-400/10 w-96 h-96 blur-3xl"
          style={{
            top: "40%",
            right: "15%",
            transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px)`,
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        <div
          className="absolute rounded-full bg-indigo-500/10 w-72 h-72 blur-3xl"
          style={{
            bottom: "10%",
            left: "25%",
            transform: `translate(${scrollY * 0.06}px, ${scrollY * -0.04}px)`,
            transition: "transform 0.1s ease-out",
          }}
        ></div>
      </div>

      <main className="flex-1 relative z-10">
        <Container>
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Ride Together, Save Together
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Subscribe to our shared cab service and enjoy reliable, affordable, and eco-friendly transportation
                  every day.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login" prefetch={false}>
                  <Button className="px-6">Login</Button>
                </Link>
                <Link href="/signup" prefetch={false}>
                  <Button variant="outline" className="px-6">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-background/80 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our subscription-based service is designed to make your daily commute hassle-free.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Subscribe to a Plan</h3>
                <p className="text-muted-foreground">
                  Choose a plan that fits your commuting needs - daily, weekly, or monthly options available.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Book Your Rides</h3>
                <p className="text-muted-foreground">
                  Schedule your rides in advance for the entire subscription period or book them as needed.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Enjoy Your Commute</h3>
                <p className="text-muted-foreground">
                  Track your ride in real-time and share feedback after your journey is completed.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/subscription-plans" prefetch={false}>
                <Button variant="outline" className="px-6">
                  View Subscription Plans
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        </Container>
      </main>
      <footer className="border-t py-6 md:py-0 bg-background relative z-10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2024 ShareCab. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
                Privacy
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}

