"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Star, Shield, Phone, Flag, MessageSquare, ChevronLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { getDriver, reportDriver, type Driver } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"

export default function DriverProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [driver, setDriver] = useState<Driver | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reportReason, setReportReason] = useState("unprofessional")
  const [reportDetails, setReportDetails] = useState("")
  const [isReporting, setIsReporting] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)

  useEffect(() => {
    async function loadDriver() {
      if (!params.id) return

      try {
        const driverId = params.id as string
        const data = await getDriver(driverId)

        if (data) {
          setDriver(data)
          setError(null)
        } else {
          setError("Driver not found. Please check the driver ID and try again.")
        }
      } catch (err) {
        setError("Failed to load driver information. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadDriver()
  }, [params.id])

  const handleReportDriver = async () => {
    if (!driver) return

    setIsReporting(true)

    try {
      const result = await reportDriver(driver.id, `${reportReason}: ${reportDetails}`)

      if (result.success) {
        toast({
          title: "Report Submitted",
          description: "Thank you for your feedback. We'll review your report shortly.",
        })
        setReportDialogOpen(false)
        setReportDetails("")
      } else {
        toast({
          variant: "destructive",
          title: "Report Failed",
          description: "Failed to submit your report. Please try again.",
        })
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsReporting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))
  }

  return (
    <div className="container max-w-2xl py-10">
      <Button variant="ghost" className="mb-6 pl-0 flex items-center" onClick={() => router.back()}>
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back
      </Button>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardFooter>
        </Card>
      ) : driver ? (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image src={driver.photo || "/placeholder.svg"} alt={driver.name} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{driver.name}</CardTitle>
                  {driver.isVerified && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex mr-1">{renderStars(driver.rating)}</div>
                  <span className="text-sm font-medium">{driver.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({driver.totalRides} rides)</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Vehicle Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Model:</span> {driver.carModel}
                </div>
                <div>
                  <span className="text-muted-foreground">Color:</span> {driver.carColor}
                </div>
                <div>
                  <span className="text-muted-foreground">License Plate:</span> {driver.licensePlate}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Contact Information</h3>
              <div className="text-sm">
                <div>
                  <span className="text-muted-foreground">Phone:</span> {driver.phoneNumber}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button className="w-full sm:w-auto" asChild>
              <a href={`tel:${driver.phoneNumber}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call Driver
              </a>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <a href={`sms:${driver.phoneNumber}`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Driver
              </a>
            </Button>
            <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Flag className="mr-2 h-4 w-4" />
                  Report Driver
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Driver</DialogTitle>
                  <DialogDescription>
                    Please provide details about your concern with this driver. Our team will review your report and
                    take appropriate action.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Reason for Report</Label>
                    <RadioGroup
                      defaultValue="unprofessional"
                      onValueChange={setReportReason}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unprofessional" id="unprofessional" />
                        <Label htmlFor="unprofessional">Unprofessional behavior</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="safety" id="safety" />
                        <Label htmlFor="safety">Safety concerns</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cleanliness" id="cleanliness" />
                        <Label htmlFor="cleanliness">Vehicle cleanliness</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details">Details</Label>
                    <Textarea
                      id="details"
                      placeholder="Please provide more information about your report..."
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReportDriver} disabled={isReporting || !reportDetails.trim()}>
                    {isReporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Report"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  )
}
