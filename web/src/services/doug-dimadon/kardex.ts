import axios from '@/lib/axios'
import { IKardex } from '@/types'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { AxiosError } from 'axios'

export const getAllKardexs = async () => {
  try {
    const { data } = await axios.get<IKardex[]>(ENDPOINTS.GET.KARDEX.READ_ALL)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}
