/**
DETALLE SALIDA FORM:
{
  "salida": {
    "idSalida": 4
  },
  "producto": {
    "idProducto": 1
  },
  "cantidad": 2,
  "costoUnitario":15.0,
  "total": 30.0
}
*/

import { z } from 'zod'

export const DetalleSalidaSchema = z.object({
  salida: z.object({
    idSalida: z.number().nonnegative({
      message: 'La salida es obligatoria'
    })
  }),
  producto: z.object({
    idProducto: z.number().nonnegative({
      message: 'El producto es obligatorio'
    })
  }),
  cantidad: z.number().nonnegative({
    message: 'La cantidad no puede ser negativa'
  }),
  costoUnitario: z.number().positive({
    message: 'El costo unitario no puede ser negativo'
  }),
  total: z.number().positive({
    message: 'El total no puede ser negativo'
  })
})
