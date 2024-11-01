// import clientData from '@/mocks/clients.mock.json'
import { z } from 'zod'

/**
SALIDA FORM:
{
  "cliente": {
    "idCliente": 1
  },
  "tipoPago": {
    "idTipoPago": 1
  },
  "costoTotal": 30.0
}

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

export const SellProductFormSchema = z.object({
  idProducto: z
    .number({
      required_error: 'El producto es requerido'
    })
    .int()
    .positive({
      message: 'El producto no es válido'
    }),
  idCliente: z
    .number({
      required_error: 'El cliente es requerido'
    })
    .int()
    .positive({
      message: 'El cliente no es válido'
    }),
  idTipoPago: z
    .number({
      required_error: 'El tipo de pago es requerido'
    })
    .int()
    .positive({
      message: 'El tipo de pago no es válido'
    }),
  cantidad: z
    .number({
      required_error: 'La cantidad es requerida'
    })
    .nonnegative({
      message: 'La cantidad debe ser mayor o igual a 1'
    })
    .min(1, {
      message: 'La cantidad debe ser mayor o igual a 1'
    }),
  precioUnitario: z
    .number({
      required_error: 'El precio unitario es requerido'
    })
    .nonnegative()
    .min(1, {
      message: 'El precio unitario debe ser mayor o igual a 1'
    }),
  total: z
    .number({
      required_error: 'El total es requerido'
    })
    .nonnegative({
      message: 'El total debe ser mayor o igual a 0'
    })
})
