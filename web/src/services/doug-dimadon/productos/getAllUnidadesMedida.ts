import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { IUnidadMedida } from '@/types'

export const getAllUnidadesMedida = async () => {
  return await axios.get<IUnidadMedida[]>(ENDPOINTS.GET.UNIDAD_MEDIDA.READ_ALL)
}