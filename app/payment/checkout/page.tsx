"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Check, Loader2, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Container } from "@/components/ui/container"
import { z } from "zod"

// Define validation schemas
const cardNumberSchema = z
  .string()
  .regex(/^[0-9]{16}$/, "Card number must be 16 digits")
  .or(z.string().regex(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/, "Card number format should be XXXX XXXX XXXX XXXX"))

const expiryDateSchema = z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format")

const cvvSchema = z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")

const upiIdSchema = z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, "Please enter a valid UPI ID")

type FormErrors = {
  cardName?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  billingAddress?: string
  city?: string
  postalCode?: string
  country?: string
  upiId?: string
  mobileNumber?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [errors, setErrors] = useState<FormErrors>({})

  // Get plan details from URL params or use defaults
  const planName = searchParams.get("plan") || "Weekly Plus"
  const planPrice = searchParams.get("price") || "3,499"
  const serviceFee = "350"
  const totalPrice = calculateTotal(planPrice, serviceFee)

  // Form data state
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    postalCode: "",
    country: "in",
    upiId: "",
    mobileNumber: "",
    walletType: "paytm",
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      setFormData((prev) => ({ ...prev, [name]: formatted }))
    }
    // Format expiry date
    else if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }
      setFormData((prev) => ({ ...prev, [name]: formatted }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Calculate total price
  function calculateTotal(price: string, fee: string): string {
    const priceNum = Number.parseFloat(price.replace(/,/g, ""))
    const feeNum = Number.parseFloat(fee.replace(/,/g, ""))
    const total = priceNum + feeNum
    return total.toLocaleString()
  }

  // Validate form fields
  const validateField = (field: string, value: string): string | undefined => {
    try {
      switch (field) {
        case "cardName":
          if (!value.trim()) return "Cardholder name is required"
          return undefined
        case "cardNumber":
          if (!value.trim()) return "Card number is required"
          cardNumberSchema.parse(value)
          return undefined
        case "expiryDate":
          if (!value.trim()) return "Expiry date is required"
          expiryDateSchema.parse(value)
          // Check if card is expired
          const [month, year] = value.split("/")
          const expiryDate = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
          if (expiryDate < new Date()) return "Card has expired"
          return undefined
        case "cvv":
          if (!value.trim()) return "CVV is required"
          cvvSchema.parse(value)
          return undefined
        case "billingAddress":
          if (!value.trim()) return "Billing address is required"
          return undefined
        case "city":
          if (!value.trim()) return "City is required"
          return undefined
        case "postalCode":
          if (!value.trim()) return "Postal code is required"
          return undefined
        case "country":
          if (!value.trim()) return "Country is required"
          return undefined
        case "upiId":
          if (!value.trim()) return "UPI ID is required"
          upiIdSchema.parse(value)
          return undefined
        case "mobileNumber":
          if (!value.trim()) return "Mobile number is required"
          if (!/^\+?[0-9\s-()]{10,15}$/.test(value)) return "Please enter a valid mobile number"
          return undefined
        default:
          return undefined
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message
      }
      return "Invalid input"
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (paymentMethod === "card") {
      newErrors.cardName = validateField("cardName", formData.cardName)
      newErrors.cardNumber = validateField("cardNumber", formData.cardNumber)
      newErrors.expiryDate = validateField("expiryDate", formData.expiryDate)
      newErrors.cvv = validateField("cvv", formData.cvv)
      newErrors.billingAddress = validateField("billingAddress", formData.billingAddress)
      newErrors.city = validateField("city", formData.city)
      newErrors.postalCode = validateField("postalCode", formData.postalCode)
      newErrors.country = validateField("country", formData.country)
    } else if (paymentMethod === "upi") {
      newErrors.upiId = validateField("upiId", formData.upiId)
    } else if (paymentMethod === "wallet") {
      newErrors.mobileNumber = validateField("mobileNumber", formData.mobileNumber)
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment successful!",
        description: "Your subscription is now active.",
      })

      router.push("/subscription-plans/success")
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Container className="max-w-4xl py-10 px-4 md:px-6 space-y-8">
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
                value={paymentMethod}
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
                    <Input
                      id="card-name"
                      name="cardName"
                      placeholder="Name on card"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.cardName}
                      aria-describedby={errors.cardName ? "card-name-error" : undefined}
                      required
                    />
                    {errors.cardName && (
                      <p id="card-name-error" className="text-sm text-destructive mt-1">
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="card-number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        aria-invalid={!!errors.cardNumber}
                        aria-describedby={errors.cardNumber ? "card-number-error" : undefined}
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    {errors.cardNumber && (
                      <p id="card-number-error" className="text-sm text-destructive mt-1">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength={5}
                        aria-invalid={!!errors.expiryDate}
                        aria-describedby={errors.expiryDate ? "expiry-error" : undefined}
                        required
                      />
                      {errors.expiryDate && (
                        <p id="expiry-error" className="text-sm text-destructive mt-1">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        type="password"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={4}
                        aria-invalid={!!errors.cvv}
                        aria-describedby={errors.cvv ? "cvv-error" : undefined}
                        required
                      />
                      {errors.cvv && (
                        <p id="cvv-error" className="text-sm text-destructive mt-1">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing-address">Billing Address</Label>
                    <Input
                      id="billing-address"
                      name="billingAddress"
                      placeholder="Street address"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.billingAddress}
                      aria-describedby={errors.billingAddress ? "billing-address-error" : undefined}
                      required
                    />
                    {errors.billingAddress && (
                      <p id="billing-address-error" className="text-sm text-destructive mt-1">
                        {errors.billingAddress}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? "city-error" : undefined}
                        required
                      />
                      {errors.city && (
                        <p id="city-error" className="text-sm text-destructive mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input
                        id="postal-code"
                        name="postalCode"
                        placeholder="Postal code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.postalCode}
                        aria-describedby={errors.postalCode ? "postal-code-error" : undefined}
                        required
                      />
                      {errors.postalCode && (
                        <p id="postal-code-error" className="text-sm text-destructive mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p id="country-error" className="text-sm text-destructive mt-1">
                        {errors.country}
                      </p>
                    )}
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
                    <Input
                      id="upi-id"
                      name="upiId"
                      placeholder="yourname@okbank"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.upiId}
                      aria-describedby={errors.upiId ? "upi-id-error" : undefined}
                      required
                    />
                    {errors.upiId && (
                      <p id="upi-id-error" className="text-sm text-destructive mt-1">
                        {errors.upiId}
                      </p>
                    )}
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
                  <RadioGroup
                    defaultValue="paytm"
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    value={formData.walletType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, walletType: value }))}
                  >
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
                    <Input
                      id="mobile"
                      name="mobileNumber"
                      placeholder="Your registered mobile number"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.mobileNumber}
                      aria-describedby={errors.mobileNumber ? "mobile-error" : undefined}
                      required
                    />
                    {errors.mobileNumber && (
                      <p id="mobile-error" className="text-sm text-destructive mt-1">
                        {errors.mobileNumber}
                      </p>
                    )}
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
                  <div className="font-medium">{planName}</div>
                  <div className="text-sm text-muted-foreground">10 rides per week</div>
                </div>
                <div className="font-medium">₹{planPrice}</div>
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Subtotal</div>
                  <div>₹{planPrice}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-muted-foreground">Service Fee</div>
                  <div>₹{serviceFee}</div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <div>Total</div>
                <div>₹{totalPrice}</div>
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
              <Shield className="h-4 w-4" />
              Secure Payment
            </div>
            <p>All payments are secured with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </Container>
  )
}
