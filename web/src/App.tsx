import SigninForm from 'components/forms/SigninForm'
import Auth from 'layouts/Auth'
import Root from 'layouts/Root'

import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

function App () {
  const [count, setCount] = useState(0)

  return (
    <main className='flex h-dvh p-8 text-yellow-50 text-xl'>
      <Routes>
        <Route path='/' element={<Auth />}>
          <Route index element={<SigninForm />} />
        </Route>
        <Route path='/inventario' element={<Root />}>
          <Route
            index
            element={
              <div>
                <h1 className='text-2xl'>Inventario</h1>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
              </div>
            }
          />
        </Route>
      </Routes>
    </main>
  )
}

export default App
