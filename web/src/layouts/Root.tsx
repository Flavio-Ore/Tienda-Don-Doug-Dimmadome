import Bottombar from '@/components/Bottombar'
import Leftsidebar from '@/components/Leftsidebar'
import Topsidebar from '@/components/Topsidebar'
import useInventory from '@/states/inventory/hooks/useInventory'
import { Navigate, Outlet } from 'react-router-dom'

const Root = () => {
  const { login } = useInventory()

  return login.isLogged ? (
    <div className='relative w-full md:flex'>
      <Leftsidebar />
      <Topsidebar />
      <div className='flex flex-1 w-full justify-center'>
        <Outlet />
      </div>
      <Bottombar />
    </div>
  ) : (
    <Navigate to='/' />
  )
}

export default Root
