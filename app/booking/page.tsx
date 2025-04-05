"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Calendar,
  CalendarIcon,
  Clock,
  MapPin,
  Navigation,
  Plus,
  Minus,
  Car,
  Bike,
  Star,
  Heart,
  Search,
} from "lucide-react"
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
import { Container } from "@/components/ui/container"

function GoogleMapComponent({ onLocationSelect, locationType }) {
  const mapRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleMapClick = (e) => {
    // Simulate getting coordinates and address
    const mockAddress = locationType === "pickup" ? "123 Main St, New Delhi, India" : "456 Market St, New Delhi, India"

    onLocationSelect(mockAddress)
  }

  return (
    <div className="w-full h-full relative">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=400&width=600')",
              filter: "grayscale(0.5)",
            }}
            onClick={handleMapClick}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 p-2 rounded-md text-sm">
              Click anywhere on the map to select a location
            </div>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <Button size="sm" variant="outline" className="bg-background/90">
              <Navigation className="h-4 w-4 mr-2" />
              Current Location
            </Button>
          </div>
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <Button size="icon" variant="outline" className="bg-background/90 h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="bg-background/90 h-8 w-8">
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

// Vehicle type option component
const VehicleTypeOption = ({ id, icon: Icon, title, description, selected, onSelect }) => {
  return (
    <div
      className={`relative rounded-lg border p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
        selected ? "border-primary bg-primary/5" : "hover:border-primary/50"
      }`}
      onClick={() => onSelect(id)}
    >
      {Icon === "auto" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-2"
        >
          <path d="M5 17h2a2 2 0 1 0 4 0H5Z" />
          <path d="M9 17h6a2 2 0 1 0 4 0h1a2 2 0 0 0 2-2v-5a4 4 0 0 0-4-4h-6.5a4 4 0 0 0-3.5 2L5 13v4h4Z" />
          <path d="M7 14h12" />
          <path d="M5 9h14" />
        </svg>
      ) : (
        <Icon className="h-8 w-8 mb-2" />
      )}
      <div className="font-medium">{title}</div>
      <div className="text-xs text-muted-foreground mt-1">{description}</div>
      <input
        type="radio"
        name="vehicleType"
        id={id}
        className="sr-only"
        checked={selected}
        onChange={() => onSelect(id)}
      />
      <div
        className={`absolute right-2 top-2 size-4 rounded-full border ${selected ? "bg-primary border-primary" : "border-muted-foreground"}`}
      >
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-2 rounded-full bg-white"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [step, setStep] = useState(1)
  const [mapDialogOpen, setMapDialogOpen] = useState(false)
  const [locationType, setLocationType] = useState<"pickup" | "dropoff">("pickup")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [rideType, setRideType] = useState("scheduled")
  const [vehicleType, setVehicleType] = useState("car")
  const [favoriteLocationsOpen, setFavoriteLocationsOpen] = useState(false)

  // Favorite locations
  const [favoriteLocations, setFavoriteLocations] = useState([
    { id: 1, name: "Home", address: "123 Sector 18, Noida, UP", type: "home" },
    { id: 2, name: "Office", address: "456 Cyber City, Gurugram, Haryana", type: "work" },
    { id: 3, name: "Gym", address: "789 DLF Mall, Saket, New Delhi", type: "other" },
  ])

  // Custom time picker state
  const [hours, setHours] = useState(8)
  const [minutes, setMinutes] = useState(0)
  const [amPm, setAmPm] = useState("AM")
  const [timePickerOpen, setTimePickerOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step === 1) {
      setStep(2)
      window.scrollTo(0, 0)
    } else {
      toast({
        title: "Ride booked successfully!",
        description: "Your ride has been scheduled. Check your email for confirmation.",
      })
    }
  }

  const openMapDialog = (type: "pickup" | "dropoff") => {
    setLocationType(type)
    setMapDialogOpen(true)
  }

  const handleLocationSelect = (location: string) => {
    if (locationType === "pickup") {
      setPickupLocation(location)
    } else {
      setDropoffLocation(location)
    }
    setMapDialogOpen(false)
  }

  const formatTime = () => {
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    const formattedMinutes = minutes.toString().padStart(2, "0")
    return `${formattedHours}:${formattedMinutes} ${amPm}`
  }

  const handleSelectFavorite = (address: string) => {
    if (locationType === "pickup") {
      setPickupLocation(address)
    } else {
      setDropoffLocation(address)
    }
    setFavoriteLocationsOpen(false)
  }

  return (
    <Container size="md" className="py-6 md:py-10">
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

      {step === 1 ? (
        <Card className="border shadow-sm">
          <CardHeader className="pb-4 md:pb-6">
            <CardTitle>Ride Details</CardTitle>
            <CardDescription>Enter your pickup and drop-off locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                        <Button type="button" variant="outline" size="icon">
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
                                onClick={() => handleSelectFavorite(location.address)}
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
                                      >
                                        <rect width="16" height="16" x="4" y="4" rx="2" />
                                        <rect width="4" height="4" x="10" y="10" rx="1" />
                                        <path d="M4 16h16" />
                                        <path d="M4 12h4" />
                                        <path d="M16 12h4" />
                                        <path d="M4 8h16" />
                                      </svg>
                                    ) : (
                                      <MapPin className="h-4 w-4 text-primary" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium">{location.name}</div>
                                    <div className="text-xs text-muted-foreground">{location.address}</div>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button type="button" variant="outline" size="icon" onClick={() => openMapDialog("pickup")}>
                      <Navigation className="h-4 w-4" />
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
                        <Button type="button" variant="outline" size="icon">
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
                                onClick={() => handleSelectFavorite(location.address)}
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
                                      >
                                        <rect width="16" height="16" x="4" y="4" rx="2" />
                                        <rect width="4" height="4" x="10" y="10" rx="1" />
                                        <path d="M4 16h16" />
                                        <path d="M4 12h4" />
                                        <path d="M16 12h4" />
                                        <path d="M4 8h16" />
                                      </svg>
                                    ) : (
                                      <MapPin className="h-4 w-4 text-primary" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium">{location.name}</div>
                                    <div className="text-xs text-muted-foreground">{location.address}</div>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button type="button" variant="outline" size="icon" onClick={() => openMapDialog("dropoff")}>
                      <Navigation className="h-4 w-4" />
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
                      <Calendar className="mr-2 h-4 w-4" />
                      <div>
                        <div>Scheduled Ride</div>
                        <div className="text-sm text-muted-foreground">Book for a future date & time</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now" className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
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
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
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
                        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                          <Clock className="mr-2 h-4 w-4" />
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
                    icon={Bike}
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
                    icon={Car}
                    title="4 Wheeler"
                    description="Comfortable & Spacious"
                    selected={vehicleType === "car"}
                    onSelect={() => setVehicleType("car")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Instructions (Optional)</Label>
                <Input id="notes" placeholder="Any specific instructions for the driver" />
              </div>

              <Button type="submit" className="w-full">
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
                          <div className="text-sm text-muted-foreground">5 rides per week (weekdays, one-way)</div>
                          <div className="mt-2 font-semibold">₹1,999/week</div>
                        </div>
                        <div className="relative rounded-lg border p-4 hover:border-primary">
                          <RadioGroupItem value="weekly-plus" id="weekly-plus" className="absolute right-4 top-4" />
                          <div className="flex items-center">
                            <div className="font-semibold">Weekly Plus</div>
                            <div className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                              Best Value
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">10 rides per week (weekdays, round trip)</div>
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
                          <div className="text-sm text-muted-foreground">20 rides per month (weekdays, one-way)</div>
                          <div className="mt-2 font-semibold">₹7,499/month</div>
                        </div>
                        <div className="relative rounded-lg border p-4 hover:border-primary">
                          <RadioGroupItem value="monthly-plus" id="monthly-plus" className="absolute right-4 top-4" />
                          <div className="flex items-center">
                            <div className="font-semibold">Monthly Plus</div>
                            <div className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                              Most Popular
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">40 rides per month (weekdays, round trip)</div>
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
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                  Back
                </Button>
                <Button type="submit" className="w-full sm:flex-1">
                  Confirm & Pay
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
              <GoogleMapComponent onLocationSelect={handleLocationSelect} locationType={locationType} />
            </div>
            <div className="p-4 border-t">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Selected Location</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
                      />
                    </div>
                    <Button variant="outline" size="icon" title="Save as favorite">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setMapDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      handleLocationSelect(
                        locationType === "pickup"
                          ? pickupLocation || "Selected Pickup Location"
                          : dropoffLocation || "Selected Drop-off Location",
                      )
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
    </Container>
  )
}

