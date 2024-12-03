/**
formulario detalle Entrada 
{
  "entrada": {
    "idEntrada": 2
  },
  "producto": {
    "idProducto": 1
  },
  "nombreProducto": "Leche evaporada",
  "cantidad": 4,
  "costoUnitario": 6,
  "subtotal": 24
}
 */

import { z } from 'zod'

export const DetallEntradaSchema = z.object({
  entrada: z.object({
    idEntrada: z.number().nonnegative({
      message: 'La entrada es obligatoria'
    })
  }),
  descripcion: z.string().optional(),
  detallesEntrada: z.array(
    z.object({
      producto: z.object({
        idProducto: z.number().nonnegative({
          message: 'El producto es obligatorio'
        })
      }),
      cantidad: z.number().nonnegative({
        message: 'La cantidad es requerida'
      }),
      costoUnitario: z.number().nonnegative({
        message: 'El costo unitario es obligatorio'
      })
    })
  )
})
