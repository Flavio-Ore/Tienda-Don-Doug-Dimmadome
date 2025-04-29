import axios from '@/lib/axios'
import type { IProveedor } from '@/types'

export const getAllProveedores = async () => {
  return await axios.get<IProveedor[]>('/proveedor/obtener')
}
