import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import type { ITipoPago } from '@/types'
import type { PaymentMethodValidationSchema } from '@/validations/forms/addPaymentMethod.schema'
import type { z } from 'zod'
export const saveTipoPago = async (
  tipoPago: z.infer<typeof PaymentMethodValidationSchema>
) => {
  return await axios.post(ENDPOINTS.POST.TIPO_PAGO.CREATE, tipoPago)
}
export const getAllTipoPagos = async () => {
  return await axios.get<ITipoPago[]>(ENDPOINTS.GET.TIPO_PAGO.READ_ALL)
}
