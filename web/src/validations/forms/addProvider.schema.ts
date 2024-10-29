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
    .max(200),
    categoria: z.object(
      {
        idCategoria: z.number().nonnegative({
          message: 'La categoría es obligatoria'
        }),
      },
      {
        message: 'La categoría es obligatoria'
      }
    )
})
