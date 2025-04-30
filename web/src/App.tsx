import AuthGuard from '@/dimadon/guard/AuthGuard'
import RoleGuard from '@/dimadon/guard/RoleGuard'
import { ADMIN_ROUTES } from '@/dimadon/routes/admin'
import { PUBLIC_ROUTES } from '@/dimadon/routes/public'
import { SESSION_ROUTES } from '@/dimadon/routes/session'
import { ROLE_TYPES } from '@/dimadon/services/roles'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Login = lazy(async () => await import('@/dimadon/auth/Login'))
const Inventory = lazy(
  async () => await import('@/dimadon/inventory/Inventory')
)
const Products = lazy(async () => await import('@/dimadon/products/Products'))
const ProductRegistration = lazy(
  async () =>
    await import('@/dimadon/products/product-registration/ProductRegistration')
)
const BuyProduct = lazy(
  async () => await import('@/dimadon/purchases/buy-product/BuyProduct')
)
const SellProduct = lazy(
  async () => await import('@/dimadon/sales/sell-product/SellProduct')
)
const Refunds = lazy(async () => await import('@/dimadon/refunds/Refunds'))
const Providers = lazy(
  async () => await import('@/dimadon/providers/Providers')
)
const Clients = lazy(async () => await import('@/dimadon/clients/Clients'))
const Users = lazy(async () => await import('@/dimadon/users/Users'))
const Dimadon = lazy(async () => await import('@/dimadon/Dimadon'))

function App () {
  return (
    <main className='flex h-dvh text-yellow-50 lg:overflow-hidden overflow-auto custom-scrollbar'>
      <ReactQueryDevtools />
      <Routes>
        <Route
          path='/'
          element={<Navigate to={SESSION_ROUTES.INVENTORY.KARDEX} />}
        />
        <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route element={<Dimadon />}>
            <Route
              path={SESSION_ROUTES.INVENTORY.KARDEX}
              element={<Inventory />}
            />
            <Route path={SESSION_ROUTES.PRODUCTS.ROOT} element={<Products />} />
            <Route
              path={SESSION_ROUTES.MOVEMENTS.SELL}
              element={<SellProduct />}
            />
            <Route
              path={SESSION_ROUTES.MOVEMENTS.REFUND}
              element={<Refunds />}
            />
            <Route path={SESSION_ROUTES.USER.CLIENTS} element={<Clients />} />
            <Route element={<RoleGuard role={ROLE_TYPES.ADMIN} />}>
              <Route
                path={SESSION_ROUTES.PRODUCTS.ADD}
                element={<ProductRegistration />}
              />
              <Route
                path={SESSION_ROUTES.MOVEMENTS.BUY}
                element={<BuyProduct />}
              />
              <Route
                path={SESSION_ROUTES.USER.PROVIDERS}
                element={<Providers />}
              />
              <Route path={ADMIN_ROUTES.USERS} element={<Users />} />
            </Route>
            <Route path='*' element={<Navigate to={PUBLIC_ROUTES.LOGIN} />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to={PUBLIC_ROUTES.LOGIN} />} />
      </Routes>
    </main>
  )
}

export default App
