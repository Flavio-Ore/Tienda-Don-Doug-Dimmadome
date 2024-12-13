import Auth from '@layouts/Auth'
import Root from '@layouts/Root'

import Login from '@/pages/login/Login'
import { ROUTES } from '@/values'
import BuyProduct from '@pages/buy-product/BuyProduct'
import Clients from '@pages/clients/Clients'
import ProductRegistration from '@pages/create-product/ProductRegistration'
import Kardex from '@pages/kardex/Kardex'
import Products from '@pages/products/Products'
import Providers from '@pages/providers/Providers'
import ReturnProduct from '@pages/return-product/ReturnProduct'
import SellProduct from '@pages/sell-product/SellProduct'
import Users from '@pages/users/Users'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Navigate, Route, Routes } from 'react-router-dom'

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
