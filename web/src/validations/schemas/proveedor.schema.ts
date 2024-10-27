import { CategoriaSchema } from '@/validations/schemas/categoria.schema'
import { z } from 'zod'

export const ProveedorSchema = z.object({
  id_proveedor: z.number().nonnegative(),
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre es obligatorio'
    })
    .max(100, {
      message: 'El nombre no puede tener más de 100 caracteres'
    }),
  contacto: z
    .string()
    .min(1, {
      message: 'El contacto es obligatorio'
    })
    .max(100, {
      message: 'El contacto no puede tener más de 100 caracteres'
    }),
  direccion: z
    .string()
    .min(1, {
      message: 'La dirección es obligatoria'
    })
    .max(200, {
      message: 'La dirección no puede tener más de 100 caracteres'
    }),
  categoria: CategoriaSchema
})
