import { TYPE_RETURNS_VALUES } from '@/values'
import { z } from 'zod'

export const ReturnProductFormSchema = z.object({
  DNI: z.string().trim().length(8, {
    message: 'El DNI debe tener 8 caracteres'
  }),
  idProducto: z.number().positive().int(),
  typeReturn: z.enum(TYPE_RETURNS_VALUES, {
    message: 'El tipo de devolución no es válido'
  }),
  cantidad: z.number().positive().min(1, {
    message: 'La cantidad debe ser mayor o igual a 1'
  }),
  description: z.string().trim().max(255, {
    message: 'La descripción no puede tener más de 255 caracteres'
  })
})
