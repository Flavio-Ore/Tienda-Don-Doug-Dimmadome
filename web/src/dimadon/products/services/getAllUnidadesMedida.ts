import axios from '@/dimadon/lib/axios'
import type { IUnidadMedida } from '@/types'

export const getAllUnidadesMedida = async () => {
  return await axios.get<IUnidadMedida[]>('/unidadMedida/obtener')
}