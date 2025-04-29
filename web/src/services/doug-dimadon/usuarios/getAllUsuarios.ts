import axios from '@/lib/axios'
import type { IUsuario } from "@/types"

export const getAllUsuarios = async () => {
  return await axios.get<IUsuario[]>('/usuarios/obtener')
}
