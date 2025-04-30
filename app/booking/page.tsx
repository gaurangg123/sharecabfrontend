"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, CalendarIcon, Clock, MapPin, Star, Heart, Search, Loader2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { BackButton } from "@/components/back-button"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { WhatsAppUpdates } from "@/components/whatsapp-updates"
import { MapView } from "@/components/map-view"
import { VehicleTypeOption } from "@/components/vehicle-type-option"
import { ErrorMessage } from "@/components/ui/error-message"
import { SkeletonCard } from "@/components/ui/skeleton-card"

export default function BookingPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [step, setStep] = useState(1)
  const [mapDialogOpen, setMapDialogOpen] = useState(false)
  const [locationType, setLocationType] = useState<"pickup" | "dropoff">("pickup")
  const [pickupLocation, setPickupLocation] = useState("")
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [dropoffCoords, setDropoffCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [rideType, setRideType] = useState("scheduled")
  const [vehicleType, setVehicleType] = useState("car")
  const [favoriteLocationsOpen, setFavoriteLocationsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingLocations, setIsLoadingLocations] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Favorite locations
  const [favoriteLocations, setFavoriteLocations] = useState([
    { id: 1, name: "Home", address: "123 Sector 18, Noida, UP", type: "home", lat: 28.5708, lng: 77.326 },
    { id: 2, name: "Office", address: "456 Cyber City, Gurugram, Haryana", type: "work", lat: 28.4595, lng: 77.0266 },
    { id: 3, name: "Gym", address: "789 DLF Mall, Saket, New Delhi", type: "other", lat: 28.5293, lng: 77.2108 },
  ])

  // Custom time picker state
  const [hours, setHours] = useState(8)
  const [minutes, setMinutes] = useState(0)
  const [amPm, setAmPm] = useState("AM")
  const [timePickerOpen, setTimePickerOpen] = useState(false)

  // Simulate loading locations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingLocations(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Get markers for map
  const getMapMarkers = () => {
    const markers = []

    if (pickupCoords) {
      markers.push({ ...pickupCoords, type: "pickup" as const })
    }

    if (dropoffCoords) {
      markers.push({ ...dropoffCoords, type: "dropoff" as const })
    }

    return markers
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    // Validate required fields
    if (step === 1) {
      if (!pickupLocation) {
        toast({
          title: "Pickup location required",
          description: "Please enter your pickup location",
          variant: "destructive",
        })
        return
      }

      if (!dropoffLocation) {
        toast({
          title: "Drop-off location required",
          description: "Please enter your destination",
          variant: "destructive",
        })
        return
      }

      if (rideType === "scheduled" && !date) {
        toast({
          title: "Date required",
          description: "Please select a date for your scheduled ride",
          variant: "destructive",
        })
        return
      }

      setStep(2)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        toast({
          title: "Ride booked successfully!",
          description: "Your ride has been scheduled. Check your email for confirmation.",
        })

        // Redirect to success page or ride tracking
        window.location.href = "/rides"
      } catch (err) {
        setError("Failed to book your ride. Please try again.")
        toast({
          title: "Booking failed",
          description: "There was an error booking your ride. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const openMapDialog = (type: "pickup" | "dropoff") => {
    setLocationType(type)
    setMapDialogOpen(true)
  }

  const handleLocationSelect = (location: { address: string; lat: number; lng: number }) => {
    if (locationType === "pickup") {
      setPickupLocation(location.address)
      setPickupCoords({ lat: location.lat, lng: location.lng })
    } else {
      setDropoffLocation(location.address)
      setDropoffCoords({ lat: location.lat, lng: location.lng })
    }
    setMapDialogOpen(false)
  }

  const formatTime = () => {
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    const formattedMinutes = minutes.toString().padStart(2, "0")
    return `${formattedHours}:${formattedMinutes} ${amPm}`
  }

  const handleSelectFavorite = (location: (typeof favoriteLocations)[0]) => {
    if (locationType === "pickup") {
      setPickupLocation(location.address)
      setPickupCoords({ lat: location.lat, lng: location.lng })
    } else {
      setDropoffLocation(location.address)
      setDropoffCoords({ lat: location.lat, lng: location.lng })
    }
    setFavoriteLocationsOpen(false)
  }

  return (
    <ResponsiveContainer size="full" className="py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <BackButton />
        </div>

        <div className="space-y-2 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Book Your Ride</h1>
          <p className="text-muted-foreground">Schedule your daily commute or book a one-time ride</p>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex items-center justify-center space-x-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Location</span>
          </div>
          <div className="h-px w-12 bg-muted"></div>
          <div className="flex items-center justify-center space-x-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Plan & Payment</span>
          </div>
        </div>

        {error && <ErrorMessage message={error} retry={() => setError(null)} />}

        {isLoadingLocations ? (
          <SkeletonCard lines={6} footer={true} />
        ) : (
          <>
            {step === 1 ? (
              <Card className="border shadow-sm">
                <CardHeader className="pb-4 md:pb-6">
                  <CardTitle>Ride Details</CardTitle>
                  <CardDescription>Enter your pickup and drop-off locations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="w-full h-[300px] mb-6 rounded-md overflow-hidden">
                    <MapView
                      height="300px"
                      markers={getMapMarkers()}
                      onLocationSelect={locationType === "pickup" ? (loc) => handleLocationSelect(loc) : undefined}
                    />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup Location</Label>
                        <div className="relative flex gap-2">
                          <div className="relative flex-1">
                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="pickup"
                              placeholder="Enter pickup address"
                              className="pl-9"
                              value={pickupLocation}
                              onChange={(e) => setPickupLocation(e.target.value)}
                              required
                            />
                          </div>
                          <Popover
                            open={favoriteLocationsOpen && locationType === "pickup"}
                            onOpenChange={(open) => {
                              setLocationType("pickup")
                              setFavoriteLocationsOpen(open)
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button type="button" variant="outline" size="icon" aria-label="Select from favorites">
                                <Star className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="end">
                              <div className="space-y-4">
                                <div className="font-medium">Favorite Locations</div>
                                <div className="space-y-2">
                                  {favoriteLocations.map((location) => (
                                    <div
                                      key={location.id}
                                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                                      onClick={() => handleSelectFavorite(location)}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                          {location.type === "home" ? (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="text-primary"
                                              aria-hidden="true"
                                            >
                                              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                              <polyline points="9 22 9 12 15 12 15 22" />
                                            </svg>
                                          ) : location.type === "work" ? (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="text-primary"
                                              aria-hidden="true"
                                            >
                                              <rect width="16" height="16" x="4" y="4" rx="2" />
                                              <rect width="4" height="4" x="10" y="10" rx="1" />
                                              <path d="M4 16h16" />
                                              <path d="M4 12h4" />
                                              <path d="M16 12h4" />
                                              <path d="M4 8h16" />
                                            </svg>
                                          ) : (
                                            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                                          )}
                                        </div>
                                        <div>
                                          <div className="font-medium">{location.name}</div>
                                          <div className="text-xs text-muted-foreground">{location.address}</div>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        aria-label={`Add ${location.name} to favorites`}
                                      >
                                        <Heart className="h-4 w-4" aria-hidden="true" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => openMapDialog("pickup")}
                            aria-label="Select on map"
                          >
                            <MapPin className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dropoff">Drop-off Location</Label>
                        <div className="relative flex gap-2">
                          <div className="relative flex-1">
                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="dropoff"
                              placeholder="Enter destination address"
                              className="pl-9"
                              value={dropoffLocation}
                              onChange={(e) => setDropoffLocation(e.target.value)}
                              required
                            />
                          </div>
                          <Popover
                            open={favoriteLocationsOpen && locationType === "dropoff"}
                            onOpenChange={(open) => {
                              setLocationType("dropoff")
                              setFavoriteLocationsOpen(open)
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button type="button" variant="outline" size="icon" aria-label="Select from favorites">
                                <Star className="h-4 w-4" aria-hidden="true" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="end">
                              <div className="space-y-4">
                                <div className="font-medium">Favorite Locations</div>
                                <div className="space-y-2">
                                  {favoriteLocations.map((location) => (
                                    <div
                                      key={location.id}
                                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                                      onClick={() => handleSelectFavorite(location)}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                          {location.type === "home" ? (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="text-primary"
                                              aria-hidden="true"
                                            >
                                              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                              <polyline points="9 22 9 12 15 12 15 22" />
                                            </svg>
                                          ) : location.type === "work" ? (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="text-primary"
                                              aria-hidden="true"
                                            >
                                              <rect width="16" height="16" x="4" y="4" rx="2" />
                                              <rect width="4" height="4" x="10" y="10" rx="1" />
                                              <path d="M4 16h16" />
                                              <path d="M4 12h4" />
                                              <path d="M16 12h4" />
                                              <path d="M4 8h16" />
                                            </svg>
                                          ) : (
                                            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                                          )}
                                        </div>
                                        <div>
                                          <div className="font-medium">{location.name}</div>
                                          <div className="text-xs text-muted-foreground">{location.address}</div>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        aria-label={`Add ${location.name} to favorites`}
                                      >
                                        <Heart className="h-4 w-4" aria-hidden="true" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => openMapDialog("dropoff")}
                            aria-label="Select on map"
                          >
                            <MapPin className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Ride Type</Label>
                      <RadioGroup
                        defaultValue="scheduled"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        value={rideType}
                        onValueChange={setRideType}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="scheduled" id="scheduled" />
                          <Label htmlFor="scheduled" className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                            <div>
                              <div>Scheduled Ride</div>
                              <div className="text-sm text-muted-foreground">Book for a future date & time</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="now" id="now" />
                          <Label htmlFor="now" className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" aria-hidden="true" />
                            <div>
                              <div>Ride Now</div>
                              <div className="text-sm text-muted-foreground">Book a ride for right now</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {rideType === "scheduled" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                                aria-label="Select date"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                                {date ? format(date, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Popover open={timePickerOpen} onOpenChange={setTimePickerOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal"
                                aria-label="Select time"
                              >
                                <Clock className="mr-2 h-4 w-4" aria-hidden="true" />
                                {formatTime()}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4" align="start">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Hours</Label>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">1</span>
                                    <Slider
                                      value={[hours]}
                                      min={1}
                                      max={12}
                                      step={1}
                                      onValueChange={(value) => setHours(value[0])}
                                      className="flex-1 mx-4"
                                      aria-label="Select hours"
                                    />
                                    <span className="text-sm text-muted-foreground">12</span>
                                  </div>
                                  <div className="text-center font-medium">{hours}</div>
                                </div>

                                <div className="space-y-2">
                                  <Label>Minutes</Label>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">0</span>
                                    <Slider
                                      value={[minutes]}
                                      min={0}
                                      max={59}
                                      step={1}
                                      onValueChange={(value) => setMinutes(value[0])}
                                      className="flex-1 mx-4"
                                      aria-label="Select minutes"
                                    />
                                    <span className="text-sm text-muted-foreground">59</span>
                                  </div>
                                  <div className="text-center font-medium">{minutes.toString().padStart(2, "0")}</div>
                                </div>

                                <div className="flex justify-center gap-2">
                                  <Button
                                    variant={amPm === "AM" ? "default" : "outline"}
                                    onClick={() => setAmPm("AM")}
                                    type="button"
                                  >
                                    AM
                                  </Button>
                                  <Button
                                    variant={amPm === "PM" ? "default" : "outline"}
                                    onClick={() => setAmPm("PM")}
                                    type="button"
                                  >
                                    PM
                                  </Button>
                                </div>

                                <Button className="w-full" onClick={() => setTimePickerOpen(false)} type="button">
                                  Confirm
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Vehicle Type</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <VehicleTypeOption
                          id="bike"
                          icon="bike"
                          title="2 Wheeler"
                          description="Fastest & Affordable"
                          selected={vehicleType === "bike"}
                          onSelect={() => setVehicleType("bike")}
                        />
                        <VehicleTypeOption
                          id="auto"
                          icon="auto"
                          title="Auto Rickshaw"
                          description="Budget Friendly"
                          selected={vehicleType === "auto"}
                          onSelect={() => setVehicleType("auto")}
                        />
                        <VehicleTypeOption
                          id="car"
                          icon="car"
                          title="4 Wheeler"
                          description="Comfortable & Spacious"
                          selected={vehicleType === "car"}
                          onSelect={() => setVehicleType("car")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Instructions (Optional)</Label>
                      <Input
                        id="notes"
                        placeholder="Any specific instructions for the driver"
                        aria-label="Special instructions for the driver"
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto md:min-w-[200px] h-12 text-base">
                      Continue to Plan Selection
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border shadow-sm">
                <CardHeader className="pb-4 md:pb-6">
                  <CardTitle>Select Your Plan</CardTitle>
                  <CardDescription>Choose a subscription plan that fits your needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Tabs defaultValue="weekly">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      </TabsList>
                      <div className="mt-6 space-y-4">
                        <TabsContent value="weekly" className="space-y-4">
                          <RadioGroup defaultValue="weekly-standard">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="relative rounded-lg border p-4 hover:border-primary">
                                <RadioGroupItem
                                  value="weekly-standard"
                                  id="weekly-standard"
                                  className="absolute right-4 top-4"
                                />
                                <div className="font-semibold">Weekly Standard</div>
                                <div className="text-sm text-muted-foreground">
                                  5 rides per week (weekdays, one-way)
                                </div>
                                <div className="mt-2 font-semibold">₹1,999/week</div>
                              </div>
                              <div className="relative rounded-lg border p-4 hover:border-primary">
                                <RadioGroupItem
                                  value="weekly-plus"
                                  id="weekly-plus"
                                  className="absolute right-4 top-4"
                                />
                                <div className="flex items-center">
                                  <div className="font-semibold">Weekly Plus</div>
                                  <div className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                    Best Value
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  10 rides per week (weekdays, round trip)
                                </div>
                                <div className="mt-2 font-semibold">₹3,499/week</div>
                              </div>
                            </div>
                          </RadioGroup>
                        </TabsContent>
                        <TabsContent value="monthly" className="space-y-4">
                          <RadioGroup defaultValue="monthly-standard">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="relative rounded-lg border p-4 hover:border-primary">
                                <RadioGroupItem
                                  value="monthly-standard"
                                  id="monthly-standard"
                                  className="absolute right-4 top-4"
                                />
                                <div className="font-semibold">Monthly Standard</div>
                                <div className="text-sm text-muted-foreground">
                                  20 rides per month (weekdays, one-way)
                                </div>
                                <div className="mt-2 font-semibold">₹7,499/month</div>
                              </div>
                              <div className="relative rounded-lg border p-4 hover:border-primary">
                                <RadioGroupItem
                                  value="monthly-plus"
                                  id="monthly-plus"
                                  className="absolute right-4 top-4"
                                />
                                <div className="flex items-center">
                                  <div className="font-semibold">Monthly Plus</div>
                                  <div className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                    Most Popular
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  40 rides per month (weekdays, round trip)
                                </div>
                                <div className="mt-2 font-semibold">₹13,999/month</div>
                              </div>
                            </div>
                          </RadioGroup>
                        </TabsContent>
                      </div>
                    </Tabs>

                    <div className="space-y-4">
                      <div className="text-lg font-semibold">Payment Method</div>
                      <RadioGroup defaultValue="card" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                          <RadioGroupItem value="card" id="card" className="absolute right-2 top-2" />
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
                            className="mb-2"
                            aria-hidden="true"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                          <div className="font-medium">Card</div>
                        </div>
                        <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                          <RadioGroupItem value="upi" id="upi" className="absolute right-2 top-2" />
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
                            className="mb-2"
                            aria-hidden="true"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="6" x2="6" y1="9" y2="9" />
                            <line x1="10" x2="10" y1="9" y2="9" />
                            <line x1="14" x2="14" y1="9" y2="9" />
                            <line x1="18" x2="18" y1="9" y2="9" />
                            <line x1="6" x2="6" y1="13" y2="13" />
                            <line x1="18" x2="18" y1="13" y2="13" />
                            <line x1="10" x2="14" y1="13" y2="13" />
                          </svg>
                          <div className="font-medium">UPI</div>
                        </div>
                        <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                          <RadioGroupItem value="wallet" id="wallet" className="absolute right-2 top-2" />
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
                            className="mb-2"
                            aria-hidden="true"
                          >
                            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                          </svg>
                          <div className="font-medium">Wallet</div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex justify-between">
                        <div className="text-muted-foreground">Plan Cost</div>
                        <div>₹3,499</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-muted-foreground">Service Fee</div>
                        <div>₹350</div>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <div>Total</div>
                        <div>₹3,849</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="w-full sm:w-auto h-12 text-base"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="w-full sm:flex-1 h-12 text-base" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                            Processing...
                          </>
                        ) : (
                          "Confirm & Pay"
                        )}
                      </Button>
                    </div>
                  </form>
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    <span>Already have an ongoing ride? </span>
                    <Link href="/rides" className="text-primary hover:underline">
                      Track your ride
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Map Dialog */}
        <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
          <DialogContent className="sm:max-w-[600px] w-[calc(100%-2rem)] p-0 overflow-hidden">
            <DialogHeader className="p-4 pb-0">
              <DialogTitle>Select {locationType === "pickup" ? "Pickup" : "Drop-off"} Location</DialogTitle>
              <DialogDescription>
                Click on the map to select your {locationType === "pickup" ? "pickup" : "drop-off"} location
              </DialogDescription>
            </DialogHeader>
            <div className="h-[400px] w-full flex flex-col">
              <div className="flex-1 relative">
                <MapView height="400px" onLocationSelect={handleLocationSelect} markers={getMapMarkers()} />
              </div>
              <div className="p-4 border-t">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Selected Location</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search
                          className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <Input
                          placeholder="Search for a location"
                          className="pl-9"
                          value={locationType === "pickup" ? pickupLocation : dropoffLocation}
                          onChange={(e) => {
                            if (locationType === "pickup") {
                              setPickupLocation(e.target.value)
                            } else {
                              setDropoffLocation(e.target.value)
                            }
                          }}
                          aria-label="Search location"
                        />
                      </div>
                      <Button variant="outline" size="icon" title="Save as favorite" aria-label="Save as favorite">
                        <Heart className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setMapDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() =>
                        handleLocationSelect({
                          address:
                            locationType === "pickup"
                              ? pickupLocation || "Selected Pickup Location"
                              : dropoffLocation || "Selected Drop-off Location",
                          lat: 28.6139,
                          lng: 77.209,
                        })
                      }
                    >
                      Confirm Location
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="mt-6">
          <WhatsAppUpdates />
        </div>
      </div>
    </ResponsiveContainer>
  )
}
