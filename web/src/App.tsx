import Auth from '@layouts/Auth'
import Root from '@layouts/Root'

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/values'
import BuyProduct from '@pages/buy-product/BuyProduct'
import CreateKardex from '@pages/create-kardex/CreateKardex'
import ProductRegistration from '@pages/create-product/ProductRegistration'
import Login from '@pages/Login'
import Providers from '@pages/providers/Providers'
import RegisteredKardexs from '@pages/registered-kardexs/RegisteredKardexs'
import RegisteredProducts from '@pages/registered-products/RegisteredProducts'
import ReturnProduct from '@pages/return-product/ReturnProduct'
import SellProduct from '@pages/sell-product/SellProduct'
import { Toaster } from '@shadcn/toaster'
import { Navigate, Route, Routes } from 'react-router-dom'

function App () {
  return (
    <main className='flex h-dvh text-yellow-50'>
      <Toaster />
      <Routes>
        <Route path={PUBLIC_ROUTES.LOGIN} element={<Auth />}>
          <Route index element={<Login />} />
        </Route>
        <Route path={PRIVATE_ROUTES.INVENTORY} element={<Root />}>
          <Route index element={<RegisteredKardexs />} />
          <Route
            path={PRIVATE_ROUTES.CREATE_KARDEX}
            element={<CreateKardex />}
          />
          <Route
            path={PRIVATE_ROUTES.REGISTERED_PRODUCTS}
            element={<RegisteredProducts />}
          />
          <Route
            path={PRIVATE_ROUTES.REGISTER_PRODUCT}
            element={<ProductRegistration />}
          />
          <Route path={PRIVATE_ROUTES.PROVIDERS} element={<Providers />} />
          <Route path={PRIVATE_ROUTES.BUY_PRODUCT} element={<BuyProduct />} />
          <Route path={PRIVATE_ROUTES.SELL_PRODUCT} element={<SellProduct />} />
          <Route
            path={PRIVATE_ROUTES.RETURN_PRODUCT}
            element={<ReturnProduct />}
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
