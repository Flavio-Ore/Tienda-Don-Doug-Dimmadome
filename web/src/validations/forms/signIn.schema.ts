import { z } from 'zod'

export const SigninFormSchema = z.object({
  email: z.string().email({
    message: 'El email no es válido'
  }),
  password: z
    .string()
    .min(7, {
      message: 'Tu contraseña debe tener al menos 7 caracteres'
    })
    .max(255, {
      message: 'Tu contraseña debe tener menos de 255 caracteres'
    })
})
