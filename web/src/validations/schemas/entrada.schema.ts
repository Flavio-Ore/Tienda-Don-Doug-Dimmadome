/**formulario entrada
formulario entrada
{
  "usuario": {
    "idUsuario": 2
  },
  "proveedor": {
    "id": 5
  },
  "total": 6
}
*/

import { z } from 'zod'

export const EntradaSchema = z.object({
  usuario: z.object({
    idUsuario: z.number().nonnegative({
      message: 'El usuario es obligatorio'
    })
  }),
  proveedor: z.object({
    id: z.number().nonnegative({
      message: 'El proveedor es obligatorio'
    })
  }),
  total: z.number().positive({
    message: 'El total no puede ser negativo'
  })
})
