import { NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'
import useAuth from '@/states/auth/hooks/useAuth'
import { ROUTES } from '@/values'
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
                      'bg-dark-4': pathname === ROUTES.PRIVATE.INVENTORY.KARDEX
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
                      'bg-dark-4': pathname === ROUTES.PRIVATE.INVENTORY.KARDEX
                    })}
                  >
                    <NavLink
                      to={ROUTES.PRIVATE.INVENTORY.KARDEX}
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
                      pathname === ROUTES.PRIVATE.PRODUCTS.ROOT ||
                      pathname === ROUTES.PRIVATE.PRODUCTS.ADD
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
                      'bg-dark-4': pathname === ROUTES.PRIVATE.PRODUCTS.ADD
                    })}
                  >
                    <NavLink
                      to={ROUTES.PRIVATE.PRODUCTS.ADD}
                      className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                    >
                      <FaParachuteBox size={24} className='fill-violet-500' />
                      <span className='text-sm'>Registrar Producto</span>
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === ROUTES.PRIVATE.PRODUCTS.ROOT
                  })}
                >
                  <NavLink
                    to={ROUTES.PRIVATE.PRODUCTS.ROOT}
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
                      pathname === ROUTES.PRIVATE.MOVEMENTS.SELL ||
                      pathname === ROUTES.PRIVATE.MOVEMENTS.BUY ||
                      pathname === ROUTES.PRIVATE.MOVEMENTS.REFUND
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
                      'bg-dark-4': pathname === ROUTES.PRIVATE.MOVEMENTS.BUY
                    })}
                  >
                    <NavLink
                      to={ROUTES.PRIVATE.MOVEMENTS.BUY}
                      className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                    >
                      <FaTruckRampBox size={24} className='fill-lime-500' />
                      <span className='text-sm'>Comprar producto</span>
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === ROUTES.PRIVATE.MOVEMENTS.SELL
                  })}
                >
                  <NavLink
                    to={ROUTES.PRIVATE.MOVEMENTS.SELL}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaSackDollar size={24} className='fill-lime-500' />
                    <span className='text-sm'>Vender producto</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === ROUTES.PRIVATE.MOVEMENTS.REFUND
                  })}
                >
                  <NavLink
                    to={ROUTES.PRIVATE.MOVEMENTS.REFUND}
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
                      pathname === ROUTES.PRIVATE.USER.PROVIDERS ||
                      pathname === ROUTES.PRIVATE.USER.CLIENTS
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
                      'bg-dark-4': pathname === ROUTES.PRIVATE.USER.PROVIDERS
                    })}
                  >
                    <NavLink
                      to={ROUTES.PRIVATE.USER.PROVIDERS}
                      className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                    >
                      <FaTruckPlane size={24} className='fill-sky-500' />
                      <span className='text-sm'>Proovedores</span>
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === ROUTES.PRIVATE.USER.CLIENTS
                  })}
                >
                  <NavLink
                    to={ROUTES.PRIVATE.USER.CLIENTS}
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
                      'bg-dark-4': pathname === ROUTES.PRIVATE.ADMIN.USERS
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
                      'bg-dark-4': pathname === ROUTES.PRIVATE.ADMIN.USERS
                    })}
                  >
                    <NavLink
                      to={ROUTES.PRIVATE.ADMIN.USERS}
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
