import { PRODUCT_CATEGORIES_VALUES } from '@/values'
import { z } from 'zod'

export const AddProductFormSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es obligatorio'
  }),
  price: z.number().nonnegative().min(0, {
    message: 'El precio debe ser mayor o igual a 0'
  }),
  initialInventory: z.number().nonnegative().min(0, {
    message: 'El inventario inicial debe ser mayor o igual a 0'
  }),
  expirationDate: z.date({
    required_error: 'La fecha de expiración es obligatoria'
  }),
  category: z.enum(PRODUCT_CATEGORIES_VALUES, {
   message: 'La categoría no es válida' 
  })
})
