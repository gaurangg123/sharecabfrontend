"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackButton } from "@/components/back-button"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpValue, setOtpValue] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login successful!",
        description: "Welcome back to ShareCab.",
      })
      router.push("/booking")
    }, 1500)
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Google sign-in successful!",
        description: "Welcome back to ShareCab.",
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
      toast({
        title: "OTP verified successfully!",
        description: "Welcome back to ShareCab.",
      })
      router.push("/booking")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>

      <Card className="w-full max-w-md mx-auto animate-fadeIn">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in to ShareCab</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="otp">OTP</TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="otp">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="identifier">Mobile Number or Email</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input id="identifier" placeholder="Enter mobile or email" className="pl-9" required />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">We'll send a verification code to this number/email</p>
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
                      <p className="text-xs text-muted-foreground">OTP sent to your mobile/email</p>
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
                      "Verify & Sign In"
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
                            description: "Please check your phone/email for the new verification code.",
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
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="mr-2">
              <path
                fill="currentColor"
                d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
              />
            </svg>
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
