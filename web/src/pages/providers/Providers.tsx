import ProviderForm from '@/components/forms/ProviderForm'
import { useDebounce } from '@/hooks/useDebounce'
import PROVIDERS_JSON from '@/mocks/providers.mock.json'
import ProviderCard from '@pages/providers/components/ProviderCard'
import { Input } from '@shadcn/input'
import { useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPeopleCarry } from 'react-icons/fa'
import { FaTruckPlane } from 'react-icons/fa6'

const providersData = PROVIDERS_JSON

const Providers = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedClientsData = useMemo(() => {
    return providersData.filter(provider => {
      const upperCaseValue = debouncedValue.toUpperCase()
      const { nombre, direccion, contacto } = provider
      return (
        nombre.includes(upperCaseValue) ||
        direccion.includes(upperCaseValue) ||
        contacto.includes(upperCaseValue)
      )
    })
  }, [debouncedValue])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
  return (
    <div className='common-container'>
      <div className='inline-flex gap-x-2'>
        <FaTruckPlane size={56} className='fill-teal-500' />
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
        <FaPeopleCarry size={56} className='fill-teal-500' />
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
      <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
        <div className='flex items-center w-full max-w-5xl gap-y-6'>
          <h3 className='text-light-2 body-bold font-ubuntu'>
            Búsqueda global de proveedores
          </h3>
        </div>
        <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
          <CiSearch size={24} />
          <Input
            type='search'
            placeholder='Buscar proveedor por nombre, dirección o contacto'
            className='border-light-3'
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isTyping && searchedClientsData.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No se encontraron clientes
        </p>
      )}
      {!isTyping && providersData.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No hay clientes registrados
        </p>
      )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-7 max-w-5xl'>
        {isTyping &&
          searchedClientsData.length > 0 &&
          searchedClientsData.map(provider => (
            <ProviderCard key={provider.nombre} provider={provider} />
          ))}

        {!isTyping &&
          providersData.length > 0 &&
          providersData.map(provider => (
            <ProviderCard key={provider.nombre} provider={provider} />
          ))}
      </div>
    </div>
  )
}

export default Providers
