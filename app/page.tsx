import Link from "next/link"
import Image from "next/image"
import { MoveRight, Star, Shield, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="mb-4">Premium Cab Service</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Ride Together, <span className="text-primary">Save Together</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
                  Subscribe to our shared cab service and enjoy reliable, affordable, and eco-friendly transportation
                  every day.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/login" prefetch={false}>
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="/subscription-plans" prefetch={false}>
                    <Button variant="outline" size="lg">
                      View Plans
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Cab+Service"
                  alt="Cab Service"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Average wait time</div>
                        <div className="text-2xl font-bold">4 min</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                      <span className="ml-1 text-sm">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-muted">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose ShareCab?</h2>
              <p className="text-lg text-muted-foreground">
                Our subscription-based service offers numerous benefits over traditional ride-hailing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  ),
                  title: "Cost Effective",
                  description: "Save up to 40% compared to regular cab services with our subscription plans.",
                },
                {
                  icon: <Shield className="text-primary" />,
                  title: "Safe & Secure",
                  description: "All our drivers are verified and vehicles undergo regular safety checks.",
                },
                {
                  icon: <Users className="text-primary" />,
                  title: "Shared Rides",
                  description: "Reduce your carbon footprint by sharing rides with people on similar routes.",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-primary/10">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="bg-primary/10 p-3 rounded-lg mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Our subscription-based service is designed to make your daily commute hassle-free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  step: 1,
                  title: "Subscribe to a Plan",
                  description:
                    "Choose a plan that fits your commuting needs - daily, weekly, or monthly options available.",
                  image: "/placeholder.svg?height=200&width=300&text=Select+Plan",
                },
                {
                  step: 2,
                  title: "Book Your Rides",
                  description:
                    "Schedule your rides in advance for the entire subscription period or book them as needed.",
                  image: "/placeholder.svg?height=200&width=300&text=Book+Ride",
                },
                {
                  step: 3,
                  title: "Enjoy Your Commute",
                  description: "Track your ride in real-time and share feedback after your journey is completed.",
                  image: "/placeholder.svg?height=200&width=300&text=Track+Ride",
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-6">
                    {step.step}
                  </div>
                  <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                    <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-16">
              <Link href="/subscription-plans" prefetch={false}>
                <Button variant="outline" size="lg">
                  View Subscription Plans
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 md:py-24 bg-primary/5">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground">
                Don't just take our word for it - hear from our satisfied customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  role: "Marketing Executive",
                  quote:
                    "ShareCab has transformed my daily commute. The subscription model saves me money, and the service is always reliable.",
                  rating: 5,
                },
                {
                  name: "Rahul Verma",
                  role: "Software Engineer",
                  quote:
                    "I love the convenience of scheduling rides in advance. The drivers are professional and the vehicles are always clean.",
                  rating: 5,
                },
                {
                  name: "Ananya Patel",
                  role: "Financial Analyst",
                  quote:
                    "The best part about ShareCab is the cost savings. I'm saving almost 40% compared to my previous transportation expenses.",
                  rating: 4,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                          />
                        ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-6 line-clamp-4">"{testimonial.quote}"</blockquote>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24">
          <Container>
            <div className="bg-primary rounded-lg p-8 md:p-12 text-primary-foreground">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to transform your daily commute?</h2>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  Join thousands of satisfied customers who have switched to ShareCab for their daily transportation
                  needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/signup" prefetch={false}>
                    <Button size="lg" variant="secondary">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link href="/contact" prefetch={false}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl mb-4">ShareCab</div>
              <p className="text-muted-foreground mb-4">
                A subscription-based shared cab service for your daily commute needs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Subscription Plans", href: "/subscription-plans" },
                  { label: "Book a Ride", href: "/booking" },
                  { label: "Contact Us", href: "/contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {[
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Refund Policy", href: "/refund" },
                  { label: "Cookie Policy", href: "/cookies" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <address className="not-italic text-muted-foreground space-y-2">
                <p>123 ShareCab Tower, Cyber City</p>
                <p>Gurugram, Haryana 122002</p>
                <p>India</p>
                <p className="pt-2">
                  <a href="mailto:info@sharecab.com" className="text-primary">
                    info@sharecab.com
                  </a>
                </p>
                <p>
                  <a href="tel:+919876543210" className="text-primary">
                    +91 98765 43210
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
            <p>© 2024 ShareCab. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
