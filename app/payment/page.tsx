"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CreditCard, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { processPayment, type PaymentDetails } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [name, setName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean
    message: string
    transactionId?: string
  } | null>(null)

  // Get fare from URL params or use default
  const fare = Number.parseFloat(searchParams.get("fare") || "25.50")
  const serviceFee = fare * 0.1 // 10% service fee
  const tax = (fare + serviceFee) * 0.08 // 8% tax
  const total = fare + serviceFee + tax

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")

    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }

    return digits
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value))
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow up to 3 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 3)
    setCvv(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setPaymentResult(null)

    try {
      const paymentDetails: PaymentDetails = {
        cardNumber: cardNumber.replace(/\s/g, ""),
        expiryDate,
        cvv,
        name,
      }

      const result = await processPayment(paymentDetails)

      if (result.success) {
        setPaymentResult({
          success: true,
          message: "Payment processed successfully!",
          transactionId: result.transactionId,
        })

        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        })
      } else {
        setPaymentResult({
          success: false,
          message: result.error || "Payment processing failed. Please try again.",
        })

        toast({
          variant: "destructive",
          title: "Payment Failed",
          description: result.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      setPaymentResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })

      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Payment</h1>
        <p className="text-muted-foreground mt-2">Complete your payment to confirm your ride</p>
      </div>

      {paymentResult && (
        <Alert variant={paymentResult.success ? "default" : "destructive"} className="mb-6">
          {paymentResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{paymentResult.success ? "Payment Successful" : "Payment Failed"}</AlertTitle>
          <AlertDescription>
            {paymentResult.message}
            {paymentResult.success && paymentResult.transactionId && (
              <p className="mt-2">
                Transaction ID: <span className="font-medium">{paymentResult.transactionId}</span>
              </p>
            )}
            {paymentResult.success && (
              <Button variant="outline" className="mt-4" onClick={() => router.push("/rides")}>
                View My Rides
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your card information to complete the payment</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="pl-10"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      required
                      maxLength={3}
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isProcessing}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="payment-form" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay $${total.toFixed(2)}`
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Fare</div>
                  <div>${fare.toFixed(2)}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Service Fee</div>
                  <div>${serviceFee.toFixed(2)}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Tax</div>
                  <div>${tax.toFixed(2)}</div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <div>Total</div>
                <div>${total.toFixed(2)}</div>
              </div>

              <div className="mt-4 pt-4 border-t text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>Your payment information is secure and encrypted</div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>You will not be charged until you confirm your ride</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
