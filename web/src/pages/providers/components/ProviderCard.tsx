import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { IProvider } from '@/types'

const ProviderCard = ({ provider }: { provider: IProvider }) => {
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{provider.nombre}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>DNI:</span>
            <span className='bg-dark-1 px-2 py-1 text-sm'>
              {provider.direccion}
            </span>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Nombre completo:</span>
            <span className='bg-dark-1 px-2 py-1 text-sm'>
              {provider.contacto}
            </span>
          </li>

          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Apellido paterno:</span>
            <span className='bg-dark-1 px-2 py-1 text-sm'>
              {provider.categoria.nombre}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className='flex justify-center items-center'>
        <Button variant='default'>Editar</Button>
      </CardFooter>
    </Card>
  )
}

export default ProviderCard
