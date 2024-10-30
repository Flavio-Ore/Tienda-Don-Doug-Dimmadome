import ProviderForm from '@/components/forms/ProviderForm'
import LoaderIcon from '@/components/icons/LoaderIcon'
import { useDebounce } from '@/hooks/useDebounce'
import { useQueryAllProviders } from '@/states/queries/hooks/queries'
import ProviderCard from '@pages/providers/components/ProviderCard'
import { Input } from '@shadcn/input'
import { useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPeopleCarry } from 'react-icons/fa'
import { FaTruckPlane } from 'react-icons/fa6'

const Providers = () => {
  const {
    data: providers,
    isLoading: isProvidersLoading,
    isError: isProvidersError
  } = useQueryAllProviders()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedProviders = useMemo(
    () =>
      providers?.filter(
        p =>
          p.nombre.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          p.contacto.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          p.direccion.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          p.categoria.nombre
            .toLowerCase()
            .includes(debouncedValue.toLowerCase())
      ) ?? [],
    [debouncedValue, providers]
  )
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
      {isProvidersLoading && (
        <div className='w-full'>
          <LoaderIcon className='mx-auto' />
        </div>
      )}
      {isProvidersError && (
        <p className='text-red-700 body-bold text-center w-full animate-pulse'>
          Hubo un error al cargar los proveedores
        </p>
      )}
      {isTyping && providers != null && searchedProviders.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No se encontraron clientes
        </p>
      )}
      {!isTyping && providers != null && providers.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No hay proveedores registrados
        </p>
      )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-7 max-w-5xl'>
        {isTyping &&
          !isProvidersLoading &&
          !isProvidersError &&
          providers != null &&
          searchedProviders.length > 0 &&
          searchedProviders.map(provider => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}

        {!isTyping &&
          !isProvidersLoading &&
          !isProvidersError &&
          providers != null &&
          providers.length > 0 &&
          providers.map(provider => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
      </div>
    </div>
  )
}

export default Providers
