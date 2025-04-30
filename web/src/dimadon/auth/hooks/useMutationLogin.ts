import { login } from '@/dimadon/auth/services/login'
import { saveToLocalStorage } from '@/lib/local-storage'
import type { IUsuario } from '@/types'
import { useMutation } from '@tanstack/react-query'

export function useMutationLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: res => {
      console.log({ res })
      if (res?.data?.usuario?.idUsuario != null) {
        saveToLocalStorage<IUsuario>('CURRENT_USER', res.data.usuario)
      }
    }
  })
}