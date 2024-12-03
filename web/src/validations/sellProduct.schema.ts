// import clientData from '@/mocks/clients.mock.json'
import { z } from 'zod'
import { SalidaSchema } from './schemas/salida.schema'

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

SELL PRODUCT FORM:
 {
  costoTotal: 1,
  cliente: {
    idCliente: 1
  },
  productos: [
    {
      cantidad: 1,
      costoUnitario: 1,
      descripcion: '',
      producto: {
        idProducto: 1
      },
      salida: {
        idSalida: 1
      },
      total: 1
    }
  ],
  tipoPago: {
    idTipoPago: 1
  }

*/

export const SellProductFormSchema = z.object({
  productos: z.array(
    z.object({
      idProducto: z.number().int().nonnegative({
        message: 'El producto es requerido'
      }),
      cantidad: z.number().int().nonnegative({
        message: 'La cantidad no puede ser negativa'
      }),
      costoUnitario: z.number().positive({
        message: 'El costo unitario no puede ser negativo'
      }),
      total: z.number().optional()
    })
  ),
  descripcion: z.string().optional(),
  ...SalidaSchema.shape
})
