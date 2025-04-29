import UserForm from '@/components/forms/UserForm'
import LoaderIcon from '@/components/icons/LoaderIcon'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import UserCard from '@/pages/users/components/UserCard'
import { useQueryAllUsers } from '@/states/doug-dimadon-tankstack-query/hooks/queries'
import { useMemo, useState } from 'react'
import { FaSearch, FaUsersCog } from 'react-icons/fa'
import { FaUsersViewfinder } from 'react-icons/fa6'
const Users = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers
  } = useQueryAllUsers()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedUsers = useMemo(() => {
    const debouncedValueLower = debouncedValue.toLowerCase()
    return (
      users?.filter(
        c =>
          c.nombre.toLowerCase().includes(debouncedValueLower) ||
          c.tipoUsuario.nombre.toString().includes(debouncedValueLower) ||
          c.email.toLowerCase().includes(debouncedValueLower) ||
          c.fechaCreacion.toString().includes(debouncedValueLower) ||
          c.estado.toString().includes(debouncedValueLower)
      ) ?? []
    )
  }, [debouncedValue, users])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
  return (
    <div className='common-container'>
      <div className='common-inner_container'>
        <div className='common-container__title'>
          <FaUsersCog size={56} className='min-w-14 fill-amber-500' />
          <div>
            <h2 className='text-light-2 text-2xl font-ubuntu'>Usuarios</h2>
            <p className='text-light-3 body-bold'>
              Gestionar los usuarios y sus permisos en el sistema.
            </p>
          </div>
        </div>
      </div>
      <div className='common-inner_container'>
        <UserForm />
      </div>
      <div className='common-inner_container'>
        <div className='common-container__title'>
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
            <FaSearch size={24} className='fill-light-3' />
            <Input
              type='search'
              placeholder='Buscar usuario por nombre, correo, rol o estado'
              className='border-light-3'
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>
        {isErrorUsers && (
          <p className='text-red-700 body-bold text-center w-full animate-pulse'>
            Hubo un error al cargar los usuarios
          </p>
        )}
        {isLoadingUsers && (
          <div className='w-full'>
            <LoaderIcon className='mx-auto' />
          </div>
        )}
        {isTyping && searchedUsers.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full animate-pulse'>
            No se encontraron usuarios con el término de búsqueda "{searchValue}
            "
          </p>
        )}
        {!isTyping &&
          !isLoadingUsers &&
          !isErrorUsers &&
          users != null &&
          users.length <= 0 && (
            <p className='text-light-3 body-bold text-center w-full animate-pulse'>
              No hay usuarios registrados
            </p>
          )}
        <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-7 max-w-5xl'>
          {isTyping &&
            !isLoadingUsers &&
            !isErrorUsers &&
            users != null &&
            searchedUsers.length > 0 &&
            searchedUsers.map(user => (
              <UserCard key={user.email} user={user} />
            ))}
          {!isTyping &&
            !isLoadingUsers &&
            !isErrorUsers &&
            users != null &&
            users.length > 0 &&
            users.map(user => <UserCard key={user.email} user={user} />)}
        </div>
      </div>
    </div>
  )
}

export default Users
