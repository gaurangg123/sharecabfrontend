import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container";
import { Car, CreditCard, Calendar, MapPin, Clock, Shield, MessageSquare } from "lucide-react"

export default function HomePage() {
  return (
    <div className="pb-10 overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-10 sm:py-16 md:py-20 lg:py-24">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 to-black/30">
          </div>
          <div className="absolute inset-0 z-0 opacity-10 hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 320">
                  <path fill="#393E46" fillOpacity="1" d="M0,128L40,117.3C80,107,160,85,240,85.3C320,85,400,107,480,144C560,181,640,235,720,229.3C800,224,880,160,960,138.7C1040,117,1120,139,1200,154.7C1280,171,1360,181,1400,186.7L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                </svg>
        </div>
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Your Reliable Cab Service Partner</h1>
              <p className="text-sm md:text-base text-gray-200 mb-8">
                Enjoy premium rides with subscription plans that save you money. Book daily rides at discounted rates
                with our flexible subscription options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/booking" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Book a Ride
                  </Button>
                </Link>
                <Link href="/subscription-plans">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center order-first md:order-last">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <Image src="/images/cab-2.png" alt="Cab service illustration" fill className="object-contain" />

              </div>
            </div>
          </div>
        </Container>
      </div>
     {/* How It Works */}
      <Container className="py-10 sm:py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">How It Works</h2>
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
      <div className="bg-gray-50 py-10 sm:py-16 md:py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">Why Choose Our Service</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
              <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
      <Container className="py-10 sm:py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[
            { name: "Downtown", rides: "1,200+ rides monthly" },
            { name: "Airport", rides: "800+ rides monthly" },
            { name: "Business District", rides: "950+ rides monthly" },
          ].map((destination, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                 src={
                  index === 0
                    ? "/placeholder.svg" // Replace with your image paths
                    : index === 1
                    ? "/placeholder.svg" // Replace with your image paths
                    : "/placeholder.svg" // Replace with your image paths
                }
                 
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

      {/* CTA Section  */}
      <div className="bg-yellow-500 py-10 sm:py-16 md:py-20">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-0">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center md:text-left">Ready to Get Started?</h2>
              <p className="text-black/80 text-base md:text-lg text-center md:text-left">Sign up now and get your first ride free!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/subscription-plans">
                <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10 font-semibold">
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
