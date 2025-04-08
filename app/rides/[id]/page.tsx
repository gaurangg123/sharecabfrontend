"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MessageCircle, Phone, Share, ChevronRight, Send, Mic, X, Star, Clock, Shield, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackButton } from "@/components/back-button"
import { Container } from "@/components/ui/container"
import { useToast } from "@/components/ui/use-toast"

export default function RideDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [progress, setProgress] = useState(30)
  const [estimatedTime, setEstimatedTime] = useState("18 min")
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7128, lng: -74.006 })
  const [rideStatus, setRideStatus] = useState<
    "searching" | "assigned" | "arriving" | "waiting" | "ongoing" | "completed"
  >("ongoing")
  const [otpDialogOpen, setOtpDialogOpen] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "driver"; time: string }[]>([
    {
      text: "Hello! I'll be arriving in about 18 minutes.",
      sender: "driver",
      time: "10:32 AM",
    },
    {
      text: "Thanks for the update. I'll be ready.",
      sender: "user",
      time: "10:33 AM",
    },
    {
      text: "I'm in a blue Toyota Camry. Will call you when I'm closer.",
      sender: "driver",
      time: "10:34 AM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("tracking")

  useEffect(() => {
    // Simulate cab movement
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })

      // Simulate driver location change
      setDriverLocation((prev) => ({
        lat: prev.lat + 0.001,
        lng: prev.lng + 0.0005,
      }))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

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

  return (
    <Container size="md" className="py-6">
      <div className="mb-4 flex items-center justify-between">
        <BackButton />
        <div className="text-sm text-muted-foreground">Ride #RD78945</div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="details">Ride Details</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-center">
                <Badge className="bg-green-600 hover:bg-green-700">In Progress</Badge>
                <Button variant="ghost" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-xl mt-2">Office to Home</CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="aspect-video relative w-full bg-muted">
                {/* This would be replaced with an actual map integration */}
                <Image src="/placeholder.svg?height=300&width=400" alt="Ride map" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <p className="bg-background/90 p-2 rounded-md text-sm">Interactive map would be displayed here</p>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Button size="sm" variant="outline" className="bg-background/90">
                    <MapPin className="h-4 w-4 mr-2" />
                    Current Location
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground">Estimated arrival</div>
                    <div className="font-semibold">10:45 AM (15 min)</div>
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
                        <div className="text-sm text-muted-foreground truncate">456 Cyber City, Gurugram, Haryana</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Dropoff</div>
                        <div className="text-sm text-muted-foreground truncate">123 Sector 18, Noida, UP</div>
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
                      <Button size="icon" variant="outline" asChild>
                        <a href="tel:+919876543210">
                          <Phone className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

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
              </div>
            </CardContent>

            <CardFooter className="flex border-t p-4">
              <Button variant="outline" size="sm" className="gap-1">
                Emergency
              </Button>
              <Button size="sm" className="ml-auto gap-1" asChild>
                <Link href="/feedback">
                  Rate Ride
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ride Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Ride ID</div>
                  <div className="font-medium">RD78945</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Date & Time</div>
                  <div className="font-medium">May 1, 2024, 6:00 PM</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div>
                    <Badge className="bg-green-600 hover:bg-green-700">In Progress</Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Estimated Arrival</div>
                  <div className="font-medium">10:45 AM (15 min)</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Vehicle Type</div>
                  <div className="font-medium">Sedan</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Vehicle Details</div>
                  <div className="font-medium">Toyota Camry · ABC 123</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Route</div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-3 rounded-full bg-blue-500"></div>
                    <div className="w-0.5 h-8 bg-muted"></div>
                    <div className="size-3 rounded-full bg-primary"></div>
                  </div>
                  <div className="space-y-6 flex-1">
                    <div>
                      <div className="text-sm font-medium">Pickup</div>
                      <div className="text-sm text-muted-foreground">456 Cyber City, Gurugram, Haryana</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Dropoff</div>
                      <div className="text-sm text-muted-foreground">123 Sector 18, Noida, UP</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Driver Information</div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt="Driver" />
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Daniel Cooper</div>
                    <div className="text-sm text-muted-foreground">License: DL-12345678</div>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="text-xs ml-1">4.9 (328 rides)</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Payment Information</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Fare</div>
                    <div className="font-medium">₹349</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Payment Method</div>
                    <div className="font-medium">Subscription (Weekly Plus)</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Payment Status</div>
                    <div className="font-medium">Paid</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline" size="sm">
                Download Receipt
              </Button>
              <Button size="sm" asChild>
                <Link href="/feedback">Rate Ride</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

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
    </Container>
  )
}
