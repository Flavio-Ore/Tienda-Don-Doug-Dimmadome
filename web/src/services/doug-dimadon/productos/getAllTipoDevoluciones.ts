import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type {
  ITipoDevolucion
} from '@/types'

export const getAllTipoDevoluciones = async () => {
  return await axios.get<ITipoDevolucion[]>(
    ENDPOINTS.GET.TIPO_DEVOLUCION.READ_ALL
  )
}