import axios from '@/lib/axios'
import type { IUsuario } from '@/types'

export const getUsuario = async (idUsuario: number) => {
  const res = await axios.get<IUsuario[]>('/usuarios/obtener')
  const usuario = res.data.find(usuario => usuario.idUsuario === idUsuario)
  return usuario
}
