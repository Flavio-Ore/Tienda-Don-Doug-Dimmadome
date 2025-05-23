import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import type { InputProps } from '@/components/ui/input'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/utils/cn'
import type {
  ElementRef,
  ForwardRefExoticComponent,
  InputHTMLAttributes
} from 'react'
import {
  forwardRef,
  useCallback
} from 'react'
import { LuCheck, LuChevronsUpDown } from 'react-icons/lu'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

type PhoneInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void
  }

const PhoneInput: ForwardRefExoticComponent<PhoneInputProps> = forwardRef<
  ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn('flex', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={value => onChange?.((value || '') as RPNInput.Value)}
      {...props}
    />
  )
})
PhoneInput.displayName = 'PhoneInput'

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn('rounded-e-lg rounded-s-none', className)}
      {...props}
      ref={ref}
    />
  )
)
InputComponent.displayName = 'InputComponent'

type CountrySelectOption = { label: string; value: RPNInput.Country }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: CountrySelectOption[]
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options
}: CountrySelectProps) => {
  const handleSelect = useCallback(
    (country: RPNInput.Country) => {
      onChange(country)
    },
    [onChange]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant={'ghost'}
          className='flex gap-1 rounded-e-none rounded-s-lg px-3 outline outline-1 outline-light-3 focus-visible:border focus-visible:border-light-1'
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <LuChevronsUpDown
            className={cn(
              '-mr-2 h-4 w-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Buscar país...' />
            <CommandEmpty>País no encontrado.</CommandEmpty>
            <CommandGroup>
              {options
                .filter(x => x.value)
                .map(option => (
                  <CommandItem
                    className='gap-2'
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <FlagComponent
                      country={option.value}
                      countryName={option.label}
                    />
                    <span className='flex-1 text-sm'>{option.label}</span>
                    {option.value && (
                      <span className='text-light-2 text-sm'>
                        {`+${RPNInput.getCountryCallingCode(option.value)}`}
                      </span>
                    )}
                    <LuCheck
                      className={cn(
                        'ml-auto h-4 w-4',
                        option.value === value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className='bg-light-1 flex h-4 w-6 overflow-hidden rounded-sm'>
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
FlagComponent.displayName = 'FlagComponent'

export { PhoneInput }

