import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'

export const saveClienteReniec = async (cliente: {
  dni: string
  direccion: string
}) => {
  return await axios.post(ENDPOINTS.POST.API_RENIEC.CREATE, cliente)
}
