import axios from '@/lib/axios'
import type { IUsuario } from '@/types'

export const updateEstadoUsuario = async ({
  idUsuario,
  estado
}: {
  idUsuario: number
  estado: 'activo' | 'inactivo'
}) => {
  return await axios.patch<IUsuario>(`/usuarios/${idUsuario}`, { estado })
}
