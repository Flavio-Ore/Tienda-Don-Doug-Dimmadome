import { CategoriaSchema } from '@/validations/schemas/categoria.schema'
import { z } from 'zod'

export const ProductoSchema = z.object({
  id_producto: z.number().int().positive(),
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre del producto no puede estar vacío'
    })
    .max(100, {
      message: 'El nombre del producto no puede tener más de 100 caracteres'
    }),
  precio_unitario: z.number().positive({
    message: 'El precio no puede ser negativo'
  }),
  stock: z.number().positive({
    message: 'El inventario inicial no puede ser negativo'
  }),
  fecha_vencimiento: z.date({
    required_error: 'La fecha de vencimiento es obligatoria'
  }),
  categoria: CategoriaSchema,
  estado: z
    .enum(['activo', 'inactivo'], {
      message: 'El estado del producto no es válido'
    })
    .default('activo')
})
