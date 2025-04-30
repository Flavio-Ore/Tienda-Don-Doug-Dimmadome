import axios from '@/dimadon/lib/axios'
import type { IUsuario } from "@/types"

export const getAllUsers = async () => {
  return await axios.get<IUsuario[]>('/usuarios/obtener')
}
