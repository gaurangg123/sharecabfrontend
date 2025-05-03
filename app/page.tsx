import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CreditCard, MapPin, Star, Shield, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4 sm:px-6 flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">
              Ride with confidence
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fadeIn">
              Your Journey, <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fadeIn">
              Experience premium cab service with subscription plans that save you money and time. Join thousands of
              satisfied customers who trust us for their daily commute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
              <Link href="/book">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 transition-all duration-200"
                >
                  Book a Ride
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/subscription-plans">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 transition-all duration-200"
                >
                  View Plans
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-5xl mt-16">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-16 bottom-0 top-auto"></div>
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="ShareCab service illustration showing a modern cab with passengers"
              width={1200}
              height={600}
              className="rounded-xl shadow-lg object-cover mx-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Cab Service?</h2>
            <p className="text-lg text-muted-foreground">
              We provide a seamless and comfortable ride experience with features designed for your convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-border/50 transition-all duration-200 hover:shadow-md hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Premium Experience</CardTitle>
                <CardDescription>Enjoy comfortable rides with professional drivers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our fleet of well-maintained vehicles and professionally trained drivers ensure a premium experience
                  on every journey.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/about"
                  className="text-primary hover:underline inline-flex items-center transition-all duration-200"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="border border-border/50 transition-all duration-200 hover:shadow-md hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Subscription Savings</CardTitle>
                <CardDescription>Save up to 30% with our flexible plans</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from daily, weekly, or monthly subscription plans designed to fit your commuting needs and save
                  money.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/subscription-plans"
                  className="text-primary hover:underline inline-flex items-center transition-all duration-200"
                >
                  View plans
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="border border-border/50 transition-all duration-200 hover:shadow-md hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Tracking</CardTitle>
                <CardDescription>Track your ride in real-time for safety</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our advanced tracking system lets you monitor your ride in real-time and share journey details with
                  loved ones.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/features"
                  className="text-primary hover:underline inline-flex items-center transition-all duration-200"
                >
                  See features
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How ShareCab Works</h2>
            <p className="text-lg text-muted-foreground">
              Getting a ride with ShareCab is easy and straightforward. Follow these simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
                <MapPin className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Your Ride</h3>
              <p className="text-muted-foreground">
                Enter your pickup and dropoff locations, select your preferred time, and choose your vehicle type.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
                <Clock className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Picked Up</h3>
              <p className="text-muted-foreground">
                Your driver will arrive at the scheduled time. Track their arrival in real-time through our app.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
                <CreditCard className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enjoy & Pay</h3>
              <p className="text-muted-foreground">
                Enjoy your ride and pay automatically through your subscription or chosen payment method.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/book">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 transition-all duration-200"
              >
                Book Your First Ride
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">Customer Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it. Here's what our customers have to say about their ShareCab experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Daily Commuter",
                comment:
                  "The subscription plan has saved me so much money on my daily commute. Drivers are always on time and professional.",
                rating: 5,
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "Michael Chen",
                role: "Business Traveler",
                comment:
                  "I love the convenience of booking rides through the app. The WhatsApp updates feature is especially helpful when I'm traveling for work.",
                rating: 5,
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "Priya Sharma",
                role: "Weekend Explorer",
                comment:
                  "Best cab service I've used. Clean cars, friendly drivers, and the subscription model is perfect for regular travelers.",
                rating: 4,
                image: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border border-border/50 transition-all duration-200 hover:shadow-md hover:border-primary/50"
              >
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/testimonials">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 px-8 transition-all duration-200"
              >
                Read More Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Daily Commute?</h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of satisfied customers who have made ShareCab their preferred way to travel. Sign up today
              and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-8 transition-all duration-200"
                >
                  Sign Up Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 transition-all duration-200"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
