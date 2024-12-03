import axios from '@/lib/axios'
import { ITipoDevolucion } from '@/types'
import { ReturnProductFormSchema } from '@/validations/returnProduct.schema'
import { z } from 'zod'
import { ENDPOINTS } from './values/endpoints'

export const getAllTipoDevoluciones = async () => {
  return await axios.get<ITipoDevolucion[]>(
    ENDPOINTS.GET.TIPO_DEVOLUCION.READ_ALL
  )
}
export const saveDevolucionProducto = async (
  refund: z.infer<typeof ReturnProductFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.DEVOLUCION.CREATE, refund)
}
