import ProviderForm from '@/components/forms/ProviderForm';
import { FaPeopleGroup } from "react-icons/fa6";

const Providers = () => {
  return (
    <div className='common-container'>
      <ProviderForm />
      <div className='inline-flex gap-x-2'>
        <FaPeopleGroup   size={56} className='fill-red-600' />
        <div>
          <h2 className='text-light-2 text-2xl'>Lista de Provedoores</h2>
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
