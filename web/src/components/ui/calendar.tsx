import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import type { ComponentProps } from 'react'
import { DayPicker } from 'react-day-picker'

export type CalendarProps = ComponentProps<typeof DayPicker>

function Calendar ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-light-2',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-light-3 rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100 '
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_disabled: 'text-light-2 opacity-50',
        day_selected:
          'bg-light-1 text-dark-1 hover:bg-light-1 hover:text-yellow-500 focus:bg-light-1 focus:text-dark-1',
        day_today: 'bg-dark-4',
        day_outside:
          'day-outside text-light-2 opacity-50  aria-selected:bg-accent/50 aria-selected:text-dark-3 aria-selected:opacity-30',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className='h-4 w-4' />,
        IconRight: () => <ChevronRightIcon className='h-4 w-4' />
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }

