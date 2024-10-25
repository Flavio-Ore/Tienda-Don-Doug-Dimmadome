import { z } from 'zod'

export const BuyProductSchema = z.object({
  user: z.enum(['1', '2', '3'], {
    message: 'El usuario no es válido'
  }),
  provider: z.enum(['1', '2', '3'], {
    message: 'El proveedor no es válido'
  }),
  product: z.string().min(3, {
    message: 'El producto debe tener al menos 3 caracteres'
  }),
  quantity: z.number().min(1, {
    message: 'La cantidad debe ser mayor a 0'
  }),
  unitPrice: z.number().min(1, {
    message: 'El precio unitario debe ser mayor a 0'
  }),
  totalPrice: z.number().nonnegative({
    message: 'El precio total no puede ser negativo'
  })
})
