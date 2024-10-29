import { z } from 'zod'

export const SigninSchema = z.object({
  email: z.string().email({
    message: 'El email no es válido'
  }),
  contrasena: z
    .string()
    .min(8, {
      message: 'Tu contraseña debe tener al menos 8 caracteres'
    })
    .max(255, {
      message: 'Tu contraseña debe tener menos de 255 caracteres'
    })
})
