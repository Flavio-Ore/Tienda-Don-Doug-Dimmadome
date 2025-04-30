import { PUBLIC_ROUTES } from '@/dimadon/routes/public'
import useAuth from '@/dimadon/states/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to={PUBLIC_ROUTES.LOGIN} />
}

export default AuthGuard
