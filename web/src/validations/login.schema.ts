import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email().trim().max(100, {
    message: 'El email no puede tener más de 100 caracteres'
  }),
  password: z
    .string()
    .min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres'
    })
    .max(255, {
      message: 'La contraseña no puede tener más de 255 caracteres'
    })
})

export default LoginSchema
