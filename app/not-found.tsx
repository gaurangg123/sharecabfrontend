import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[80vh] py-16 text-center">
      <div className="space-y-8 max-w-md mx-auto">
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src="/placeholder.svg?height=256&width=256&text=404"
            alt="404 Not Found"
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-muted-foreground text-lg">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/booking">
              <Search className="h-4 w-4" />
              Book a Ride
            </Link>
          </Button>
        </div>

        <div className="pt-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to homepage
          </Link>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </Container>
  )
}
