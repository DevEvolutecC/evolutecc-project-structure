import { LoginForm } from "@/features/auth/components"
import { PageContainer } from "@/components/shared/page-container"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iniciar Sesión | EvolutEcc",
  description: "Accede a tu cuenta para gestionar tus compras",
}

export default function LoginPage() {
  return (
    <PageContainer maxWidth="md" className="py-16">
      <LoginForm />
    </PageContainer>
  )
}
