import { TYPE_RECEIPT_VALUES } from '@/values'
import { z } from 'zod'

export const SellProductFormSchema = z.object({
  DNI: z
    .string()
    .min(8, {
      message: 'El DNI debe tener al menos 8 caracteres'
    })
    .max(8, {
      message: 'El DNI debe tener como máximo 8 caracteres'
    }),
  typeReceipt: z.enum(
    TYPE_RECEIPT_VALUES.filter(
      typeReceipt =>
        typeReceipt !== 'Nota de Crédito' && typeReceipt !== 'Nota de Débito'
    ) as ['Boleta', 'Factura'],
    {
      message: 'El tipo de comprobante no es válido'
    }
  ),
  quantity: z.number().nonnegative().min(1, {
    message: 'La cantidad debe ser mayor o igual a 1'
  })
})
