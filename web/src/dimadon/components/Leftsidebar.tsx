import LogoutDialog from '@/dimadon/components/LogoutDialog'
import { ADMIN_ROUTES } from '@/dimadon/routes/admin'
import { SESSION_ROUTES } from '@/dimadon/routes/session'
import { ROLE_TYPES } from '@/dimadon/services/roles'
import { loadFromLocalStorage } from '@/lib/local-storage'
import type { IUsuario } from '@/types'
import { cn } from '@/utils/cn'
import { useMemo } from 'react'
import {
  FaBox,
  FaBoxes,
  FaBoxOpen,
  FaParachuteBox,
  FaStar,
  FaUserNinja,
  FaUsersCog,
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
          <div>
            <div>
              <h2 className='xl:text-xl md:text-lg font-semibold relative hidden md:inline font-ubuntu'>
                Soluciones Dimmadon
              </h2>
              <p className='text-xs text-light-2'>Sistema de Inventario</p>
            </div>
          </div>
        </div>
        <hr className='w-full border-light-3' />
        <div className='w-full h-10 flex gap-x-2 justify-start items-center'>
          {sessionUser?.tipoUsuario.idTipoUsuario === ROLE_TYPES.ADMIN && (
            <FaUserTie
              className='fill-amber-500'
              size={24}
              strokeWidth={1.25}
            />
          )}
          {sessionUser?.tipoUsuario.idTipoUsuario === ROLE_TYPES.VENDOR && (
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
                'text-amber-500':
                  sessionUser?.tipoUsuario.idTipoUsuario === ROLE_TYPES.ADMIN
              })}
            >
              {sessionUser?.tipoUsuario.nombre}
            </p>
          </div>
        </div>
        <hr className='w-full border-light-3' />
        <ul className='flex flex-col gap-2'>
          {sessionUser?.tipoUsuario.idTipoUsuario === ROLE_TYPES.ADMIN && (
            <>
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
                        'bg-dark-3':
                          pathname === SESSION_ROUTES.INVENTORY.KARDEX
                      }
                    )}
                  >
                    <NavLink
                      to={SESSION_ROUTES.INVENTORY.KARDEX}
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
                </ul>
              </li>
              <hr className='w-full border-light-3 my-4' />
            </>
          )}

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
                    'bg-dark-3': pathname === SESSION_ROUTES.PRODUCTS.ROOT
                  }
                )}
              >
                <NavLink
                  to={SESSION_ROUTES.PRODUCTS.ROOT}
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
              {sessionUser?.tipoUsuario.idTipoUsuario === ROLE_TYPES.ADMIN && (
                <li
                  className={cn(
                    'leftsidebar-link relative group base-regular hover:bg-dark-4',
                    {
                      'bg-dark-3': pathname.includes(
                        SESSION_ROUTES.PRODUCTS.ADD
                      )
                    }
                  )}
                >
                  <NavLink
                    to={SESSION_ROUTES.PRODUCTS.ADD}
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
              )}
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
              {sessionUser?.tipoUsuario.idTipoUsuario === ROLE_TYPES.ADMIN && (
                <li
                  className={cn(
                    'leftsidebar-link relative group base-regular hover:bg-dark-4',
                    {
                      'bg-dark-3': pathname.includes(
                        SESSION_ROUTES.MOVEMENTS.BUY
                      )
                    }
                  )}
                >
                  <NavLink
                    to={SESSION_ROUTES.MOVEMENTS.BUY}
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
              )}
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(
                      SESSION_ROUTES.MOVEMENTS.SELL
                    )
                  }
                )}
              >
                <NavLink
                  to={SESSION_ROUTES.MOVEMENTS.SELL}
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
                      SESSION_ROUTES.MOVEMENTS.REFUND
                    )
                  }
                )}
              >
                <NavLink
                  to={SESSION_ROUTES.MOVEMENTS.REFUND}
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
              {sessionUser?.tipoUsuario.idTipoUsuario === ROLE_TYPES.ADMIN && (
                <li
                  className={cn(
                    'leftsidebar-link relative group base-regular hover:bg-dark-4',
                    {
                      'bg-dark-3': pathname.includes(
                        SESSION_ROUTES.USER.PROVIDERS
                      )
                    }
                  )}
                >
                  <NavLink
                    to={SESSION_ROUTES.USER.PROVIDERS}
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
              )}
              <li
                className={cn(
                  'leftsidebar-link relative group base-regular hover:bg-dark-4',
                  {
                    'bg-dark-3': pathname.includes(SESSION_ROUTES.USER.CLIENTS)
                  }
                )}
              >
                <NavLink
                  to={SESSION_ROUTES.USER.CLIENTS}
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

          {sessionUser?.tipoUsuario.idTipoUsuario === ROLE_TYPES.ADMIN && (
            <>
              <hr className='w-full border-light-3 my-4' />
              <li className='flex flex-col justify-start'>
                <div className='inline-flex gap-x-2 items-center'>
                  <FaStar
                    className='fill-amber-500'
                    size={24}
                    strokeWidth={1.25}
                  />
                  <h3 className='text-light-1 text-sm relative xl:text-lg font-ubuntu'>
                    Administración
                  </h3>
                </div>
                <ul className='flex flex-col gap-y-2 mt-4'>
                  <li
                    className={cn(
                      'leftsidebar-link relative group base-regular hover:bg-dark-4',
                      {
                        'bg-dark-3': pathname.includes(ADMIN_ROUTES.USERS)
                      }
                    )}
                  >
                    <NavLink
                      to={ADMIN_ROUTES.USERS}
                      className='flex gap-x-2 items-center justify-start px-2 py-4 xl:p-4'
                    >
                      <FaUsersCog
                        size={24}
                        strokeWidth={1.25}
                        className='fill-amber-500'
                      />
                      <span className='relative xl:text-sm text-xs'>
                        Usuarios
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}
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
