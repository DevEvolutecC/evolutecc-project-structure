import { useAuthStore } from "@/store"

/**
 * Obtiene el token de autenticación del store
 * @returns El token de autenticación o null si no hay sesión
 */
export function getToken(): string | null {
  const token = useAuthStore.getState().token
  return token
}

/**
 * Verifica si el token actual es válido
 * @returns true si el token es válido, false en caso contrario
 */
export function isTokenValid(): boolean {
  const token = getToken()

  if (!token) {
    return false
  }

  // En un caso real, aquí verificaríamos la validez del token
  // Por ejemplo, decodificando un JWT y verificando la fecha de expiración

  return true
}
