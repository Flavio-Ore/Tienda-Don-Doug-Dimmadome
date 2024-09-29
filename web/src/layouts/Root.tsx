import Leftsidebar from '@/components/Leftsidebar'
import Topsidebar from '@/components/Topsidebar'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='w-full md:flex bg-dark-2'>
      <Leftsidebar />
      <div className='flex flex-col w-full'>
        <Topsidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Root
