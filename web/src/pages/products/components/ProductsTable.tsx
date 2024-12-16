import type { ColumnDef } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@shadcn/table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[]
//   data: TData[]
// }

import { cn, numberToCurrency } from '@/lib/utils'
import type { IProducto } from '@/types'
import { FaEllipsisH, FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const columns: ColumnDef<IProducto>[] = [
  {
    accessorKey: 'idProducto',
    header: () => {
      return <p>ID</p>
    },
    cell: info => <p className=' text-light-3'>{info.getValue<number>()}</p>
  },
  {
    accessorKey: 'nombre',
    header: () => <p>Nombre</p>,
    cell: info => <time className=''>{info.getValue<string>()}</time>
  },
  {
    accessorKey: 'categoria.nombre',
    header: () => <p>Categoría</p>,
    cell: info => <p className=''>{info.getValue<string>()}</p>
  },
  {
    accessorKey: 'precioUnitario',
    header: () => <p>P.U</p>,
    cell: info => (
      <p
        className='sm:group-hover:text-yellow-500 sm:text-yellow-200 text-yellow-500'
        // className={cn('size-full p-2', {
        //   'bg-green-500/5 text-green-500':
        //     info.getValue() === 'Entrada',
        //   'bg-red-500/5 text-red-500': info.getValue() === 'Salida'
        // })}
      >
        {numberToCurrency(info.getValue<number>())}
      </p>
    )
  },
  {
    accessorKey: 'stock',
    id: 'cantidadEntrada',
    header: () => {
      return <span>Stock</span>
    },
    cell: info => {
      return (
        <p
          className='
        sm:group-hover:text-blue-500 sm:text-blue-200 text-blue-500
        '
          // className={cn('', {
          //   'text-green-500 bg-green-500/5 size-full':
          //     info.getValue<number>() > 100,
          //   'text-yellow-500 bg-yellow-500/5 size-full':
          //     info.getValue<number>() > 50 && info.getValue<number>() <= 100,
          //   'text-red-500 bg-red-500/5 size-full': info.getValue<number>() <= 50
          // })}
        >
          {info.getValue<number>()}
        </p>
      )
    }
  },
  {
    accessorKey: 'fechaVencimiento',
    header: () => <span>F.V</span>,
    cell: info => {
      return (
        <p className='sm:group-hover:text-orange-500 sm:text-orange-200 text-orange-500'>
          {info.getValue<Date>().toLocaleString()}
        </p>
      )
    }
  },

  {
    accessorKey: 'estado',
    id: 'costoUnitarioEntrada',
    header: () => {
      return <span>Estado</span>
    },
    cell: info => {
      return (
        <div
          className={cn('inline-flex gap-x-2 size-full', {
            'text-red-200 sm:group-hover:text-red-500':
              info.getValue<string>().toLowerCase() === 'inactivo',
            'text-green-200 sm:group-hover:text-green-500':
              info.getValue<string>().toLowerCase() === 'activo'
          })}
        >
          {info.getValue<string>().toLowerCase() === 'inactivo' && (
            <FaRegStopCircle
              size={24}
              className='sm:group-hover:fill-red-600 fill-red-900'
            />
          )}
          {info.getValue<string>().toLowerCase() === 'activo' && (
            <FaRegPlayCircle
              size={24}
              className='sm:group-hover:fill-green-600 fill-green-900'
            />
          )}
          <p>{info.getValue<string>()}</p>
        </div>
      )
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <div className='size-full'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='size-8 p-0 hover:bg-dark-1 mx-auto'
              >
                <span className='sr-only'>Open menu</span>
                <FaEllipsisH
                  size={16}
                  className='fill-light-3 group-hover:fill-light-1 mx-auto'
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(payment.idProducto.toString())
                }
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
const ProductDataTable = ({ products }: { products: IProducto[] }) => {
  const table = useReactTable({
    data: products,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='rounded-md'>
      <div className='bg-dark-1 border border-dark-4'>
        <Table className='w-full caption-bottom'>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className='border-b border-b-dark-4'
              >
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className='text-lg text-left text-light-3 p-4'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='group border-b border-b-dark-4 transition-colors data-[state=selected]:bg-dark-1 even:bg-dark-2/40'
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className='text-light-1 text-base p-4'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className='text-center p-4 text-light-3'>
                    No hay datos para mostrar
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
export default ProductDataTable
