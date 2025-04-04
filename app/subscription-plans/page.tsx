"use client"

import { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import { Container } from "@/components/ui/container"

export default function SubscriptionPlansPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  return (
    <Container size="lg" className="py-6 md:py-10">
      <div className="mb-4">
        <BackButton />
      </div>

      <div className="space-y-2 text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Subscription Plans</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Choose the perfect plan for your daily commute
        </p>
      </div>

      <div className="flex justify-center pb-6">
        <Tabs defaultValue="weekly" className="w-full max-w-3xl" onValueChange={(value) => setBillingCycle(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border shadow-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Weekly Standard</CardTitle>
                  <div className="text-4xl font-bold">₹1,999</div>
                  <CardDescription>per week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />5 rides per week (weekdays, one-way)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Scheduled pickups
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Premium vehicles
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      24/7 support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/booking">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary shadow-lg relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Best Value
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Weekly Plus</CardTitle>
                  <div className="text-4xl font-bold">₹3,499</div>
                  <CardDescription>per week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      10 rides per week (weekdays, round trip)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Priority pickup
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Premium vehicles
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      24/7 priority support
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Free cancellation
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Weekly rewards
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/booking">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Monthly Standard</CardTitle>
                  <div className="text-4xl font-bold">₹7,499</div>
                  <CardDescription>per month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      20 rides per month (weekdays, one-way)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Scheduled pickups
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Premium vehicles
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      24/7 support
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Monthly rewards
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/booking">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary shadow-lg relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Monthly Plus</CardTitle>
                  <div className="text-4xl font-bold">₹13,999</div>
                  <CardDescription>per month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      40 rides per month (weekdays, round trip)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Priority pickup
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Premium vehicles
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      24/7 priority support
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Free cancellation
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Monthly rewards and cashback
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/booking">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-muted rounded-lg p-6 max-w-3xl mx-auto">
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-bold">Need a custom plan for your team?</h3>
          <p className="text-muted-foreground">
            We offer corporate plans for businesses of all sizes. Get in touch with our team to discuss your specific
            needs.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto pt-6">
        <h3 className="text-xl font-bold text-center">Frequently Asked Questions</h3>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">How do the subscription plans work?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Our subscription plans offer a fixed number of rides based on your chosen billing cycle (weekly or
              monthly). You can schedule rides in advance or book them on-demand, depending on your needs.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">Can I cancel my subscription at any time?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Yes, you can cancel your subscription at any time. Depending on your plan, there may be prorated refunds
              available for unused rides.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">What happens if I don't use all my rides in a billing cycle?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Unused rides do not roll over to the next billing cycle. We recommend choosing a plan that best matches
              your regular commuting needs.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">Can I share my subscription with family members?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Standard plans are for individual use only. For family sharing, please contact our customer support to
              learn about our family plans.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

