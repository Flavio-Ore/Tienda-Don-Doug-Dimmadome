import { ImExit } from 'react-icons/im'
import { LuPackageOpen } from 'react-icons/lu'
import { PiPackage } from 'react-icons/pi'
import { TbCubePlus, TbPackages, TbTable, TbTablePlus } from 'react-icons/tb'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils'
import useInventory from '@/states/inventory/hooks/useInventory'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'

const Leftsidebar = () => {
  const { pathname } = useLocation()

  const { setLogin } = useInventory()
  const navigation = useNavigate()
  const handleLogout = () => {
    setLogin({
      email: '',
      password: '',
      isLogged: false
    })
    navigation('/')
  }
  return (
    <nav className='leftsidebar min-w-[15dvw] min-h-dvh bg-dark-1'>
      <div className='flex flex-col gap-8'>
        <div className='w-full h-16 flex gap-x-2 justify-start items-center'>
          <h2 className='text-2xl font-semibold relative hidden xl:inline'>
            Operaciones
          </h2>
          <img
            className='block w-8 mx-auto xl:m-0'
            src='/Stock_Image_of_Doug_Dimmadome_logo.png'
          />
        </div>
        <hr className='w-full border-light-3' />
        <ul className='flex flex-col gap-2'>
          <li className='inline-flex gap-x-2 items-center'>
            <PiPackage className='fill-navigating' size={24} />
            <h3 className='text-light-1 text-sm relative xl:text-lg'>
              Inventario
            </h3>
          </li>
          <li
            className={cn(
              'leftsidebar-link relative group base-regular hover:bg-dark-4',
              {
                'bg-dark-4': pathname.includes('kardex-registrados')
              }
            )}
          >
            <NavLink
              to={'/inventario/kardex-registrados'}
              className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
            >
              <TbTable size={24} className='stroke-blue-400' />
              <span className='relative xl:text-sm text-xs'> Ver Kardexs</span>
            </NavLink>
          </li>
          <li
            className={cn(
              'leftsidebar-link relative group base-regular hover:bg-dark-4',
              {
                'bg-dark-4': pathname.includes('crear-kardex')
              }
            )}
          >
            <NavLink
              to={'/inventario/crear-kardex'}
              className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
            >
              <TbTablePlus size={24} className='stroke-blue-400' />
              <span className='relative xl:text-sm text-xs'> Crear Kardex</span>
            </NavLink>
          </li>
          <hr className='w-full border-light-3 my-4' />
          <li className='inline-flex gap-x-2 items-center'>
            <LuPackageOpen
              className='stroke-navigating'
              size={24}
              strokeWidth={1.25}
            />

            <h3 className='text-light-1 text-sm relative xl:text-lg'>
              Productos
            </h3>
          </li>
          <li
            className={cn(
              'leftsidebar-link relative group base-regular hover:bg-dark-4',
              {
                'bg-dark-4': pathname.includes('registrar-producto')
              }
            )}
          >
            <NavLink
              to={'/inventario/registrar-producto'}
              className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
            >
              <TbCubePlus size={24} className='stroke-blue-400' />
              <span className='relative xl:text-sm text-xs'>
                Registrar Producto
              </span>
            </NavLink>
          </li>
          <li
            className={cn(
              'leftsidebar-link relative group base-regular hover:bg-dark-4',
              {
                'bg-dark-4': pathname.includes('productos-registrados')
              }
            )}
          >
            <NavLink
              to={'/inventario/productos-registrados'}
              className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
            >
              <TbPackages
                size={24}
                strokeWidth={1.25}
                className='stroke-blue-400'
              />
              <span className='relative xl:text-sm text-xs'>
                Ver Productos Registrados
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2 mt-12'>
        <div
          className='leftsidebar-link relative group base-regular 
                hover:bg-dark-4 before:block'
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className='flex gap-x-2 justify-start items-center p-4 cursor-pointer focus-visible:border-light-1'>
                <ImExit
                  size={24}
                  className='fill-red-500 group-hover:stroke-red-500'
                />
                <span className='relative xl:text-sm text-xs'>
                  Cerrar Sesión
                </span>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cerrar Sesión</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro que deseas cerrar sesión?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  <div className='flex-center gap-x-2'>
                    <span className='focus-visible:text-light-1'>
                      Cerrar Sesión
                    </span>
                    <ImExit
                      size={16}
                      className='fill-red-600 group-hover:stroke-red-700 focus-visible:stroke-red-800'
                    />
                  </div>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </nav>
  )
}

export default Leftsidebar
