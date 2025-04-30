import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: boolean
}

export function ResponsiveContainer({ children, className, size = "lg", padding = true }: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto",
        {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "max-w-full": size === "full",
          "px-4 sm:px-6 lg:px-8": padding,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
