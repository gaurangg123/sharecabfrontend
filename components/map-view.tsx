"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { MapPin, Navigation, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface MapViewProps {
  className?: string
  onLocationSelect?: (location: { address: string; lat: number; lng: number }) => void
  initialLocation?: { lat: number; lng: number }
  markers?: Array<{ lat: number; lng: number; type: "pickup" | "dropoff" }>
  showControls?: boolean
  interactive?: boolean
  height?: string
}

export function MapView({
  className,
  onLocationSelect,
  initialLocation = { lat: 28.6139, lng: 77.209 }, // Default to New Delhi
  markers = [],
  showControls = true,
  interactive = true,
  height = "400px",
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(initialLocation)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.")
      return
    }

    setIsLoadingLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ lat: latitude, lng: longitude })
        setIsLoadingLocation(false)

        if (onLocationSelect) {
          // Simulate reverse geocoding
          const mockAddress = "Current Location, New Delhi, India"
          onLocationSelect({ address: mockAddress, lat: latitude, lng: longitude })
        }
      },
      (error) => {
        console.error("Error getting location:", error)
        setIsLoadingLocation(false)
      },
    )
  }

  const handleMapClick = (e: React.MouseEvent) => {
    if (!interactive || !onLocationSelect) return

    // Get click coordinates relative to the map container
    const rect = mapRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Convert to lat/lng (simplified simulation)
    // In a real implementation, this would use the map API's methods
    const lat = currentLocation.lat + (y - rect.height / 2) * 0.0001
    const lng = currentLocation.lng + (x - rect.width / 2) * 0.0001

    // Simulate reverse geocoding to get address
    const mockAddress = "Selected Location, New Delhi, India"

    onLocationSelect({ address: mockAddress, lat, lng })
  }

  return (
    <div className={cn("relative rounded-md overflow-hidden", className)} style={{ height }} ref={mapRef}>
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="flex flex-col items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/map-background.png')",
              filter: "grayscale(0.3)",
            }}
            onClick={interactive ? handleMapClick : undefined}
          />

          {/* Markers */}
          {markers.map((marker, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `${50 + (marker.lng - currentLocation.lng) * 10000}%`,
                top: `${50 + (marker.lat - currentLocation.lat) * 10000}%`,
              }}
            >
              <div className={cn("p-1 rounded-full", marker.type === "pickup" ? "bg-blue-500" : "bg-primary")}>
                <MapPin className={cn("h-6 w-6", marker.type === "pickup" ? "text-white" : "text-white")} />
              </div>
            </div>
          ))}

          {/* Current location marker */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="p-1 rounded-full bg-blue-500 animate-pulse">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>

          {interactive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-background/90 p-2 rounded-md text-sm pointer-events-auto">
                {onLocationSelect ? "Click anywhere on the map to select a location" : "Map view"}
              </div>
            </div>
          )}

          {showControls && (
            <>
              <div className="absolute top-4 right-4 z-10">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-background/90"
                  onClick={getUserLocation}
                  disabled={isLoadingLocation}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  {isLoadingLocation ? "Locating..." : "Current Location"}
                </Button>
              </div>
              <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
                <Button size="icon" variant="outline" className="bg-background/90 h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="bg-background/90 h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
