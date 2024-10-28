import { PRODUCT_CATEGORIES } from '@/values'
import { z } from 'zod'

export const ProviderValidationSchema = z.object({
  nombre: z
    .string()
    .min(2, {
      message: 'El nombre del proveedor debe tener al menos 2 caracteres'
    })
    .max(100),
  contacto: z
    .string()
    .min(7, {
      message: 'El número de teléfono debe tener al menos 7 caracteres'
    })
    .max(20),
  direccion: z
    .string()
    .min(2, {
      message: 'La dirección del proveedor debe tener al menos 2 caracteres'
    })
    .max(255),
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
