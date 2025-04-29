import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { ICliente } from '@/types'

export const getAllClientes = async () => {
  return await axios.get<ICliente[]>(ENDPOINTS.GET.CLIENTE.READ_ALL)
}
