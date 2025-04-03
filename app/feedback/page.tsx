"use client"

import { useState } from "react"
import { Loader2, Send, ThumbsDown, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function FeedbackPage() {
  const { toast } = useToast()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please provide a rating",
        description: "Your rating helps us improve our service.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback.",
      })

      // Reset form
      setRating(0)
      setComment("")
    }, 1500)
  }

  return (
    <div className="container max-w-4xl py-10 px-4 md:px-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ride Feedback</h1>
        <p className="text-muted-foreground">Your feedback helps us improve our service</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trip Summary</CardTitle>
          <CardDescription>Your recent ride details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Date & Time</div>
                <div className="font-medium">Today, 9:00 AM</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Pickup Location</div>
                <div className="font-medium">123 Main Street, New York</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Drop-off Location</div>
                <div className="font-medium">456 Broadway, New York</div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Driver</div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Driver" />
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">Daniel Cooper</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Vehicle</div>
                <div className="font-medium">Toyota Camry · ABC 123</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Trip Fare</div>
                <div className="font-medium">$12.99</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rate Your Experience</CardTitle>
          <CardDescription>Let us know how your ride was</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="inline-block" onClick={() => handleRatingChange(value)}>
                    <input
                      type="radio"
                      id={`star${value}`}
                      name="rating"
                      value={value}
                      checked={rating === value}
                      onChange={() => {}}
                    />
                    <label htmlFor={`star${value}`}>★</label>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {rating > 0 ? `You rated this ride ${rating} out of 5 stars` : "Select a rating"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Card className="cursor-pointer hover:border-primary transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <ThumbsUp className="h-8 w-8 mb-2" />
                  <div className="font-medium text-center">What went well?</div>
                  <div className="text-xs text-muted-foreground text-center mt-1">Select all that apply</div>
                  <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-center">Clean car</div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-center">On time</div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-center">Safe driving</div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs text-center">Courteous</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-primary transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <ThumbsDown className="h-8 w-8 mb-2" />
                  <div className="font-medium text-center">What could be better?</div>
                  <div className="text-xs text-muted-foreground text-center mt-1">Select all that apply</div>
                  <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                    <div className="rounded-full bg-muted px-3 py-1 text-xs text-center">Cleanliness</div>
                    <div className="rounded-full bg-muted px-3 py-1 text-xs text-center">Late pickup</div>
                    <div className="rounded-full bg-muted px-3 py-1 text-xs text-center">Route taken</div>
                    <div className="rounded-full bg-muted px-3 py-1 text-xs text-center">Communication</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2 mt-6">
              <div className="font-medium">Additional Comments</div>
              <Textarea
                placeholder="Share more details about your experience..."
                className="min-h-32"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Feedback
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Submit Feedback
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

