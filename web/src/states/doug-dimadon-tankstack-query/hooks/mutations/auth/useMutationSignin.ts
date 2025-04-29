import { saveToLocalStorage } from '@/lib/local-storage'
import { authLogin } from '@/services/doug-dimadon/auth/authLogin'
import type { IUsuario } from '@/types'
import { useMutation } from '@tanstack/react-query'

export function useMutationSignin() {
  return useMutation({
    mutationFn: authLogin,
    onSuccess: res => {
      console.log({ res })
      if (res?.data?.usuario?.idUsuario != null) {
        saveToLocalStorage<IUsuario>('CURRENT_USER', res.data.usuario)
      }
    }
  })
}