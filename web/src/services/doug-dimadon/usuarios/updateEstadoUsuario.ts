import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { IUsuario } from '@/types'

export const updateEstadoUsuario = async ({
  idUsuario,
  estado
}: {
  idUsuario: number
  estado: 'activo' | 'inactivo'
}) => {
  return await axios.patch<IUsuario>(
    ENDPOINTS.PATCH.USUARIO.UPDATE(idUsuario),
    {
      estado
    }
  )
}
