import { PRODUCT_CATEGORIES } from '@/values'
import { z } from 'zod'

/**fomulario producto
{
  "nombre": "Lentejas",
  "precioUnitario": 25,
  "stock":4,
  "fechaVencimiento": "2024/24/31",
  "categoria": {
    "idCategoria":1
  }
} */

export const ProductCategorySchema = z.object({
  nombre: z.nativeEnum(PRODUCT_CATEGORIES),
  idCategoria: z.number()
})

export const AddProductFormSchema = z.object({
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre es obligatorio'
    })
    .max(100, {
      message: 'El nombre no puede tener más de 100 caracteres'
    }),
  precioUnitario: z.number().positive({
    message: 'El precio no puede ser negativo'
  }),
  stock: z.number({
    message: 'El inventario inicial es obligatorio'
  }).nonnegative({
    message: 'El inventario inicial no puede ser negativo'
  }),
  fechaVencimiento: z
    .string({
      // message: 'La fecha de expiración es obligatoria',
      required_error: 'La fecha de expiración es obligatoria'
    })
    .date('Se espera una fecha válida'),
  categoria: z.object(
    {
      idCategoria: z.number().nonnegative({
        message: 'La categoría es obligatoria'
      })
    },
    {
      message: 'La categoría es obligatoria'
    }
  )
})
