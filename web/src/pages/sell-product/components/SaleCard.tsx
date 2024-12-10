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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { numberToCurrency } from '@/lib/utils'
import { IBoletaVenta } from '@/types'
import { FaReceipt } from 'react-icons/fa'
import Receipt from './Receipt'

const SaleCard = ({ sale }: { sale: IBoletaVenta }) => {
  console.log({
    sale
  })
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{sale.numeroSerie}</CardTitle>
        <CardDescription>{sale.fechaVenta}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Total:</span>
            <Badge variant='premium'>{numberToCurrency(sale.costoTotal)}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Cliente:</span>
            <Badge variant='important'>{sale.cliente.nombreCliente}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Productos:</span>
            <Badge variant='accept'>
              {sale.items.map(i => i.producto.nombre).toString()}
            </Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Tipo de pago:</span>
            <Badge variant='default'>{sale.tipoPago.nombre}</Badge>
          </li>
        </ul>
      </CardContent>
      <CardFooter className='inlin-flex justify-center'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='inline-flex gap-x-4'>
              <span>Abrir recibo</span>
              <FaReceipt
                className='
           fill-lime-500
          '
              />
            </Button>
          </DialogTrigger>
          <DialogContent className='max-h-[600px] max-w-[700px]'>
            <DialogTitle>Recibo de venta</DialogTitle>
            <DialogDescription>{sale.numeroSerie}</DialogDescription>
            <Receipt receipt={sale} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default SaleCard
