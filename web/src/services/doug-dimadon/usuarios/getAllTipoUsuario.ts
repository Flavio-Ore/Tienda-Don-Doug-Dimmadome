import axios from '@/lib/axios'
import type { ITipoUsuario } from '@/types'

export const getAllTipoUsuario = async () => {
  return await axios.get<ITipoUsuario[]>('/tipoUsuario/obtener')
}