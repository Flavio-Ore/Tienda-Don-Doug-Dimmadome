import Auth from '@layouts/Auth'

import { ROUTES } from '@/values/routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

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
const Login = lazy(async () => await import('@pages/login/Login'))
const Root = lazy(async () => await import('@layouts/Root'))
function App () {
  return (
    <main className='flex h-dvh text-yellow-50 lg:overflow-hidden overflow-auto custom-scrollbar'>
      <ReactQueryDevtools />
      <Routes>
        <Route path={ROUTES.PUBLIC.LOGIN} element={<Auth />}>
          <Route index element={<Login />} />
        </Route>
        <Route element={<Root />}>
          <Route path={ROUTES.PRIVATE.INVENTORY.KARDEX} element={<Kardex />} />
          <Route path={ROUTES.PRIVATE.PRODUCTS.ROOT} element={<Products />} />
          <Route
            path={ROUTES.PRIVATE.PRODUCTS.ADD}
            element={<ProductRegistration />}
          />
          <Route path={ROUTES.PRIVATE.MOVEMENTS.BUY} element={<BuyProduct />} />
          <Route
            path={ROUTES.PRIVATE.MOVEMENTS.SELL}
            element={<SellProduct />}
          />
          <Route
            path={ROUTES.PRIVATE.MOVEMENTS.REFUND}
            element={<ReturnProduct />}
          />
          <Route path={ROUTES.PRIVATE.USER.PROVIDERS} element={<Providers />} />
          <Route path={ROUTES.PRIVATE.USER.CLIENTS} element={<Clients />} />
          <Route path={ROUTES.PRIVATE.ADMIN.USERS} element={<Users />} />
          <Route path='*' element={<Navigate to={ROUTES.PUBLIC.LOGIN} />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
