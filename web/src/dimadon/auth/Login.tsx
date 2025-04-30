import { SESSION_ROUTES } from '@/dimadon/routes/session'
import useAuth from '@/dimadon/states/useAuth'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const SigninForm = lazy(
  async () => await import('@/dimadon/auth/components/SigninForm')
)

const Login = () => {
  const { isAuthenticated, isAdmin } = useAuth()
  return isAuthenticated ? (
    <Navigate
      replace
      to={
        isAdmin
          ? SESSION_ROUTES.INVENTORY.KARDEX
          : SESSION_ROUTES.MOVEMENTS.SELL
      }
    />
  ) : (
    <section className='flex flex-1 items-center justify-center flex-col'>
      <SigninForm />
    </section>
  )
}

export default Login
