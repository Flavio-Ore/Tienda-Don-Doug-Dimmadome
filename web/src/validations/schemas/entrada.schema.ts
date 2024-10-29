/**formulario entrada
{
  "usuario":
  {
    "idUsuario": 1
  },
  "proveedor":{
    "idProveedor": 1
  },
  "total": 200
} */

import { z } from 'zod'

export const EntradaSchema = z.object({
  usuario: z.object({
    idUsuario: z.number().nonnegative({
      message: 'El usuario es obligatorio'
    })
  }),
  proveedor: z.object({
    idProveedor: z.number().nonnegative({
      message: 'El proveedor es obligatorio'
    })
  }),
  total: z.number().positive({
    message: 'El total no puede ser negativo'
  })
})
