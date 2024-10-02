
function Kardex () {
  // const { data: inventory = [] } = useGetAllMovements()
  // const { mutate: addMovement } = useAddMovementMutation()
  // const textAreaRef = useRef<HTMLTextAreaElement>(null)
  // const movementForm = useForm<z.infer<typeof movementValidationSchema>>({
  //   resolver: zodResolver(movementValidationSchema),
  //   defaultValues: {
  //     date: new Date(),
  //     number: '',
  //     quantity: 0,
  //     serial: '',
  //     operationType: 'Compra',
  //     typeReceipt: 'Factura',
  //     unitCost: 0
  //   }
  // })
  // const onSubmitMovement = (
  //   values: z.infer<typeof movementValidationSchema>
  // ) => {
  //   addMovement(values)
  // }
  // useEffect(() => {
  //   if (textAreaRef.current != null) {
  //     textAreaRef.current.style.height = '40px'
  //     textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  //   }
  //   const formSubscription = movementForm.watch(() => {
  //     if (textAreaRef.current != null) {
  //       textAreaRef.current.style.height = '40px'
  //       textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  //     }
  //   })
  //   return () => {
  //     formSubscription.unsubscribe()
  //   }
  // }, [movementForm])
  // const table = useReactTable<Movement>({
  //   data: inventory,
  //   columns,
  //   getCoreRowModel: getCoreRowModel()
  // })
  // return (
  //   <div className='bg-dark-2 rounded-xl'>
  //     <Table>
  //       <TableHeader>
  //         {table.getHeaderGroups().map(headerGroup => (
  //           <TableRow key={headerGroup.id}>
  //             {headerGroup.headers.map(header => (
  //               <TableHead key={header.id} colSpan={header.colSpan}>
  //                 {header.isPlaceholder
  //                   ? null
  //                   : flexRender(
  //                       header.column.columnDef.header,
  //                       header.getContext()
  //                     )}
  //               </TableHead>
  //             ))}
  //           </TableRow>
  //         ))}
  //       </TableHeader>
  //       <TableBody>
  //         {table.getRowModel().rows.map(row => (
  //           <TableRow key={row.id}>
  //             {row.getVisibleCells().map(cell => (
  //               <TableCell key={cell.id}>
  //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //               </TableCell>
  //             ))}
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //       <TableFooter>
  //         {table.getFooterGroups().map(footerGroup => (
  //           <TableRow key={footerGroup.id}>
  //             {footerGroup.headers.map(header => (
  //               <TableCell key={header.id} colSpan={header.colSpan}>
  //                 {header.isPlaceholder
  //                   ? null
  //                   : flexRender(
  //                       header.column.columnDef.footer,
  //                       header.getContext()
  //                     )}
  //               </TableCell>
  //             ))}
  //           </TableRow>
  //         ))}
  //       </TableFooter>
  //     </Table>
  //     <div className='h-4' />
  //     <Dialog>
  //       <DialogTrigger asChild>
  //         <Button variant='default'>Agregar movimiento</Button>
  //       </DialogTrigger>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle>Agregar nuevo movimiento</DialogTitle>
  //           <DialogDescription className='text-light-3 text-pretty break-words'>
  //             Agrega un nuevo movimiento al kardex de inventario.
  //           </DialogDescription>
  //         </DialogHeader>
  //         <Form {...movementForm}>
  //           <form
  //             onSubmit={movementForm.handleSubmit(onSubmitMovement)}
  //             onKeyDown={e => {
  //               if (e.key === 'Enter' && !e.shiftKey) {
  //                 movementForm.handleSubmit(onSubmitMovement)(e)
  //               }
  //             }}
  //           >
  //             <FormField
  //               control={movementForm.control}
  //               name='date'
  //               render={({ field }) => (
  //                 <FormItem className='inline-flex w-full items-center justify-between'>
  //                   <FormLabel htmlFor={field.name}>Fecha</FormLabel>
  //                   <Popover>
  //                     <PopoverTrigger asChild>
  //                       <FormControl>
  //                         <Button
  //                           variant={'outline'}
  //                           className={cn(
  //                             'w-[240px] pl-3 text-left font-normal',
  //                             !field.value && 'text-light-3'
  //                           )}
  //                         >
  //                           {field.value ? (
  //                             format(field.value, 'PPP')
  //                           ) : (
  //                             <span>Eliga una fecha</span>
  //                           )}{' '}
  //                           <TbCalendarTime className='ml-auto h-4 w-4 opacity-50' />
  //                         </Button>
  //                       </FormControl>
  //                     </PopoverTrigger>
  //                     <PopoverContent className='w-auto p-0' align='start'>
  //                       <Calendar
  //                         mode='single'
  //                         selected={field.value}
  //                         onSelect={field.onChange}
  //                         disabled={date =>
  //                           date > new Date() || date < new Date('1900-01-01')
  //                         }
  //                         initialFocus
  //                       />
  //                     </PopoverContent>
  //                   </Popover>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={movementForm.control}
  //               name='typeReceipt'
  //               render={({ field }) => (
  //                 <FormItem className='inline-flex w-full items-center justify-between'>
  //                   <FormLabel htmlFor={field.name} className=''>
  //                     Tipo de comprobante
  //                   </FormLabel>
  //                   <Popover>
  //                     <PopoverTrigger asChild>
  //                       <FormControl>
  //                         <Button
  //                           variant='outline'
  //                           role='combobox'
  //                           className={cn(
  //                             'w-[200px] justify-between',
  //                             !field.value && 'text-light-3'
  //                           )}
  //                         >
  //                           {field.value
  //                             ? RECEIPTS_TYPES.find(
  //                                 type => type === field.value
  //                               )
  //                             : 'Elige un tipo de comprobante'}
  //                         </Button>
  //                       </FormControl>
  //                     </PopoverTrigger>
  //                     <PopoverContent className='w-[200px] p-0'>
  //                       {RECEIPTS_TYPES.map(type => (
  //                         <Button
  //                           key={type}
  //                           variant='ghost'
  //                           onClick={() => {
  //                             field.onChange(type)
  //                           }}
  //                           className='w-full hover:bg-dark-4'
  //                         >
  //                           {type}
  //                         </Button>
  //                       ))}
  //                     </PopoverContent>
  //                   </Popover>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={movementForm.control}
  //               name='operationType'
  //               render={({ field }) => (
  //                 <FormItem className='inline-flex w-full items-center justify-between'>
  //                   <FormLabel htmlFor={field.name}>
  //                     Tipo de operación
  //                   </FormLabel>
  //                   <Popover>
  //                     <PopoverTrigger asChild>
  //                       <FormControl>
  //                         <Button
  //                           variant='outline'
  //                           role='combobox'
  //                           className={cn(
  //                             'w-[200px] justify-between',
  //                             !field.value && 'text-light-3'
  //                           )}
  //                         >
  //                           {field.value
  //                             ? OPERATIONS_TYPES.find(
  //                                 type => type === field.value
  //                               )
  //                             : 'Elige un tipo de operación'}
  //                         </Button>
  //                       </FormControl>
  //                     </PopoverTrigger>
  //                     <PopoverContent className='w-[200px] p-0'>
  //                       {OPERATIONS_TYPES.map(type => (
  //                         <Button
  //                           key={type}
  //                           variant='ghost'
  //                           onClick={() => {
  //                             field.onChange(type)
  //                           }}
  //                           className='w-full hover:bg-dark-4'
  //                         >
  //                           {type}
  //                         </Button>
  //                       ))}
  //                     </PopoverContent>
  //                   </Popover>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={movementForm.control}
  //               name='quantity'
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel htmlFor={field.name}>Cantidad</FormLabel>
  //                   <FormControl>
  //                     <Input type='number' {...field} placeholder='Cantidad' />
  //                   </FormControl>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={movementForm.control}
  //               name='unitCost'
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel htmlFor={field.name}>Costo unitario</FormLabel>
  //                   <FormControl>
  //                     <Input
  //                       type='number'
  //                       {...field}
  //                       placeholder='Costo unitario'
  //                     />
  //                   </FormControl>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={movementForm.control}
  //               name='serial'
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel htmlFor={field.name}>Serial</FormLabel>
  //                   <FormControl>
  //                     <Input type='text' {...field} placeholder='Serial' />
  //                   </FormControl>
  //                 </FormItem>
  //               )}
  //             />
  //             <FormField
  //               control={movementForm.control}
  //               name='number'
  //               render={({ field }) => (
  //                 <FormItem>
  //                   <FormLabel htmlFor={field.name}>Número</FormLabel>
  //                   <FormControl>
  //                     <Input type='text' {...field} placeholder='Número' />
  //                   </FormControl>
  //                 </FormItem>
  //               )}
  //             />
  //             <DialogFooter className='mt-4'>
  //               <DialogClose type='button'>Cancelar</DialogClose>
  //               <Button type='submit' variant='default'>
  //                 <div className='flex-center'>
  //                   Agregar movimiento
  //                   <span className='sr-only'>Agregar movimiento</span>
  //                 </div>
  //               </Button>
  //             </DialogFooter>
  //           </form>
  //         </Form>
  //       </DialogContent>
  //     </Dialog>
  //   </div>
  // )
}

export default Kardex
