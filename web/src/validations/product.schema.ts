import { z } from 'zod'

export const ProductFormSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es obligatorio'
  }),
  price: z.number().nonnegative().min(1, {
    message: 'El precio debe ser mayor o igual a 0'
  })
})
