"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Clock, MapPin, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { bookRide } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  pickupLocation: z.string().min(5, {
    message: "Pickup location must be at least 5 characters.",
  }),
  dropoffLocation: z.string().min(5, {
    message: "Dropoff location must be at least 5 characters.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  rideType: z.enum(["standard", "premium", "shared"], {
    required_error: "Please select a ride type.",
  }),
})

export default function BookRidePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingResult, setBookingResult] = useState<{
    success: boolean
    message: string
    rideId?: string
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      rideType: "standard",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setBookingResult(null)

    try {
      // Format the date and time for the API
      const pickupTime = new Date(values.date)
      const [hours, minutes] = values.time.split(":").map(Number)
      pickupTime.setHours(hours, minutes)

      const result = await bookRide({
        pickupLocation: values.pickupLocation,
        dropoffLocation: values.dropoffLocation,
        pickupTime: pickupTime.toISOString(),
      })

      if (result.success) {
        setBookingResult({
          success: true,
          message: "Your ride has been booked successfully!",
          rideId: result.rideId,
        })

        toast({
          title: "Ride Booked!",
          description: "Your ride has been scheduled successfully.",
        })

        // Reset form after successful booking
        form.reset()
      } else {
        setBookingResult({
          success: false,
          message: result.error || "Failed to book your ride. Please try again.",
        })

        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: result.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      setBookingResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })

      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeOptions.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Book a Ride</h1>
        <p className="text-muted-foreground mt-2">Fill in the details below to book your ride with ShareCab</p>
      </div>

      {bookingResult && (
        <Alert variant={bookingResult.success ? "default" : "destructive"} className="mb-6">
          {bookingResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{bookingResult.success ? "Booking Successful" : "Booking Failed"}</AlertTitle>
          <AlertDescription>
            {bookingResult.message}
            {bookingResult.success && bookingResult.rideId && (
              <p className="mt-2">
                Your ride ID is: <span className="font-medium">{bookingResult.rideId}</span>
              </p>
            )}
            {bookingResult.success && (
              <Button variant="outline" className="mt-4" onClick={() => router.push("/rides")}>
                View My Rides
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Ride Details</CardTitle>
          <CardDescription>Enter your pickup and dropoff locations along with your preferred time</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter pickup address" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dropoffLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dropoff Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter destination address" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time">
                              {field.value ? (
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {field.value}
                                </div>
                              ) : (
                                "Select a time"
                              )}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="rideType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ride Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a ride type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard (Sedan)</SelectItem>
                        <SelectItem value="premium">Premium (SUV)</SelectItem>
                        <SelectItem value="shared">Shared Ride (Economy)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose the type of ride that best suits your needs</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking Ride...
                  </>
                ) : (
                  "Book Ride"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t pt-6">
          <div className="text-sm text-muted-foreground">
            <p>
              By booking a ride, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
