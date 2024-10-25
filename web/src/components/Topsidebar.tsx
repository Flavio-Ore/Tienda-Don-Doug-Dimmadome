import { cn } from '@/lib/utils'
import { PRIVATE_ROUTES } from '@/values'
import LogoutDialog from '@components/LogoutDialog'
import { Button } from '@shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@shadcn/dropdown-menu'
import { FaStar, FaUsersCog } from 'react-icons/fa'
import { FaGears } from 'react-icons/fa6'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Topsidebar = () => {
  const { pathname } = useLocation()
  return (
    <section className='sticky top-0 z-50 md:hidden bg-dark-2 w-full'>
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <div className='w-full h-10 flex gap-x-2 justify-start items-center'>
            <img
              className='block w-8 mx-auto lg:m-0'
              src='/Stock_Image_of_Doug_Dimmadome_logo.png'
            />
            <h2 className='text-md xs:text-2xl font-semibold relative font-ubuntu'>
              Operaciones
            </h2>
            <FaGears className='fill-stone-500' size={24} strokeWidth={1.25} />
          </div>
        </Link>

        <div className='flex items-center justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  'inline-flex gap-x-2 items-center px-4 py-6 rounded-lg',
                  {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.USERS)
                  }
                )}
              >
                <FaStar
                  className='fill-amber-500'
                  size={24}
                  strokeWidth={1.25}
                />
                <h3 className='text-light-1 xs:block xs:text-sm hidden font-ubuntu'>
                  Administración
                </h3>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.USERS)
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.USERS}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaUsersCog
                      size={24}
                      strokeWidth={1.25}
                      className='fill-amber-500'
                    />
                    <span className='text-sm'>Clientes</span>
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <LogoutDialog />
        </div>
      </div>
    </section>
  )
}

export default Topsidebar
