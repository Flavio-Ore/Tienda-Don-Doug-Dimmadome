import z from 'zod'
/*
Devolucion v1
{
  "producto": {
    "idProducto": 1
  },
  "cliente": {
    "idCliente": 1
  },
  "cantidad": 10,
  "tipoDevolucion": {
    "idTipoDevolucion": 2
  },
  "descripcion": "primera devolucion"
}

Devolucion v2
{
  "producto": {
    "idProducto":1
  },
  "nombre": "Luicho",
  "cantidad": 5,
  "tipoDevolucion":{
    "idTipoDevolucion":1
  },
  "descripcion": "Compre de más"
}
*/

export const ReturnProductFormSchema = z.object({
  producto: z.object(
    {
      idProducto: z
        .number({
          invalid_type_error: 'El producto es obligatorio',
          required_error: 'El producto es obligatorio',
          message: 'El producto es obligatorio'
        })
        .positive({
          message: 'El producto es obligatorio'
        })
    },
    {
      required_error: 'El producto es obligatorio',
      message: 'El producto es obligatorio'
    }
  ),
  nombre: z.string().min(3, {
    message: 'El cliente o proveedor es obligatorio'
  }),
  // cliente: z.object({
  //   idCliente: z.number().positive({
  //     message: 'El cliente es obligatorio'
  //   })
  // }),
  cantidad: z.number().positive({
    message: 'La cantidad no puede ser negativa'
  }),
  tipoDevolucion: z.object({
    idTipoDevolucion: z.number().positive({
      message: 'El tipo de devolución es obligatorio'
    })
  }),
  descripcion: z.string().min(1, {
    message: 'La descripción es obligatoria'
  })
})
