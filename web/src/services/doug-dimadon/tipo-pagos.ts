import axios from '@/lib/axios'
import { ITipoPago } from '@/types'
import { PaymentMethodValidationSchema } from '@/validations/forms/addPaymentMethod.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { z } from 'zod'
export const saveTipoPago = async (
  tipoPago: z.infer<typeof PaymentMethodValidationSchema>
) => {
  return await axios.post(ENDPOINTS.POST.TIPO_PAGO.CREATE, tipoPago)
}
export const getAllTipoPagos = async () => {
  return await axios.get<ITipoPago[]>(ENDPOINTS.GET.TIPO_PAGO.READ_ALL)
}
