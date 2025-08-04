import { Response as ApiResponse } from "../models/response"

interface RequestOptions {
  headers?: HeadersInit
  timeout?: number
  cache?: RequestCache
}

interface RequestWithBodyOptions extends RequestOptions {
  body?: unknown
}

// Configuración por defecto
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

/**
 * Maneja la respuesta de la petición
 */
const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorText = await response.text()
    throw {
      status: response.status,
      message: response.statusText || "Error en la petición",
      data: errorText,
    }
  }

  try {
    const data = await response.json()
    return {
      status: response.status,
      message: response.statusText || "OK",
      data,
    }
  } catch {
    throw {
      status: response.status,
      message: "Error al procesar la respuesta",
      data: null,
    }
  }
}

/**
 * Maneja los errores de la petición
 */
const handleError = (error: unknown) => {
  console.error("Error en la petición:", error)
  const errorObj = error as {
    status?: number
    message?: string
    data?: unknown
  }
  return Promise.reject({
    status: errorObj.status || 500,
    message: errorObj.message || "Error desconocido",
    data: errorObj.data || null,
  })
}

/**
 * Crea el timeout para cancelar la petición si tarda demasiado
 */
const createTimeout = <T>(
  ms: number,
  promise: Promise<ApiResponse<T>>
): Promise<ApiResponse<T>> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject({
        status: 408,
        message: "Tiempo de espera agotado",
        data: null,
      })
    }, ms)

    promise.then(
      (result) => {
        clearTimeout(timeoutId)
        resolve(result)
      },
      (error) => {
        clearTimeout(timeoutId)
        reject(error)
      }
    )
  })
}

/**
 * Método GET para obtener recursos
 */
export const get = <T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const { headers = {}, timeout = 30000, cache = "default" } = options

  const fetchPromise = fetch(url, {
    method: "GET",
    headers: { ...DEFAULT_HEADERS, ...headers },
    cache,
  })
    .then((response) => handleResponse<T>(response))
    .catch(handleError)

  return timeout ? createTimeout(timeout, fetchPromise) : fetchPromise
}

/**
 * Método POST para crear recursos
 */
export const post = <T>(
  url: string,
  options: RequestWithBodyOptions = {}
): Promise<ApiResponse<T>> => {
  const { body, headers = {}, timeout = 30000 } = options

  const fetchPromise = fetch(url, {
    method: "POST",
    headers: { ...DEFAULT_HEADERS, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then((response) => handleResponse<T>(response))
    .catch(handleError)

  return timeout ? createTimeout(timeout, fetchPromise) : fetchPromise
}

/**
 * Método PUT para actualizar recursos completamente
 */
export const put = <T>(
  url: string,
  options: RequestWithBodyOptions = {}
): Promise<ApiResponse<T>> => {
  const { body, headers = {}, timeout = 30000 } = options

  const fetchPromise = fetch(url, {
    method: "PUT",
    headers: { ...DEFAULT_HEADERS, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then((response) => handleResponse<T>(response))
    .catch(handleError)

  return timeout ? createTimeout(timeout, fetchPromise) : fetchPromise
}

/**
 * Método PATCH para actualizar recursos parcialmente
 */
export const patch = <T>(
  url: string,
  options: RequestWithBodyOptions = {}
): Promise<ApiResponse<T>> => {
  const { body, headers = {}, timeout = 30000 } = options

  const fetchPromise = fetch(url, {
    method: "PATCH",
    headers: { ...DEFAULT_HEADERS, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then((response) => handleResponse<T>(response))
    .catch(handleError)

  return timeout ? createTimeout(timeout, fetchPromise) : fetchPromise
}

/**
 * Método DELETE para eliminar recursos
 */
export const del = <T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const { headers = {}, timeout = 30000 } = options

  const fetchPromise = fetch(url, {
    method: "DELETE",
    headers: { ...DEFAULT_HEADERS, ...headers },
  })
    .then((response) => handleResponse<T>(response))
    .catch(handleError)

  return timeout ? createTimeout(timeout, fetchPromise) : fetchPromise
}
