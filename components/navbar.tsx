"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CabIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const shouldHideNavbar = pathname === "/login" || pathname === "/signup"

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    if (isMounted) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isMounted, handleScroll])

  if (!isMounted) return null

  if (shouldHideNavbar) return null

  // Updated navigation links with correct paths
  const navLinks = [
    { href: "/", label: "Home", exact: true },
    { href: "/booking", label: "Book Ride" },
    { href: "/rides", label: "My Rides" },
    { href: "/subscription-plans", label: "Plans" },
    { href: "/profile", label: "Profile" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" aria-label="ShareCab Home">
            <CabIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-bold text-xl">ShareCab</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  (link.exact ? pathname === link.href : pathname.startsWith(link.href))
                    ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : "text-muted-foreground",
                )}
                aria-current={
                  (link.exact ? pathname === link.href : pathname.startsWith(link.href)) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                      (link.exact ? pathname === link.href : pathname.startsWith(link.href))
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground",
                    )}
                    aria-current={
                      (link.exact ? pathname === link.href : pathname.startsWith(link.href)) ? "page" : undefined
                    }
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
