import axios from '@/dimadon/lib/axios'
import type { PaymentMethodValidationSchema } from '@/dimadon/sales/schemas/addPaymentMethod.schema'
import type { ITipoPago } from '@/types'
import type { z } from 'zod'
export const saveTipoPago = async (
  tipoPago: z.infer<typeof PaymentMethodValidationSchema>
) => {
  return await axios.post('/tipoPago', tipoPago)
}
export const getAllTipoPagos = async () => {
  return await axios.get<ITipoPago[]>('/tipoPago/obtener')
}
