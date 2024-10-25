import ClientForm from '@/components/forms/ClientForm'
import { FaUserTag } from 'react-icons/fa'

const Clients = () => {
  return (
    <div className='common-container'>
      <div className='common-container__title'>
        <FaUserTag size={56} className='min-w-14 fill-sky-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>Clientes</h2>
          <p className='text-light-3 body-bold'>
            Gestionar los clientes del sistema.
          </p>
        </div>
      </div>
      <ClientForm />
    </div>
  )
}

export default Clients
