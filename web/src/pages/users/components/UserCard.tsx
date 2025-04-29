import LoaderIcon from '@/components/icons/LoaderIcon'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useMutationChangeUserState } from '@/states/doug-dimadon-tankstack-query/hooks/mutations/users/useMutationChangeUserState'
import { useQueryAllUsers } from '@/states/doug-dimadon-tankstack-query/hooks/queries/users/useQueryAllUsers'
import type { IUsuario } from '@/types'
import { Button } from '@shadcn/button'
import { useEffect } from 'react'
import { FaCircle } from 'react-icons/fa'

const UserCard = ({ user }: { user: IUsuario }) => {
  const { isRefetching } = useQueryAllUsers()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  return (
    <Card
      className={cn({
        'opacity-100': user.estado.toLowerCase() === 'activo',
        'opacity-25': user.estado.toLowerCase() === 'inactivo'
      })}
    >
      <CardHeader className='flex-row items-center justify-between w-full'>
        <CardTitle className=''>{user.nombre} </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='link'
                className='p-0'
                disabled={isPending || isRefetching}
                onClick={() => {
                  handleClick({
                    userId: user.idUsuario,
                    state: user.estado
                  })
                }}
              >
                <span className='sr-only'>
                  {user.estado === 'activo'
                    ? 'Desactivar usuario'
                    : 'Activar usuario'}
                </span>
                {(isPending || isRefetching) && (
                  <LoaderIcon className='size-5' />
                )}
                {!isPending && !isRefetching && (
                  <FaCircle
                    size={20}
                    className={cn({
                      'fill-green-700 hover:fill-green-500':
                        user.estado === 'activo',
                      'fill-red-700 hover:fill-red-500':
                        user.estado === 'inactivo'
                    })}
                  />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className='text-light-3 text-xs'>
                {user.estado === 'activo'
                  ? 'Desactivar usuario'
                  : 'Activar usuario'}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
    </Card>
  )
}

export default UserCard
