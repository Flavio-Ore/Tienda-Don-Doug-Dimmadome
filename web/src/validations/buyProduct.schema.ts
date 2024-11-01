import { z } from 'zod'

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
  idUsuario: z.number({
    required_error: 'El ID del usuario es requerido'
  }).nonnegative({
    message: 'El ID del usuario no puede ser negativo'
  }),
  producto: z.object({
    idProducto: z.number().nonnegative({
      message: 'El ID del producto no puede ser negativo'
    }),
    nombreProducto: z.string().min(1, {
      message: 'El nombre del producto no puede estar vacío'
    })
  }),
  idProveedor: z.number({
    required_error: 'El proveedor es requerido'
  }).nonnegative({
    message: 'El ID del proveedor no puede ser negativo'
  }),
  cantidad: z.number().min(1, {
    message: 'La cantidad debe ser mayor a 0'
  }),
  costoUnitario: z.number().min(1, {
    message: 'El precio unitario debe ser mayor a 0'
  }),
  total: z.number().nonnegative({
    message: 'El precio total no puede ser negativo'
  })
})
