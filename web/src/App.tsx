import SigninForm from '@components/forms/SigninForm'
import Auth from '@layouts/Auth'
import Root from '@layouts/Root'

import Inventario from '@/pages/Inventory'
import NewProduct from '@/pages/NewProduct'
import Providers from '@/pages/Providers'
import { Route, Routes } from 'react-router-dom'

function App () {
  return (
    <main className='flex h-dvh text-yellow-50'>
      <Routes>
        <Route path='/' element={<Auth />}>
          <Route index element={<SigninForm />} />
        </Route>
        <Route path='/inventario' element={<Root />}>
          <Route index element={<Inventario />} />
          <Route path='/inventario/nuevo-producto' element={<NewProduct />} />
          <Route
            path='/inventario/editar-producto/:id'
            element={<NewProduct />}
          />
          <Route path='/inventario/proveedores' element={<Providers />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
