import { SESSION_ROUTES } from '@/pages/routes/session'
import useAuth from '@/states/auth/hooks/useAuth'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Login = lazy(async () => await import('@pages/login/Login'))

const Auth = () => {
  const { isAuthenticated, isAdmin } = useAuth()

  return isAuthenticated ? (
    <Navigate
      to={
        isAdmin
          ? SESSION_ROUTES.INVENTORY.KARDEX
          : SESSION_ROUTES.MOVEMENTS.SELL
      }
    />
  ) : (
    <section className='flex flex-1 items-center justify-center flex-col'>
      <Login />
    </section>
  )
}

export default Auth
