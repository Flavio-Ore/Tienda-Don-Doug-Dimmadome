import axios from '@/dimadon/lib/axios'

export const updateEstadoProducto = async ({
  idProducto,
  estado
}: {
  idProducto: number
  estado: 'activo' | 'inactivo'
}) => {
  return await axios.patch(`/producto/${idProducto}`, {
    estado
  })
}
