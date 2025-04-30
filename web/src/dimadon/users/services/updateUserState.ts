import axios from '@/dimadon/lib/axios'
import type { IUsuario } from '@/types'

export const updateUserState = async ({
  idUsuario,
  estado
}: {
  idUsuario: number
  estado: 'activo' | 'inactivo'
}) => {
  return await axios.patch<IUsuario>(`/usuarios/${idUsuario}`, { estado })
}
