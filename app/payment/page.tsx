"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function PaymentPage() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment successful!",
        description: "Your subscription is now active.",
      })
    }, 2000)
  }

  return (
    <div className="container max-w-4xl py-10 px-4 md:px-6 space-y-8">
      <div className="flex items-center">
        <Link href="/subscription-plans" className="flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plans
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">Complete your subscription payment</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="card"
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                onValueChange={setPaymentMethod}
              >
                <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                  <RadioGroupItem value="card" id="card" className="absolute right-2 top-2" />
                  <CreditCard className="mb-2 h-6 w-6" />
                  <div className="font-medium">Card</div>
                </div>
                <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                  <RadioGroupItem value="upi" id="upi" className="absolute right-2 top-2" />
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
                    className="mb-2"
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
                  <div className="font-medium">UPI</div>
                </div>
                <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                  <RadioGroupItem value="wallet" id="wallet" className="absolute right-2 top-2" />
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
                    className="mb-2"
                  >
                    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                  <div className="font-medium">Wallet</div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {paymentMethod === "card" && (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
                <CardDescription>Enter your card information securely</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input id="card-name" placeholder="Name on card" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM / YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing-address">Billing Address</Label>
                    <Input id="billing-address" placeholder="Street address" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input id="postal-code" placeholder="Postal code" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "upi" && (
            <Card>
              <CardHeader>
                <CardTitle>UPI Details</CardTitle>
                <CardDescription>Enter your UPI ID to make the payment</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input id="upi-id" placeholder="yourname@okbank" required />
                    <p className="text-xs text-muted-foreground">Enter your UPI ID in the format username@bankname</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "wallet" && (
            <Card>
              <CardHeader>
                <CardTitle>Digital Wallet</CardTitle>
                <CardDescription>Choose your wallet provider</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
                  <RadioGroup defaultValue="paytm" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                      <RadioGroupItem value="paytm" id="paytm" className="absolute right-2 top-2" />
                      <div className="font-medium">Paytm</div>
                    </div>
                    <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                      <RadioGroupItem value="gpay" id="gpay" className="absolute right-2 top-2" />
                      <div className="font-medium">Google Pay</div>
                    </div>
                    <div className="relative rounded-lg border p-4 flex flex-col items-center text-center hover:border-primary">
                      <RadioGroupItem value="phonepe" id="phonepe" className="absolute right-2 top-2" />
                      <div className="font-medium">PhonePe</div>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2 pt-4">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" placeholder="Your registered mobile number" required />
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">Weekly Plus</div>
                  <div className="text-sm text-muted-foreground">10 rides per week</div>
                </div>
                <div className="font-medium">$89.99</div>
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Subtotal</div>
                  <div>$89.99</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Service Fee</div>
                  <div>$5.00</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Tax</div>
                  <div>$7.60</div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <div>Total</div>
                <div>$102.59</div>
              </div>

              <div className="mt-4 pt-4 border-t text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>Your subscription will auto-renew weekly</div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>Cancel anytime with no cancellation fee</div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>24/7 customer support</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" form="payment-form" type="submit" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                  </>
                ) : (
                  "Complete Payment"
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mb-2">
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
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secure Payment
            </div>
            <p>All payments are secured with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}

