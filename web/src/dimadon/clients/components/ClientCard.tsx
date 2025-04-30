import LoaderIcon from '@/components/icons/LoaderIcon'
import { useMutationChangeClientState } from '@/dimadon/clients/hooks/useMutationChangeClientState'
import { useQueryAllClients } from '@/dimadon/clients/hooks/useQueryAllClients'
import { useToast } from '@/hooks/use-toast'
import { type ICliente } from '@/types'
import { cn } from '@/utils/cn'
import { Badge } from '@shadcn/badge'
import { Button } from '@shadcn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@shadcn/tooltip'
import { useEffect } from 'react'
import { FaCircle } from 'react-icons/fa'

const ClientCard = ({
  client,
  enableEdit = false
}: {
  client: ICliente
  enableEdit: boolean
}) => {
  const {
    mutateAsync: updateClientStatus,
    isPending: isPendingUpdatingClientStatus,
    isError: isErrorUpdatingClientStatus
  } = useMutationChangeClientState()
  const { isLoading: isLoadingClients, isRefetching: isRefetchingClients } =
    useQueryAllClients()
  const { toast } = useToast()

  const handleClick = async () => {
    if (enableEdit) {
      await updateClientStatus({
        idCliente: client.idCliente,
        state: client.estado.toLowerCase() === 'activo' ? 'inactivo' : 'activo'
      })
    }
  }

  useEffect(() => {
    if (isErrorUpdatingClientStatus) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al cambiar el estado del cliente',
        variant: 'destructive'
      })
    }
  }, [isErrorUpdatingClientStatus])

  return (
    <Card
      className={cn({
        'opacity-100': client.estado.toLowerCase() === 'activo',
        'opacity-25': client.estado.toLowerCase() === 'inactivo'
      })}
    >
      <CardHeader className='flex-row items-center justify-between w-full'>
        <CardTitle className=''>{client.nombreCliente} </CardTitle>
        {!enableEdit && (
          <FaCircle
            size={20}
            className={cn({
              'fill-green-700 hover:fill-green-500': client.estado === 'activo',
              'fill-red-700 hover:fill-red-500': client.estado === 'inactivo'
            })}
          />
        )}
        {enableEdit && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='link'
                  className='p-0'
                  disabled={
                    isPendingUpdatingClientStatus ||
                    isRefetchingClients ||
                    isLoadingClients
                  }
                  onClick={handleClick}
                >
                  <span className='sr-only'>
                    {client.estado === 'activo'
                      ? 'Desactivar cliente'
                      : 'Activar cliente'}
                  </span>
                  {(isPendingUpdatingClientStatus ||
                    isRefetchingClients ||
                    isLoadingClients) && <LoaderIcon className='size-5' />}
                  {!isPendingUpdatingClientStatus && !isRefetchingClients && (
                    <FaCircle
                      size={20}
                      className={cn({
                        'fill-green-700 hover:fill-green-500':
                          client.estado === 'activo',
                        'fill-red-700 hover:fill-red-500':
                          client.estado === 'inactivo'
                      })}
                    />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span className='text-light-3 text-xs'>
                  {client.estado === 'activo'
                    ? 'Desactivar cliente'
                    : 'Activar cliente'}
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>DNI:</span>
            <Badge variant='accept'>{client.numeroDocumento}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Nombre completo:</span>
            <Badge variant='important'>{client.nombreCliente}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Dirección:</span>
            <Badge variant='default'>{client.direccion ?? 'N/A'}</Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default ClientCard
