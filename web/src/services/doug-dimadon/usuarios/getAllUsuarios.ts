import type { IUsuario } from "@/types"
import { ENDPOINTS } from "@doug-dimadon/routes/endpoints"
import axios from "axios"

export const getAllUsuarios = async () => {
  return await axios.get<IUsuario[]>(ENDPOINTS.GET.USUARIO.READ_ALL)
}
