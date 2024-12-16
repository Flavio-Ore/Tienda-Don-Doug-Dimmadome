import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import type { IProveedor } from '@/types'

const ProviderCard = ({ provider }: { provider: IProveedor }) => {
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{provider.nombre}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Razón Social:</span>
            <Badge variant='important'>{provider.nombre}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Contacto:</span>
            <Badge variant='accept'>{provider.contacto}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Dirección:</span>
            <Badge variant='default'>{provider.direccion}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Categoría:</span>
            <Badge variant='default'>{provider.categoria.nombre}</Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default ProviderCard
