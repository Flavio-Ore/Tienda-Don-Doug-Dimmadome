import ClientForm from '@/components/forms/ClientForm'
import LoaderIcon from '@/components/icons/LoaderIcon'
import { useDebounce } from '@/hooks/useDebounce'
import ClientCard from '@/pages/clients/components/ClientCard'
import { useQueryAllClients } from '@/states/queries/hooks/queries'
import { Input } from '@shadcn/input'
import { useMemo, useState } from 'react'
import { FaSearch, FaUsers, FaUserTag } from 'react-icons/fa'

const Clients = () => {
  const {
    data: clients,
    isLoading: isLoadingClients,
    isError: isErrorClients
  } = useQueryAllClients()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedClients = useMemo(() => {
    const debouncedValueLower = debouncedValue.toLowerCase()
    return (
      clients?.filter(
        c =>
          c.nombreCliente.toLowerCase().includes(debouncedValueLower) ||
          c.numeroDocumento.toString().includes(debouncedValueLower) ||
          c.direccion?.toLowerCase().includes(debouncedValueLower) ||
          c.fechaRegistro.toString().includes(debouncedValueLower) ||
          c.estado.toString().includes(debouncedValueLower)
      ) ?? []
    )
  }, [debouncedValue, clients])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
  return (
    <div className='common-container'>
      <div className='common-container__title'>
        <FaUserTag size={56} className='min-w-14 fill-teal-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>Clientes</h2>
          <p className='text-light-3 body-bold'>
            Gestionar los clientes del sistema.
          </p>
        </div>
      </div>
      <ClientForm />
      <div className='inline-flex gap-x-2'>
        <FaUsers size={56} className='fill-teal-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Lista de Clientes
          </h2>
          <p className='text-light-3 body-bold'>
            Aquí puedes ver la lista de clientes que has agregado. Puedes
            editarlos o eliminarlos si es necesario.
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
        <div className='flex items-center w-full max-w-5xl gap-y-6'>
          <h3 className='text-light-2 body-bold font-ubuntu'>
            Búsqueda global de clientes
          </h3>
        </div>
        <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
          <FaSearch size={24} className='fill-light-3'/>
          <Input
            type='search'
            placeholder='Buscar cliente por nombre, número, apellido paterno o apellido materno'
            className='border-light-3'
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isLoadingClients && (
        <div className='w-full'>
          <LoaderIcon className='mx-auto' />
        </div>
      )}
      {isErrorClients && (
        <p className='text-red-700 body-bold text-center w-full animate-pulse'>
          Hubo un error al cargar los clientes
        </p>
      )}
      {isTyping &&
        !isLoadingClients &&
        isErrorClients &&
        clients != null &&
        searchedClients.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full'>
            No se encontraron clientes
          </p>
        )}
      {!isTyping &&
        !isLoadingClients &&
        isErrorClients &&
        clients != null &&
        clients.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full'>
            No hay clientes registrados
          </p>
        )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl'>
        {isTyping &&
          !isLoadingClients &&
          !isErrorClients &&
          clients != null &&
          searchedClients.length > 0 &&
          searchedClients.map(client => (
            <ClientCard key={client.idCliente} client={client} />
          ))}

        {!isTyping &&
          !isLoadingClients &&
          !isErrorClients &&
          clients != null &&
          clients.length > 0 &&
          clients.map(client => (
            <ClientCard key={client.idCliente} client={client} />
          ))}
      </div>
    </div>
  )
}

export default Clients
