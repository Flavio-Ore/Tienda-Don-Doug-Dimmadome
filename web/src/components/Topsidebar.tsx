import { loadFromLocalStorage } from '@/lib/local-storage'
import { cn } from '@/lib/utils'
import type { IUsuario } from '@/types'

import useAuth from '@/states/auth/hooks/useAuth'
import { ROUTES } from '@/values/routes'
import { Button } from '@shadcn/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@shadcn/dropdown-menu'
import { useMemo } from 'react'
import { FaAngleDown, FaUserNinja, FaUserTie } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'

const Topsidebar = () => {
  const { logout } = useAuth()
  const nagivate = useNavigate()

  const sessionUser = useMemo(
    () => loadFromLocalStorage<IUsuario>('CURRENT_USER'),
    []
  )
  const handleLogout = () => {
    logout()
    nagivate(ROUTES.PUBLIC.LOGIN)
  }
  return (
    <section className='sticky top-0 z-50 md:hidden bg-dark-2 w-full '>
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <div className='w-full h-10 flex gap-x-2 justify-start items-center'>
            <img
              className='block w-8 mx-auto lg:m-0'
              src='/Stock_Image_of_Doug_Dimmadome_logo.png'
            />
            <div>
              <p className='sm:text-lg text-sm font-bold font-ubuntu'>
                Soluciones Dimmadome
              </p>
              <p className='text-xs text-light-1'>Sistema de Inventario</p>
            </div>
          </div>
        </Link>

        <div className='flex items-center justify-end'>
          <div className='w-full h-10 flex gap-x-2 justify-start items-center'>
            {sessionUser?.tipoUsuario.idTipoUsuario === 1 && (
              <FaUserTie
                className='fill-amber-500'
                size={24}
                strokeWidth={1.25}
              />
            )}
            {sessionUser?.tipoUsuario.idTipoUsuario === 2 && (
              <FaUserNinja
                className='fill-amber-500'
                size={24}
                strokeWidth={1.25}
              />
            )}
            <div>
              <p>{sessionUser != null ? sessionUser.nombre : 'Cargando...'}</p>
              <p
                className={cn('text-xs', {
                  'text-amber-500': sessionUser?.tipoUsuario.idTipoUsuario === 1
                })}
              >
                {sessionUser?.tipoUsuario.nombre}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='inline-flex gap-x-2 items-center px-4 py-6 rounded-lg'
              >
                <FaAngleDown size={24} className='fill-light-2' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button variant='ghost' onClick={() => handleLogout()}>
                    <div className='flex-center gap-x-2'>
                      <span className='focus-visible:text-light-1'>
                        Cerrar Sesión
                      </span>
                      <ImExit
                        size={16}
                        className='fill-red-600 group-hover:stroke-red-700 focus-visible:stroke-red-800'
                      />
                    </div>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  )
}

export default Topsidebar
