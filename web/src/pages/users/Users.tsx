import UserForm from '@/components/forms/UserForm'
import { FaUsersCog } from 'react-icons/fa'

const Users = () => {
  return (
    <div className='common-container'>
      <div className='common-container__title'>
        <FaUsersCog size={56} className='min-w-14 fill-amber-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>Usuarios</h2>
          <p className='text-light-3 body-bold'>
            Gestionar los usuarios y sus permisos en el sistema.
          </p>
        </div>
      </div>
      <UserForm />
    </div>
  )
}

export default Users
