import axios from '@/dimadon/lib/axios'

export const updateEstadoCliente = async ({
  idCliente: id,
  state: estado
}: {
  idCliente: number
  state: 'activo' | 'inactivo'
}) => {
  return await axios.put(`/cliente/${id}/estado`, { estado })
}
