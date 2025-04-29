"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, Check } from "lucide-react"

interface WhatsAppUpdatesProps {
  className?: string
}

export function WhatsAppUpdates({ className }: WhatsAppUpdatesProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [consent, setConsent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!consent) {
      setError("Please provide consent to receive WhatsApp updates")
      return
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      setPhoneNumber("")
      setConsent(false)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      setError("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center mb-4">
        <MessageSquare className="h-6 w-6 text-green-600 mr-2" />
        <h3 className="text-xl font-semibold">WhatsApp Updates</h3>
      </div>

      {isSuccess ? (
        <div className="bg-green-50 p-4 rounded-md flex items-center text-green-700 mb-4">
          <Check className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>Successfully subscribed to WhatsApp updates!</p>
        </div>
      ) : (
        <p className="text-gray-600 mb-4">
          Get real-time ride updates, receipts, and special offers directly on WhatsApp.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
          <Input
            id="whatsapp-number"
            type="tel"
            placeholder="+91 9876543210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex items-start mb-4">
          <Checkbox
            id="consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="consent" className="ml-2 text-sm text-gray-600">
            I consent to receive ride updates, receipts, and promotional messages via WhatsApp. Standard message rates
            may apply.
          </Label>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
          {isSubmitting ? "Subscribing..." : "Subscribe for Updates"}
        </Button>
      </form>
    </div>
  )
}
