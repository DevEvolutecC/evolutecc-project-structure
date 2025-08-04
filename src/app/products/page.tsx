import { ProductsList } from "@/features/products/components/products-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Productos | EvolutEcc",
  description: "Explora nuestra amplia selección de productos",
}

export default function ProductsPage() {
  return <ProductsList />
}
