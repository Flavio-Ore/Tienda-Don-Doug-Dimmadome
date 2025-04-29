import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'

export const updateEstadoProducto = async ({
  idProducto,
  estado
}: {
  idProducto: number
  estado: 'activo' | 'inactivo'
}) => {
  return await axios.patch(ENDPOINTS.PATCH.PRODUCTO.UPDATE(idProducto), {
    estado
  })
}
