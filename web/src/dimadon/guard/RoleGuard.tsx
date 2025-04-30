import { PUBLIC_ROUTES } from '@/dimadon/routes/public'
import useAuth from '@/dimadon/states/useAuth'
import { useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RoleGuard = ({ role }: { role: number }) => {
  const { user } = useAuth()
  const userRole = useMemo(() => user?.tipoUsuario.idTipoUsuario, [user])
  return userRole === role ? <Outlet /> : <Navigate to={PUBLIC_ROUTES.LOGIN} />
}

export default RoleGuard
