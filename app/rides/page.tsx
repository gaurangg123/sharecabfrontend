"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, Car, ChevronRight, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"
import { Container } from "@/components/ui/container"

export default function RidesPage() {
  const [filterPeriod, setFilterPeriod] = useState("all")

  return (
    <Container size="full" className="py-6 md:py-10">
      <div className="content-centered">
        <div className="mb-4">
          <BackButton />
        </div>

        <div className="space-y-2 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Rides</h1>
          <p className="text-muted-foreground">View and manage all your rides</p>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="current" className="space-y-4">
            <Card className="border-primary shadow-sm">
              <CardContent className="p-0">
                <div className="p-4 bg-primary/5 border-b border-primary/20">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-600 hover:bg-green-700">In Progress</Badge>
                    <div className="text-sm text-muted-foreground">Ride #RD78945</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-semibold">Office to Home</div>
                    <div className="text-sm">Today, 6:00 PM</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="size-3 rounded-full bg-blue-500"></div>
                      <div className="w-0.5 h-12 bg-muted"></div>
                      <div className="size-3 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Pickup</div>
                        <div className="font-medium">456 Cyber City, Gurugram, Haryana</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dropoff</div>
                        <div className="font-medium">123 Sector 18, Noida, UP</div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
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
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                        Details
                      </Button>
                      <Button size="sm" className="flex-1 sm:flex-none" asChild>
                        <Link href="/ride-tracking">
                          Track
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-4">
              <Button variant="outline" asChild>
                <Link href="/booking">
                  Book a new ride
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Scheduled</Badge>
                    <div className="text-sm text-muted-foreground">Ride #RD78946</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-semibold">Home to Office</div>
                    <div className="text-sm">Tomorrow, 9:00 AM</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="size-3 rounded-full bg-blue-500"></div>
                      <div className="w-0.5 h-12 bg-muted"></div>
                      <div className="size-3 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Pickup</div>
                        <div className="font-medium">123 Sector 18, Noida, UP</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dropoff</div>
                        <div className="font-medium">456 Cyber City, Gurugram, Haryana</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Sedan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">May 2, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">9:00 AM</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex flex-wrap gap-2 justify-end">
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                    <Button size="sm">Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Scheduled</Badge>
                    <div className="text-sm text-muted-foreground">Ride #RD78947</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-semibold">Office to Home</div>
                    <div className="text-sm">Tomorrow, 6:00 PM</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="size-3 rounded-full bg-blue-500"></div>
                      <div className="w-0.5 h-12 bg-muted"></div>
                      <div className="size-3 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Pickup</div>
                        <div className="font-medium">456 Cyber City, Gurugram, Haryana</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dropoff</div>
                        <div className="font-medium">123 Sector 18, Noida, UP</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Sedan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">May 2, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">6:00 PM</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex flex-wrap gap-2 justify-end">
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                    <Button size="sm">Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Completed</Badge>
                    <div className="text-sm text-muted-foreground">Ride #RD78944</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-semibold">Home to Office</div>
                    <div className="text-sm">Yesterday, 9:00 AM</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="size-3 rounded-full bg-blue-500"></div>
                      <div className="w-0.5 h-12 bg-muted"></div>
                      <div className="size-3 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Pickup</div>
                        <div className="font-medium">123 Sector 18, Noida, UP</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dropoff</div>
                        <div className="font-medium">456 Cyber City, Gurugram, Haryana</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">₹349</div>
                      <Badge variant="outline" className="text-xs">
                        Subscription
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">Duration: 45 min</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex flex-wrap gap-2 justify-end">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/feedback">Rate Ride</Link>
                    </Button>
                    <Button size="sm">Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Completed</Badge>
                    <div className="text-sm text-muted-foreground">Ride #RD78943</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-semibold">Office to Home</div>
                    <div className="text-sm">Apr 30, 2024, 6:00 PM</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="size-3 rounded-full bg-blue-500"></div>
                      <div className="w-0.5 h-12 bg-muted"></div>
                      <div className="size-3 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Pickup</div>
                        <div className="font-medium">456 Cyber City, Gurugram, Haryana</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dropoff</div>
                        <div className="font-medium">123 Sector 18, Noida, UP</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">₹349</div>
                      <Badge variant="outline" className="text-xs">
                        Subscription
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">Duration: 50 min</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex flex-wrap gap-2 justify-end">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/feedback">Rate Ride</Link>
                    </Button>
                    <Button size="sm">Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-4">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  )
}
