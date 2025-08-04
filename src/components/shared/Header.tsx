import { Button } from "../ui/button"
import { useTheme } from "@/hooks/use-theme"
import { useAuthStore } from "@/store"
import Link from "next/link"
import { ROUTES } from "@/consts"
import { ShoppingCart, Sun, Moon, User } from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, logout } = useAuthStore()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={ROUTES.HOME} className="text-2xl font-bold">
            EvolutEcc
          </Link>
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.PRODUCTS}
                  className="hover:text-primary transition-colors"
                >
                  Productos
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Link href={ROUTES.CART}>
            <Button variant="ghost" size="icon" aria-label="Carrito de compras">
              <ShoppingCart size={18} />
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link href={ROUTES.PROFILE}>
                <Button variant="ghost" size="icon" aria-label="Perfil">
                  <User size={18} />
                </Button>
              </Link>
              <Button variant="outline" onClick={logout}>
                Salir
              </Button>
            </>
          ) : (
            <Link href={ROUTES.LOGIN}>
              <Button>Iniciar Sesión</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
