import Leftsidebar from '@/components/Leftsidebar'
import Topsidebar from '@/components/Topsidebar'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='flex gap-x-8'>
      <Topsidebar />
      <Leftsidebar />
      <Outlet />
    </div>
  )
}

export default Root
