import axios from '@/lib/axios'
import { ICliente } from '@/types'
import { ClientFormSchema } from '@/validations/forms/addClient.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { AxiosError } from 'axios'
import { z } from 'zod'

export const getAllClientes = async () => {
  try {
    const { data } = await axios.get<ICliente[]>(ENDPOINTS.GET.CLIENTE.READ_ALL)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}

export const saveCliente = async (
  cliente: z.infer<typeof ClientFormSchema>
) => {
  try {
    const { data } = await axios.post(ENDPOINTS.POST.CLIENTE.CREATE, cliente)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}
