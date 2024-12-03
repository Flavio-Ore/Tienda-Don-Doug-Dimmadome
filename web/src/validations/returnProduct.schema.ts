import z from 'zod'
/*
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
*/

export const ReturnProductFormSchema = z.object({
  producto: z.object({
    idProducto: z.number().nonnegative({
      message: 'El producto es obligatorio'
    })
  }),
  cliente: z.object({
    idCliente: z.number().nonnegative({
      message: 'El cliente es obligatorio'
    })
  }),
  cantidad: z.number().positive({
    message: 'La cantidad no puede ser negativa'
  }),
  tipoDevolucion: z.object({
    idTipoDevolucion: z.number().nonnegative({
      message: 'El tipo de devolución es obligatorio'
    })
  }),
  descripcion: z.string().nonempty({
    message: 'La descripción es obligatoria'
  })
})
