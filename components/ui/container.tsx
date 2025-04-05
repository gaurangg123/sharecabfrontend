import type React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  fluid?: boolean
}

export function Container({ children, className, size = "lg", fluid = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        fluid ? "container-fluid" : "container mx-auto w-full px-4 sm:px-6",
        {
          "max-w-screen-sm": size === "sm" && !fluid,
          "max-w-screen-md": size === "md" && !fluid,
          "max-w-screen-lg": size === "lg" && !fluid,
          "max-w-screen-xl": size === "xl" && !fluid,
          "max-w-none": size === "full" || fluid,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

