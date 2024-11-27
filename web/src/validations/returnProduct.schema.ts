import z from 'zod'
/*
{
  "producto":{"idProducto":4},
  "cliente":{"idCliente": 3},
  "cantidad": 13,
  "tipoDevolucion": {"idTipoDevolucion":2},
  "descripcion":"primera devolucion"
  
}
*/

export const ReturnProductFormSchema = z.object({
  idProducto: z.number().nonnegative({
    message: 'El ID del producto no puede ser negativo'
  }),
  idCliente: z.number().nonnegative({
    message: 'El ID del cliente no puede ser negativo'
  }),
  cantidad: z.number().positive({
    message: 'La cantidad debe ser mayor a 0'
  }),
  idTipoDevolucion: z.number().nonnegative({
    message: 'Tipo de devolución inválido'
  }),
  descripcion: z
    .string()
    .min(1, {
      message: 'La descripción no puede estar vacía'
    })
    .max(255, {
      message: 'La descripción no puede tener más de 255 caracteres'
    })
})
