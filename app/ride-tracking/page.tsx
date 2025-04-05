"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Phone, Share, ChevronRight, Send, Mic, X, Star, Clock, Shield, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { BackButton } from "@/components/back-button"
import { Container } from "@/components/ui/container"
import { useToast } from "@/components/ui/use-toast"

export default function RideTrackingPage() {
  const { toast } = useToast()
  const [progress, setProgress] = useState(30)
  const [estimatedTime, setEstimatedTime] = useState("18 min")
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7128, lng: -74.006 })
  const [rideStatus, setRideStatus] = useState<
    "searching" | "assigned" | "arriving" | "waiting" | "ongoing" | "completed"
  >("assigned")
  const [otpDialogOpen, setOtpDialogOpen] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "driver"; time: string }[]>([
    {
      text: "Hello! I'll be arriving in about 18 minutes.",
      sender: "driver",
      time: "10:32 AM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [callDialogOpen, setCallDialogOpen] = useState(false)
  const [callStatus, setCallStatus] = useState<"connecting" | "ongoing" | "ended">("connecting")
  const [callDuration, setCallDuration] = useState(0)
  const [callInterval, setCallIntervalState] = useState<NodeJS.Timeout | null>(null)

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

      // Update ride status based on progress
      if (progress > 80 && rideStatus === "assigned") {
        setRideStatus("arriving")
        toast({
          title: "Driver is arriving",
          description: "Your driver will arrive in 2 minutes.",
        })
      } else if (progress >= 100 && rideStatus === "arriving") {
        setRideStatus("waiting")
        toast({
          title: "Driver has arrived",
          description: "Please meet your driver and verify OTP.",
        })
        setOtpDialogOpen(true)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [progress, rideStatus, toast])

  useEffect(() => {
    // Scroll to bottom of chat when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    setMessages([
      ...messages,
      {
        text: newMessage,
        sender: "user",
        time: timeString,
      },
    ])

    setNewMessage("")

    // Simulate driver response after a delay
    setTimeout(() => {
      const responseTime = new Date()
      const responseTimeString = responseTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      const driverResponses = [
        "I'll be there soon!",
        "I'm on my way, there's a bit of traffic.",
        "I can see your location, will reach in a few minutes.",
        "Please be ready at the pickup point.",
      ]

      const randomResponse = driverResponses[Math.floor(Math.random() * driverResponses.length)]

      setMessages((prev) => [
        ...prev,
        {
          text: randomResponse,
          sender: "driver",
          time: responseTimeString,
        },
      ])
    }, 2000)
  }

  const handleVerifyOtp = () => {
    if (otpValue === "1234" || otpValue.length === 4) {
      setOtpDialogOpen(false)
      setRideStatus("ongoing")
      toast({
        title: "OTP verified successfully",
        description: "Your ride has started. Enjoy your journey!",
      })
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP provided by the driver.",
        variant: "destructive",
      })
    }
  }

  const handleCall = () => {
    setCallDialogOpen(true)

    // Simulate call connecting
    setTimeout(() => {
      setCallStatus("ongoing")

      // Start call timer
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)

      setCallIntervalState(interval)
    }, 2000)
  }

  const handleEndCall = () => {
    if (callInterval) {
      clearInterval(callInterval)
    }
    setCallStatus("ended")

    // Close dialog after showing "Call ended" for a moment
    setTimeout(() => {
      setCallDialogOpen(false)
      setCallDuration(0)
      setCallStatus("connecting")
    }, 1500)
  }

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <Container size="md" className="py-6">
      <div className="mb-4">
        <BackButton />
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-center">
            <Badge
              variant="outline"
              className={`font-normal ${
                rideStatus === "searching"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  : rideStatus === "assigned" || rideStatus === "arriving"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : rideStatus === "waiting"
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                      : rideStatus === "ongoing"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
              }`}
            >
              {rideStatus === "searching"
                ? "Finding driver"
                : rideStatus === "assigned"
                  ? "Driver assigned"
                  : rideStatus === "arriving"
                    ? "Driver arriving"
                    : rideStatus === "waiting"
                      ? "Driver waiting"
                      : rideStatus === "ongoing"
                        ? "Ride in progress"
                        : "Ride completed"}
            </Badge>
            <Button variant="ghost" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-xl mt-2">
            {rideStatus === "searching"
              ? "Finding your driver"
              : rideStatus === "assigned"
                ? "Your ride is on the way"
                : rideStatus === "arriving"
                  ? "Your driver is arriving"
                  : rideStatus === "waiting"
                    ? "Your driver has arrived"
                    : rideStatus === "ongoing"
                      ? "Enjoy your ride"
                      : "Ride completed"}
          </CardTitle>
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
            {rideStatus !== "ongoing" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">
                    {rideStatus === "waiting" ? "Driver is waiting" : "Arriving in"}
                  </div>
                  <div className="font-semibold">{rideStatus === "waiting" ? "at pickup point" : estimatedTime}</div>
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
            )}

            {rideStatus === "ongoing" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Estimated arrival</div>
                  <div className="font-semibold">10:45 AM (15 min)</div>
                </div>
                <Progress value={40} className="h-2" />

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
            )}

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
                    <div className="text-sm text-muted-foreground truncate">123 Main Street, New Delhi</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Dropoff</div>
                    <div className="text-sm text-muted-foreground truncate">456 Broadway, New Delhi</div>
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
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="text-xs ml-1">4.9</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => setChatDialogOpen(true)}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={handleCall}>
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {rideStatus === "waiting" && (
              <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Verify OTP to start ride</p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                      Ask your driver for the 4-digit OTP and verify to begin your journey.
                    </p>
                    <Button
                      size="sm"
                      className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white"
                      onClick={() => setOtpDialogOpen(true)}
                    >
                      Enter OTP
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {rideStatus === "ongoing" && (
              <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Ride in progress</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                      Your ride has started. You can track your journey in real-time.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-green-600 dark:text-green-500" />
                      <span className="text-xs text-green-700 dark:text-green-400">Journey started at 10:30 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex border-t p-4">
          <Button variant="outline" size="sm" className="gap-1">
            Cancel Ride
          </Button>
          <Button size="sm" className="ml-auto gap-1" asChild>
            <Link href="/feedback">
              Rate Ride
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Ask your driver for the 4-digit OTP to verify and start your ride
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <Input
                  className="text-center text-2xl tracking-widest w-40"
                  maxLength={4}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="• • • •"
                />
              </div>

              <div className="text-xs text-center text-muted-foreground mt-2">
                For your safety, please verify the vehicle details before entering
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOtpDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifyOtp} disabled={otpValue.length !== 4}>
              Verify & Start Ride
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent className="sm:max-w-md h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-4 py-2 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Driver" />
                <AvatarFallback>DC</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>Daniel Cooper</DialogTitle>
                <div className="text-xs text-muted-foreground">Toyota Camry · ABC 123</div>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setChatDialogOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button size="icon" variant="ghost" className="text-muted-foreground">
                <Mic className="h-5 w-5" />
              </Button>
              <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Call Dialog */}
      <Dialog
        open={callDialogOpen}
        onOpenChange={(open) => {
          if (!open && callInterval) {
            clearInterval(callInterval)
            setCallDuration(0)
            setCallStatus("connecting")
          }
          setCallDialogOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-xs text-center p-6">
          <div className="space-y-6">
            <div className="mx-auto w-20 h-20 relative">
              <Avatar className="w-full h-full">
                <AvatarImage src="/placeholder.svg" alt="Driver" />
                <AvatarFallback className="text-2xl">DC</AvatarFallback>
              </Avatar>
              {callStatus === "connecting" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full animate-pulse bg-black/20 rounded-full"></div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-lg">Daniel Cooper</h3>
              <p className="text-sm text-muted-foreground">
                {callStatus === "connecting"
                  ? "Connecting..."
                  : callStatus === "ongoing"
                    ? formatCallDuration(callDuration)
                    : "Call ended"}
              </p>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              {callStatus === "ongoing" && (
                <>
                  <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  </Button>
                  <Button size="icon" variant="destructive" className="rounded-full h-12 w-12" onClick={handleEndCall}>
                    <Phone className="h-6 w-6 rotate-135" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </Button>
                </>
              )}

              {callStatus === "connecting" && (
                <Button size="icon" variant="destructive" className="rounded-full h-12 w-12" onClick={handleEndCall}>
                  <Phone className="h-6 w-6 rotate-135" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

