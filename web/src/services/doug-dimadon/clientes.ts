import axios from '@/lib/axios'
import { ICliente } from '@/types'
import { ClientFormSchema } from '@/validations/forms/addClient.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import Cookies from 'js-cookie'
import { z } from 'zod'

export const getAllClientes = async () => {
  return await axios.get<ICliente[]>(ENDPOINTS.GET.CLIENTE.READ_ALL, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token') ?? ''}`
    }
  })
}

export const saveCliente = async (
  cliente: z.infer<typeof ClientFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.CLIENTE.CREATE, cliente, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token') ?? ''}`
    }
  })
}
export const saveClienteReniec = async (cliente: {
  dni: string
  direccion: string
}) => {
  return await axios.post(ENDPOINTS.POST.API_RENIEC.CREATE, cliente, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token') ?? ''}`
    }
  })
}

export const updateEstadoCliente = async ({
  idCliente: id,
  state: estado
}: {
  idCliente: number
  state: 'activo' | 'inactivo'
}) => {
  return await axios.put(
    `/cliente/${id}/estado`,
    { estado },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token') ?? ''}`
      }
    }
  )
}
