import LoaderIcon from '@/components/icons/LoaderIcon'
import { Skeleton } from '@shadcn/skeleton'
import { type ReactNode, Suspense } from 'react'

const LazyPages = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <Skeleton className='flex-center h-dvh w-full'>
          <div className='flex flex-col gap-y-8 items-center justify-center'>
            <p className='text-2xl w-full animate-pulse text-light-3'>Cargando, espere un momento por favor
            </p>
            <LoaderIcon />
          </div>
        </Skeleton>
      }
    >
      {children}
    </Suspense>
  )
}
export default LazyPages
