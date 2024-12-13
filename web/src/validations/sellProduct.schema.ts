import { SalidaSchema } from '@/validations/schemas/salida.schema'
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
    "idSalida": 1
  },
  "descripcion": "Entrega de productos por campaña de verano1",
  "detallesSalida": [
    {
      "producto": {"idProducto": 1},
      "cantidad": 10,
      "costoUnitario": 15.50
    },
    {
      "producto": {"idProducto": 2},
      "cantidad": 5,
      "costoUnitario": 20.00
    }
  ]
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
  productos: z
    .array(
      z.object({
        idProducto: z
          .number({
            required_error: 'El producto es requerido',
            message: 'El producto es requerido'
          })
          .int()
          .positive({
            message: 'El producto es requerido'
          }),
        cantidad: z.number().int().positive({
          message: 'La cantidad no puede ser negativa'
        }),
        costoUnitario: z.number().positive({
          message: 'El costo unitario no puede ser negativo'
        }),
        total: z.number().optional()
      }),
      {
        invalid_type_error: 'Debe agregar al menos un producto',
        required_error: 'Debe agregar al menos un producto',
        message: 'Debe agregar al menos un producto'
      }
    )
    .min(1, {
      message: 'Debe agregar al menos un producto'
    }),
  descripcion: z
    .string({
      required_error: 'La descripción es requerida'
    })
    .min(1, {
      message: 'La descripción es requerida'
    }),
  ...SalidaSchema.shape
})
