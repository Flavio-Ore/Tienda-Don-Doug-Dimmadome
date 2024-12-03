/**
DETALLE SALIDA FORM:
[
  {
    "salida": {
      "idSalida": 1
    },
    "producto": {
      "idProducto": 1
    },
    "cantidad": 19,
    "costoUnitario": 50,
    "total": 950.0,
    "descripcion": ""
  }  
]
*/

import { z } from 'zod'

export const DetalleSalidaSchema = z.object({
  salida: z.object({
    idSalida: z.number().int().nonnegative({
      message: 'La salida es requerida'
    })
  }),
  descripcion: z.string().optional(),
  detallesSalida: z.array(
    z.object({
      producto: z.object({
        idProducto: z.number().int().nonnegative({
          message: 'El producto es requerido'
        })
      }),
      cantidad: z.number().int().nonnegative({
        message: 'La cantidad no puede ser negativa'
      }),
      costoUnitario: z.number().positive({
        message: 'El costo unitario no puede ser negativo'
      })
    })
  )
})
