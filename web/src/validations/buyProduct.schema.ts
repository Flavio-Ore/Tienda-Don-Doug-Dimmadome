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
  productos: z.array(
    z.object({
      idProducto: z.number().int().nonnegative({
        message: 'El producto es requerido'
      }),
      cantidad: z.number().int().nonnegative({
        message: 'La cantidad es requerida'
      }),
      costoUnitario: z.number().int().nonnegative({
        message: 'El costo unitario es requerido'
      }),
      total: z.number().optional()
    })
  ),
  descripcion: z.string().min(1, {
    message: 'La descripción es requerida'
  }),
  ...EntradaSchema.shape
})
