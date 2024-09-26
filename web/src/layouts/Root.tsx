import Leftsidebar from '@/components/Leftsidebar'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='flex gap-x-8'>
      <Leftsidebar />
      <Outlet />
    </div>
  )
}

export default Root
