"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { Loader2, MapPin, Calendar, Clock, AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getRides, cancelRide, type Ride } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function RidesPage() {
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancellingRideId, setCancellingRideId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function loadRides() {
      try {
        const data = await getRides()
        setRides(data)
        setError(null)
      } catch (err) {
        setError("Failed to load rides. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadRides()
  }, [])

  const handleCancelRide = async (rideId: string) => {
    if (window.confirm("Are you sure you want to cancel this ride?")) {
      setCancellingRideId(rideId)

      try {
        const result = await cancelRide(rideId)

        if (result.success) {
          // Update the ride status locally
          setRides(rides.map((ride) => (ride.id === rideId ? { ...ride, status: "cancelled" } : ride)))

          toast({
            title: "Ride Cancelled",
            description: "Your ride has been cancelled successfully.",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Cancellation Failed",
            description: result.error || "Failed to cancel ride. Please try again.",
          })
        }
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
        })
      } finally {
        setCancellingRideId(null)
      }
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString)
      return format(date, "PPP")
    } catch (e) {
      return dateString
    }
  }

  const formatTime = (dateString: string) => {
    try {
      const date = parseISO(dateString)
      return format(date, "p")
    } catch (e) {
      return dateString
    }
  }

  const getStatusBadge = (status: Ride["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const upcomingRides = rides.filter((ride) => ride.status === "scheduled")
  const activeRides = rides.filter((ride) => ride.status === "in-progress")
  const pastRides = rides.filter((ride) => ["completed", "cancelled"].includes(ride.status))

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Rides</h1>
        <p className="text-muted-foreground mt-2">View and manage your upcoming, active, and past rides</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <Button asChild>
          <Link href="/book">Book a New Ride</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">
            Upcoming
            {upcomingRides.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {upcomingRides.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            {activeRides.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeRides.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past">
            Past
            {pastRides.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pastRides.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="upcoming" className="space-y-4">
            {loading ? (
              Array(2)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-6 w-48 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-4 w-4 mt-1" />
                          <div className="space-y-1 flex-1">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-4 w-4 mt-1" />
                          <div className="space-y-1 flex-1">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-end w-full gap-2">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </CardFooter>
                  </Card>
                ))
            ) : upcomingRides.length === 0 ? (
              <Card>
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium text-lg">No Upcoming Rides</h3>
                    <p className="text-muted-foreground">You don't have any upcoming rides scheduled.</p>
                    <Button asChild className="mt-4">
                      <Link href="/book">Book a Ride</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              upcomingRides.map((ride) => (
                <Card key={ride.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      {getStatusBadge(ride.status)}
                      <div className="text-sm text-muted-foreground">Ride #{ride.id.split("-")[1]}</div>
                    </div>
                    <CardTitle className="text-lg mt-2">
                      {formatDate(ride.pickupTime)} at {formatTime(ride.pickupTime)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Pickup</div>
                          <div className="font-medium">{ride.pickupLocation}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Dropoff</div>
                          <div className="font-medium">{ride.dropoffLocation}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <div className="font-medium">${ride.fare.toFixed(2)}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" asChild>
                          <Link href={`/rides/${ride.id}`}>Details</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleCancelRide(ride.id)}
                          disabled={cancellingRideId === ride.id}
                        >
                          {cancellingRideId === ride.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            "Cancel Ride"
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {loading ? (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-48 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-4 w-4 mt-1" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="h-4 w-4 mt-1" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-end w-full gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </CardFooter>
              </Card>
            ) : activeRides.length === 0 ? (
              <Card>
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium text-lg">No Active Rides</h3>
                    <p className="text-muted-foreground">You don't have any rides in progress at the moment.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              activeRides.map((ride) => (
                <Card key={ride.id} className="border-primary">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      {getStatusBadge(ride.status)}
                      <div className="text-sm text-muted-foreground">Ride #{ride.id.split("-")[1]}</div>
                    </div>
                    <CardTitle className="text-lg mt-2">
                      {formatDate(ride.pickupTime)} at {formatTime(ride.pickupTime)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Pickup</div>
                          <div className="font-medium">{ride.pickupLocation}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Dropoff</div>
                          <div className="font-medium">{ride.dropoffLocation}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <div className="font-medium">${ride.fare.toFixed(2)}</div>
                      <div className="flex gap-2">
                        <Button asChild>
                          <Link href={`/rides/${ride.id}/track`}>Track Ride</Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/rides/${ride.id}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {loading ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-6 w-48 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-4 w-4 mt-1" />
                          <div className="space-y-1 flex-1">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-4 w-4 mt-1" />
                          <div className="space-y-1 flex-1">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-end w-full gap-2">
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </CardFooter>
                  </Card>
                ))
            ) : pastRides.length === 0 ? (
              <Card>
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium text-lg">No Past Rides</h3>
                    <p className="text-muted-foreground">You don't have any completed or cancelled rides yet.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              pastRides.map((ride) => (
                <Card key={ride.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      {getStatusBadge(ride.status)}
                      <div className="text-sm text-muted-foreground">Ride #{ride.id.split("-")[1]}</div>
                    </div>
                    <CardTitle className="text-lg mt-2">
                      {formatDate(ride.pickupTime)} at {formatTime(ride.pickupTime)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Pickup</div>
                          <div className="font-medium">{ride.pickupLocation}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Dropoff</div>
                          <div className="font-medium">{ride.dropoffLocation}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <div className="font-medium">${ride.fare.toFixed(2)}</div>
                      <div className="flex gap-2">
                        {ride.status === "completed" && (
                          <Button variant="outline" asChild>
                            <Link href={`/rides/${ride.id}/review`}>Leave Review</Link>
                          </Button>
                        )}
                        <Button variant="outline" asChild>
                          <Link href={`/rides/${ride.id}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
