import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import { IKardex } from '@/types'

export const getAllKardexs = async () => {
  return await axios.get<IKardex[]>(ENDPOINTS.GET.KARDEX.READ_ALL)
}
