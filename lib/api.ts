// Types
export interface Ride {
  id: string
  pickupLocation: string
  dropoffLocation: string
  pickupTime: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  fare: number
  driverId?: string
}

export interface Driver {
  id: string
  name: string
  photo: string
  rating: number
  totalRides: number
  carModel: string
  carColor: string
  licensePlate: string
  isVerified: boolean
  phoneNumber: string
}

export interface PaymentDetails {
  cardNumber: string
  expiryDate: string
  cvv: string
  name: string
}

// Mock data
const mockRides: Ride[] = [
  {
    id: "ride-001",
    pickupLocation: "123 Main St, New York, NY",
    dropoffLocation: "456 Park Ave, New York, NY",
    pickupTime: "2024-05-03T09:00:00Z",
    status: "scheduled",
    fare: 25.5,
    driverId: "driver-001",
  },
  {
    id: "ride-002",
    pickupLocation: "789 Broadway, New York, NY",
    dropoffLocation: "101 5th Ave, New York, NY",
    pickupTime: "2024-05-03T14:30:00Z",
    status: "scheduled",
    fare: 18.75,
    driverId: "driver-002",
  },
  {
    id: "ride-003",
    pickupLocation: "222 East 42nd St, New York, NY",
    dropoffLocation: "888 7th Ave, New York, NY",
    pickupTime: "2024-05-02T11:15:00Z",
    status: "in-progress",
    fare: 32.2,
    driverId: "driver-003",
  },
  {
    id: "ride-004",
    pickupLocation: "350 5th Ave, New York, NY",
    dropoffLocation: "30 Rockefeller Plaza, New York, NY",
    pickupTime: "2024-05-01T16:45:00Z",
    status: "completed",
    fare: 15.8,
    driverId: "driver-001",
  },
]

const mockDrivers: Record<string, Driver> = {
  "driver-001": {
    id: "driver-001",
    name: "John Smith",
    photo: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    totalRides: 1243,
    carModel: "Toyota Camry",
    carColor: "Silver",
    licensePlate: "ABC 1234",
    isVerified: true,
    phoneNumber: "+1 (555) 123-4567",
  },
  "driver-002": {
    id: "driver-002",
    name: "Sarah Johnson",
    photo: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    totalRides: 856,
    carModel: "Honda Civic",
    carColor: "Blue",
    licensePlate: "XYZ 9876",
    isVerified: true,
    phoneNumber: "+1 (555) 987-6543",
  },
  "driver-003": {
    id: "driver-003",
    name: "Michael Chen",
    photo: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    totalRides: 512,
    carModel: "Ford Escape",
    carColor: "Black",
    licensePlate: "DEF 5678",
    isVerified: false,
    phoneNumber: "+1 (555) 456-7890",
  },
}

// Mock API functions
export async function getRides(): Promise<Ride[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [...mockRides]
}

export async function getRide(id: string): Promise<Ride | null> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const ride = mockRides.find((r) => r.id === id)
  return ride || null
}

export async function getDriver(id: string): Promise<Driver | null> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockDrivers[id] || null
}

export async function bookRide(data: {
  pickupLocation: string
  dropoffLocation: string
  pickupTime: string
}): Promise<{ success: boolean; rideId?: string; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulate success (90% of the time)
  if (Math.random() > 0.1) {
    const newRide: Ride = {
      id: `ride-${Date.now()}`,
      pickupLocation: data.pickupLocation,
      dropoffLocation: data.dropoffLocation,
      pickupTime: data.pickupTime,
      status: "scheduled",
      fare: Math.floor(Math.random() * 30) + 15, // Random fare between $15-45
      driverId: Object.keys(mockDrivers)[Math.floor(Math.random() * Object.keys(mockDrivers).length)],
    }

    // In a real app, we would add this to the database
    // For this mock, we'll just return the success
    return {
      success: true,
      rideId: newRide.id,
    }
  }

  // Simulate failure
  return {
    success: false,
    error: "No drivers available at this time. Please try again later.",
  }
}

export async function cancelRide(id: string): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate success (95% of the time)
  if (Math.random() > 0.05) {
    return { success: true }
  }

  // Simulate failure
  return {
    success: false,
    error: "Unable to cancel ride at this time. Please try again later.",
  }
}

export async function processPayment(
  details: PaymentDetails,
): Promise<{ success: boolean; error?: string; transactionId?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Validate card number format (simple check)
  if (details.cardNumber.replace(/\s/g, "").length !== 16) {
    return {
      success: false,
      error: "Invalid card number. Please check and try again.",
    }
  }

  // Simulate success (85% of the time)
  if (Math.random() > 0.15) {
    return {
      success: true,
      transactionId: `txn-${Date.now()}`,
    }
  }

  // Simulate failure
  return {
    success: false,
    error: "Payment processing failed. Please try again or use a different payment method.",
  }
}

export async function reportDriver(driverId: string, reason: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Always succeed in the mock
  return { success: true }
}

export function calculateFare(distance: number): number {
  // Base fare + per km rate
  const baseFare = 10
  const perKmRate = 2.5
  return baseFare + distance * perKmRate
}
