"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { get } from "@/services/fetch"
import { API_URL } from "@/consts"
import { formatPrice } from "@/utils"
import { PageContainer } from "@/components/shared/page-container"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Definición de tipos para los productos
interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  inStock: boolean
}

export function ProductsList() {
  const [category, setCategory] = useState<string | null>(null)

  // Consulta para obtener los productos
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", category],
    queryFn: () =>
      get<Product[]>(
        `${API_URL}/products${category ? `?category=${category}` : ""}`
      ),
  })

  // Lista de categorías
  const categories = ["Todos", "Electrónicos", "Ropa", "Hogar", "Deportes"]

  // Manejar el cambio de categoría
  const handleCategoryChange = (newCategory: string | null) => {
    setCategory(newCategory)
  }

  return (
    <PageContainer className="py-10">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>

      {/* Filtro de categorías */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={
              category === (cat === "Todos" ? null : cat)
                ? "default"
                : "outline"
            }
            onClick={() => handleCategoryChange(cat === "Todos" ? null : cat)}
            className="mb-2"
          >
            {cat}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p className="text-lg">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-500 rounded-md">
          <p>Error al cargar los productos. Intente nuevamente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Como no tenemos datos reales, creamos algunos de ejemplo */}
          {(data?.data || sampleProducts).map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
            >
              <div className="h-48 bg-gray-200 relative">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Agotado
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    {formatPrice(product.price)}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm">Ver detalles</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  )
}

// Datos de ejemplo para mostrar cuando no hay conexión a la API
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Ultra Pro",
    description:
      "Laptop de última generación con procesador de alto rendimiento",
    price: 24999.99,
    imageUrl: "",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "2",
    name: "Smartphone X",
    description:
      "Smartphone con cámara de alta resolución y batería de larga duración",
    price: 12999.99,
    imageUrl: "",
    category: "Electrónicos",
    inStock: true,
  },
  {
    id: "3",
    name: "Zapatillas Deportivas",
    description: "Zapatillas ideales para correr y hacer ejercicio",
    price: 1499.99,
    imageUrl: "",
    category: "Deportes",
    inStock: false,
  },
  {
    id: "4",
    name: "Camisa Casual",
    description: "Camisa de algodón para uso diario",
    price: 699.99,
    imageUrl: "",
    category: "Ropa",
    inStock: true,
  },
  {
    id: "5",
    name: "Juego de Sartenes",
    description: "Set de sartenes antiadherentes para cocina",
    price: 1899.99,
    imageUrl: "",
    category: "Hogar",
    inStock: true,
  },
  {
    id: "6",
    name: "Audífonos Inalámbricos",
    description: "Audífonos con cancelación de ruido y gran calidad de sonido",
    price: 2499.99,
    imageUrl: "",
    category: "Electrónicos",
    inStock: true,
  },
]
