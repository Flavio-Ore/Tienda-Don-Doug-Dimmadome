import LoaderIcon from '@/components/icons/LoaderIcon'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useMutationChangeUserState } from '@/states/queries/hooks/mutations'
import { IUsuario } from '@/types'
import { Button } from '@shadcn/button'
import { useEffect } from 'react'

const UserCard = ({ user }: { user: IUsuario }) => {
  const {
    mutateAsync: updateEstadoUsuario,
    isPending,
    isError
  } = useMutationChangeUserState()
  const { toast } = useToast()
  const handleClick = ({
    userId,
    state
  }: {
    userId: number
    state: string
  }) => {
    if (state.toLowerCase() === 'activo') {
      updateEstadoUsuario({ idUsuario: userId, estado: 'inactivo' })
    } else {
      updateEstadoUsuario({ idUsuario: userId, estado: 'activo' })
    }
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error al cambiar el estado del usuario',
        variant: 'destructive'
      })
    }
  }, [isError])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.nombre}</CardTitle>
        <CardDescription>
          <span
            className={cn(
              'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-red-700 text-light-1 shadow hover:bg-red-700/80',
              {
                'border-transparent bg-green-700 text-light-1 shadow hover:bg-green-700/80':
                  user.estado.toLowerCase() === 'activo'
              }
            )}
          >
            {user.estado}
          </span>
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
            {user.tipoUsuario.nombre === 'Administrador' && (
              <Badge variant='premium'>⭐{user.tipoUsuario.nombre}</Badge>
            )}
            {user.tipoUsuario.nombre === 'Vendedor' && (
              <Badge variant='premium'>🛒{user.tipoUsuario.nombre}</Badge>
            )}
            {user.tipoUsuario.nombre === 'Almacenero' && (
              <Badge variant='important'>📦{user.tipoUsuario.nombre}</Badge>
            )}
          </li>
        </ul>
      </CardContent>
      <CardFooter className='flex justify-center items-center'>
        {user.estado === 'activo' ? (
          <Button
            variant='outline'
            className='bg-red-900/10 hover:bg-red-900 hover:text-light-1'
            onClick={() =>
              handleClick({
                userId: user.idUsuario,
                state: user.estado
              })
            }
          >
            {isPending ? <LoaderIcon /> : 'Desactivar Usuario'}
          </Button>
        ) : (
          <Button
            variant='outline'
            className='bg-green-900/10 hover:bg-green-900 hover:text-light-1'
            onClick={() =>
              handleClick({
                userId: user.idUsuario,
                state: user.estado
              })
            }
          >
            {isPending ? <LoaderIcon /> : 'Activar Usuario'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default UserCard