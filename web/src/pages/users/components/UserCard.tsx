import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import useInventory from '@/states/inventory/hooks/useInventory'
import { IUsuario } from '@/types'
import { useMemo } from 'react'

const UserCard = ({ user }: { user: IUsuario }) => {
  const { userTypes } = useInventory()

  const userType = useMemo(
    () =>
      userTypes.find(u => u.idTipoUsuario === user.tipoUsuario.idTipoUsuario),
    [user, userTypes]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.nombre}</CardTitle>
        <CardDescription>
          <Badge variant={user.estado === 'activo' ? 'on' : 'off'}>
            {user.estado}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Correo:</span>
            <Badge variant='important'>{user.email}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Agregado:</span>
            <Badge variant='default'>{user.fechaCreacion}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Contraseña:</span>
            <Badge variant='accept'>{user.contrasena}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Rol:</span>
            {userType == null && <Badge variant='important'>Sin rol</Badge>}
            {userType != null && userType.nombre === 'Administrador' && (
              <Badge variant='premium'>⭐{user.tipoUsuario.nombre}</Badge>
            )}
            {userType != null && userType.nombre === 'Vendedor' && (
              <Badge variant='premium'>🛒{user.tipoUsuario.nombre}</Badge>
            )}
            {userType != null && userType.nombre === 'Almacenero' && (
              <Badge variant='important'>📦{user.tipoUsuario.nombre}</Badge>
            )}
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default UserCard
