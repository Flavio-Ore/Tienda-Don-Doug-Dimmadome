// import clientData from '@/mocks/clients.mock.json'
import { z } from 'zod'

/**
  SALIDA:
  {
  "cliente": {
    "idCliente": 1
  },
  "tipoPago":{
    "idTipoPago": 1
  },
  "costoTotal": 2
}

DETALLE_SALIDA:
{
  "salida": {
    "idSalida": 1
  },
  "producto": {
    "idProducto": 1
  },
  "cantidad": 2,
  "costoUnitario":25,
  "total": 50
}
 */


/*
export const SellProductFormSchema = z.object({
  salida: z.object({
    cliente: z.object({
      idCliente: z.number()
    }),
    tipoPago: z.object({
      idTipoPago: z.number()
    }),
    costoTotal: z.number()
  }),
  detalleSalida: z.object({
    salida: z.object({
      idSalida: z.number()
    }),
    producto: z.object({
      idProducto: z.number()
    }),
    cantidad: z.number(),
    costoUnitario: z.number(),
    total: z.number()
  })
})
*/

export const SellProductFormSchema = z.object({
  idCliente: z.number().int().positive({
    message: 'El cliente no es válido'
  }),
  idTipoPago: z.number().int().positive({
    message: 'El tipo de pago no es válido'
  }),
  cantidad: z.number().nonnegative().min(1, {
    message: 'La cantidad debe ser mayor o igual a 1'
  }),
  idProducto: z.number().int().positive(),
  costoTotal: z.number().nonnegative(),
  total: z.number().nonnegative()
})
