// Este archivo servirá como "entry point" para nuestros providers
"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query"
import { PropsWithChildren, useEffect } from "react"
import { useThemeStore } from "@/store"

export function Providers({ children }: PropsWithChildren) {
  const { theme } = useThemeStore()

  // Efecto para manejar el cambio de tema
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
