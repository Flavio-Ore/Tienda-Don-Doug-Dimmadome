import useInventory from '@/states/inventory/hooks/useInventory'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const { login } = useInventory()

  return login.isLogged ? (
    <Navigate to='/inventario' />
  ) : (
    <section className='flex flex-1 items-center justify-center flex-col'>
      <Outlet />
    </section>
  )
}

export default Auth
