import useAuth from '@/states/auth/hooks/useAuth'
import { ROUTES } from '@/values/routes'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const { isAuthenticated, isAdmin } = useAuth()

  return isAuthenticated ? (
    <Navigate
      to={
        isAdmin
          ? ROUTES.PRIVATE.INVENTORY.KARDEX
          : ROUTES.PRIVATE.MOVEMENTS.SELL
      }
    />
  ) : (
    <section className='flex flex-1 items-center justify-center flex-col'>
      <Outlet />
    </section>
  )
}

export default Auth
