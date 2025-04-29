import axios from '@/lib/axios'

export const saveClienteReniec = async (cliente: {
  dni: string
  direccion: string
}) => {
  return await axios.post('/api/reniec/dni', cliente)
}
