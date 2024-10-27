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
        <CardTitle>{client.nombre_completo}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>DNI:</span>
            <span className='bg-dark-1 px-2 py-1 text-sm'>{client.numero}</span>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Nombre completo:</span>
            <span className='bg-dark-1 px-2 py-1 text-sm'>
              {client.nombre_completo}
            </span>
          </li>

          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Apellido paterno:</span>
            <span className='bg-dark-1 px-2 py-1 text-sm'>
              {client.apellido_paterno}
            </span>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Apellido materno:</span>
            <span className='bg-dark-1 px-2 py-1 text-sm'>
              {client.apellido_materno}
            </span>
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
