import { PRODUCT_CATEGORIES } from '@/values'
import { z } from 'zod'

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
  stock: z.number().nonnegative({
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
      }),
      nombre: z.nativeEnum(PRODUCT_CATEGORIES, {
        message: 'Elige una categoría',
        invalid_type_error: 'Elige una categoría'
      })
    },
    {
      message: 'La categoría es obligatoria'
    }
  )
})
