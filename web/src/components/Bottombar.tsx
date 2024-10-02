import { LuPackageOpen } from 'react-icons/lu'
import { PiPackage } from 'react-icons/pi'
import { TbCubePlus, TbPackages, TbTable, TbTablePlus } from 'react-icons/tb'
import { NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export const Bottombar = () => {
  const { pathname } = useLocation()
  return (
    <section className={cn('')}>
      <ul className='z-50 flex items-center justify-between w-full fixed bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden'>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className={cn(
                  'inline-flex gap-x-2 items-center px-4 py-6 rounded-lg',
                  {
                    'bg-dark-4':
                      pathname.includes('kardex-registrados') ||
                      pathname.includes('crear-kardex')
                  }
                )}
              >
                <PiPackage className='fill-navigating' size={24} />
                <h3 className='text-light-1 text-sm'>Inventario</h3>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes('kardex-registrados')
                  })}
                >
                  <NavLink
                    to={'/inventario/kardex-registrados'}
                    className={cn(
                      'flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                    )}
                  >
                    <TbTable size={24} className='stroke-blue-400' />
                    <span className='text-sm'>Ver Kardexs</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes('crear-kardex')
                  })}
                >
                  <NavLink
                    to={'/inventario/crear-kardex'}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <TbTablePlus size={24} className='stroke-blue-400' />
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
                      pathname.includes('registrar-producto') ||
                      pathname.includes('productos-registrados')
                  }
                )}
              >
                <LuPackageOpen
                  className='stroke-navigating'
                  size={24}
                  strokeWidth={1.25}
                />
                <h3 className='text-light-1 text-sm'>Productos</h3>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes('registrar-producto')
                  })}
                >
                  <NavLink
                    to={'/inventario/registrar-producto'}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <TbCubePlus size={24} className='stroke-blue-400' />
                    <span className='text-sm'>Registrar Producto</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn('cursor-pointer', {
                    'bg-dark-4': pathname.includes('productos-registrados')
                  })}
                >
                  <NavLink
                    to={'/inventario/productos-registrados'}
                    className='flex w-full justify gap-x-2 justify-start items-center py-4 xl:p-4'
                  >
                    <TbPackages size={24} className='stroke-blue-400' />
                    <span className='text-sm'>Ver Productos Registrados</span>
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
