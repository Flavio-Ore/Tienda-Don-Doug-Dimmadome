import axios from '@/dimadon/lib/axios'
import type { IKardex } from '@/types'

export const getAllKardexs = async () => {
  return await axios.get<IKardex[]>('/kardex/obtener')
}
