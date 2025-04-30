import { z } from 'zod'
/**formulario proveedor
{
  "nombre": "abanto SAC",
  "contacto": "987445632",
  "direccion":"Mariscal Caceres",
  "categoria":{
    "idCategoria": 1
  }
} */
export const ProviderFormSchema = z.object({
  nombre: z
    .string({
      required_error: 'El nombre del proveedor es obligatorio'
    })
    .min(2, {
      message: 'El nombre del proveedor debe tener al menos 2 caracteres'
    })
    .max(100),
  contacto: z
    .string({
      required_error: 'El número de teléfono es obligatorio'
    })
    .min(12 , {
      message: 'El número de teléfono es inválido'
    })
    .max(20, {
      message: 'El número de teléfono es inválido'
    }),
  direccion: z
    .string({
      required_error: 'La dirección del proveedor es obligatoria'
    })
    .min(2, {
      message: 'La dirección del proveedor debe tener al menos 2 caracteres'
    })
    .max(200),
  categoria: z.object(
    {
      idCategoria: z
        .number({
          message: 'La categoría es obligatoria'
        })
        .nonnegative({
          message: 'La categoría es obligatoria'
        })
    },
    {
      message: 'La categoría es obligatoria'
    }
  )
})
