"use client"

import { useAuthStore } from "@/store"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/consts"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

/**
 * Componente que protege rutas que requieren autenticación
 * Si el usuario no está autenticado, lo redirige a la página de login
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN)
    }
  }, [isAuthenticated, router])

  // Si no está autenticado, no renderizamos nada (ya que se redirigirá)
  if (!isAuthenticated) {
    return null
  }

  // Si está autenticado, renderizamos los children
  return <>{children}</>
}
