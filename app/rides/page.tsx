"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { Loader2, MapPin, Calendar, Clock, AlertCircle, CheckCircle, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getRides, cancelRide, type Ride } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function RidesPage() {
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancellingRideId, setCancellingRideId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("all")
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
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800"
          >
            Scheduled
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter rides based on search term and period
  const filterRides = (rides: Ride[]) => {
    return rides.filter((ride) => {
      const matchesSearch =
        searchTerm === "" ||
        ride.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.id.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearch) return false

      if (filterPeriod === "all") return true

      const rideDate = new Date(ride.pickupTime)
      const now = new Date()

      switch (filterPeriod) {
        case "today":
          return rideDate.toDateString() === now.toDateString()
        case "week":
          const weekAgo = new Date()
          weekAgo.setDate(now.getDate() - 7)
          return rideDate >= weekAgo
        case "month":
          const monthAgo = new Date()
          monthAgo.setMonth(now.getMonth() - 1)
          return rideDate >= monthAgo
        default:
          return true
      }
    })
  }

  const upcomingRides = filterRides(rides.filter((ride) => ride.status === "scheduled"))
  const activeRides = filterRides(rides.filter((ride) => ride.status === "in-progress"))
  const pastRides = filterRides(rides.filter((ride) => ["completed", "cancelled"].includes(ride.status)))

  return (
    <div className="container max-w-4xl py-10 px-4 sm:px-6">
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
            <Button
              variant="outline"
              size="sm"
              className="mt-2 transition-all duration-200 hover:bg-destructive/10"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Fix 1: Wrap Link in a div and use normal Button */}
        <div className="w-full sm:w-auto">
          <Link href="/book">
            <Button className="bg-primary hover:bg-primary/90 transition-all duration-200 w-full">
              Book a New Ride
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-[200px] transition-all duration-200 focus:border-primary"
            />
          </div>

          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger
            value="upcoming"
            className="transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Upcoming
            {upcomingRides.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-primary-foreground">
                {upcomingRides.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Active
            {activeRides.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-primary-foreground">
                {activeRides.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Past
            {pastRides.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-primary-foreground">
                {pastRides.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <div>
          <TabsContent value="upcoming" className="space-y-4 mt-2">
            {loading ? (
              Array(2)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="border border-border/50 overflow-hidden">
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
              <Card className="border border-border/50">
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium text-lg">No Upcoming Rides</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || filterPeriod !== "all"
                        ? "No rides match your search criteria."
                        : "You don't have any upcoming rides scheduled."}
                    </p>
                    {/* Fix 2: Wrap Link in a div and use normal Button */}
                    <div className="mt-4">
                      <Link href="/book">
                        <Button className="bg-primary hover:bg-primary/90 transition-all duration-200">
                          Book a Ride
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              upcomingRides.map((ride) => (
                <Card
                  key={ride.id}
                  className="border border-border/50 transition-all duration-200 hover:shadow-md hover:border-primary/30"
                >
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
                        <MapPin className="h-4 w-4 text-primary mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Pickup</div>
                          <div className="font-medium">{ride.pickupLocation}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-1" />
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
                        {/* Fix 3: Use Link and Button separately */}
                        <Link href={`/rides/${ride.id}`}>
                          <Button variant="outline" className="transition-all duration-200 hover:bg-muted">
                            Details
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={() => handleCancelRide(ride.id)}
                          disabled={cancellingRideId === ride.id}
                          className="transition-all duration-200 hover:bg-destructive/90"
                        >
                          {cancellingRideId === ride.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              <span>Cancelling...</span>
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

          <TabsContent value="active" className="space-y-4 mt-2">
            {loading ? (
              <Card className="border border-border/50 overflow-hidden">
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
              <Card className="border border-border/50">
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium text-lg">No Active Rides</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || filterPeriod !== "all"
                        ? "No rides match your search criteria."
                        : "You don't have any rides in progress at the moment."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              activeRides.map((ride) => (
                <Card key={ride.id} className="border-primary/50 shadow-sm transition-all duration-200 hover:shadow-md">
                  <CardHeader className="pb-2 bg-primary/5">
                    <div className="flex justify-between items-center">
                      {getStatusBadge(ride.status)}
                      <div className="text-sm text-muted-foreground">Ride #{ride.id.split("-")[1]}</div>
                    </div>
                    <CardTitle className="text-lg mt-2">
                      {formatDate(ride.pickupTime)} at {formatTime(ride.pickupTime)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Pickup</div>
                          <div className="font-medium">{ride.pickupLocation}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-1" />
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
                        {/* Fix 4: Use Link and Button separately */}
                        <Link href={`/rides/${ride.id}/track`}>
                          <Button className="bg-primary hover:bg-primary/90 transition-all duration-200">
                            Track Ride
                          </Button>
                        </Link>
                        <Link href={`/rides/${ride.id}`}>
                          <Button variant="outline" className="transition-all duration-200 hover:bg-muted">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-2">
            {loading ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="border border-border/50 overflow-hidden">
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
              <Card className="border border-border/50">
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium text-lg">No Past Rides</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || filterPeriod !== "all"
                        ? "No rides match your search criteria."
                        : "You don't have any completed or cancelled rides yet."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              pastRides.map((ride) => (
                <Card
                  key={ride.id}
                  className="border border-border/50 transition-all duration-200 hover:shadow-md hover:border-primary/30"
                >
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
                        <MapPin className="h-4 w-4 text-primary mt-1" />
                        <div>
                          <div className="text-sm text-muted-foreground">Pickup</div>
                          <div className="font-medium">{ride.pickupLocation}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-1" />
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
                          <Link href={`/rides/${ride.id}/review`}>
                            <Button variant="outline" className="transition-all duration-200 hover:bg-muted">
                              Leave Review
                            </Button>
                          </Link>
                        )}
                        <Link href={`/rides/${ride.id}`}>
                          <Button variant="outline" className="transition-all duration-200 hover:bg-muted">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}

            {pastRides.length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline" className="transition-all duration-200 hover:bg-muted">
                  Load More
                </Button>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
