import { PRODUCT_CATEGORIES_VALUES } from '@/values'
import { z } from 'zod'

export const AddProductFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'El nombre es obligatorio'
    })
    .max(100, {
      message: 'El nombre no puede tener más de 100 caracteres'
    }),
  price: z.number().positive({
    message: 'El precio no puede ser negativo'
  }),
  initialInventory: z.number().nonnegative({
    message: 'El inventario inicial no puede ser negativo'
  }),
  expirationDate: z.date({
    required_error: 'La fecha de expiración es obligatoria'
  }),
  category: z.enum(PRODUCT_CATEGORIES_VALUES, {
    message: 'La categoría no es válida'
  })
})
