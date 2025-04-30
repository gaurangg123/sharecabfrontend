"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Mail, Phone, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { z } from "zod"

// Define validation schemas
const emailSchema = z.string().email("Please enter a valid email address")
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")

const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .regex(/^\+?[0-9\s-()]+$/, "Please enter a valid phone number")

type FormErrors = {
  name?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  otp?: string
}

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    homeAddress: "",
    workAddress: "",
    emergencyContact: "",
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Validate form fields
  const validateField = (field: string, value: string): string | undefined => {
    try {
      switch (field) {
        case "name":
          if (!value.trim()) return "Name is required"
          if (value.trim().length < 2) return "Name must be at least 2 characters"
          return undefined
        case "email":
          if (!value.trim()) return "Email is required"
          emailSchema.parse(value)
          return undefined
        case "phone":
          if (!value.trim()) return "Phone number is required"
          phoneSchema.parse(value)
          return undefined
        case "password":
          if (!value) return "Password is required"
          passwordSchema.parse(value)
          return undefined
        case "confirmPassword":
          if (!value) return "Please confirm your password"
          if (value !== formData.password) return "Passwords do not match"
          return undefined
        case "otp":
          if (!value) return "OTP is required"
          if (value.length !== 6) return "OTP must be 6 digits"
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

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}

    if (signupMethod === "email") {
      newErrors.name = validateField("name", formData.name)
      newErrors.email = validateField("email", formData.email)
      newErrors.password = validateField("password", formData.password)
      newErrors.confirmPassword = validateField("confirmPassword", formData.confirmPassword)
    } else {
      newErrors.name = validateField("name", formData.name)
      newErrors.phone = validateField("phone", formData.phone)
      if (otpSent) {
        if (!otpValue) newErrors.otp = "OTP is required"
        else if (otpValue.length !== 6) newErrors.otp = "OTP must be 6 digits"
      }
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleNextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validateStep1()) {
      setStep(2)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validate step 2 fields if needed
    // For now, we'll just proceed with submission

    setIsLoading(true)

    try {
      // Simulate registration delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Account created successfully!",
        description: "Welcome to ShareCab. Let's book your first ride.",
      })

      router.push("/booking")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)

    try {
      // Simulate OAuth authentication
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Account created with Google!",
        description: "Welcome to ShareCab. Let's book your first ride.",
      })

      router.push("/booking")
    } catch (error) {
      toast({
        title: "Google sign-in failed",
        description: "There was an error with Google authentication. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validate phone number
    const phoneError = validateField("phone", formData.phone)
    if (phoneError) {
      setErrors({ phone: phoneError })
      return
    }

    setIsLoading(true)

    try {
      // Simulate OTP sending delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setOtpSent(true)
      toast({
        title: "OTP sent successfully!",
        description: "Please check your phone for the verification code.",
      })
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "There was an error sending the verification code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validate OTP
    if (!otpValue) {
      setErrors({ otp: "OTP is required" })
      return
    }

    if (otpValue.length !== 6) {
      setErrors({ otp: "OTP must be 6 digits" })
      return
    }

    setIsLoading(true)

    try {
      // Simulate OTP verification delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStep(2)
      toast({
        title: "OTP verified successfully!",
        description: "Please complete your profile setup.",
      })
    } catch (error) {
      toast({
        title: "OTP verification failed",
        description: "The verification code is invalid or has expired. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md mx-auto animate-fadeIn">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            {step === 1 ? "Enter your information to create an account" : "Complete your profile setup"}
          </CardDescription>
          <div className="flex items-center justify-center space-x-2 pt-2">
            <div className={`flex h-2 w-2/5 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`}></div>
            <div className={`flex h-2 w-2/5 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <Tabs
              defaultValue="email"
              className="w-full"
              onValueChange={(value) => setSignupMethod(value as "email" | "phone")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      required
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-9"
                        value={formData.email}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        required
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.password && (
                      <p id="password-error" className="text-sm text-destructive mt-1">
                        {errors.password}
                      </p>
                    )}
                    <div className="text-xs text-muted-foreground">
                      Password must be at least 8 characters and include uppercase, lowercase, and numbers
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirm-password-error" className="text-sm text-destructive mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        required
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-destructive mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number</Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="pl-9"
                          value={formData.phone}
                          onChange={handleInputChange}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          required
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Phone className="h-4 w-4" aria-hidden="true" />
                        </div>
                      </div>
                      {errors.phone && (
                        <p id="phone-error" className="text-sm text-destructive mt-1">
                          {errors.phone}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">We'll send a verification code to this number</p>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending OTP
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        name="otp"
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, ""))}
                        className="text-center text-lg tracking-widest"
                        maxLength={6}
                        inputMode="numeric"
                        aria-invalid={!!errors.otp}
                        aria-describedby={errors.otp ? "otp-error" : undefined}
                        required
                      />
                      {errors.otp && (
                        <p id="otp-error" className="text-sm text-destructive mt-1">
                          {errors.otp}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">OTP sent to your mobile</p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-xs"
                          onClick={() => setOtpSent(false)}
                          type="button"
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying
                        </>
                      ) : (
                        "Verify & Continue"
                      )}
                    </Button>
                    <div className="text-center">
                      <Button
                        variant="link"
                        className="text-xs"
                        onClick={() => {
                          setIsLoading(true)
                          setTimeout(() => {
                            setIsLoading(false)
                            toast({
                              title: "OTP resent successfully!",
                              description: "Please check your phone for the new verification code.",
                            })
                          }, 1000)
                        }}
                        disabled={isLoading}
                        type="button"
                      >
                        Didn't receive OTP? Resend
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="mr-2">
                  <path
                    fill="currentColor"
                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                  />
                </svg>
                Google
              </Button>
            </Tabs>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number {signupMethod === "phone" && "(Verified)"}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={signupMethod === "phone"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeAddress">Home Address</Label>
                <Input
                  id="homeAddress"
                  name="homeAddress"
                  placeholder="123 Main St"
                  value={formData.homeAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workAddress">Work/Office Address</Label>
                <Input
                  id="workAddress"
                  name="workAddress"
                  placeholder="456 Office Blvd"
                  value={formData.workAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  placeholder="Emergency contact name & phone"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(1)} disabled={isLoading}>
                Back to previous step
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
