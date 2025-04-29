import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { ITipoUsuario } from '@/types'

export const getAllTipoUsuario = async () => {
  return await axios.get<ITipoUsuario[]>(ENDPOINTS.GET.TIPO_USUARIO.READ_ALL)
}