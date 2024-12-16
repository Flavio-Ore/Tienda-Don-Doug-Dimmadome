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
import CreditNote from '@/pages/return-product/components/CreditNote'
import type { INotaDeCredito } from '@/types'
import { FaReceipt } from 'react-icons/fa'

const RefundCard = ({ refund }: { refund: INotaDeCredito }) => {
  console.log({
    refund
  })
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>{refund.numeroSerie}</CardTitle>
        <CardDescription>{refund.fechaDevolucion}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Total:</span>
            <Badge variant='premium'>
              {numberToCurrency(refund.costoTotal)}
            </Badge>
          </li>
          {refund.proveedor == null && refund.cliente != null && (
            <li className='w-full inline-flex justify-between'>
              <span className='text-sm text-light-3'>Cliente:</span>
              <Badge variant='important'>{refund.cliente.nombreCliente}</Badge>
            </li>
          )}
          {refund.proveedor != null && refund.cliente == null && (
            <li className='w-full inline-flex justify-between'>
              <span className='text-sm text-light-3'>Proveedor:</span>
              <Badge variant='important'>{refund.proveedor.nombre}</Badge>
            </li>
          )}
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Producto:</span>
            <Badge variant='accept'>{refund.producto.nombre}</Badge>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span className='text-sm text-light-3'>Tipo de devolución:</span>
            <Badge variant='default'>{refund.tipoDevolucion.nombre}</Badge>
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
            <DialogTitle>Nota de Crédito</DialogTitle>
            <DialogDescription>{refund.numeroSerie}</DialogDescription>
            <CreditNote creditNote={refund} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default RefundCard
