import { cn } from '@/utils/cn';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 max-h-auto w-full rounded-md border border-light-3 bg-dark-1 px-3 py-2 small-regular ring-offset-light-1 file:border-0 file:bg-transparent file:small-regular placeholder:text-light-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-1 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input };

