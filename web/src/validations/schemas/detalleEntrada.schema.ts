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
  producto: z.object({
    idProducto: z.number().nonnegative({
      message: 'El producto es obligatorio'
    })
  }),
  nombreProducto: z.string().min(1, {
    message: 'El nombre del producto no puede estar vacío'
  }),
  cantidad: z.number().int().positive({
    message: 'La cantidad no puede ser negativa'
  }),
  costoUnitario: z.number().positive({
    message: 'El costo unitario no puede ser negativo'
  }),
  subtotal: z.number().positive({
    message: 'El total no puede ser negativo'
  })
})
