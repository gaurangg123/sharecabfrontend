"use client"

import { useState } from "react"
import {
  CreditCard,
  LogOut,
  MapPin,
  Star,
  Check,
  ChevronRight,
  Wallet,
  BanknoteIcon as Bank,
  Shield,
  Award,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { BackButton } from "@/components/back-button"
import { Container } from "@/components/ui/container"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSaveChanges = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  return (
    <Container size="md" className="py-6 md:py-10">
      <div className="mb-4">
        <BackButton />
      </div>

      <div className="space-y-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <div className="overflow-x-auto -mx-4 px-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full min-w-[500px] md:min-w-0">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="rides">Rides</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="payment" className="hidden md:inline-flex">
              Payment
            </TabsTrigger>
            <TabsTrigger value="ratings" className="hidden md:inline-flex">
              Ratings
            </TabsTrigger>
            <TabsTrigger value="settings" className="hidden md:inline-flex">
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="relative pb-0">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-4"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-lg">RK</AvatarFallback>
                </Avatar>
                {isEditing ? (
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Rajesh Kumar" className="max-w-[250px]" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="rajesh.kumar@gmail.com" className="max-w-[250px]" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold">Rajesh Kumar</h2>
                    <p className="text-muted-foreground">rajesh.kumar@gmail.com</p>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">4.8</span>
                      <span className="text-muted-foreground">(32 rides)</span>
                      <Badge variant="outline" className="ml-2">
                        Premium Member
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" defaultValue="15/04/1990" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="home">Home Address</Label>
                      <Input id="home" defaultValue="123 Sector 18, Noida, UP" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="work">Work Address</Label>
                      <Input id="work" defaultValue="456 Cyber City, Gurugram, Haryana" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Phone Number</div>
                      <div>+91 98765 43210</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Date of Birth</div>
                      <div>15/04/1990</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Home Address</div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        123 Sector 18, Noida, UP
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Work Address</div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        456 Cyber City, Gurugram, Haryana
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Emergency Contact</h3>
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-name">Name</Label>
                      <Input id="emergency-name" defaultValue="Priya Kumar" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-relation">Relationship</Label>
                      <Input id="emergency-relation" defaultValue="Spouse" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-phone">Phone Number</Label>
                      <Input id="emergency-phone" defaultValue="+91 98765 43210" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Name</div>
                      <div>Priya Kumar</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Relationship</div>
                      <div>Spouse</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Phone Number</div>
                      <div>+91 98765 43210</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Banking Details</h3>
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input id="bank-name" defaultValue="HDFC Bank" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input id="account-number" defaultValue="XXXX XXXX XXXX 4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifsc">IFSC Code</Label>
                      <Input id="ifsc" defaultValue="HDFC0001234" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input id="upi-id" defaultValue="rajesh@okbank" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Bank Name</div>
                      <div className="flex items-center gap-1">
                        <Bank className="h-3 w-3 text-muted-foreground" />
                        HDFC Bank
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Account Number</div>
                      <div>XXXX XXXX XXXX 4567</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">IFSC Code</div>
                      <div>HDFC0001234</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">UPI ID</div>
                      <div className="flex items-center gap-1">
                        <Wallet className="h-3 w-3 text-muted-foreground" />
                        rajesh@okbank
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {isEditing && (
                <Button className="w-full" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ride History</CardTitle>
              <CardDescription>View your past rides and upcoming bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Upcoming Rides</div>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">Tomorrow, 9:00 AM</div>
                          <Badge variant="outline" className="text-xs">
                            Scheduled
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Home → Office</div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">Tomorrow, 6:00 PM</div>
                          <Badge variant="outline" className="text-xs">
                            Scheduled
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Office → Home</div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Past Rides</div>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="font-semibold">Yesterday, 9:00 AM</div>
                        <div className="text-sm text-muted-foreground">Home → Office</div>
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="font-semibold">Yesterday, 6:00 PM</div>
                        <div className="text-sm text-muted-foreground">Office → Home</div>
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <Star className="h-3 w-3 text-muted mr-1" />
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Rides
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-lg">Weekly Plus</div>
                    <div className="text-sm text-muted-foreground">10 rides per week (weekdays, round trip)</div>
                    <div className="mt-2">
                      <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₹3,499</div>
                    <div className="text-sm text-muted-foreground">per week</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rides used this week</span>
                    <span className="font-medium">6 / 10</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="text-sm text-muted-foreground">Renews on May 2, 2024</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium">Subscription Benefits</div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    Priority booking during peak hours
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    Dedicated customer support
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    Cancellation without fee up to 30 minutes before
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    Weekly rewards and cashback
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full">Change Plan</Button>
              <Button variant="outline" className="w-full">
                Pause Subscription
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Saved Payment Methods</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-8 w-8 text-primary" />
                      <div>
                        <div className="font-medium">•••• •••• •••• 4242</div>
                        <div className="text-xs text-muted-foreground">Expires 09/2026</div>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
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
                        className="text-primary"
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
                      <div>
                        <div className="font-medium">UPI ID: rajesh@okbank</div>
                        <div className="text-xs text-muted-foreground">Last used on Apr 26, 2024</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Set Default
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add Payment Method</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past payments and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">Weekly Plus Subscription</div>
                    <div className="text-sm text-muted-foreground">Apr 25, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹13,999</div>
                    <div className="text-xs text-green-600">Paid</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">Weekly Plus Subscription</div>
                    <div className="text-sm text-muted-foreground">Apr 18, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹3,499</div>
                    <div className="text-xs text-green-600">Paid</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">Weekly Plus Subscription</div>
                    <div className="text-sm text-muted-foreground">Apr 11, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹1,999</div>
                    <div className="text-xs text-green-600">Paid</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">Weekly Plus Subscription</div>
                    <div className="text-sm text-muted-foreground">Apr 04, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹7,499</div>
                    <div className="text-xs text-green-600">Paid</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">Weekly Plus Subscription</div>
                    <div className="text-sm text-muted-foreground">Mar 28, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹1,999</div>
                    <div className="text-xs text-green-600">Paid</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Ratings</CardTitle>
              <CardDescription>View your ratings and feedback from drivers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold">4.8</div>
                  <div className="flex mt-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 opacity-80" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Based on 32 rides</div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-sm w-12">5 stars</div>
                    <div className="flex-1">
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="text-sm w-8 text-right">85%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm w-12">4 stars</div>
                    <div className="flex-1">
                      <Progress value={10} className="h-2" />
                    </div>
                    <div className="text-sm w-8 text-right">10%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm w-12">3 stars</div>
                    <div className="flex-1">
                      <Progress value={5} className="h-2" />
                    </div>
                    <div className="text-sm w-8 text-right">5%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm w-12">2 stars</div>
                    <div className="flex-1">
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="text-sm w-8 text-right">0%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm w-12">1 star</div>
                    <div className="flex-1">
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="text-sm w-8 text-right">0%</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Badges Earned</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <div className="font-medium text-center">Punctual Passenger</div>
                    <div className="text-xs text-muted-foreground text-center">Always on time</div>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <div className="font-medium text-center">Trusted Rider</div>
                    <div className="text-xs text-muted-foreground text-center">Verified profile</div>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <Star className="h-8 w-8 text-primary mb-2" />
                    <div className="font-medium text-center">5-Star Passenger</div>
                    <div className="text-xs text-muted-foreground text-center">Consistently rated 5 stars</div>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <CreditCard className="h-8 w-8 text-primary mb-2" />
                    <div className="font-medium text-center">Premium Member</div>
                    <div className="text-xs text-muted-foreground text-center">Subscribed for 3+ months</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Feedback</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="Driver" />
                        <AvatarFallback>DC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Daniel Cooper</div>
                        <div className="text-xs text-muted-foreground">Apr 25, 2024</div>
                      </div>
                      <div className="flex ml-auto">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <p className="text-sm">
                      Great passenger! Very punctual and polite. Would be happy to drive them again.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="Driver" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jennifer Smith</div>
                        <div className="text-xs text-muted-foreground">Apr 24, 2024</div>
                      </div>
                      <div className="flex ml-auto">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <p className="text-sm">
                      One of the best passengers I've had. Very respectful of the vehicle and great conversation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Feedback
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Ride Updates</div>
                    <div className="text-sm text-muted-foreground">Receive updates about your ride status</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Promotional Emails</div>
                    <div className="text-sm text-muted-foreground">Receive emails about promotions and offers</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive text messages for important updates</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">App Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive push notifications on your device</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage your account security and data privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/profile/change-password">
                  Change Password
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <div className="space-y-4">
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
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
                          <path d="M2 16V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                          <path d="M6 12h12" />
                          <path d="M12 16V8" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">SMS/Email OTP</div>
                        <div className="text-xs text-muted-foreground">Receive a code via SMS or email</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
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
                          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                          <circle cx="12" cy="14" r="4" />
                          <path d="M12 6h.01" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Authenticator App</div>
                        <div className="text-xs text-muted-foreground">
                          Use an authenticator app like Google Authenticator
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
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
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Voice Call Verification</div>
                        <div className="text-xs text-muted-foreground">
                          Receive an automated call with a verification code
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  )
}
