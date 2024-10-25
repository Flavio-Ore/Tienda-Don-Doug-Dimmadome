import { TYPE_USERS_VALUES } from '@/values'
import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'El nombre no puede ser menor a 3 caracteres'
    })
    .max(200, {
      message: 'El nombre no puede ser mayor a 200 caracteres'
    })
    .trim(),
  email: z
    .string()
    .email({
      message: 'El email no es válido'
    })
    .max(100, {
      message: 'El email no puede ser mayor a 100 caracteres'
    }),
  password: z
    .string()
    .min(6, {
      message: 'La contraseña no puede ser menor a 6 caracteres'
    })
    .max(255, {
      message: 'La contraseña no puede ser mayor a 255 caracteres'
    }),
  role: z.enum(TYPE_USERS_VALUES, { message: 'El rol no es válido' })
})
