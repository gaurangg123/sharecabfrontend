import Link from "next/link"
import { ArrowRight, Calendar, CreditCard, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">ShareCab</h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Book, share, and save on your daily commute with our ride-sharing service
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Button asChild size="lg">
            <Link href="/book">
              Book a Ride
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/rides">View My Rides</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <MapPin className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Easy Booking</CardTitle>
            <CardDescription>Book a ride in just a few taps with our simple booking process</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Enter your pickup and dropoff locations, select your preferred time, and we'll match you with the perfect
              ride.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/book">Book Now</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Calendar className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Manage Rides</CardTitle>
            <CardDescription>View and manage all your upcoming and past rides</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Keep track of your scheduled rides, view ride history, and easily cancel or reschedule when needed.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/rides">My Rides</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CreditCard className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Secure Payments</CardTitle>
            <CardDescription>Pay securely for your rides with our encrypted payment system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your payment information is always secure. Pay with credit card, debit card, or digital wallet.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/payment">Payment Options</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
