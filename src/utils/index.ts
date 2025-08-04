import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de Tailwind y resuelve conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un precio en formato moneda
 */
export function formatPrice(
  price: number,
  options: {
    currency?: "USD" | "EUR" | "MXN"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "MXN", notation = "standard" } = options

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    notation,
  }).format(price)
}

/**
 * Formatea una fecha
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(date instanceof Date ? date : new Date(date))
}
