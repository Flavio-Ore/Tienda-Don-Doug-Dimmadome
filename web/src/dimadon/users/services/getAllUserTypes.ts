import axios from '@/dimadon/lib/axios'
import type { ITipoUsuario } from '@/types'

export const getAllUserTypes = async () => {
  return await axios.get<ITipoUsuario[]>('/tipoUsuario/obtener')
}