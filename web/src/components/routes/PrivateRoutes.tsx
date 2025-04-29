import { ADMIN_ROUTES } from '@/pages/routes/admin'
import { PUBLIC_ROUTES } from '@/pages/routes/public'
import { SESSION_ROUTES } from '@/pages/routes/session'
import useAuth from '@/states/auth/hooks/useAuth'
import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

const Kardex = lazy(async () => await import('@pages/kardex/Kardex'))
const Products = lazy(async () => await import('@pages/products/Products'))
const ProductRegistration = lazy(
  async () => await import('@pages/create-product/ProductRegistration')
)
const BuyProduct = lazy(
  async () => await import('@pages/buy-product/BuyProduct')
)
const SellProduct = lazy(
  async () => await import('@pages/sell-product/SellProduct')
)
const ReturnProduct = lazy(
  async () => await import('@pages/return-product/ReturnProduct')
)
const Providers = lazy(async () => await import('@pages/providers/Providers'))
const Clients = lazy(async () => await import('@pages/clients/Clients'))
const Users = lazy(async () => await import('@pages/users/Users'))

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth()
  return <>
    <Route
      path={SESSION_ROUTES.INVENTORY.KARDEX}
      element={isAuthenticated ? <Kardex /> : <Navigate to='/login' />}
    />
    <Route
      path={SESSION_ROUTES.PRODUCTS.ROOT}
      element={isAuthenticated ? <Products /> : <Navigate to='/login' />}
    />
    <Route
      path={SESSION_ROUTES.PRODUCTS.ADD}
      element={
        <PrivateRoute>
          <ProductRegistration />
        </PrivateRoute>
      }
    />
    <Route
      path={SESSION_ROUTES.MOVEMENTS.BUY}
      element={
        <PrivateRoute>
          <BuyProduct />
        </PrivateRoute>
      }
    />
    <Route
      path={SESSION_ROUTES.MOVEMENTS.SELL}
      element={
        <PrivateRoute>
          <SellProduct />
        </PrivateRoute>
      }
    />
    <Route
      path={SESSION_ROUTES.MOVEMENTS.REFUND}
      element={
        <PrivateRoute>
          <ReturnProduct />
        </PrivateRoute>
      }
    />
    <Route
      path={SESSION_ROUTES.USER.PROVIDERS}
      element={
        <PrivateRoute>
          <Providers />
        </PrivateRoute>
      }
    />
    <Route
      path={SESSION_ROUTES.USER.CLIENTS}
      element={
        <PrivateRoute>
          <Clients />
        </PrivateRoute>
      }
    />
    <Route
      path={ADMIN_ROUTES.USERS}
      element={
        <PrivateRoute>
          <Users />
        </PrivateRoute>
      }
    />
    <Route
      path='*'
      element={
        <PrivateRoute>
          <Navigate to={PUBLIC_ROUTES.LOGIN} />
        </PrivateRoute>
      }
    />
  </>
}

export default PrivateRoutes
