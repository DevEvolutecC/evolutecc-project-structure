"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ROUTES } from "@/consts"

// Esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

// Tipos inferidos del schema
type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true)

      // Simulación de login - En producción, esto sería una llamada a la API
      setTimeout(() => {
        // Simular respuesta exitosa
        login(
          {
            id: "1",
            name: "Usuario Demo",
            email: data.email,
            role: "user",
          },
          "token-demo-12345"
        )

        router.push(ROUTES.HOME)
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error de login:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-card rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        <p className="text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className="w-full rounded-md border p-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            className="w-full rounded-md border p-2"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Iniciar Sesión
        </Button>
      </form>

      <div className="text-center text-sm">
        <p>
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-primary hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}
