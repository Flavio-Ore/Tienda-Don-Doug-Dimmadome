import Auth from '@/layouts/Auth'
import { PUBLIC_ROUTES } from '@pages/routes/public'
import { Route } from 'react-router-dom'

const PublicRoutes = () => {
  return (
    <>
      <Route path={PUBLIC_ROUTES.LOGIN} element={<Auth />}></Route>
    </>
  )
}

export default PublicRoutes
