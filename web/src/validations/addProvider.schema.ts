import { PRODUCT_CATEGORIES_VALUES } from '@/values'
import { z } from 'zod'

export const ProviderValidationSchema = z.object({
  socialReason: z
    .string()
    .min(2, {
      message: 'La razón social del proveedor debe tener al menos 2 caracteres'
    })
    .max(100),
  phone: z
    .string()
    .min(7, {
      message: 'El número de teléfono debe tener al menos 7 caracteres'
    })
    .max(20),
  email: z.string().email({
    message: 'El correo electrónico no es válido'
  }),
  address: z
    .string()
    .min(2, {
      message: 'La dirección del proveedor debe tener al menos 2 caracteres'
    })
    .max(255),
  category: z.enum(PRODUCT_CATEGORIES_VALUES, {
    message: 'La categoría no es válida'
  })
})
