import axios from '@/lib/axios'
import { IKardex } from '@/types'
import { ENDPOINTS } from '@doug-dimadon/values/constants'

export const getAllKardexs = async () => {
  return await axios.get<IKardex[]>(ENDPOINTS.GET.KARDEX.READ_ALL)
}
