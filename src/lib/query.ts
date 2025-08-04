import { QueryClient } from "@tanstack/react-query"

// Crear una instancia del cliente de React Query con configuración personalizada
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      gcTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
