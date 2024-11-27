import useAuth from '@/states/auth/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <Navigate to='/inventario' />
  ) : (
    <section className='flex flex-1 items-center justify-center flex-col'>
      <Outlet />
    </section>
  )
}

export default Auth
