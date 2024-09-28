import SigninForm from '@components/forms/SigninForm'
import Auth from '@layouts/Auth'
import Root from '@layouts/Root'

import Kardex from '@components/Kardex'
import { Button } from '@shadcn/button'
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { z } from 'zod'

const paymentSchema = z.object({
  id: z.string(),
  amount: z.number(),
  status: z.enum(['pending', 'processing', 'success', 'failed']),
  email: z.string().email()
})

type Payment = z.infer<typeof paymentSchema>

// const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: 'status',
//     header: 'Status'
//   },
//   {
//     accessorKey: 'email',
//     header: 'Email'
//   },
//   {
//     accessorKey: 'amount',
//     header: 'Amount'
//   }
// ]

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com'
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com'
  }
  // ...
]

function App () {
  const [sorting, setSorting] = useState<SortingState>([])
  
  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })
  const [count, setCount] = useState(0)

  return (    
    <main className='flex h-dvh p-8 text-yellow-50 text-xl'>
      <Routes>
        <Route path='/' element={<Auth />}>
          <Route index element={<SigninForm />} />
        </Route>
        <Route path='/inventario' element={<Root />}>
          <Route
            index
            element={
              <div>
                <h1 className='text-2xl'>Inventario</h1>
                <p>Count: {count}</p>
                <Button variant={'outline'} onClick={() => setCount(count + 1)}>
                  Increment
                </Button>
                <Kardex columns={columns} data={payments} />
              </div>
            }
          />
        </Route>
      </Routes>
    </main>
  )
}

export default App
