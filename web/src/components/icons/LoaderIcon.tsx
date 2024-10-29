import { cn } from '@/lib/utils'
import { type SVGProps } from 'react'

const LoaderIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={30}
    height={30}
    viewBox='0 0 38 38'
    className={cn('stroke-amber-500 fill-none', className)}
  >
    <g fillRule='evenodd' strokeWidth={2} transform='translate(1 1)'>
      <circle cx={18} cy={18} r={18} strokeOpacity={0.5} />
      <path d='M36 18c0-9.94-8.06-18-18-18'>
        <animateTransform
          attributeName='transform'
          dur='5s'
          from='0 18 18'
          repeatCount='indefinite'
          to='360 18 18'
          type='rotate'
        />
      </path>
    </g>
  </svg>
)

export default LoaderIcon
