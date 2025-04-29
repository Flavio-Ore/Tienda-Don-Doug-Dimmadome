import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { IUsuario } from '@/types'

export const getUsuario = async (idUsuario: number) => {
  const res = await axios.get<IUsuario[]>(ENDPOINTS.GET.USUARIO.READ_ALL)
  const usuario = res.data.find(usuario => usuario.idUsuario === idUsuario)
  return usuario
}
