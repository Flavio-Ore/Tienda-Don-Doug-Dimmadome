import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <section className='flex flex-1 items-center justify-center flex-col'>
      <Outlet />
    </section>
  )
}

export default Auth
