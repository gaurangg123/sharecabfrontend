"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import confetti from "canvas-confetti"

export default function PaymentSuccessPage() {
  useEffect(() => {
    // Trigger confetti animation on component mount
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container className="max-w-md py-16 px-4">
      <Card className="text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your subscription has been activated successfully. You can now enjoy all the benefits of your plan.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <div className="font-medium">Weekly Plus Plan</div>
            <div className="text-sm text-muted-foreground">10 rides per week (weekdays, round trip)</div>
            <div className="mt-2 font-semibold">₹3,849</div>
            <div className="text-xs text-muted-foreground mt-1">Includes ₹350 service fee</div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Next billing date: May 8, 2024</span>
          </div>

          <div className="text-sm">
            A receipt has been sent to your email address. You can also view your subscription details in your profile.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" asChild>
            <Link href="/booking">
              Book Your First Ride
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/profile">View Subscription Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}
