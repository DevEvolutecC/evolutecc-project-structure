import { useQuery, useMutation } from "@tanstack/react-query"
import { login, logout } from "../services/login"
import { useAuthStore } from "@/store"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/consts"

interface LoginCredentials {
  email: string
  password: string
}

/**
 * Hook personalizado para gestionar la autenticación
 */
export function useAuth() {
  const router = useRouter()
  const {
    login: setAuth,
    logout: clearAuth,
    isAuthenticated,
    user,
  } = useAuthStore()

  // Mutación para el login
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token)
      router.push(ROUTES.HOME)
    },
  })

  // Mutación para el logout
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      clearAuth()
      router.push(ROUTES.LOGIN)
    },
    onError: () => {
      // Incluso si hay un error en la API, limpiamos el estado local
      clearAuth()
      router.push(ROUTES.LOGIN)
    },
  })

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isAuthenticated,
    user,
  }
}
