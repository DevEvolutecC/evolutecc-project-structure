export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.evolutecc.com"

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
}

export const APP_CONFIG = {
  name: "EvolutecC",
  description: "Plataforma de e-commerce para productos tecnológicos",
  version: "1.0.0",
  company: "EvolutEcc",
  logo: "/logo.svg",
  socials: {
    twitter: "https://twitter.com/evolutecc",
    facebook: "https://facebook.com/evolutecc",
    instagram: "https://instagram.com/evolutecc",
  },
}
