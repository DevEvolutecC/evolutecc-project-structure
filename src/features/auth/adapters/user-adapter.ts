/**
 * Adaptador para transformar la respuesta de la API a un formato utilizable por la aplicación
 */

interface ApiUser {
  id: string
  name: string
  email: string
  role: string
  created_at: string
  updated_at: string
  last_login: string
  status: string
  preferences: {
    notifications: boolean
    theme: string
  }
}

interface AppUser {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  lastLogin: Date | null
  isActive: boolean
  preferences: {
    notifications: boolean
    theme: "light" | "dark" | "system"
  }
}

/**
 * Transforma un usuario de la API al formato de la aplicación
 */
export function userApiToApp(apiUser: ApiUser): AppUser {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    role: apiUser.role === "admin" ? "admin" : "user",
    lastLogin: apiUser.last_login ? new Date(apiUser.last_login) : null,
    isActive: apiUser.status === "active",
    preferences: {
      notifications: apiUser.preferences.notifications,
      theme:
        (apiUser.preferences.theme as "light" | "dark" | "system") || "system",
    },
  }
}
