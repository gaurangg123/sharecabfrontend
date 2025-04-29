import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Car, CreditCard, Calendar, MapPin, Clock, Shield, MessageSquare } from "lucide-react"

export default function HomePage() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/cab-service-hero.png"
            alt="Cab service background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Reliable Cab Service Partner</h1>
              <p className="text-lg text-gray-200 mb-8">
                Enjoy premium rides with subscription plans that save you money. Book daily rides at discounted rates
                with our flexible subscription options.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Book a Ride
                  </Button>
                </Link>
                <Link href="/subscription-plans">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <Image src="/images/cab-2.png" alt="Cab service illustration" fill className="object-contain" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* How It Works */}
      <Container className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose a Plan</h3>
            <p className="text-gray-600">Select a subscription plan that fits your commuting needs and budget.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Your Ride</h3>
            <p className="text-gray-600">Schedule rides in advance or book on-demand through our easy-to-use app.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track & Enjoy</h3>
            <p className="text-gray-600">
              Track your ride in real-time and enjoy a comfortable journey to your destination.
            </p>
          </div>
        </div>
      </Container>

      {/* Features */}
      <div className="bg-gray-50 py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Clock />,
                title: "Punctual Service",
                description: "Our drivers are always on time, respecting your schedule",
              },
              {
                icon: <CreditCard />,
                title: "Subscription Savings",
                description: "Save up to 30% with our flexible subscription plans",
              },
              {
                icon: <Shield />,
                title: "Safe & Secure",
                description: "All rides are monitored and drivers are verified",
              },
              {
                icon: <MessageSquare />,
                title: "WhatsApp Updates",
                description: "Get ride updates directly on WhatsApp",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <div className="text-yellow-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Popular Destinations */}
      <Container className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Downtown", image: "/images/cab-3.png", rides: "1,200+ rides monthly" },
            { name: "Airport", image: "/images/cab-4.png", rides: "800+ rides monthly" },
            { name: "Business District", image: "/images/cab-profile.png", rides: "950+ rides monthly" },
          ].map((destination, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md group">
              <div className="relative h-48">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-gray-600 flex items-center">
                  <Car className="h-4 w-4 mr-2" />
                  {destination.rides}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA Section */}
      <div className="bg-yellow-500 py-16">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-black mb-2">Ready to Get Started?</h2>
              <p className="text-black/80 text-lg">Sign up now and get your first ride free!</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/subscription-plans">
                <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
