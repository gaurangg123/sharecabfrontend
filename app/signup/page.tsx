"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email")

  const handleNextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account created successfully!",
        description: "Welcome to ShareCab. Let's book your first ride.",
      })
      router.push("/booking")
    }, 1500)
  }

  const handleGoogleSignUp = () => {
    setIsLoading(true)

    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account created with Google!",
        description: "Welcome to ShareCab. Let's book your first ride.",
      })
      router.push("/booking")
    }, 1500)
  }

  const handleSendOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate OTP sending delay
    setTimeout(() => {
      setIsLoading(false)
      setOtpSent(true)
      toast({
        title: "OTP sent successfully!",
        description: "Please check your phone/email for the verification code.",
      })
    }, 1500)
  }

  const handleVerifyOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate OTP verification delay
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
      toast({
        title: "OTP verified successfully!",
        description: "Please complete your profile setup.",
      })
    }, 1500)
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
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input id="email" type="email" placeholder="name@example.com" className="pl-9" required />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" required />
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
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number</Label>
                      <div className="relative">
                        <Input id="phone" type="tel" placeholder="+91 98765 43210" className="pl-9" required />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                        </div>
                      </div>
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
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        className="text-center text-lg tracking-widest"
                        maxLength={6}
                        required
                      />
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
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  disabled={signupMethod === "phone"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Home Address</Label>
                <Input id="address" placeholder="123 Main St" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workAddress">Work/Office Address</Label>
                <Input id="workAddress" placeholder="456 Office Blvd" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" placeholder="Emergency contact name & phone" />
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

