import { useToast } from '@/hooks/use-toast'
import { authLogin } from '@/services/doug-dimadon/auth'
import AuthContext from '@/states/auth/contexts/AuthContext'
import { IUsuario } from '@/types'
import { HttpStatusCode } from 'axios'
import Cookies from 'js-cookie'
import { type ReactNode, useEffect, useState } from 'react'
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast()
  const [user, setUser] = useState<IUsuario | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isError, setIsError] = useState(false)

  const checkAuth = async () => {
    try {
      const cookies = Cookies.get()
      console.log('cookies :>> ', cookies)
      console.log('{user,isLoading,isAuthenticated,isError} :>>', {
        user,
        isLoading,
        isAuthenticated,
        isError
      })
      setIsError(false)
      if (cookies.token != null) {
        setIsLoading(true)
        setIsAuthenticated(true)
        return true
      }
      setIsAuthenticated(false)
      return false
    } catch (error) {
      console.error(error)
      setIsError(true)
      setIsAuthenticated(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }
  const login = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    try {
      const loginRes = await authLogin({ email, password })

      if (loginRes.status === HttpStatusCode.Forbidden) {
        setIsAuthenticated(false)
        toast({
          title: 'Credenciales incorrectas',
          variant: 'destructive'
        })
        return false
      }
      if (loginRes.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        setUser(loginRes.data.user)
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const logout = async () => {
    try {
      Cookies.remove('token')
      setIsAuthenticated(false)
      setUser(undefined)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    checkAuth()
  }, [])

  const value = {
    user,
    isError,
    isLoading,
    isAuthenticated,
    checkAuth,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
