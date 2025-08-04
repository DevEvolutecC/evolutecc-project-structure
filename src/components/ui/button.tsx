import * as React from "react"
import { cn } from "@/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline:
        "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
      link: "text-blue-500 underline-offset-4 hover:underline",
      destructive: "bg-red-500 text-white hover:bg-red-600",
    }

    const sizes = {
      default: "h-10 px-4 py-2 rounded-md",
      sm: "h-8 px-3 py-1 rounded-md text-sm",
      lg: "h-12 px-6 py-3 rounded-md text-lg",
      icon: "h-10 w-10 rounded-full p-0",
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "opacity-70 pointer-events-none",
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
