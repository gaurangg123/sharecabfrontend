"use client"
import { Bell, ChevronDown, CreditCard, Filter, LogOut, Search, Settings, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dummy data for charts
const revenueData = [
  { name: "Jan", revenue: 8000, users: 100 },
  { name: "Feb", revenue: 9200, users: 120 },
  { name: "Mar", revenue: 10500, users: 150 },
  { name: "Apr", revenue: 12000, users: 180 },
  { name: "May", revenue: 14000, users: 220 },
  { name: "Jun", revenue: 16500, users: 250 },
]

const rideData = [
  { name: "Mon", completed: 112, cancelled: 13 },
  { name: "Tue", completed: 130, cancelled: 15 },
  { name: "Wed", completed: 135, cancelled: 18 },
  { name: "Thu", completed: 140, cancelled: 12 },
  { name: "Fri", completed: 160, cancelled: 20 },
  { name: "Sat", completed: 180, cancelled: 22 },
  { name: "Sun", completed: 170, cancelled: 25 },
]

const subscriptionData = [
  { name: "Daily", value: 20 },
  { name: "Weekly", value: 45 },
  { name: "Monthly", value: 35 },
]

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <div className="flex w-full max-w-sm items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt="@admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>View key metrics and performance data</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="thisMonth">
                  <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-xl font-bold">$45,231</div>
                    <div className="text-xs text-muted-foreground">Total Revenue</div>
                    <div className="mt-3 text-xs text-green-500">+16% from last month</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-xl font-bold">1,254</div>
                    <div className="text-xs text-muted-foreground">Total Rides</div>
                    <div className="mt-3 text-xs text-green-500">+12% from last month</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-xl font-bold">562</div>
                    <div className="text-xs text-muted-foreground">Active Subscribers</div>
                    <div className="mt-3 text-xs text-green-500">+24% from last month</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue & User Growth</CardTitle>
              <CardDescription>Monthly revenue and user growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">Revenue chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Distribution of subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">Subscription chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Ride Analytics</CardTitle>
              <CardDescription>Daily ride completion and cancellation statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">Ride analytics chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b p-3 font-medium">
                  <div>User</div>
                  <div>Plan</div>
                  <div>Amount</div>
                  <div>Date</div>
                  <div>Status</div>
                </div>
                <div className="grid grid-cols-5 border-b p-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User 1" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>John Doe</div>
                  </div>
                  <div className="flex items-center">Monthly Plus</div>
                  <div className="flex items-center">$329.99</div>
                  <div className="flex items-center">May 1, 2024</div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">Completed</div>
                  </div>
                </div>
                <div className="grid grid-cols-5 border-b p-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User 2" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>Jane Smith</div>
                  </div>
                  <div className="flex items-center">Weekly Plus</div>
                  <div className="flex items-center">$89.99</div>
                  <div className="flex items-center">Apr 30, 2024</div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">Completed</div>
                  </div>
                </div>
                <div className="grid grid-cols-5 border-b p-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User 3" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <div>Robert Johnson</div>
                  </div>
                  <div className="flex items-center">Daily Plus</div>
                  <div className="flex items-center">$16.99</div>
                  <div className="flex items-center">Apr 30, 2024</div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">Pending</div>
                  </div>
                </div>
                <div className="grid grid-cols-5 border-b p-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User 4" />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <div>Maria Davis</div>
                  </div>
                  <div className="flex items-center">Monthly Standard</div>
                  <div className="flex items-center">$179.99</div>
                  <div className="flex items-center">Apr 29, 2024</div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">Completed</div>
                  </div>
                </div>
                <div className="grid grid-cols-5 p-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User 5" />
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                    <div>Tom Wilson</div>
                  </div>
                  <div className="flex items-center">Weekly Standard</div>
                  <div className="flex items-center">$49.99</div>
                  <div className="flex items-center">Apr 28, 2024</div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">Failed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 pt-2">
          <CreditCard className="h-6 w-6" />
          <div className="font-semibold">ShareCab Admin</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
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
                    className="h-4 w-4"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
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
                    className="h-4 w-4"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                  <span>Cabs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
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
                    className="h-4 w-4"
                  >
                    <path d="M5.2 6.2l1.4 1.4" />
                    <path d="M12 2h0" />
                    <path d="M17.4 7.6l1.4-1.4" />
                    <path d="M22 12h0" />
                    <path d="M17.4 16.4l1.4 1.4" />
                    <path d="M12 22h0" />
                    <path d="M6.6 17.8l-1.4 1.4" />
                    <path d="M2 12h0" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  <span>Rides</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CreditCard className="h-4 w-4" />
                  <span>Payments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
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
                    className="h-4 w-4"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
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
                    className="h-4 w-4"
                  >
                    <path d="M12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9Z" />
                    <path d="M12 7v5l2.5 1.5" />
                    <path d="M16.8 16.8 18 18" />
                    <path d="M7.2 16.8 6 18" />
                    <path d="M12 4V2" />
                    <path d="M5.2 7.2 4 6" />
                    <path d="m16.8 7.2 1.2-1.2" />
                  </svg>
                  <span>Performance</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
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
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <span>Feedback Analysis</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>System Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
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
                    className="h-4 w-4"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>User Roles</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@sharecab.com</div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

