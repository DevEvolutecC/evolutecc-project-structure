/**
 * Verifica si una contraseña cumple con los requisitos de seguridad
 * @param password La contraseña a verificar
 * @returns Un objeto con el resultado de la validación
 */
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una letra mayúscula")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una letra minúscula")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("La contraseña debe contener al menos un número")
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("La contraseña debe contener al menos un carácter especial")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
