import { cn } from '@/lib/utils'
import { ADMIN_ROUTES } from '@/pages/routes/admin'
import { SESSION_ROUTES } from '@/pages/routes/session'
import useAuth from '@/states/auth/hooks/useAuth'
import { Button } from '@shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@shadcn/dropdown-menu'
import {
  FaBox,
  FaBoxes,
  FaBoxOpen,
  FaParachuteBox,
  FaStar,
  FaUsers,
  FaUsersCog,
  FaUserTag
} from 'react-icons/fa'
import {
  FaHandHoldingDollar,
  FaMoneyBillTransfer,
  FaSackDollar,
  FaTableCellsRowLock,
  FaTruckPlane,
  FaTruckRampBox
} from 'react-icons/fa6'
import { NavLink, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const { pathname } = useLocation()
  const { isAdmin } = useAuth()

  return (
    <section className='h-56 w-full md:hidden'>
      <ul className='z-50 fixed flex flex-wrap items-center justify-around w-full bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden custom-scrollbar'>
        {isAdmin && (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className={cn(
                    'inline-flex gap-x-2 items-center px-4 py-6 rounded-lg',
                    {
                      'bg-dark-4': pathname === SESSION_ROUTES.INVENTORY.KARDEX
                    }
                  )}
                >
                  <FaBoxes className='fill-blue-600' size={24} />
                  <h3 className='text-light-1 text-sm font-ubuntu'>
                    Inventario
                  </h3>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className={cn('cursor-pointer', {
                      'bg-dark-4': pathname === SESSION_ROUTES.INVENTORY.KARDEX
                    })}
                  >
                    <NavLink
                      to={SESSION_ROUTES.INVENTORY.KARDEX}
                      className={cn(
                        'flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                      )}
                    >
                      <FaTableCellsRowLock
                        size={24}
                        className='fill-blue-600'
                      />
                      <span className='text-sm'>Ver Kardexs</span>
                    </NavLink>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}

        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  'inline-flex gap-x-2 items-center px-4 py-6 rounded-lg',
                  {
                    'bg-dark-4':
                      pathname === SESSION_ROUTES.PRODUCTS.ROOT ||
                      pathname === SESSION_ROUTES.PRODUCTS.ADD
                  }
                )}
              >
                <FaBox
                  className='fill-violet-500'
                  size={24}
                  strokeWidth={1.25}
                />
                <h3 className='text-light-1 text-sm font-ubuntu'>Productos</h3>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                {isAdmin && (
                  <DropdownMenuItem
                    className={cn('cursor-pointer', {
                      'bg-dark-4': pathname === SESSION_ROUTES.PRODUCTS.ADD
                    })}
                  >
                    <NavLink
                      to={SESSION_ROUTES.PRODUCTS.ADD}
                      className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                    >
                      <FaParachuteBox size={24} className='fill-violet-500' />
                      <span className='text-sm'>Registrar Producto</span>
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === SESSION_ROUTES.PRODUCTS.ROOT
                  })}
                >
                  <NavLink
                    to={SESSION_ROUTES.PRODUCTS.ROOT}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaBoxOpen size={24} className='fill-violet-500' />
                    <span className='text-sm'>Ver Productos Registrados</span>
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  'inline-flex gap-x-2 items-center px-4 py-6 rounded-lg',
                  {
                    'bg-dark-4':
                      pathname === SESSION_ROUTES.MOVEMENTS.SELL ||
                      pathname === SESSION_ROUTES.MOVEMENTS.BUY ||
                      pathname === SESSION_ROUTES.MOVEMENTS.REFUND
                  }
                )}
              >
                <FaMoneyBillTransfer
                  className='fill-lime-500'
                  size={24}
                  strokeWidth={1.25}
                />
                <h3 className='text-light-1 text-sm font-ubuntu'>
                  Movimientos
                </h3>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                {isAdmin && (
                  <DropdownMenuItem
                    className={cn('cursor-pointer', {
                      'bg-dark-4': pathname === SESSION_ROUTES.MOVEMENTS.BUY
                    })}
                  >
                    <NavLink
                      to={SESSION_ROUTES.MOVEMENTS.BUY}
                      className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                    >
                      <FaTruckRampBox size={24} className='fill-lime-500' />
                      <span className='text-sm'>Comprar producto</span>
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === SESSION_ROUTES.MOVEMENTS.SELL
                  })}
                >
                  <NavLink
                    to={SESSION_ROUTES.MOVEMENTS.SELL}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaSackDollar size={24} className='fill-lime-500' />
                    <span className='text-sm'>Vender producto</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === SESSION_ROUTES.MOVEMENTS.REFUND
                  })}
                >
                  <NavLink
                    to={SESSION_ROUTES.MOVEMENTS.REFUND}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaHandHoldingDollar size={24} className='fill-lime-500' />
                    <span className='text-sm'>Devolución</span>
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  'inline-flex gap-x-2 items-center px-4 py-6 rounded-lg',
                  {
                    'bg-dark-4':
                      pathname === SESSION_ROUTES.USER.PROVIDERS ||
                      pathname === SESSION_ROUTES.USER.CLIENTS
                  }
                )}
              >
                <FaUsers
                  className='fill-sky-500'
                  size={24}
                  strokeWidth={1.25}
                />
                <h3 className='text-light-1 text-sm font-ubuntu'>Usuarios</h3>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                {isAdmin && (
                  <DropdownMenuItem
                    className={cn('cursor-pointer', {
                      'bg-dark-4': pathname === SESSION_ROUTES.USER.PROVIDERS
                    })}
                  >
                    <NavLink
                      to={SESSION_ROUTES.USER.PROVIDERS}
                      className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                    >
                      <FaTruckPlane size={24} className='fill-sky-500' />
                      <span className='text-sm'>Proovedores</span>
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === SESSION_ROUTES.USER.CLIENTS
                  })}
                >
                  <NavLink
                    to={SESSION_ROUTES.USER.CLIENTS}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaUserTag size={24} className='fill-sky-500' />
                    <span className='text-sm'>Clientes</span>
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className={cn(
                    'inline-flex gap-x-2 items-center px-4 py-6 rounded-lg',
                    {
                      'bg-dark-4': pathname === ADMIN_ROUTES.USERS
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
                      'bg-dark-4': pathname === ADMIN_ROUTES.USERS
                    })}
                  >
                    <NavLink
                      to={ADMIN_ROUTES.USERS}
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
          )}
        </li>
      </ul>
    </section>
  )
}

export default Bottombar
