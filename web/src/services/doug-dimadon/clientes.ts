import axios from '@/lib/axios'
import { ICliente } from '@/types'
import { ClientFormSchema } from '@/validations/forms/addClient.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { z } from 'zod'

export const saveCliente = async (
  cliente: z.infer<typeof ClientFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.CLIENTE.CREATE, cliente)
}
export const getAllClientes = async () => {
  return await axios.get<ICliente[]>(ENDPOINTS.GET.CLIENTE.READ_ALL)
}

export const saveClienteReniec = async (cliente: {
  dni: string
  direccion: string
}) => {
  return await axios.post(ENDPOINTS.POST.API_RENIEC.CREATE, cliente)
}
