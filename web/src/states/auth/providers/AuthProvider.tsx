import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage
} from '@/lib/local-storage'
import { authLogin } from '@/services/doug-dimadon/auth'
import AuthContext from '@/states/auth/contexts/AuthContext'
import { IUsuario } from '@/types'
import { HttpStatusCode } from 'axios'
import Cookies from 'js-cookie'
import { type ReactNode, useEffect, useState } from 'react'
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUsuario | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isError, setIsError] = useState(false)

  const checkAuth = async () => {
    try {
      const cookies = Cookies.get('token')
      console.log('cookies :>> ', cookies)
      console.log('BEFORE {user,isLoading,isAuthenticated,isError} :>>', {
        user,
        isLoading,
        isAuthenticated,
        isError
      })
      setIsError(false)
      if (cookies != null) {
        setIsLoading(true)
        setIsAuthenticated(true)
        const user = loadFromLocalStorage<IUsuario>('CURRENT_USER')
        if (user != null) {
          setIsAuthenticated(false)
          return false
        }
        console.log('AFTER {user,isLoading,isAuthenticated,isError} :>>', {
          user,
          isLoading,
          isAuthenticated,
          isError
        })
        return true
      }
      removeFromLocalStorage('CURRENT_USER')
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
    contrasena: password
  }: {
    email: string
    contrasena: string
  }) => {
    try {
      setIsLoading(true)
      const loginRes = await authLogin({ email, contrasena: password })
      console.log({
        loginRes
      })

      const cookies = Cookies.get()

      console.log('loginResponse: ', loginRes)
      console.log('cookies :>> ', cookies)

      if (loginRes.data.token === cookies.token) {
        console.log('loginRes.data.token === cookies.token :>> ', true)
      } else {
        console.log('loginRes.data.token === cookies.token :>> ', false)
      }

      if (loginRes.status === HttpStatusCode.Forbidden) {
        setIsAuthenticated(false)
        return false
      }
      if (loginRes.status === HttpStatusCode.Unauthorized) {
        setIsAuthenticated(false)
        return false
      }
      if (loginRes.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        saveToLocalStorage('CURRENT_USER', loginRes.data.usuario)
        setIsAdmin(loginRes.data.usuario.tipoUsuario.nombre === 'Administrador')
        setUser(loginRes.data.usuario)
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      Cookies.remove('token')
      setIsAuthenticated(false)
      removeFromLocalStorage('CURRENT_USER')
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
    isAdmin,
    isAuthenticated,
    checkAuth,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
