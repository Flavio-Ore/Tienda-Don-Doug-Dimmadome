import { createKardex } from '@/api/kardex'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: async () => {}
  })
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: async () => {}
  })
}

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {}
  })
}

export const useCreateKardex = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => createKardex({
      date: new Date().toISOString(),
      name: 'new product',
      price: 0,
      stock: 0
    })
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: ['KARDEX']
      })
    }
  })
}

export const useCreateMovement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {}
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: ['KARDEX']
      })
    }
  })
}
export const useUpdateMovement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {}
    onSuccess: success => {
      if (success != null) {
        void queryClient.refetchQueries({
          queryKey: ['KARDEX']
        })      
      }
    }
  })
}

export const useDeleteMovement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {}
    onSuccess: success => {
      if (success != null) {
        void queryClient.refetchQueries({
          queryKey: ['KARDEX']
        })      
      }
    }
  })
}