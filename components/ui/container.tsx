import type React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  fluid?: boolean
  centered?: boolean
}

export function Container({
  children,
  className,
  size = "lg",
  fluid = false,
  centered = true,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8",
        {
          "mx-auto": !fluid && centered,
          "max-w-screen-sm": size === "sm" && !fluid,
          "max-w-screen-md": size === "md" && !fluid,
          "max-w-screen-lg": size === "lg" && !fluid,
          "max-w-screen-xl": size === "xl" && !fluid,
          "max-w-none": size === "full" || fluid,
          "mx-0": !centered,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
