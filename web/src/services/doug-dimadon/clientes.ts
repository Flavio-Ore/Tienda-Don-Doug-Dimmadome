import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import type { ICliente } from '@/types'
import type { ClientFormSchema } from '@/validations/forms/addClient.schema'
import type { z } from 'zod'

export const getAllClientes = async () => {
  return await axios.get<ICliente[]>(ENDPOINTS.GET.CLIENTE.READ_ALL)
}

export const saveCliente = async (
  cliente: z.infer<typeof ClientFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.CLIENTE.CREATE, cliente)
}
export const saveClienteReniec = async (cliente: {
  dni: string
  direccion: string
}) => {
  return await axios.post(ENDPOINTS.POST.API_RENIEC.CREATE, cliente)
}

export const updateEstadoCliente = async ({
  idCliente: id,
  state: estado
}: {
  idCliente: number
  state: 'activo' | 'inactivo'
}) => {
  return await axios.put(`/cliente/${id}/estado`, { estado })
}
