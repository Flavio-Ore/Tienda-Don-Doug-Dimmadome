import SigninForm from '@components/forms/SigninForm'
import Auth from '@layouts/Auth'
import Root from '@layouts/Root'

import ProductRegistration from '@/pages/create-product/ProductRegistration'
import Providers from '@/pages/Providers'
import RegisteredKardexs from '@/pages/registered-kardexs/RegisteredKardexs'
import { Navigate, Route, Routes } from 'react-router-dom'
import CreateKardex from './pages/create-kardex/CreateKardex'
import RegisteredProducts from './pages/registered-products/RegisteredProducts'

function App () {
  return (
    <main className='flex h-dvh text-yellow-50'>
      <Routes>
        <Route path='/' element={<Auth />}>
          <Route index element={<SigninForm />} />
        </Route>
        <Route path='/inventario' element={<Root />}>
          <Route index element={<RegisteredKardexs />} />
          <Route path='/inventario/crear-kardex' element={<CreateKardex />} />
          <Route
            path='/inventario/registrar-producto'
            element={<ProductRegistration />}
          />
          <Route
            path='/inventario/productos-registrados'
            element={<RegisteredProducts />}
          />
          <Route path='/inventario/proveedores' element={<Providers />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
