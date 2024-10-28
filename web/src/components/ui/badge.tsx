import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        on: 'border-transparent bg-green-700 text-light-1 shadow hover:bg-green-700/80',
        off: 'border-transparent bg-red-700 text-light-1 shadow hover:bg-red-700/80',
        default:
          'border-transparent bg-dark-1 text-light-1 shadow hover:bg-dark-2/80',
        success: 'bg-green-500 text-light-1 shadow hover:bg-green-500/80',
        accept:
          'border-transparent bg-blue-800 text-light-1 shadow hover:bg-blue-800/80',
        warning:
          'border-transparent bg-red-500 text-light-1 shadow hover:bg-red-500/80',
        destructive: 'bg-red-500 text-light-1 shadow hover:bg-red-500/80',
        important:
          'border-transparent bg-neutral-300 text-dark-1 shadow hover:bg-neutral-300/80',
        premium: 'bg-dark-1 text-amber-500'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge ({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
