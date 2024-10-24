import Auth from '@layouts/Auth'
import Root from '@layouts/Root'

import CreateKardex from '@/pages/create-kardex/CreateKardex'
import ProductRegistration from '@/pages/create-product/ProductRegistration'
import Login from '@/pages/Login'
import Providers from '@/pages/providers/Providers'
import RegisteredKardexs from '@/pages/registered-kardexs/RegisteredKardexs'
import RegisteredProducts from '@/pages/registered-products/RegisteredProducts'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/values'
import ReturnProductForm from '@components/forms/ReturnProductForm'
import SellProductForm from '@components/forms/SellProductForm'
import { Navigate, Route, Routes } from 'react-router-dom'
import BuyProduct from './pages/buy-product/BuyProduct'

function App () {
  return (
    <main className='flex h-dvh text-yellow-50'>
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
          <Route
            path={PRIVATE_ROUTES.SELL_PRODUCT}
            element={<SellProductForm />}
          />
          <Route
            path={PRIVATE_ROUTES.RETURN_PRODUCT}
            element={<ReturnProductForm />}
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
