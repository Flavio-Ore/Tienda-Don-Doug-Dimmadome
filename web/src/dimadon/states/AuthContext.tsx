import type { IAuthContext } from '@/types'
import { createContext } from 'react'

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  isError: false,
  isLoading: false,
  isAdmin: false,
  isAuthenticated: false,
  checkAuth: async () => false,
  login: async () => false,
  logout: async () => {}
})
AuthContext.displayName = 'AuthContext'
export default AuthContext
