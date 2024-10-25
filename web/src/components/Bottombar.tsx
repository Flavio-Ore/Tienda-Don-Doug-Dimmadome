import { NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { PRIVATE_ROUTES } from '@/values'
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
  FaTable,
  FaUsers,
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
  return (
    <section className='h-56 w-full md:hidden'>
      <ul className='z-50 fixed flex flex-wrap items-center justify-around w-full bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden custom-scrollbar'>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  'inline-flex gap-x-2 items-center px-4 py-6 rounded-lg',
                  {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.CREATE_KARDEX)
                  }
                )}
              >
                <FaBoxes className='fill-blue-600' size={24} />
                <h3 className='text-light-1 text-sm font-ubuntu'>Inventario</h3>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname === PRIVATE_ROUTES.INVENTORY
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.INVENTORY}
                    className={cn(
                      'flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                    )}
                  >
                    <FaTableCellsRowLock size={24} className='fill-blue-600' />
                    <span className='text-sm'>Ver Kardexs</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.CREATE_KARDEX)
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.CREATE_KARDEX}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaTable size={24} className='fill-blue-600' />
                    <span className='text-sm'>Crear Kardex</span>
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
                      pathname.includes(PRIVATE_ROUTES.REGISTERED_PRODUCTS) ||
                      pathname.includes(PRIVATE_ROUTES.ADD_PRODUCT)
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
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.ADD_PRODUCT)
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.ADD_PRODUCT}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaParachuteBox size={24} className='fill-violet-500' />
                    <span className='text-sm'>Registrar Producto</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(
                      PRIVATE_ROUTES.REGISTERED_PRODUCTS
                    )
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.REGISTERED_PRODUCTS}
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
                      pathname.includes(PRIVATE_ROUTES.SELL_PRODUCT) ||
                      pathname.includes(PRIVATE_ROUTES.BUY_PRODUCT) ||
                      pathname.includes(PRIVATE_ROUTES.RETURN_PRODUCT)
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
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.BUY_PRODUCT)
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.BUY_PRODUCT}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaTruckRampBox size={24} className='fill-lime-500' />
                    <span className='text-sm'>Comprar producto</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.SELL_PRODUCT)
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.SELL_PRODUCT}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaSackDollar size={24} className='fill-lime-500' />
                    <span className='text-sm'>Vender producto</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(
                      PRIVATE_ROUTES.RETURN_PRODUCT
                    )
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.RETURN_PRODUCT}
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
                      pathname.includes(PRIVATE_ROUTES.PROVIDERS) ||
                      pathname.includes(PRIVATE_ROUTES.CLIENTS)
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
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.PROVIDERS)
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.PROVIDERS}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <FaTruckPlane size={24} className='fill-sky-500' />
                    <span className='text-sm'>Proovedores</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes(PRIVATE_ROUTES.CLIENTS)
                  })}
                >
                  <NavLink
                    to={PRIVATE_ROUTES.CLIENTS}
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
      </ul>
    </section>
  )
}

export default Bottombar
