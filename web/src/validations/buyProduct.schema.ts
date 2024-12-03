import { z } from 'zod'
import { EntradaSchema } from './schemas/entrada.schema'

/*
/*
formulario entrada
{
  "usuario":
  {
    "idUsuario": 1
  },
  "proveedor":{
    "idProveedor": 1
  },
  "total": 200
}

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

export const BuyProductSchema = z.object({
  productos: z
    .array(
      z.object(
        {
          idProducto: z
            .number({
              required_error: 'El producto es requerido',
              message: 'El producto es requerido'
            })
            .int({
              message: 'El producto es requerido'
            })
            .positive({
              message: 'El producto es requerido'
            }),
          cantidad: z
            .number({
              required_error: 'La cantidad es requerida',
              message: 'La cantidad es requerida'
            })
            .int()
            .positive({
              message: 'La cantidad es requerida'
            }),
          costoUnitario: z
            .number({
              required_error: 'El costo unitario es requerido',
              message: 'El costo unitario es requerido'
            })
            .positive({
              message: 'El costo unitario es requerido'
            })
        },
        {
          required_error: 'El producto es requerido',
          invalid_type_error: 'El producto es requerido',
          message: 'El producto es requerido'
        }
      ),
      {
        required_error: 'Mínimo un producto es requerido',
        invalid_type_error: 'Mínimo un producto es requerido',
        message: 'Mínimo un producto es requerido'
      }
    )
    .min(1, {
      message: 'Mínimo un producto es requerido'
    }),
  descripcion: z
    .string({
      required_error: 'La descripción es requerida',
      message: 'La descripción es requerida'
    })
    .min(1, {
      message: 'La descripción es requerida'
    }),
  ...EntradaSchema.shape
})
