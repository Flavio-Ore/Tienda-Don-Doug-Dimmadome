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
import { type ICliente } from '@/types'

const ClientCard = ({ client }: { client: ICliente }) => {
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>Cliente N°{client.idCliente}</CardTitle>
        <CardDescription>
          <Badge variant={client.estado === 'activo' ? 'on' : 'off'}>
            {client.estado}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>DNI:</span>
            <Badge variant='important'>{client.numeroDocumento}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Nombre completo:</span>
            <Badge variant='premium'>{client.nombreCliente}</Badge>
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
