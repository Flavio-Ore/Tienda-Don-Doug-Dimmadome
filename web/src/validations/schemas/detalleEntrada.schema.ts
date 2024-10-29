/**
formulario detalle Entrada 
{
  "entrada": {
    "idEntrada":1
  },
  "producto":{
    "idProducto":1
  },
  "nombreProducto":"Lentejas",
  "cantidad": 4,
  "costoUnitario": 6,
  "subtotal":24
}
 */

import { z } from 'zod'

export const DetallEntradaSchema = z.object({
  entrada: z.object({
    idEntrada: z.number().nonnegative({
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
