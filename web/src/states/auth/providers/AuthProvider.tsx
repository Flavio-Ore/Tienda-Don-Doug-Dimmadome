import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage
} from '@/lib/local-storage'
import {
  loadFromsessionStorage,
  removeFromSessionStorage,
  saveToSessionStorage
} from '@/lib/session-storage'
import { authLogin } from '@/services/doug-dimadon/auth'
import AuthContext from '@/states/auth/contexts/AuthContext'
import type { IUsuario } from '@/types'
import { HttpStatusCode } from 'axios'
import { type ReactNode, useEffect, useState } from 'react'
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUsuario | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isError, setIsError] = useState(false)

  const checkAuth = async () => {
    try {
      setIsLoading(true)
      setIsError(false)

      const token = loadFromsessionStorage('token')
      const storedUser = loadFromLocalStorage<IUsuario>('CURRENT_USER')

      console.log('token fromSession:>> ', token)
      console.log('BEFORE {user,isLoading,isAuthenticated,isError} :>>', {
        user: storedUser,
        isLoading,
        isAuthenticated,
        isError
      })

      if (token != null && storedUser != null) {
        console.log('AFTER {user,isLoading,isAuthenticated,isError} :>>', {
          user: storedUser,
          isLoading,
          isAuthenticated,
          isError
        })
        setIsAdmin(storedUser.tipoUsuario.idTipoUsuario === 1)

        setIsAuthenticated(true)
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
      console.log('loginResponse: ', loginRes)

      saveToSessionStorage('token', loginRes.data.token)

      if (loginRes.data.token != null) {
        console.log('loginRes.data.token === token :>> ', true)
      } else {
        console.log('loginRes.data.token === token :>> ', false)
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
        setIsAdmin(loginRes.data.usuario.tipoUsuario.idTipoUsuario === 1)
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

  const logout = () => {
    try {
      removeFromSessionStorage('token')
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
