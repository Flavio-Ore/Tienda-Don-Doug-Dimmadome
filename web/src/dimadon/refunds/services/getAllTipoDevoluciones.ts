import axios from '@/dimadon/lib/axios'
import type {
  ITipoDevolucion
} from '@/types'

export const getAllTipoDevoluciones = async () => {
  return await axios.get<ITipoDevolucion[]>('/tipoDevolucion/obtener')
}