import React from "react"
import { cn } from "@/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  withPadding?: boolean
}

const maxWidthClasses = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
}

export function PageContainer({
  children,
  className,
  maxWidth = "full",
  withPadding = true,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth],
        withPadding && "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  )
}
