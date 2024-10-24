import ProviderForm from '@/components/forms/ProviderForm'
import { FaPeopleGroup, FaTruckFast } from 'react-icons/fa6'

const Providers = () => {
  return (
    <div className='common-container'>
      <div className='inline-flex gap-x-2'>
        <FaTruckFast size={56} className='fill-red-600' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>Nuevo Proveedor</h2>
          <p className='text-light-3 body-bold'>
            Al agregar un proveedor, podrá elegirlo en la lista de proveedores
            cuando realice un movimiento.
          </p>
        </div>
      </div>
      <ProviderForm />
      <div className='inline-flex gap-x-2'>
        <FaPeopleGroup size={56} className='fill-red-600' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Lista de Provedoores
          </h2>
          <p className='text-light-3 body-bold'>
            Aquí puedes ver la lista de proveedores que has agregado. Puedes
            editarlos o eliminarlos si es necesario.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Providers
