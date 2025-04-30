import Link from "next/link"
import { CabIcon } from "@/components/icons"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

export function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <CabIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="font-bold text-xl">ShareCab</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A subscription-based shared cab service for your daily commute
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-sm text-muted-foreground hover:text-primary">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com/sharecab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/sharecab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/sharecab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShareCab. All rights reserved.</p>
        </div>
      </ResponsiveContainer>
    </footer>
  )
}
