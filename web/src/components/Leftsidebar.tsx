import {
  FaBox,
  FaBoxes,
  FaBoxOpen,
  FaParachuteBox,
  FaStar,
  FaUserNinja,
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
import { ROUTES } from '@/values'
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
        <hr className='w-full border-light-3' />
        <ul className='flex flex-col gap-2'>
          {sessionUser?.tipoUsuario.idTipoUsuario === 1 && (
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
                          pathname === ROUTES.PRIVATE.INVENTORY.KARDEX
                      }
                    )}
                  >
                    <NavLink
                      to={ROUTES.PRIVATE.INVENTORY.KARDEX}
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
                    'bg-dark-3': pathname === ROUTES.PRIVATE.PRODUCTS.ROOT
                  }
                )}
              >
                <NavLink
                  to={ROUTES.PRIVATE.PRODUCTS.ROOT}
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
              {sessionUser?.tipoUsuario.idTipoUsuario === 1 && (
                <li
                  className={cn(
                    'leftsidebar-link relative group base-regular hover:bg-dark-4',
                    {
                      'bg-dark-3': pathname.includes(
                        ROUTES.PRIVATE.PRODUCTS.ADD
                      )
                    }
                  )}
                >
                  <NavLink
                    to={ROUTES.PRIVATE.PRODUCTS.ADD}
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
              {sessionUser?.tipoUsuario.idTipoUsuario === 1 && (
                <li
                  className={cn(
                    'leftsidebar-link relative group base-regular hover:bg-dark-4',
                    {
                      'bg-dark-3': pathname.includes(
                        ROUTES.PRIVATE.MOVEMENTS.BUY
                      )
                    }
                  )}
                >
                  <NavLink
                    to={ROUTES.PRIVATE.MOVEMENTS.BUY}
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
                      ROUTES.PRIVATE.MOVEMENTS.SELL
                    )
                  }
                )}
              >
                <NavLink
                  to={ROUTES.PRIVATE.MOVEMENTS.SELL}
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
                      ROUTES.PRIVATE.MOVEMENTS.REFUND
                    )
                  }
                )}
              >
                <NavLink
                  to={ROUTES.PRIVATE.MOVEMENTS.REFUND}
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
              {sessionUser?.tipoUsuario.idTipoUsuario === 1 && (
                <li
                  className={cn(
                    'leftsidebar-link relative group base-regular hover:bg-dark-4',
                    {
                      'bg-dark-3': pathname.includes(
                        ROUTES.PRIVATE.USER.PROVIDERS
                      )
                    }
                  )}
                >
                  <NavLink
                    to={ROUTES.PRIVATE.USER.PROVIDERS}
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
                    'bg-dark-3': pathname.includes(ROUTES.PRIVATE.USER.CLIENTS)
                  }
                )}
              >
                <NavLink
                  to={ROUTES.PRIVATE.USER.CLIENTS}
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

          {sessionUser?.tipoUsuario.idTipoUsuario === 1 && (
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
                        'bg-dark-3': pathname.includes(
                          ROUTES.PRIVATE.ADMIN.USERS
                        )
                      }
                    )}
                  >
                    <NavLink
                      to={ROUTES.PRIVATE.ADMIN.USERS}
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
