import { API_URL } from "@/consts"
import { post } from "@/services/fetch"

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: {
    id: string
    name: string
    email: string
    role: "admin" | "user"
  }
  token: string
}

/**
 * Servicio para iniciar sesión en la aplicación
 * Realiza una petición POST al endpoint de login con las credenciales
 */
export function login(credentials: LoginCredentials) {
  return post<LoginResponse>(`${API_URL}/auth/login`, {
    body: credentials,
  })
}

/**
 * Servicio para registrar un nuevo usuario
 */
export function register(data: {
  name: string
  email: string
  password: string
}) {
  return post<LoginResponse>(`${API_URL}/auth/register`, {
    body: data,
  })
}

/**
 * Servicio para cerrar sesión
 */
export function logout() {
  return post<{ success: boolean }>(`${API_URL}/auth/logout`, {})
}
