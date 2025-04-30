import Bottombar from '@/dimadon/components/Bottombar'
import Leftsidebar from '@/dimadon/components/Leftsidebar'
import Topsidebar from '@/dimadon/components/Topsidebar'
import { Outlet } from 'react-router-dom'

const Dimadon = () => {
  return (
    <div className='relative w-full md:flex'>
      <Leftsidebar />
      <Topsidebar />
      <div className='flex flex-1 w-full justify-center'>
        <Outlet />
      </div>
      <Bottombar />
    </div>
  )
}

export default Dimadon
