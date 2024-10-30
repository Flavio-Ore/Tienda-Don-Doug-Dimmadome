import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { type ICliente } from '@/types'

const ClientCard = ({ client }: { client: ICliente }) => {
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{client.nombreCliente.split(',')[1]}</CardTitle>
        <CardDescription>
          <span
            className={cn(
              'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-red-700 text-light-1 shadow hover:bg-red-700/80',
              {
                'border-transparent bg-green-700 text-light-1 shadow hover:bg-green-700/80':
                  client.estado.toLowerCase() === 'activo'
              }
            )}
          >
            {client.estado}
          </span>
        </CardDescription>
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
      <CardFooter className='flex justify-center items-center'>
        <Button variant='default'>Dar de baja</Button>
      </CardFooter>
    </Card>
  )
}

export default ClientCard
