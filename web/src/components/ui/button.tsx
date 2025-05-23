import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'group inline-flex items-center justify-center whitespace-nowrap rounded-md small-regular font-medium transition-colors group-focus-visible:outline-none group-focus-visible:ring-1 group-focus-visible:ring-light-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-light-1 text-dark-1 hover:bg-light-1/80',
        destructive: 'group bg-red-500 text-light-1 hover:bg-red-500/80',
        outline: 'text-light-1 hover:bg-light-1 hover:text-dark-1',
        secondary:
          'bg-secure text-light-1 hover:bg-secure/80 hover:text-light-2',
        ghost: 'hover:bg-dark-3',
        link: 'text-secure underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        auto: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants };

