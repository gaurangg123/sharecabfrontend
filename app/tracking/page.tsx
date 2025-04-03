"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight, MessageCircle, Phone, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TrackingPage() {
  const [progress, setProgress] = useState(30)
  const [estimatedTime, setEstimatedTime] = useState("18 min")
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7128, lng: -74.006 })

  useEffect(() => {
    // Simulate cab movement
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 5
      })

      setEstimatedTime((prev) => {
        const minutes = Number.parseInt(prev.split(" ")[0])
        if (minutes <= 1) return "arriving"
        return `${minutes - 1} min`
      })

      // Simulate driver location change
      setDriverLocation((prev) => ({
        lat: prev.lat + 0.001,
        lng: prev.lng + 0.0005,
      }))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container max-w-md py-6 px-4">
      <Card className="overflow-hidden">
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="font-normal">
              Ride in progress
            </Badge>
            <Button variant="ghost" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-xl mt-2">Your ride is on the way</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="aspect-video relative w-full bg-muted">
            {/* This would be replaced with an actual map integration */}
            <Image src="/placeholder.svg?height=300&width=400" alt="Ride map" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <p className="bg-background/90 p-2 rounded-md text-sm">Interactive map would be displayed here</p>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="text-muted-foreground">Arriving in</div>
                <div className="font-semibold">{estimatedTime}</div>
              </div>
              <Progress value={progress} className="h-2" />

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="size-2 rounded-full bg-blue-500"></div>
                  <div>Current location</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="size-2 rounded-full bg-primary"></div>
                  <div>Destination</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="size-3 rounded-full bg-blue-500"></div>
                  <div className="w-0.5 h-8 bg-muted"></div>
                  <div className="size-3 rounded-full bg-primary"></div>
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <div className="text-sm font-medium">Pickup</div>
                    <div className="text-sm text-muted-foreground truncate">123 Main Street, New York</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Dropoff</div>
                    <div className="text-sm text-muted-foreground truncate">456 Broadway, New York</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Driver" />
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Daniel Cooper</div>
                    <div className="text-sm text-muted-foreground">Toyota Camry · ABC 123</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex border-t p-4">
          <Button variant="outline" size="sm" className="gap-1">
            Cancel Ride
          </Button>
          <Button size="sm" className="ml-auto gap-1">
            View Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

