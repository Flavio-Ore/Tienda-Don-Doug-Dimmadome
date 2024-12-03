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
    idUsuario: z
      .number({
        required_error: 'El usuario es obligatorio',
        message: 'El usuario es obligatorio'
      })
      .int()
      .positive({
        message: 'El usuario es obligatorio'
      })
  }),
  proveedor: z.object({
    id: z
      .number({
        required_error: 'El proveedor es obligatorio',
        message: 'El proveedor es obligatorio'
      })
      .int()
      .positive({
        message: 'El proveedor es obligatorio'
      })
  }),
  total: z
    .number({
      message: 'El total debe ser mayor a 0'
    })
    .positive({
      message: 'El total debe ser mayor a 0'
    })
})
