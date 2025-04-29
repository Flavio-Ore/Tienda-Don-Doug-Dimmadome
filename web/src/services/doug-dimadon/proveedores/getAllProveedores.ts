import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { IProveedor } from '@/types'

export const getAllProveedores = async () => {
  return await axios.get<IProveedor[]>(ENDPOINTS.GET.PROVEEDOR.READ_ALL)
}
