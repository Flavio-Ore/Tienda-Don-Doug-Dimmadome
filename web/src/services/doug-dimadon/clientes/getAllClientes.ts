import axios from '@/lib/axios'
import type { ICliente } from '@/types'

export const getAllClientes = async () => {
  return await axios.get<ICliente[]>('/cliente/obtener')
}
