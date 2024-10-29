import axios from '@/lib/axios'
import { ITipoPago } from '@/types'
import { PaymentMethodValidationSchema } from '@/validations/forms/addPaymentMethod.schema'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { ENDPOINTS } from './values/constants'
export const saveTipoPago = async (
  tipoPago: z.infer<typeof PaymentMethodValidationSchema>
) => {
  try {
    const { data } = await axios.post(ENDPOINTS.POST.TIPO_PAGO.CREATE, tipoPago)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}

export const getAllTipoPagos = async () => {
  try {
    const { data } = await axios.get<ITipoPago[]>(
      ENDPOINTS.GET.TIPO_PAGO.READ_ALL
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}
