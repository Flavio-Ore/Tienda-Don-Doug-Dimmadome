import { z } from 'zod'

export const signInSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Tu nombre de usuario debe tener al menos 2 caracteres'
    })
    .max(50),
  password: z
    .string()
    .min(8, {
      message: 'Tu contraseña debe tener al menos 8 caracteres'
    })
    .max(255)
})
