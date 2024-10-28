import { z } from 'zod'

export const BuyProductSchema = z.object({
  idUsuario: z.number().nonnegative({
    message: 'El ID del usuario no puede ser negativo'
  }),
  idProducto: z.number().nonnegative({
    message: 'El ID del producto no puede ser negativo'
  }),
  idProveedor: z.number().nonnegative({
    message: 'El ID del proveedor no puede ser negativo'
  }),
  cantidad: z.number().min(1, {
    message: 'La cantidad debe ser mayor a 0'
  }),
  costo_unitario: z.number().min(1, {
    message: 'El precio unitario debe ser mayor a 0'
  }),
  total: z.number().nonnegative({
    message: 'El precio total no puede ser negativo'
  })
})
