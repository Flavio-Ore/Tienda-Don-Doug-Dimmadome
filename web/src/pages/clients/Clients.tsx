import ClientForm from '@/components/forms/ClientForm'
import { useDebounce } from '@/hooks/useDebounce'
import CLIENTS_JSON from '@/mocks/clients.mock.json'
import ClientCard from '@/pages/clients/components/ClientCard'
import { Input } from '@shadcn/input'
import { useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaUsers, FaUserTag } from 'react-icons/fa'

const clientsData = CLIENTS_JSON

const Clients = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedClientsData = useMemo(() => {
    return clientsData.filter(client => {
      const upperCaseValue = debouncedValue.toUpperCase()
      const { nombre_completo, numero, apellido_paterno, apellido_materno } =
        client.data
      return (
        nombre_completo.includes(upperCaseValue) ||
        numero.includes(upperCaseValue) ||
        apellido_paterno.includes(upperCaseValue) ||
        apellido_materno.includes(upperCaseValue)
      )
    })
  }, [debouncedValue])
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
          <CiSearch size={24} />
          <Input
            type='search'
            placeholder='Buscar cliente por nombre, número, apellido paterno o apellido materno'
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
      {!isTyping && clientsData.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No hay clientes registrados
        </p>
      )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-7 max-w-5xl'>
        {isTyping &&
          searchedClientsData.length > 0 &&
          searchedClientsData.map(client => (
            <ClientCard key={client.data.numero} client={client.data} />
          ))}

        {!isTyping &&
          clientsData.length > 0 &&
          clientsData.map(client => (
            <ClientCard key={client.data.numero} client={client.data} />
          ))}
      </div>
    </div>
  )
}

export default Clients
