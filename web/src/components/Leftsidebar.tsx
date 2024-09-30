import { FaTruckFast } from 'react-icons/fa6'
import { GoPackage } from 'react-icons/go'
import { ImExit } from 'react-icons/im'
import { TbPackages } from 'react-icons/tb'
import { NavLink, useNavigate } from 'react-router-dom'
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
  const navigation = useNavigate()
  const handleLogout = async () => {
    navigation('/')
  }
  return (
    <nav className='leftsidebar min-w-[15dvw] min-h-dvh bg-dark-1'>
      <div className='flex flex-col gap-8'>
        <h2 className='text-2xl font-semibold text-center'>Menú</h2>
        <ul className='flex flex-col gap-2 text-lg'>
          <li
            className='leftsidebar-link relative group base-regular 
                hover:bg-dark-4'
          >
            <NavLink
              to={'/inventario'}
              className='flex gap-x-2 justify-center xl:justify-start items-center py-4 xl:p-4'
            >
              <TbPackages
                size={24}
                className='stroke-blue-400'
                strokeWidth={1}
              />
              <span className='relative hidden xl:inline'>
                Kardexs de Inventario
              </span>
            </NavLink>
          </li>
          <li
            className='leftsidebar-link relative group base-regular 
                hover:hover:bg-dark-4'
          >
            <NavLink
              to={'/inventario/nuevo-producto'}
              className='flex gap-x-2 justify-center xl:justify-start items-center py-4 xl:p-4'
            >
              <GoPackage size={24} className='fill-blue-300' />
              <span className='relative hidden xl:inline'>Crear Kardex</span>
            </NavLink>
          </li>
          {/* <li
            className='leftsidebar-link relative group base-regular 
                hover:bg-dark-4 before:block before:bg-secure before:absolute before:-inset-0.5 before:-left-16 before:w-[50px] before:rounded-full'
          >
            <NavLink
              to={'/inventario'}
              className='flex gap-x-2 justify-center xl:justify-start items-center py-4 xl:p-4'
            >
              <GrUserWorker size={24} className='stroke-yellow-500' />
              <span className='relative hidden xl:inline'>Ver Recibos</span>
            </NavLink>
          </li> */}
          <li
            className='leftsidebar-link relative group base-regular 
                group-hover:bg-dark-4'
          >
            <NavLink
              to={'/inventario/proveedores'}
              className='flex gap-x-2 justify-center xl:justify-start items-center py-4 xl:p-4'
            >
              <FaTruckFast size={24} className='fill-red-600' />
              <span className='relative hidden xl:inline'>Provedoores</span>
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
              <div className='flex gap-x-2 justify-center xl:justify-start items-center py-4 xl:p-4 cursor-pointer focus-visible:border-light-1'>
                <ImExit
                  size={24}
                  className='fill-red-500 group-hover:stroke-red-500'
                />
                <span className='hidden xl:inline group-hover:text-light-2 small-regular'>
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
                <AlertDialogAction onClick={handleLogout}>
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
