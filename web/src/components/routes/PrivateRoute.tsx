import useAuth from '@/states/auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  return children
}

export default PrivateRoute
