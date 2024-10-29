import UserForm from '@/components/forms/UserForm'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import UserCard from '@/pages/users/components/UserCard'
import useInventory from '@/states/inventory/hooks/useInventory'
import { useMemo, useState } from 'react'
import { FaSearch, FaUsersCog } from 'react-icons/fa'
import { FaUsersViewfinder } from 'react-icons/fa6'
const Users = () => {
  const [searchValue, setSearchValue] = useState('')
  const { users, searchUsers } = useInventory()
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedUsers = useMemo(
    () =>
      searchUsers({
        searchTerm: debouncedValue
      }),
    [debouncedValue]
  )
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
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
      <div className='inline-flex gap-x-2'>
        <FaUsersViewfinder size={56} className='fill-amber-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Lista de usuarios
          </h2>
          <p className='text-light-3 body-bold'>
            Aquí puedes ver la lista de usuarios que has agregado. Puedes
            editarlos o eliminarlos si es necesario.
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
        <div className='flex items-center w-full max-w-5xl gap-y-6'>
          <h3 className='text-light-2 body-bold font-ubuntu'>
            Búsqueda global de usuarios
          </h3>
        </div>
        <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
          <FaSearch size={24} />
          <Input
            type='search'
            placeholder='Buscar proveedor por nombre, dirección o contacto'
            className='border-light-3'
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isTyping && searchUsers.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No se encontraron usuarios
        </p>
      )}
      {!isTyping && users.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No se encontraron usuarios
        </p>
      )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-7 max-w-5xl'>
        {isTyping &&
          searchedUsers.length > 0 &&
          searchedUsers.map(user => <UserCard key={user.email} user={user} />)}

        {!isTyping &&
          users.length > 0 &&
          users.map(user => <UserCard key={user.email} user={user} />)}
      </div>
    </div>
  )
}

export default Users
