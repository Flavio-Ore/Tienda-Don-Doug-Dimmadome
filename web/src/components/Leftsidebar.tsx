import {
  FaBox,
  FaBoxes,
  FaBoxOpen,
  FaParachuteBox,
  FaStar,
  FaUserTag,
  FaUserTie
} from 'react-icons/fa'
import {
  FaHandHoldingDollar,
  FaMoneyBillTransfer,
  FaSackDollar,
  FaTableCellsRowLock,
  FaTruckPlane,
  FaTruckRampBox,
  FaUsersViewfinder
} from 'react-icons/fa6'

import { NavLink, useLocation } from 'react-router-dom'

import { loadFromLocalStorage } from '@/lib/local-storage'
import { cn } from '@/lib/utils'
import { IUsuario } from '@/types'
import { PRIVATE_ROUTES } from '@/values'
import LogoutDialog from '@components/LogoutDialog'
import { useMemo } from 'react'
import { FaUsersCog } from 'react-icons/fa'

const Leftsidebar = () => {
  const { pathname } = useLocation()

  const sessionUser = useMemo(
    () => loadFromLocalStorage<IUsuario>('CURRENT_USER'),
    []
  )

  return (
    <nav className='leftsidebar  min-h-dvh bg-dark-1'>
      <div className='flex flex-col gap-8'>
        <div className='w-full h-10 flex gap-x-2 justify-center items-center'>
          <img
            className='block w-8 mx-auto lg:m-0'
            src='/Stock_Image_of_Doug_Dimmadome_logo.png'
          />
          <h2 className='xl:text-2xl md:text-lg font-semibold relative hidden md:inline font-ubuntu'>
            Soluciones Dimadon
          </h2>
        </div>
        <hr className='w-full border-light-3' />
        <div className='w-full h-10 flex gap-x-2 justify-start items-center'>
          {sessionUser?.tipoUsuario.nombre === 'Administrador' && (
            <FaUserTie
              className='fill-amber-500'
              size={24}
              strokeWidth={1.25}
            />
          )}
          {/* <FaUser className='fill-stone-500' size={24} strokeWidth={1.25} /> */}
          <div>
            <p>{sessionUser != null ? sessionUser.nombre : 'Cargando...'}</p>
            <p
              className={cn('text-xs', {
                'text-amber-500':
                  sessionUser?.tipoUsuario.nombre === 'Administrador'
              })}
            >
              {sessionUser?.tipoUsuario.nombre}
            </p>
          </div>
        </div>
        <hr className='w-full border-light-3' />

        <ul className='flex flex-col gap-2'>
          <li className='flex flex-col justify-start'>
            <div className='inline-flex gap-x-2 items-center'>
              <FaBoxes className='fill-blue-500' size={24} />
              <h3 className='text-light-1 text-sm relative xl:text-lg font-ubuntu'>
                Inventario
              </h3>
            </div>
            <ul className='flex flex-col gap-y-2 mt-4'>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname === PRIVATE_ROUTES.INVENTORY
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.INVENTORY}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaTableCellsRowLock
                    size={24}
                    className='fill-blue-500'
                    strokeWidth={1.25}
                  />
                  <span className='relative xl:text-sm text-xs'>
                    Ver Kardexs
                  </span>
                </NavLink>
              </li>
              {/* <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(PRIVATE_ROUTES.CREATE_KARDEX)
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.CREATE_KARDEX}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaTable
                    size={24}
                    className='fill-blue-500'
                    strokeWidth={1.25}
                  />
                  <span className='relative xl:text-sm text-xs'>
                    Crear Kardex
                  </span>
                </NavLink>
              </li> */}
            </ul>
          </li>
          <hr className='w-full border-light-3 my-4' />
          <li className='flex flex-col justify-start'>
            <div className='inline-flex gap-x-2 items-center'>
              <FaBox className='fill-violet-500' size={24} strokeWidth={1.25} />

              <h3 className='text-light-1 text-sm relative xl:text-lg font-ubuntu'>
                Productos
              </h3>
            </div>
            <ul className='flex flex-col gap-y-2 mt-4'>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(PRIVATE_ROUTES.PRODUCTS)
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.PRODUCTS}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaBoxOpen
                    size={24}
                    strokeWidth={1.25}
                    className='fill-violet-500'
                  />
                  <span className='relative xl:text-sm text-xs'>
                    Productos Registrados
                  </span>
                </NavLink>
              </li>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(PRIVATE_ROUTES.ADD_PRODUCT)
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.ADD_PRODUCT}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaParachuteBox
                    size={24}
                    strokeWidth={1.25}
                    className='fill-violet-500'
                  />
                  <span className='relative xl:text-sm text-xs'>
                    Registrar Producto
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>

          <hr className='w-full border-light-3 my-4' />
          <li className='flex flex-col justify-start'>
            <div className='inline-flex gap-x-2 items-center'>
              <FaMoneyBillTransfer
                className='fill-lime-500'
                size={24}
                strokeWidth={1.25}
              />

              <h3 className='text-light-1 text-sm relative xl:text-lg font-ubuntu'>
                Movimientos
              </h3>
            </div>
            <ul className='flex flex-col gap-y-2 mt-4'>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(PRIVATE_ROUTES.BUY_PRODUCT)
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.BUY_PRODUCT}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaTruckRampBox
                    size={24}
                    strokeWidth={1.25}
                    className='fill-lime-500'
                  />
                  <span className='relative xl:text-sm text-xs'>
                    Comprar Producto
                  </span>
                </NavLink>
              </li>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(PRIVATE_ROUTES.SELL_PRODUCT)
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.SELL_PRODUCT}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaSackDollar size={24} className='fill-lime-500' />
                  <span className='relative xl:text-sm text-xs'>
                    Vender Producto
                  </span>
                </NavLink>
              </li>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(
                      PRIVATE_ROUTES.RETURN_PRODUCT
                    )
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.RETURN_PRODUCT}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaHandHoldingDollar
                    size={24}
                    strokeWidth={1.25}
                    className='fill-lime-500'
                  />
                  <span className='relative xl:text-sm text-xs'>
                    Devolución
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>

          <hr className='w-full border-light-3 my-4' />
          <li className='flex flex-col justify-start'>
            <div className='inline-flex gap-x-2 items-center'>
              <FaUsersViewfinder
                className='fill-teal-500'
                size={24}
                strokeWidth={1.25}
              />
              <h3 className='text-light-1 text-sm relative xl:text-lg font-ubuntu'>
                Usuarios
              </h3>
            </div>
            <ul className='flex flex-col gap-y-2 mt-4'>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(PRIVATE_ROUTES.PROVIDERS)
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.PROVIDERS}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaTruckPlane
                    size={24}
                    className='fill-teal-500'
                    strokeWidth={1.25}
                  />
                  <span className='relative xl:text-sm text-xs'>
                    Proveedores
                  </span>
                </NavLink>
              </li>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(PRIVATE_ROUTES.CLIENTS)
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.CLIENTS}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaUserTag
                    size={24}
                    strokeWidth={1.25}
                    className='fill-teal-500'
                  />
                  <span className='relative xl:text-sm text-xs'>Clientes</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <hr className='w-full border-light-3 my-4' />
          <li className='flex flex-col justify-start'>
            <div className='inline-flex gap-x-2 items-center'>
              <FaStar className='fill-amber-500' size={24} strokeWidth={1.25} />
              <h3 className='text-light-1 text-sm relative xl:text-lg font-ubuntu'>
                Administración
              </h3>
            </div>
            <ul className='flex flex-col gap-y-2 mt-4'>
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(PRIVATE_ROUTES.USERS)
                  }
                )}
              >
                <NavLink
                  to={PRIVATE_ROUTES.USERS}
                  className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                >
                  <FaUsersCog
                    size={24}
                    strokeWidth={1.25}
                    className='fill-amber-500'
                  />
                  <span className='relative xl:text-sm text-xs'>Usuarios</span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2 mt-28'>
        <div
          className='leftsidebar-link relative group base-regular 
                hover:bg-dark-4 before:block'
        >
          <LogoutDialog />
        </div>
      </div>
    </nav>
  )
}

export default Leftsidebar
